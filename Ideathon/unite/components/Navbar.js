import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'
// import styles from '../../styles/Home.module.css'
import { BellIcon, ChatIcon, GlobeIcon, MenuIcon, PlusIcon, SearchIcon, SparklesIcon, SpeakerphoneIcon, StarIcon, VideoCameraIcon } from '@heroicons/react/outline'
import { BeakerIcon, ChevronDownIcon, HomeIcon, FilterIcon } from '@heroicons/react/solid'
import CompanyLogo from '../assets/unite.png'
import SmallCompanyLogo from "../assets/circular_favicon_light.png"
import { useState } from 'react';
import { Menu } from '@headlessui/react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';


function Navbar(props) {
    const router = useRouter();
    const supabase=useSupabaseClient();
    const user=useUser();
    const[show,setShow]=useState(false);
    const[username,setuser]=useState("");
    const[clubnm,setclub]=useState("Choose Club");
    const makeadmin=async()=>{
        const { data, erro } = await supabase
        .from('profiles')
        .select("id").eq("username",username).single();

        const { error } = await supabase
        .from('club_admins')
        .insert(
            {
                clubName:clubnm,
                user_id:data.id

            }
        )
        if(error){
            throw error
        }
        alert("Admin Created");
                
    }
    var arr=props.clubs||[];
    var rows=[];
    arr.forEach(element => {
        rows.push(
            <Menu.Item onClick={()=>{setclub(element.clubName)}}>
        
            <a
             
             
            >
              {element.clubName}
            </a>
        
        </Menu.Item>
        )
        
    });
    return (
        <div className="flex bg-white px-4 top-0 shadow-sm items-center">
            <div className='relative h-20 w-32 py-3 hidden sm:inline-flex flex-shrink cursor-pointer '>
                <Image
                    objectFit="contain"
                    src={CompanyLogo}
                    alt={'Company Logo'} 
                    onClick={() => { router.push("/")}}/>
            </div>
            <div className=' -ml-3 relative h-20 w-20 sm:hidden flex-shrink cursor-pointer '>
                <Image
                    objectFit="contain"
                    src={SmallCompanyLogo}
                    alt={'Company Logo'} />
            </div>
            <div className="mx-5 flex item-center items-center xl:min-w-[300px] hidden sm:inline-flex">
                <FilterIcon className="h-6 w-6" />
                <p className='ml-2 hidden flex-1 lg:inline'>Filter</p>
                <ChevronDownIcon className="h-6 w-6 cursor-pointer" />
            </div>
            <form className="flex  flex-1 items-center space-x-2 border-gray-200 bg-gray-100 px-3 py-1 border rounded-sm">
                <SearchIcon className="h-6 w-6 text-gray-400" />
                <input className="flex w- bg-transparent outline-none  md:flex" type="text" placeholder="Search Unite" />
                <button type="submit" hidden />
            </form>
            <div className="flex hidden lg:inline-flex items-center mx-5 space-x-2 text-gray-500">
                <SparklesIcon className="icon" />
                <GlobeIcon className="icon" />
                <VideoCameraIcon className="icon" />
                <hr className="h-10 border border-gray-100" />
                <ChatIcon className="icon" />
                <BellIcon className="icon" />
                <PlusIcon className="icon" onClick={()=>{setShow(!show)}}/>
                {
                    show && (
                        <div>
                        <Menu>
                          <Menu.Button>{clubnm}</Menu.Button>
                              <Menu.Items>
                                   {rows}
                             </Menu.Items>
                         </Menu>
                            <input type="text" placeholder='Enter Username'
                            value={username||""} 
                            onChange={e => setuser(e.target.value)} />
                            <button onClick={()=>{makeadmin()}}>Create Admin</button>

                        </div>
                    )
                }
                <SpeakerphoneIcon className="icon" />
            </div>
            <div className='ml-5 flex items-center lg:hidden text-gray-500 '>
                <MenuIcon className='icon' />
            </div>
            <Link href={'/ProfilePage'}><div className='hidden space-x-2 items-center border-gray-200 border p-2 cursor-pointer lg:flex rounded-full'>
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
            </div></Link>
        </div>
       
    )
}

export default Navbar
