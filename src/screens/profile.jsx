import React, { useEffect, useState } from 'react';
import { FaUser, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { AiOutlineCloudSync, AiOutlineUpload } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebase.config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"

function Profile() {
  const [user, setUser] = useState({
    name: "",
    bloodType: "",
    email: "",
    phone: '(123) 456-7890',
    lastDonation: '2023-05-15',
  });
  const [isEditing, setIsEditing] = useState(false);
//   const [profilePic, setProfilePic] = useState(defaultImg);
const navigate = useNavigate()

useEffect(()=>{
  getMyData()
},[])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  const getMyData = async ()=>{
    const list = []
    const dbSnap = await getDocs(collection(db, "users"))
    dbSnap.forEach((item)=>{
      list.push(item.data())
    })
    let myUid = localStorage.getItem("userId");
    const filteredUsers = list.filter(users => users.Uid == myUid);
    setUser(Object.assign({}, filteredUsers[0]))
  }


  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    updateDoc(doc(db, "users", user.Uid), user)
    .then(()=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    })
    .catch((error)=>{
      console.log("��� ~ handleSave ~ error:", error)
    })
    setIsEditing(false);
  };
  

  const handleImageUpload = async (e) => {
      let uri = URL.createObjectURL(e.target.files[0])
      setUser({ ...user, profilePic: uri })
      let timeStamp = Date.now()
      const storageRef = ref(storage, `images/${user?.name}/${timeStamp}`);
      await uploadBytes(storageRef, e.target.files[0])
      let url = await getDownloadURL(storageRef)
      setUser({ ...user, profilePic: url })
      updateDoc(doc(db, "users", user.Uid),{img: url})
  };

  return (
    <div className='bg-slate-800 h-[100vh]'>
      <div className="container mx-auto p-4 max-w-4xl bg-gray-800">
      <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8 bg-gray-800">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative mb-4 sm:mb-0 sm:mr-6">
              <img
                src={user?.img || defaultImg}
                alt="Donor"
                className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
              />
              <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full cursor-pointer">
                <AiOutlineUpload size={20} />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-100">User Details</h2>
            {!isEditing ? (
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center"
              >
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            ) : (
              <div>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mr-2 flex items-center"
                >
                  <FaSave className="mr-2" /> Save
                </button>
                <button
                  onClick={handleEditToggle}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 flex items-center"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
              </div>
            )}
          </div>

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-100">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-100">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-100">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
      </div>
  );
};

export default Profile;