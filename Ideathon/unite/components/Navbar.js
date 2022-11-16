import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
// import styles from '../../styles/Home.module.css'
import { BellIcon, ChatIcon, GlobeIcon, MenuIcon, PlusIcon, SearchIcon, SparklesIcon, SpeakerphoneIcon, StarIcon, VideoCameraIcon } from '@heroicons/react/outline'
import { BeakerIcon, ChevronDownIcon, HomeIcon } from '@heroicons/react/solid'
import CompanyLogo from '../assets/unite.png'
import { useState, useEffect } from 'react'
import { useSession, useUser, useSupabaseClient } from '@supabase/auth-helpers-react'


function Navbar() {

  const supabase = useSupabaseClient()
  const user = useUser()
  const session = useSession()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [full_name, setfullname] = useState(null)
  
  const [avatar_url, setAvatarUrl] = useState(null)
  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url,full_name`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
     
        setAvatarUrl(data.avatar_url)
        setfullname(data.full_name)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

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
                        className=' rounded-full'
                        objectFit='contain'
                        
                        src={`https://hawkhcsdahiaxlsytwfd.supabase.co/storage/v1/object/public/avatars/${avatar_url}`}
                        layout="fill"
                        alt="user-avatar"
                    />
                </div>
                <p className='text-gray-400'>{username}</p>
            </div>
        </div>
       
    )
}

export default Navbar