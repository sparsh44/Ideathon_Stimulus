import React from 'react'
import ChatInput from './ChatInput'
import Image from 'next/image';
import MyAvatar from './MyAvatar';
import moment from 'moment';

function ChatBox(props) {
    const chats = props.messages;
    var rows = [];
    var arr = chats || [];
    arr.forEach(chat => {
        rows.push(
            (chat.profile_id === props.user) ? (
                <div className='flex w-fit ml-auto my-3'>
                    <div className='flex-shrink-0 order-2 mx-2'>
                        <MyAvatar avatar_url={chat.avatar_url} />
                    </div>
                    <div>
                        <p className='text-[0.65rem] px-[2px] pb-[2px] text-blue-400'>{chat.username}</p>
                        <div className=' items-end order-2'>
                            <div className='px-3 py-2 rounded-lg w-fit text-white bg-blue-400 ml-auto order-2'>
                                <p className='break-words'>{chat.content}</p>
                            </div>
                            <p className='text-[0.65rem] italic  px-[2px] pb-[2px] text-gray-400'>{moment(new Date(chat.created_at)).fromNow()}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex w-fit my-5'>
                    <div className='flex-shrink-0'>
                        <MyAvatar avatar_url={chat.avatar_url} />
                    </div>
                    <div className='w-1/2 flex flex-wrap'>
                        <p className='text-[0.65rem] px-[2px] pb-[2px] text-red-400 mt-0'>{chat.username}</p>
                        <div className=' items-end'>
                            <div className='px-3 py-2 rounded-lg w-fit text-white bg-red-400'>
                                <p className='break-all'>{chat.content}</p>
                            </div>
                            <p className='text-[0.65rem] italic  px-[2px] pb-[2px] text-gray-400 mx-auto order-2'>{moment(new Date(chat.created_at)).fromNow()}</p>
                        </div>
                    </div>
                </div>)






        )
    });
    return (
        <div className=' w-full'>
            {rows}
        </div>


    )
}

export default ChatBox
