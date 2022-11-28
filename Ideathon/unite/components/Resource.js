import { DocumentIcon, MusicNoteIcon, PaperClipIcon, PhotographIcon, VideoCameraIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import Modal from './modals/Modal'

function Resource() {
    const [showModal, setShowModal] = useState(false);
    const [resource, setResource] = useState("");

    return (
        <div className='flex flex-col items-center space-x-2 border-t bg-white px-4 space-y-4 py-5 last:rounded-b justify-between'>
            <Modal show={showModal} setShow={setShowModal} />
            <div className='cursor-pointer border-4 rounded-full border-red-500  bg-red-400 px-5 text-white w-full h-10 flex justify-between' onClick={() => setShowModal(true)} >
                <h1 className='mt-1 font-bold flex'><MusicNoteIcon className='h-6 w-6 mr-1 ' /> Audios</h1>
                <h1 className='mt-1'>69</h1>
            </div>
            <div className='cursor-pointer border-4 rounded-full border-blue-500 bg-blue-400 px-5 text-white w-full h-10 flex justify-between' onClick={() => setShowModal(true)} >
                <h1 className='mt-1 font-bold flex'><PhotographIcon className='h-6 w-6 mr-1 ' /> Images</h1>
                <h1 className='mt-1'>69</h1>
            </div>
            <div className='cursor-pointer border-4 rounded-full border-green-500 bg-green-400 px-5 text-white w-full h-10 flex justify-between' onClick={() => setShowModal(true)} >
                <h1 className='mt-1 font-bold flex'><VideoCameraIcon className='h-6 w-6 mr-1 ' /> Videos</h1>
                <h1 className='mt-1'>69</h1>
            </div>
            <div className='cursor-pointer border-4 rounded-full border-yellow-500 bg-yellow-400 px-5 text-white w-full h-10 flex justify-between' onClick={() => setShowModal(true)} >
                <h1 className='mt-1 font-bold flex'><DocumentIcon className='h-6 w-6 mr-1 ' /> Documents</h1>
                <h1 className='mt-1'>69</h1>
            </div>
            <div className='cursor-pointer border-4 rounded-full border-purple-500 bg-purple-400 px-5 text-white w-full h-10 flex justify-between' onClick={() => setShowModal(true)} >
                <h1 className='mt-1 font-bold flex'><PaperClipIcon className='h-6 w-6 mr-1' /> Links</h1>
                <h1 className='mt-1'>69</h1>
            </div>
        </div>
    )
}

export default Resource