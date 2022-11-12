import Head from 'next/head'
import Image from 'next/image'
// import styles from '../../styles/Home.module.css'
import { BellIcon, ChatIcon, GlobeIcon, MenuIcon, PlusIcon, SearchIcon, SparklesIcon, SpeakerphoneIcon, StarIcon, VideoCameraIcon } from '@heroicons/react/outline'
import { BeakerIcon, ChevronDownIcon, HomeIcon } from '@heroicons/react/solid'
import CompanyLogo from '../../assets/unite.png'


export default function HomePage() {
    return (
        <div className="flex bg-white px-4 top-0 shadow-sm items-center">
            <div className='relative h-20 w-40 py-1 flex-shrink-0 cursor-pointer'>
                <Image
                    objectFit="contain"
                    src={CompanyLogo}
                    alt={'Company Logo'} />
            </div>
            <div className="mx-7 flex item-center items-center xl:min-w-[300px]">
                <HomeIcon className="h-6 w-6" />
                <p className='ml-2 hidden flex-1 lg:inline'>Home</p>
                <ChevronDownIcon className="h-6 w-6" />
            </div>
            <form className="flex flex-1 items-center space-x-2 border-gray-200 bg-gray-100 px-3 py-1 border rounded-sm">
                <SearchIcon className="h-6 w-6 text-gray-400" />
                <input className="flex-1 bg-transparent outline-none" type="text" placeholder="Search Unite" />
                <button type="submit" hidden />
            </form>
            <div className="flex hidden lg:inline-flex items-center mx-5 space-x-2 text-gray-500">
                <SparklesIcon className="icon" />
                <GlobeIcon className="icon" />
                <VideoCameraIcon className="icon" />
                <hr className="h-10 border border-gray-100" />
                <ChatIcon className="icon" />
                <BellIcon className="icon" />
                <PlusIcon className="icon" />
                <SpeakerphoneIcon className="icon" />
            </div>
            <div className='ml-5 flex items-center lg:hidden text-gray-500'>
                <MenuIcon className='icon' />
            </div>
            <div className='hidden space-x-2 items-center border-gray-200 border p-2 cursor-pointer lg:flex rounded-full'>
                <div className='relative h-5 w-5 flex-shrink-0 '>
                    <Image
                        objectFit='contain'
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        layout="fill"
                        alt="user-avatar"
                    />
                </div>
                <p className='text-gray-400'>Sign In</p>
            </div>
        </div>
    )
}
