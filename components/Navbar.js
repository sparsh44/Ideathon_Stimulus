import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'
// import styles from '../../styles/Home.module.css'
import { BellIcon, ChatIcon, GlobeIcon, MenuIcon, PlusIcon, SearchIcon, SparklesIcon, SpeakerphoneIcon, StarIcon, VideoCameraIcon } from '@heroicons/react/outline'
import { BeakerIcon, ChevronDownIcon, HomeIcon, FilterIcon } from '@heroicons/react/solid'
import CompanyLogo from '../assets/unite.png'
import SmallCompanyLogo from "../assets/circular_favicon_light.png"
import { useState, useEffect } from 'react';
import { Menu } from '@headlessui/react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import OnGoingChat from './OnGoingChat'
import MessageListModal from './modals/MessageListModal';
import CreateModal from './modals/CreateModal';

function Navbar(props) {
    const router = useRouter();
    const supabase = useSupabaseClient();
    const user = useUser();
    const [show, setShow] = useState(false);
    const [showRooms, setShowRooms] = useState(false);
    const [filters, setFilters] = useState(false);
    const [username, setuser] = useState("");
    const [clubnm, setclub] = useState("Choose Club");
    const [allRooms, setAllRooms] = useState([])

    useEffect(() => {
        getRooms()
    })

    async function getRooms() {

        let { data, error, status } = await supabase
            .from('joined_rooms')
            .select(`roomName`)
            .eq('user_id', props.userId)

        if (error && status !== 406) {
            throw error
        }

        if (data) {
            setAllRooms(data)
            console.log("Room Name fetched")

        }
    }


    var arr = props.clubs || [];
    var rows = [];
    arr.forEach(element => {
        rows.push(
            <Menu.Item onClick={() => { setclub(element.clubName) }}>

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
                    onClick={() => { router.push("/") }} />
            </div>
            <div className=' -ml-3 relative h-20 w-20 sm:hidden flex-shrink cursor-pointer '>
                <Image
                    objectFit="contain"
                    src={SmallCompanyLogo}
                    alt={'Company Logo'} />
            </div>
            <form className="flex  flex-1 items-center space-x-2 border-gray-200 bg-gray-100 px-3 py-1 border rounded-sm ml-40">
                <SearchIcon className="h-6 w-6 text-gray-400" />
                <input className="flex w- bg-transparent outline-none  md:flex" type="text" placeholder="Search Unite" />
                <button type="submit" hidden />
            </form>

            <div className="flex hidden lg:inline-flex items-center mx-5 space-x-2 text-gray-500">
                <a href='https://www.canva.com/design/DAFV2jBlaZM/T0PCD1OLOjyDMiZQYhhL9A/edit?utm_content=DAFV2jBlaZM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'><SparklesIcon className="icon" /></a>
                <a href='https://github.com/sparsh44/Ideathon_Stimulus'><GlobeIcon className="icon" /></a>
                <hr className="h-10 border border-gray-100" />
                <ChatIcon className="icon" onClick={() => { setShowRooms(!showRooms) }} />
                {
                    showRooms && (<MessageListModal showStatus={showRooms} _allRooms={allRooms} />)
                }
                <PlusIcon className="icon" onClick={() => { setShow(!show) }} />
                {
                    show && (<CreateModal showStatus={show} clubnm={clubnm} rows={rows} _username={username} />)
                }
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
