const addDoctor = async (req, res) => {
  try {
    console.log('BODY:', req.body)
    console.log('FILE:', req.file)

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image not received'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Doctor received successfully',
      file: req.file
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
