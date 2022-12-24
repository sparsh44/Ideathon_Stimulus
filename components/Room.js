import { ChevronUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import CommunityData from '../assets/CommunityData'
import CommunityAvatar from './CommunityAvatar'
import MyAvatar from './MyAvatar'
import { useState } from 'react'
import { useSupabaseClient,useUser,useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

function GroupSidebar(props) {
    const router=useRouter();

    const supabase=useSupabaseClient();
    console.log("Props");
    console.log(props);
    const [loading, setLoading] = useState(true) 
    var allRooms = props.allRooms || [];
    var joinedRooms=props.joinedRooms||[];
    var rows = [];
    console.log("...................................")
    console.log(joinedRooms);

    const map1 = new Map(
        joinedRooms.map(mp => {
            return [mp.roomName, true];
        }),
    );
    const joinRoom=async(roomname)=>{
        try{
            setLoading(true)
        let{error}=await supabase.from("joined_rooms").insert({
            roomName:roomname,
            user_id:props.user.id
        });
        if(error){
            throw error;
        }
        alert(`You have joined ${roomname}!`)
        router.push(`/Room/${roomname}`)
    } catch(error){
        alert("Error")
        console.log(error)
    } finally{
        setLoading(false)
        
    }
    }

    allRooms.forEach(room => {
        rows.push(
            <div>
                <div className='flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b justify-between'>
                    <div className='flex'>
                        <div>
                            <MyAvatar />
                        </div>
                        <div className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-blue-50 hover:text-gray-700 font-bold">
                            {room.roomName}
                        </div>
                    </div>
                    {map1.get(room.roomName) ? ( <Link href={`/Room/${room.roomName}`}
                        ><button className='cursor-pointer rounded-full bg-gray-400 px-3 text-white'>Chat</button></Link>) : (<button className='cursor-pointer rounded-full bg-blue-500 px-3 text-white' onClick={() => joinRoom(room.roomName)} >Join</button>)}
                </div>
            </div>
        )
    });
    return (
        <div>
            <div className="p-2">
                {rows}
            </div>
        </div>
    )
}

export default GroupSidebar