import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doctorsCreateThunk } from '../redux/doctor/doctorSlice';
import { getUser } from '../redux/auth/authSlice';

const AddDoctor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [rate, setRate] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [image, setImage] = useState('');
  const [hospital, setHospital] = useState('');

  const user = useSelector(getUser);
  
  useEffect(() => {
    if (!user) navigate('/auth');
  }, [user]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('doctor[name]', name);
    formData.append('doctor[image]', image);
    formData.append('doctor[specialization]', specialization);
    formData.append('doctor[bio]', bio);
    formData.append('doctor[rate]', rate);
    formData.append('doctor[hospital]', hospital);

    if (name !== '' && image !== '' && specialization !== '' && bio !== '' && rate !== '' && hospital !== '') {
      Promise.resolve(dispatch(doctorsCreateThunk(formData))).then(() => {
        setName('');
        setImage('');
        setSpecialization('');
        setBio('');
        setRate('');
        setHospital('');        
      });
    }
  };

  return (
    <div className="w-screen bg-color-green">
      <div className="flex flex-col ">
        <h3 className="flex items-center mx-auto my-10 text-white font-bold text-3xl">Add Doctor</h3>
        <form onSubmit={(e) => { handleSubmit(e); }} encType="multipart/form-data" className="mx-auto">
          <div className="flex flex-col ">
            <div className="mb-4">
              <label htmlFor="name" className="flex font-semibold dark:text-white">Doctor Name</label>
              <input
                type="text"
                id="name"
                className="flex text-sm rounded-lg p-2.5 "
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="images" className="mb-1 flex font-semibold dark:text-white">Photo</label>
              <input
                ref={fileInputRef}
                className="relative m-0 block w-full min-w-0 flex-auto
                          bg-clip-padding px-2 py-[0.3rem] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.55rem]
                          file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit
                          file:px-2 file:py-[0.3rem] file:transition file:duration-150 file:ease-in-out
                          file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]
                          hover:file:bg-neutral-400 focus:border-primary focus:shadow-te-primary focus:outline-none
                          dark:border-neutral-600 dark:text-neutral-300 dark:file:bg-neutral-700 dark:file:text-neutral-100
                          dark:focus:border-primary text-sm rounded-lg"
                type="file"
                id="image"
                style={{
                  backgroundColor: 'white',
                  fontSize: '14px',
                }}
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="specialization" className="flex font-semibold dark:text-white">Specialization</label>
              <input
                type="text"
                id="specialization"
                className="flex text-sm rounded-lg p-2.5"
                placeholder="Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="bio" className="flex font-semibold dark:text-white">Bio</label>
              <input
                type="text"
                id="bio"
                className="flex text-sm rounded-lg p-2.5"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="rate" className="flex font-semibold dark:text-white">Rate</label>
              <input
                type="text"
                id="rate"
                className="flex text-sm rounded-lg p-2.5"
                placeholder="Rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="hospital" className="flex font-semibold dark:text-white">Hospital</label>
              <input
                type="text"
                id="hospital"
                className="flex text-sm rounded-lg p-2.5"
                placeholder="Hospital"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="flex mx-11 bg-white font-bold text-color-green hover:bg-color-green hover:text-white hover:border px-5  p-2 rounded-full">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;