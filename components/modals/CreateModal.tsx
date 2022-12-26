import React, { useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { Menu } from '@headlessui/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

function CreateModal({ showStatus, clubnm, rows, _username }) {
    const [show, setShow] = useState(showStatus)
    const [username, setuser] = useState("");
    const supabase = useSupabaseClient();
    const makeadmin = async () => {
        const { data} = await supabase
            .from('profiles')
            .select("id").eq("username", username).single();

        const { error } = await supabase
            .from('club_admins')
            .insert(
                {
                    clubName: clubnm,
                    user_id: data.id

                }
            )
        if (error) {
            throw error
        }
        alert("Admin Created");

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
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <Menu>
                        <div className='flex flex-col my-5'>
                            <Menu.Button>{clubnm}</Menu.Button>
                            </div>
                            <Menu.Items className='flex flex-col'>
                                {rows}
                            </Menu.Items>
                        </Menu>
                        <input className='my-5' type="text" placeholder='Enter Username'
                            value={username || ""}
                            onChange={e => setuser(e.target.value)} />
                    </div>
                    <button className=' bg-blue-400 rounded-full text-white px-5 my-5' onClick={() => { makeadmin() }}>Create Admin</button>
                </div>
            </div>
        </div>
    )
}

export default CreateModal