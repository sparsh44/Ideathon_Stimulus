import React from 'react'
import { RefreshIcon } from '@heroicons/react/outline'
import PostData from '../assets/PostData'
import Post from './Post'

function Feed() {
    return (
        <div className='mt-5 space-y-4'>
            {
                PostData.map((e) => {
                    return (
                        <Post post={e}/>
                    )
                })
            }
        </div>
    )
}

export default Feed