import { ChevronUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import CommunityData from '../assets/CommunityData'
import CommunityAvatar from './CommunityAvatar'
import MyAvatar from './MyAvatar'
import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import RoomData from '../assets/RoomData'

function GroupSidebar(props) {
    const router = useRouter();
    const supabase = useSupabaseClient()
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)
    const joinClub = async (e) => {
        try {
            setLoading(true)
            let { error } = await supabase.from('joined_clubs').insert(
                {
                    user_id: props.user.id,
                    clubName: e
                }
            )
            if (error) throw error
            alert(`You have joined ${e}!`)

        } catch (error) {
            alert('Error!')
            console.log(error)
        } finally {
            router.push(`/Community/${e}`)
            setLoading(false)
        }
    }
    const arrJoinedClubs = props.joinedClubs || []
    console.log(arrJoinedClubs)
    const map1 = new Map(
        arrJoinedClubs.map(mp => {
            return [mp.clubName, true];
        }),
    );

    const clubNames = props.clubName;

    var rows = [];
    var arr = clubNames || [];
    // console.log(clubNames);
    arr.forEach(club => {
        rows.push(<div>
            <div className='flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b justify-between'>
                <div className='flex'>
                    <MyAvatar />
                    <Link href={`/Community/${club.clubName}`}
                        className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-blue-50 hover:text-gray-700 font-bold"
                    >
                        {club.clubName}
                    </Link>
                </div>

            </div>
        </div>)

    });
    return (
        <div>
            <div className="p-2">
                {
                    RoomData.map((e) => {
                        return (
                            <div>
                                <div className='flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b justify-between'>
                                    <div className='flex'>
                                        <div>
                                            <MyAvatar />
                                        </div>
                                        <Link href={`/Room/${e.name}`}
                                            className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-blue-50 hover:text-gray-700 font-bold"
                                        >
                                            {e.name}
                                        </Link>
                                    </div>
                                    <button className='cursor-pointer rounded-full bg-blue-500 px-3 text-white'>Join</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GroupSidebar