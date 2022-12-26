import React, { useState, useEffect } from 'react'

import { XIcon } from '@heroicons/react/solid'
import OnGoingChat from '../OnGoingChat'

function MessageListModal({ showStatus, _allRooms }) {
    
    const [show, setShow] = useState(showStatus)
    
    const [allRooms, setAllRooms] = useState(_allRooms)
    
    return (
        show &&
        <div className="fixed top-0 flex items-center justify-center p-10 left-0 right-0 bottom-0 bg-opacity-25 bg-black z-50 overflow-x-hidden overflow-y-auto">
            <div className="bg-white p-10 rounded-lg w-1/2 z-50 relative overflow-y-scroll h-full">
                <div className="flex w-full justify-end">
                    <div
                        className="bg-slate-100 p-3 hover:bg-slate-200 transition-all cursor-pointer"
                        onClick={() => setShow(false)}
                    >
                        <XIcon className="h-4 w-4 text-slate-500" />
                    </div>
                </div>
                <div>
                    <OnGoingChat allRooms={allRooms} />
                </div>
            </div>
        </div>
    )
}

export default MessageListModal