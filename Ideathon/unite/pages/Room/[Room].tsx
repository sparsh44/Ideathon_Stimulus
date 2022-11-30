import React from 'react'
import Sidebar from '../../components/Sidebar'
import ChatNavbar from '../../components/ChatNavbar'
import ChatBox from '../../components/ChatBox'
import ChatInput from '../../components/ChatInput'

import { PaperAirplaneIcon } from '@heroicons/react/solid'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSupabaseClient,useUser,useSession } from '@supabase/auth-helpers-react'

function Room() {
    const user = useUser()
    const session = useSession();
    const supabase = useSupabaseClient();
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const [messages, setMessage] = useState([]);
    const [content, usecont] = useState("");
    const [username, setUsername] = useState(null)
    const [full_name, setfullname] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const [userId, setUserId] = useState(null)
    useEffect(()=>{
        if(!router.isReady) return
    
        message();
        getProfile();
     
        // console.log(router.query);
        // console.log(user);
        
    },[router.isReady])
    
    async function getProfile() {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`id, username, avatar_url,full_name`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setAvatarUrl(data.avatar_url)
                setfullname(data.full_name)
                setUserId(data.id)
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const message=async()=>{
        let {data,error}=await supabase.from('messages').select("*").eq("room_name",String(router.query.Room));
        if(error){
            throw error;
        }
      
        console.log("Why")
        console.log(data);
        var arr=data||[];
   
        setMessage(arr);

    } 

    const InsertMessage=async()=>{
        var message={
            profile_id:user.id,
            content:content,
            room_name:router.query.Room,
            avatar_url:avatar_url,
            username:username
        }
        let {error}=await supabase.from('messages').insert([message])
       if(error) {
        throw error
       }
     
      
    
   
    }
    supabase.channel('public:messages').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
       
        console.log(payload);


        console.log("YES")
       setMessage((messages)=>[].concat(messages,[payload.new]));
     
        

}).subscribe()
console.log(messages);


    
   


    

    return (
        <div>
        <div className=' w-full'>
            <ChatNavbar room={router.query.Room} />
            <div className='flex'>
                <div className='mx-0 md:mx-10 mt-20 mb-10 pb-10 flex justify-center w-screen'>
                    <ChatBox messages={messages} user={userId} />
                </div>
            </div>
            <div className=' w-screen flex bottom-0 absolute'>
                <input
                    type="text"
                    value={content || ""}
                    onChange={(e) => { usecont(e.target.value) }}
                    className='flex-1  border-gray-300 focus:outline-none px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    placeholder='Enter message here...'
                />
                <div className=' bg-blue-500 hover:bg-blue-600 cursor-pointer '>
                    <PaperAirplaneIcon className='w-8 h-8 text-white mx-5 my-2' onClick={() => { InsertMessage() }} />
                </div>
            </div>
        </div>
    </div>
    )
}

export default Room
