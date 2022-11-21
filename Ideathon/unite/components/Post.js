import React from 'react'
import PostData from '../assets/PostData'
import MyAvatar from './MyAvatar'
import TimeAgo from 'react-timeago'
import { ChatAltIcon, DotsHorizontalIcon, PaperAirplaneIcon, ShareIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/outline'
import PostAvatar from './PostAvatar'

function Post(props) {
    return (
        <div className='flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border-gray-400'>
            <div className='p-3 pb-1'>
                <div className='flex items-center space-x-2'>
                    <MyAvatar avatar_url="" />
                    <p className='text-xc text-gray-400'>
                        <span className='font-bold text-black hover:text-blue-400 hover:underline'>c/{props.post.community}</span> · Posted by {props.post.user} 55min ago
                    </p>
                </div>
                <div className='py-4'>
                    <h2 className='text-xl font-semibold'>{props.post.title}</h2>
                    <p className='mt-2 text-sm font-light'>{props.post.body}</p>
                </div>
                <img className='w-full' src={props.post.image} alt={props.post.title} />
                <div className='flex space-x-4 text-gray-400 justify-between'>
                    <div className='flex'>
                        <div className='postButtons'>
                            <HeartIcon className='h-6 w-6' />
                            <p className='hidden sm:inline'>{props.post.likes} Likes</p>
                        </div>
                        <div className='postButtons'>
                            <ChatAltIcon className='h-6 w-6' />
                            <p className='hidden sm:inline'>{props.post.comment.length} Comments</p>
                        </div>
                        <div className='postButtons'>
                            <ShareIcon className='h-6 w-6' />
                            <p className='hidden sm:inline'>{props.post.comment.likes} Share</p>
                        </div>
                    </div>
                    <div className='postButtons'>
                        <DotsHorizontalIcon className='h-6 w-6' />
                        <p className='hidden sm:inline'>{props.post.comment.likes} More</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post