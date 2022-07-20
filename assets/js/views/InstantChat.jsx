import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Alert  } from "@material-tailwind/react";
import {FaSpinner, FaUserCircle} from "react-icons/fa";
import {post, postGraphql} from "../utils";
import {MdSend} from "react-icons/md";

function LoginForm({onSuccess}=props){
    const [username, setUsername] = useState('user1@gmail.com');
    const [password, setPassword] = useState('12345678');
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);

    //useEffect(()=>{login()},[]);

    const login = async function () {
        setLoading(true);
        setFailed(false);
        try {
            let data = await post('/api/login', {username,password});
            if(onSuccess)onSuccess(data);
        }catch (response) {
            setFailed(true);
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/30 shadow flex items-center justify-center">
            <div className="w-1/3 p-10 bg-white space-y-5">
                <Input label="Username" placeholder="Username" value={username} onInput={(e)=>{setUsername(e.target.value)}}/>
                <Input label="Password" type="password" placeholder="Password" value={password} onInput={(e)=>{setPassword(e.target.value)}}/>
                <Button onClick={()=>login()}>Log in {loading && <FaSpinner className="inline-block text-white animate-spin"/>}</Button>
                {failed && <Alert color="red">Username or password not valid !</Alert>}
            </div>
        </div>
    );
}

export default function ({name} = props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [messageText, setMessageText] = useState();
    const [threads, setThreads] = useState([]);
    const [thread, setThread] = useState();
    const [friend, setFriend] = useState();
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const inputRef = useRef(null);

    const loadThreads = async function(){
        setLoading(true);
        try {
            let data = await postGraphql('/api/graphql', `
{
   user(id: "/api/users/${user.id}"){
    _id
    id
    fullName
    email
   }
   users{
    _id
    id
    fullName
    email
  }
  collectionQueryThreads{
    _id
    id
    subject
    participants{
        _id
        id
        fullName
    }
    messages{
        _id
        id
        content
        createdAt
        sender{
            _id
            id
            fullName
        }
        thread{
            _id
            id
        }
        metadata{
            _id
            id
            readAt
            user{
                _id
                id
                fullName
            }
        }
    }
  }
}
            `, user.apiToken)
            setUsers(data.data.users)

            let currentUser = data.data.user

            //setUser({...currentUser})


            let list = data.data.collectionQueryThreads

            let threadMap = {
            }
            for (let t of list){
                threadMap[getOtherParticipant(t, user?.id)?._id] = t;
            }


            for(let u of data.data.users){
                if(!threadMap[u._id] && currentUser._id!==u._id){
                    list.push({
                        subject: "",
                        id: null,
                        participants:[
                            currentUser,
                            u
                        ],
                        messages:[]
                    })
                }
            }

            console.log(list)



            if(!thread) setThreads(list)
            else{
                let t = list.find((t)=> t.id===thread.id)
                setThread(t)
                setThreads(list)
                if(inputRef.current){
                    inputRef.current.focus()
                }
            }
        }catch (response) {

        }finally {
            setLoading(false);
        }
    };

    const sendMessage = async function(){
        if(sending)return;

        setSending(true);

        let createdThread = null;

        if(!thread.id){
            try {
                let data = await postGraphql('/api/graphql', `
mutation{
  createThread(input:{
      subject:"${messageText}",
      participants:[${thread.participants.map(u=>"\""+ u.id +"\"").join(",")}],
      messages:[],
    }){
    clientMutationId
    thread{
      _id
      id
      subject
    }
  }
}
            `, user.apiToken);
                createdThread = data.data.createThread.thread
            }catch (response) {

            }finally {

            }
        }

        try {
            //createMessage
            let data = await postGraphql('/api/graphql', `
mutation{
  createMessage(input:{
      content:"${messageText}",
      createdAt:"${new Date().toISOString()}",
      thread:"${createdThread?.id || thread.id}",
      sender: "/api/users/${user.id}"
    }){
    clientMutationId
    message{
      id
      createdAt
      content
    }
  }
}
            `, user.apiToken);
            //setThreads(data.data.collectionQueryThreads);
            setSending(false);
            setMessageText("");
            if(createdThread)thread.id = createdThread.id
            if(!data.errors) loadThreads();
            else alert(JSON.stringify(data.errors))
        }catch (response) {

        }finally {
            setLoading(false);
        }
    };

    const getOtherParticipant = function (thread, userId){
        return thread.participants.find((p)=> p._id!==userId)
    };

    const countUnseenMessages = function (thread, userId){
        /*return thread.messages.filter((message)=>{
            message.metadata.filter((metadata)=>metadata.user._id === userId )
        }).length;
        //find((p)=> p._id!==userId)*/
    };


    useEffect(()=>{
        if(loggedIn) loadThreads()
    }, [loggedIn]);

    useEffect(()=>{
        if(thread){
            let p = thread.participants.find((p)=> p._id!==user.id)
            setFriend(p)
        }
    }, [thread]);

    return (
        <div className="w-screen h-screen pt-10">
            <div className="absolute top-0 w-screen h-10 shadow bg-gray-100 text-black font-bold flex items-center justify-between px-10">
                <div>{friend?.fullName || 'Instant-Chat'}</div>
                {user && <div className="flex items-center cursor-pointer" title="Log out" onClick={()=>{setLoggedIn(false); setUser(null)}}><FaUserCircle className="mr-1 inline-block text-xl"/>{user.fullName}</div>}
            </div>
            {user && <div className="h-full w-full">

                <div className="w-1/4 inline-block  align-top h-full border-r border-grey-300">
                    {threads.map((thread, index)=>(
                        <div onClick={()=>setThread(thread)} key={thread.id|| `${index}`} className={`px-5 py-2 hover:bg-blue-300/20 rounded cursor-pointer text-black ${thread.id?'': 'text-grey-500'}`}>{getOtherParticipant(thread,user.id)?.fullName}</div>
                    ))}
                </div>
                <div className="w-3/4 inline-block align-top h-full pb-10">
                    <div className={`h-full max-h-full w-full overflow-y-scroll custom-scrollbar custom-scrollbar-black px-10`}>
                        {thread && thread.messages.map((message,index)=>(
                            <div key={message.id} className={`${message.sender._id===user.id? 'text-left' : 'text-right'}`}>
                                <div className={`inline-block px-5 py-3 rounded-lg bg-grey-50 shadow my-5 ${message.sender._id===user.id? '' : 'bg-blue-50'}`}>
                                    <div>{message.content}</div>
                                    <div className="text-grey-500 pt-1 text-xs border-t border-grey-200 flex items-center justify-between">
                                        <span>{message.createdAt}</span>
                                        <span><FaUserCircle className="mr-1 inline-block"/>{message.sender.fullName}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {thread && !thread.messages.length && <div className="text-grey-500 h-full flex items-center justify-center">No message !</div>}
                    </div>
                    {thread && <div className={`h-10 -mb-10 bg-grey-300 shadow flex items-center space-x-10 px-5 pr-20 py-2`}>
                        <input ref={inputRef} value={messageText} onInput={(e)=>setMessageText(e.target.value)}  type="text" className="h-full rounded flex-grow px-5 caret-primary py-2 focus:ring ring-primary focus:outline-none"/>
                        <div onClick={()=>sendMessage()} className="cursor-pointer h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                            {!sending ? <MdSend className="inline-block text-white"/> : <FaSpinner className="inline-block text-white animate-spin"/>}
                        </div>
                    </div>}
                </div>
            </div>}
            {!user && <LoginForm onSuccess={(data)=>{setUser(data); setLoggedIn(true)}}/>}
        </div>

    );
}