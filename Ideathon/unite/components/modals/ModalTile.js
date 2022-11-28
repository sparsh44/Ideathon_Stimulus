import React from 'react'

const ModalTile = (props) => {
    return (
        <div className='flex justify-between border-2 px-5 py-1 my-1'>
            <div className=' w-3/5'>
                <p className='text-gray-500 font-bold break-normal'>{props.title}</p>
            </div>
            <div className=' w-3/5'>
                <p className='text-sm text-gray-400 italic break-normal'>Added By: {props.by} {props.timeCreated}</p>
            </div>
            <p className=' text-sm cursor-pointer text-blue-500'><a href={props.link}>open</a></p>
        </div>

    )
}

export default ModalTile