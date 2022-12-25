import React, { useState, useEffect } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import OnGoingChat from '../OnGoingChat'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

function MessageListModal({ showStatus, _allRooms }) {
    const supabase = useSupabaseClient();
    const [show, setShow] = useState(showStatus)
    const user = useUser();
    const [allRooms, setAllRooms] = useState([])
    useEffect(() => {
        getRooms()
    })

    async function getRooms() {

        let { data, error, status } = await supabase
            .from('joined_rooms')
            .select(`roomName`)
            .eq('user_id', user.id)

        if (error && status !== 406) {
            throw error
        }

        if (data) {
            setAllRooms(data)
            console.log("Room Name fetched")

        }
    }
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