import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
// import styles from '../../styles/Home.module.css'
import { BellIcon, ChatIcon, GlobeIcon, MenuIcon, PlusIcon, SearchIcon, SparklesIcon, SpeakerphoneIcon, StarIcon, VideoCameraIcon } from '@heroicons/react/outline'
import { BeakerIcon, ChevronDownIcon, HomeIcon, FilterIcon } from '@heroicons/react/solid'
import CompanyLogo from '../assets/unite.png'

function Navbar(props) {
    return (
        <div className="flex bg-white px-4 top-0 shadow-sm items-center justify-between ">
            <div className='relative h-20 w-40 py-1 flex-shrink-0 cursor-pointer justify-between align-middle content-center'>
                <Image
                    objectFit="contain"
                    src={CompanyLogo}
                    alt={'Company Logo'} />
            </div>
            <div className='flex'>
                <div className="mx-7  item-center items-center xl:min-w-[300px] flex hidden sm:inline-flex">
                    <FilterIcon className="h-6 w-6" />
                    <p className='ml-2 hidden flex-1 lg:inline'>Filter</p>
                    <ChevronDownIcon className="h-6 w-6 cursor-pointer" />
                </div>

                <div className='items-center justify-between align-middle self-center'>
                    <SearchIcon className="h-6 w-6 text-gray-400 sm:hidden" />
                </div>

                <form className="flex flex-1 hidden sm:inline-flex items-center space-x-2 border-gray-200 bg-gray-100 px-3 py-1 border rounded-sm">
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
            </div>
            <div className='hidden space-x-2 items-center border-gray-200 border p-2 cursor-pointer lg:flex rounded-full'>
                <div className='relative h-5 w-5 flex-shrink-0 '>
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
                <p className='text-gray-400'>{props.username}</p>
            </div>
        </div>

    )
}

export default Navbar