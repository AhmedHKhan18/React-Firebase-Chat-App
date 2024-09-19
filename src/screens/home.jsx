import { useEffect, useState } from "react";
import Chat from "./chat";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Drop from '../dropdown'

const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"


function Home() {
  const [user, setUser]= useState()
  const [users, setUsers]= useState([])
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch]= useState()
  const {state} = useLocation()
    
    const navigate = useNavigate()
    useEffect(()=>{
      const storedUser = localStorage.getItem('selectedUser');
    if (storedUser) {
      setSelectedUser(storedUser);
    }
    getUsers()
},[state])


const handleUserClick = (users) => {
  setSelectedUser(users);
  localStorage.setItem('selectedUser', users.Uid);
};
function onUserClick(users){
 handleUserClick(users)
 
    }


const getUsers = async ()=>{
    const list = []
    const dbSnap = await getDocs(collection(db, "users"))
    dbSnap.forEach((item)=>{
      list.push(item.data())
    })
    let myUid = localStorage.getItem("userId");
    const filteredUsers = list.filter(users => users.Uid !== myUid);
    setUsers(filteredUsers)
    setUser(filteredUsers)
  }
  
  function handlesearch(){
    let arry = users.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    setUser(arry)
  }
    return (
        <div className="h-screen flex bg-gray-800">
      {/* User List Sidebar */}

            <div className="sm:w-1/3 bg-slate-950 border-r w-screen overflow-y-auto border-black p-4">
            <div className="flex justify-between">
      <h2 className="text-xl text-white font-bold mb-4">Chat App</h2>
      <Drop/>
      </div>
      <hr/>
      <img src="https://static-00.iconduck.com/assets.00/search-icon-1024x1024-hd1pcvqu.png" className="h-6 absolute my-4 mx-2" onClick={handlesearch}/>
      <input type="text" className="flex-1 border text-white rounded-3xl bg-gray-800 py-2 px-10 w-full my-2" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>      
          <ul>
        {users.length > 0 ? (user.map((users, index) => (
          <div
          onClick={()=>{onUserClick(users); navigate('/home', {replace: true,state: {...users}})}}
          key={index}
            className={`mb-4 flex items-center p-2 cursor-pointer hover:bg-blue-100 bg-green-600 text-xl font-semibold rounded-lg ${selectedUser === users.uid ? 'active' : ''}`}
          >
            <img src={users.img || defaultImg} alt={users.name} className="h-10 w-10 rounded-full mr-2" />
            <div>
                <h2 className="uppercase">{users.name}</h2>
            <h2 className="text-sm">{users.email}</h2>
            </div>
            </div>) ))
            : (
              <p className='text-3xl text-center font-semibold text-white'>No other users available</p>
            )
         } 
      </ul>
    </div>
      {/* Chat Section */}
     {state === null ? <div className="sm:flex-1 sm:bg-slate-800 sm:flex sm:flex-col sm:justify-between hidden">
  </div>:
      <Chat/>
      }
    </div>

    )
    
  }

export default Home;