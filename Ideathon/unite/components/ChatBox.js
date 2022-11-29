import React from 'react'
import ChatInput from './ChatInput'


function ChatBox(props) {
    const chats = props.allMessages;
    var rows = [];
    var arr = chats || [];
    arr.forEach(chat => {
        rows.push(
            <div>{chat.profile_id===props.user.id?(<div className='m-2 flex-1 bg-blue-50 outline-none p-2'>
                {chat.content}
                {
                    chat.profile.username
                }
            </div>):(<div >
                {chat.content}
                {
                    chat.profile.username
                }
            </div>)}
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

export default ChatBox