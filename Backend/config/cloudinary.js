import { v2 as cloudinary } from 'cloudinary'

// currentClient will be returned by getCloudinary(); it may be the real cloudinary v2
// or a stub when credentials are missing and allowMissing is used
let currentClient = cloudinary

export const connectCloudinary = (options = {}) => {
  const cfg = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  }

  // Basic validation to fail fast when credentials are obviously missing or placeholders
  const looksLikePlaceholder = (s) => !s || /YOUR|REPLACE|CHANGE_ME|<|>/i.test(String(s))
  const missing = looksLikePlaceholder(cfg.api_key) || looksLikePlaceholder(cfg.api_secret)
  if (missing) {
    const msg = 'Missing or placeholder Cloudinary credentials. Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env.'
    if (options.debug) console.error(msg, { cloud_name: cfg.cloud_name, api_key: cfg.api_key && String(cfg.api_key).replace(/.(?=.{4})/g, '*') })

    // In production we should fail fast unless explicitly allowed
    if (process.env.NODE_ENV === 'production' && !options.allowMissing) {
      throw new Error(msg)
    }

    // For development (or when allowMissing is true), warn and return a stub
    console.warn(msg + ' Continuing in development mode with a stubbed Cloudinary client.')

    const stub = {
      __isStub: true,
      uploader: {
        upload: async () => {
          throw new Error('Cloudinary is not configured. Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env')
        },
        upload_stream: (opts, cb) => cb(new Error('Cloudinary is not configured. Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env')),
      },
      api: {
        resources: async () => {
          throw new Error('Cloudinary is not configured. Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env')
        },
      },
    }

    // set currentClient to stub so other modules can access it via getCloudinary()
    currentClient = stub
    return stub
  }

  cloudinary.config(cfg)
  // set currentClient to the configured cloudinary client
  currentClient = cloudinary

  // If debug flag set, add lightweight instrumentation to surface requests and errors
  if (options.debug) {
    console.debug('Cloudinary debug enabled — connecting with:', {
      cloud_name: cfg.cloud_name,
      api_key: cfg.api_key ? cfg.api_key.replace(/.(?=.{4})/g, '*') : cfg.api_key,
      // do not print api_secret
    })

    // Wrap upload to provide richer logs for debugging (preserves original behavior)
    const originalUpload = cloudinary.uploader.upload.bind(cloudinary.uploader)
    cloudinary.uploader.upload = async (file, uploadOptions = {}) => {
      console.debug('Cloudinary upload called:', file, uploadOptions)
      try {
        const res = await originalUpload(file, uploadOptions)
        console.debug('Cloudinary upload success:', res)
        return res
      } catch (err) {
        console.debug('Cloudinary upload error:', err && err.message, 'http_code:', err && err.http_code, 'http_body:', err && err.http_body)
        throw err
      }
    }

    // Similarly wrap upload_stream for stream-based uploads
    if (cloudinary.uploader.upload_stream) {
      const originalUploadStream = cloudinary.uploader.upload_stream.bind(cloudinary.uploader)
      cloudinary.uploader.upload_stream = (opts, callback) => {
        console.debug('Cloudinary upload_stream called with opts:', opts)
        return originalUploadStream(opts, (err, result) => {
          if (err) console.debug('Cloudinary upload_stream error:', err && err.message, err && err.http_body)
          else console.debug('Cloudinary upload_stream success:', result)
          callback(err, result)
        })
      }
    }
  }

  return cloudinary
}

// Helper to verify credentials by making a simple Admin API call
export const verifyCloudinary = async () => {
  return currentClient.api.resources({ max_results: 1 })
}

export const getCloudinary = () => currentClient

export default currentClient
