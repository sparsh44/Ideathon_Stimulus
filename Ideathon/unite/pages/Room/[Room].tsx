import React from 'react'
import Sidebar from '../../components/Sidebar'
import ChatNavbar from '../../components/ChatNavbar'
import ChatBox from '../../components/ChatBox'
import ChatInput from '../../components/ChatInput'

import { PaperAirplaneIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSupabaseClient, useUser, useSession } from '@supabase/auth-helpers-react'

function Room() {
    const user = useUser()
    const session = useSession();
    const supabase = useSupabaseClient();
    const router = useRouter();
    const [messages, setMessage] = useState([]);
    const [content, usecont] = useState("");
    const [content2, useCont] = useState({});

    useEffect(() => {
        if (!router.isReady) return

        message();

        // console.log(router.query);
        // console.log(user);

    }, [router.isReady])
    const message = async () => {
        let { data, error } = await supabase.from('messages').select("*, profile: profiles(id, username)").eq("room_name", String(router.query.Room));
        if (error) {
            throw error;
        }

        console.log("Why")
        console.log(data);
        var arr = data || [];
        for (var i = 0; i < arr.length; i++) {
            messages.push(arr[i]);
        }

    }

    const InsertMessage = async () => {
        var message = {
            profile_id: user.id,
            content: content,
            room_name: router.query.Room,
        }
        let { error } = await supabase.from('messages').insert([message])
        if (error) {
            throw error
        }




    }
    supabase.channel('public:messages').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {

        console.log(payload);
        console.log("YES")
        setMessage((messages) => [].concat(messages, [payload.new]));



    }).subscribe()
    console.log(messages);

    return (
        <div className=' w-full'>
            <ChatNavbar room={router.query.Room} />
            <div className='flex'>
                <Sidebar />
                <div className='mx-10 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto  pb-10 flex justify-center w-screen'>
                    <ChatBox allMessages={messages} user={user} />
                </div>
            </div>
            <div className=' w-full'>
                <input
                    type="text"
                    value={content || ""}
                    onChange={(e) => { usecont(e.target.value) }}
                    className='flex-1  border-gray-300 focus:outline-none px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    placeholder='Enter message here...'
                />
                <PaperAirplaneIcon className='w-6 h-6' onClick={() => { InsertMessage() }} />
            </div>
        </div>
    )
}

export default Room