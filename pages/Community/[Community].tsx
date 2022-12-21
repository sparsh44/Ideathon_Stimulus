import { useRouter } from 'next/router'
import CommunityAvatar from '../../components/CommunityAvatar'
import Feed from '../../components/Feed';
import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import Room from '../../components/Room'
import Resource from '../../components/Resource'
import { PlusIcon, HomeIcon } from '@heroicons/react/outline'


function CommunityPage() {
    const router = useRouter();
    const supabase = useSupabaseClient();
    const user = useUser();
    const session = useSession();
    const [loading, setLoading] = useState(true)
    const [posts, setPost] = useState([]);
    const [subGroupName, setSubGroupName] = useState("");
    const [clubNames, setClubNames] = useState([]);
    const [allRooms, setAllRooms] = useState([]);
    const [showInputbar, setShowInputbar] = useState(false);

    useEffect(() => {
        if (!router.isReady) return
        allPost();
    }, [router.isReady])

    useEffect(() => {
        if (!router.isReady) return
        getAdminId()
    }, [ router.isReady])

    async function getAdminId() {

        let { data, error, status } = await supabase
            .from('club_admins')
            .select(`clubName`)
            .eq('user_id', user.id)
            .eq('clubName', router.query.Community)
        if (error && status !== 406) {
            throw error
        }

        if (data) {
            setClubNames(data)
            console.log("Clubs Name fetched")

        }
    }
    const allPost = async () => {
        const { data, error } = await supabase.from('posts').select('*').eq('clubName', router.query.Community);
        console.log(data);
        data.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return (new Date(b.created_at) as any) - (new Date(a.created_at) as any) ;
        });
        setPost(data)
    }
    const onSubmit = async (subGroupName: any) => {
        try {
            setLoading(true)

            const { data, error } = await supabase
                .from('rooms')
                .insert(
                    {
                        roomName: subGroupName,
                        clubName: router.query.Community
                    }
                )
            if (error) {

                alert(`Room of ${subGroupName} created in ${router.query.Community}`)
            }
            if (data) {

                alert("Room created")
                router.reload();
            }



        } catch (error) {
            alert(error);
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (!router.isReady) return
        getRooms()
    }, [session, router.isReady])

    async function getRooms() {

        let { data, error, status } = await supabase
            .from('rooms')
            .select(`roomName`)
            .eq('clubName', router.query.Community)

        if (error && status !== 406) {
            throw error
        }

        if (data) {
            setAllRooms(data)
            console.log("Room Name fetched")

        }
    }

    return (
        <div className={` h-36 bg-red-400 pt-8`}>
            <div className=' mt-28 bg-white w-full'>
                <div className='mx-auto flex max-w-5xl items-center space-x-4 pb-5'>
                    <div className='-mt-5 ml-10'>
                        <CommunityAvatar />
                    </div>
                    <div className='py-2'>
                        <h1 className='text-3xl font-semibold'>
                            Welcome to the {router.query.Community}
                        </h1>
                        <p className='text-sm text-gray-400'>{router.query.Community}</p>
                    </div>
                </div>
            </div>
            <div className=''>

                <div className='flex my-7 mx-auto max-w-5xl'>
                    <Feed posts={posts} />
                    <div className='sticky top-5 mt-10 mx-5 ml-5 hidden h-fit min-w-[300px] rounded-md border border-grap-300 bg-white lg:inline'>
                        <p className='text-md mb-1 p-4 pb-3 font-bold '>All Resources</p>
                        <Resource community={router.query.Community} />
                        <div className="flex hidden lg:inline-flex items-center mx-5 space-x-2 text-gray-500">
                            <p className='text-md mb-1 p-4 pb-3 font-bold '>All Rooms</p>
                            {clubNames.length === 0 ? (<div />) : (<PlusIcon className="icon" onClick={() => setShowInputbar(!showInputbar
                                )} />)}
                            {showInputbar ? (
                                <div className='flex items-center px-2'>
                                    <form >
                                        <input
                                            type="text"
                                            className='m-2 flex-1 bg-blue-50 outline-none p-2'
                                            onChange={(e) => setSubGroupName(e.target.value)}
                                            placeholder="Room Name"
                                        />
                                        {subGroupName.length === 0 ? (
                                            <button type='submit' className='w-full rounded-full bg-gray-400 font-bold p-2 text-white' disabled>Create Room</button>
                                        ) : (
                                            <button onClick={() => onSubmit(subGroupName)} type='submit' className='w-full rounded-full bg-blue-400 font-bold p-2 text-white'>Create Room</button>

                                        )}

                                    </form>
                                </div>
                            ) : (<div />)}
                        </div>
                        <Room allRooms={allRooms} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityPage