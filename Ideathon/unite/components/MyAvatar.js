import React from 'react'
import Image from 'next/image'

function MyAvatar(props) {
    return (
        <div className='relative h-10 w-10 rounded-full border-gray-300 bg-white'>
            <Image 
                layout='fill'
                className=' rounded-full'
                src={`https://hawkhcsdahiaxlsytwfd.supabase.co/storage/v1/object/public/avatars/${props.avatar_url}`}
            />
        </div>
    )
}

export default MyAvatar