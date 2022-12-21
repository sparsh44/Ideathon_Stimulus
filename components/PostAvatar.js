import React from 'react'

function postAvatar(props) {
    return (
        <div className='relative h-10 w-10 rounded-full border-gray-300 bg-white'>
            <Image
                layout='fill'
                className=' rounded-full'
                src={props.avatar_url}
            />
        </div>
    )
}

export default postAvatar