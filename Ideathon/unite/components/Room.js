import { ChevronUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import CommunityData from '../assets/CommunityData'
import CommunityAvatar from './CommunityAvatar'
import MyAvatar from './MyAvatar'
import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

function GroupSidebar(props) {

    var allRooms = props.allRooms || [];
    var rows = [];
    const map1 = new Map(
        allRooms.map(mp => {
            return [mp.clubName, true];
        }),
    );

    allRooms.forEach(room => {
        rows.push(
            <div>
                <div className='flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b justify-between'>
                    <div className='flex'>
                        <div>
                            <MyAvatar />
                        </div>
                        <Link href={`/Room/${room.roomName}`}
                            className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-blue-50 hover:text-gray-700 font-bold"
                        >
                            {room.roomName}
                        </Link>
                    </div>
                    <button className='cursor-pointer rounded-full bg-blue-500 px-3 text-white'>Join</button>
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