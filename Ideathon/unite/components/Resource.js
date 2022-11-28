import { DocumentIcon, MusicNoteIcon, PaperClipIcon, PhotographIcon, SearchIcon, UploadIcon, VideoCameraIcon, ViewListIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import Modal from './modals/Modal'

function Resource() {
    const [showModal, setShowModal] = useState(false);
    const [resource, setResource] = useState("");

    return (
        <div>
            <Modal show={showModal} setShow={setShowModal} />
            <div className='flex flex-col items-center space-x-2 border-t bg-white px-4 space-y-4 py-5 last:rounded-b justify-between'>
                <div className='cursor-pointer border-4 rounded-full border-red-500  bg-red-400 px-5 text-white w-full h-10 flex justify-between' onClick={() => setShowModal(true)} >
                    <h1 className='mt-1 font-bold flex'><SearchIcon className='h-6 w-6 mr-2 ' /> View Resources</h1>
                </div>
                <div className='cursor-pointer border-4 rounded-full border-blue-500 bg-blue-400 px-5 text-white w-full h-10 flex justify-between' onClick={() => setShowModal(true)} >
                    <h1 className='mt-1 font-bold flex'><UploadIcon className='h-6 w-6 mr-2 ' /> Upload Resources</h1>
                </div>
            </div>
        </div>
    )
}

export default Resource