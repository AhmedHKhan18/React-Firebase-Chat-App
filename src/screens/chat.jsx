import { addDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.config';
import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { IoMdSend } from "react-icons/io";
import { useLocation } from 'react-router-dom';


const Chat = () => {
  const [message, setMessage] = useState('')
  const [chatlist, setChatlist] = useState([])
  const { state } = useLocation()

  useEffect(()=>{
    try{
        let myUid = localStorage.getItem("userId");
        const q = query(collection(db, "Chat"), where(state.Uid, "==", true), where(myUid, "==", true));
        const unsubscribe = onSnapshot(q, (docSnap) => {
      const list = [];
      docSnap.forEach((doc) => {
          list.push(doc.data());
        });
        list.sort((a, b) => a.createdAt - b.createdAt);
        setChatlist(list);
      });
      return ()=> unsubscribe()
    }
    catch(err){
      console.log(err)
    }
  },[state])
  
  const sendMsg = async ()=>{
    let myUid = await localStorage.getItem("userId");
    addDoc(collection(db, "Chat"), {
      message: message,
      [myUid]: true,
      [state.Uid]: true,
      senderUid: myUid,
      createdAt: Date.now(),
    })
    setMessage("")
  }
  
  let myUid = localStorage.getItem("userId");
    return (
    <div className="flex-1 bg-slate-800 flex flex-col justify-between">
        <div>
        <div className='h-14 bg-green-600 flex items-center px-4 mb-2 text-white'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" className="h-10 w-10 rounded-full mr-2" />
        <div>
            <h2 className='font-semibold text-xl uppercase'>{state.name}</h2>
            <h2 className="text-sm">{state.email}</h2>
        </div>
        </div>
      {/* Chat messages */}
            <div>
              <div className='overflow-y-auto h-[79vh]'>
          {chatlist.length > 0 ? (chatlist.map((item, index) => {
            return (
                <div className={`mb-4 w-auto flex ${item.senderUid == myUid ? 'justify-end': 'justify-start'}`}>
          <div key={index} className={` bg-blue-500 text-white p-2 rounded-lg w-auto mx-2 mb-2 flex flex-col ${item.senderUid == myUid ? 'justify-end': 'justify-start bg-gray-600 text-black'}`}>
            <h2 className='text-xl'>{item.message}</h2>
            <h3 className='text-sm'>{moment(item.createdAt).startOf('seconds').fromNow()}</h3>
        </div>
       </div>
      )
    })):(<p className='text-3xl text-center font-semibold text-white'>No chats...</p>)
  }
  </div>
        </div>
      </div>

      {/* Message input */}
      <div className="mt-1 p-4">
        <div className="flex">
          <input
          value={message}
          onChange={e=>setMessage(e.target.value)}
            type="text"
            className="flex-1 border rounded-lg p-2"
            placeholder="Type a message..."
          />
          <button onClick={sendMsg} className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2">
          <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
