import React from 'react'
import { SearchIcon } from "@heroicons/react/outline"

function Widget() {
    return (
        <div className='mt-2 mr-5 px-2 col-span-2 hidden lg:inline'>
            <div className='mt-2 flex items-center space-x-2 rounded-full bg-gray-100 p-3'>
                <SearchIcon className='h-5 w-5 text-gray-400 ' />
                <input type="text" placeholder="Search Unite" className="flex-1 bg-transparent outline-none" />
            </div>
        </div>
    )
}

export default Widget