import React from 'react'
import Image from 'next/image'

function CommunityAvatar(props) {
    return (
        <div className='relative h-20 w-20 rounded-full border-gray-300 bg-white'>
            {props.avatar_url ?
                (<Image
                    layout='fill'
                    className=' rounded-full'
                    src={`https://hawkhcsdahiaxlsytwfd.supabase.co/storage/v1/object/public/avatars/${props.avatar_url}`}
                />) : (
                    <Image
                        layout='fill'
                        className=' rounded-full'
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    />
                )}
        </div>
    )
}

export default CommunityAvatar