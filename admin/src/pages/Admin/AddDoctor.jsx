import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {



  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const {backendUrl, aToken} = useContext(AdminContext);

const onSubmitHandler = async(event) => {
  event.preventDefault();
  // Client-side validation to avoid server 400s
  if (!docImg) return toast.error('Please upload doctor image');
  if (!name || !email || !password || !degree || !fees || !about || !address1 || !address2) {
    return toast.error('Please fill all required fields');
  }
  if (!email.includes('@')) return toast.error('Please enter a valid email');
  if (password.length < 8) return toast.error('Password must be at least 8 characters long');

  try {

    const formData = new FormData();
    // backend expects field name 'image' (upload.single('image'))
    formData.append('image', docImg);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('experience', experience);
    formData.append('fees', fees);
    formData.append('about', about);
    formData.append('speciality', speciality);
    formData.append('degree', degree);
    formData.append('address', JSON.stringify({line1: address1, line2: address2}));
  

    //console.log(...formData);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    }
  );

  const{data} = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {headers: {Authorization: `Bearer ${aToken}`}});

  if(data.success){
    toast.success(data.message);
    setDocImg(false);
    setName('');
    setEmail('');
    setPassword('');
    setFees('');
    setAbout('');
    setDegree('');
    setAddress1('');
    setAddress2('');
  } else {
    toast.error(data.message);
  }
  } catch (error) {
    console.error('AddDoctor error:', error);
    // Show server-provided message when available to help debug 400/500 responses
    if (error && error.response && error.response.data) {
      console.error('Server response:', error.response.data);
      const msg = error.response.data.message || error.response.data.error || 'Something went wrong';
      toast.error(msg);
    } else {
      toast.error('Something went wrong');
    }
  }
};



  return (

    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-4 text-lg font-medium">Add Doctor</p>

      <div className="bg-white border rounded px-10 py-8 max-w-6xl">

        {/* Upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-16 h-16 rounded-full bg-gray-100 cursor-pointer"
            />
          </label>
          <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-sm">
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 text-gray-600">

          <div>
            <p className="text-sm mb-1">Doctor name</p>
            <input onChange={(e)=> setName(e.target.value)} value={name} className="input" type="text" placeholder="Name" />
          </div>

          <div>
            <p className="text-sm mb-1">Speciality</p>
            <select onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className="input">
              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatrician</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
          </div>

          <div>
            <p className="text-sm mb-1">Doctor Email</p>
            <input onChange={(e)=> setEmail(e.target.value)} value={email} className="input" type="email" placeholder="Your email" />
          </div>

          <div>
            <p className="text-sm mb-1">Degree</p>
            <input onChange={(e)=> setDegree(e.target.value)} value={degree} className="input" type="text" placeholder="Degree" />
          </div>

          <div>
            <p className="text-sm mb-1">Doctor Password</p>
            <input onChange={(e)=> setPassword(e.target.value)} value={password} className="input" type="password" placeholder="Password" />
          </div>

          <div>
            <p className="text-sm mb-1">Address</p>
            <input onChange={(e)=> setAddress1(e.target.value)} value={address1} className="input mb-2" type="text" placeholder="Address 1" />
            <input onChange={(e)=> setAddress2(e.target.value)} value={address2} className="input" type="text" placeholder="Address 2" />
          </div>

          <div>
            <p className="text-sm mb-1">Experience</p>
            <select onChange={(e)=> setExperience(e.target.value)} className="input">
              <option>Experience</option>
              {[...Array(10)].map((_, i) => (
                <option key={i}>{i + 1} Year</option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-sm mb-1">Fees</p>
            <input onChange={(e)=> setFees(e.target.value)} value={fees} className="input" type="number" placeholder="Your fees" />
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <p className="text-sm mb-1 text-gray-600">About me</p>
          <textarea onChange={(e)=> setAbout(e.target.value)} value={about}
            className="input h-32 resize-none"
            placeholder="write about yourself"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 px-8 py-2 rounded-full bg-primary text-white text-sm hover:bg-indigo-600"
        >
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
