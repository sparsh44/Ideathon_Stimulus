import { ChevronUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import CommunityData from '../assets/CommunityData'
import MyAvatar from './MyAvatar'

function Community() {
    return (
        <div>
            {
                CommunityData.map((e) => {
                    return (
                        <div className='flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b'>
                            <p>{e.id}</p>
                            <ChevronUpIcon className='h-4 w-4 flex-shrink-0 text-green-400' />
                            <MyAvatar />
                            <p className='flex-1 truncate'>c/{e.title}</p>
                            <Link href="#">
                                <div className='cursor-pointer rounded-full bg-blue-500 px-3 text-white'>Join</div>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Community