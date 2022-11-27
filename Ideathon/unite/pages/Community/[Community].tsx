import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar';
import CommunityAvatar from '../../components/CommunityAvatar'
import CommunityData from '../../assets/CommunityData';
import PostBox from '../../components/PostBox';
import Feed from '../../components/Feed';
import { useState, useEffect } from 'react';
import PostData from '../../assets/PostData';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Room from '../../components/Room'
import Resource from '../../components/Resource'

function CommunityPage() {
    const router=useRouter();

    useEffect(() => {
        if(!router.isReady) return 
        allPost();
    }, [router.isReady])

    const [posts, setPost] = useState([])

    const supabase = useSupabaseClient()
    const allPost = async () => {
        const { data, error } = await supabase.from('posts').select('*').eq('clubName', router.query.Community);
        console.log(data);
        data.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.created_at) - new Date(a.created_at);
          });
        setPost(data)
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
                <div className='sticky top-0 z-10 flex my-7 mx-auto max-w-7xl'>
                    <PostBox community={router.query.Community} />
                    {/* <PostBox community={community as string} /> */}
                </div>
                <div className='flex my-7 mx-auto max-w-7xl'>
                    <div className='sticky top-20 mt-10 mx-5 ml-5 hidden h-fit min-w-[300px] rounded-md border border-grap-300 bg-white lg:inline'>
                        <p className='text-md mb-1 p-4 pb-3 font-bold '>All Rooms</p>
                        <Room />
                    </div>
                    <Feed posts={posts} />
                    <div className='sticky top-20 mt-10 mx-5 ml-5 hidden h-fit min-w-[250px] rounded-md border border-grap-300 bg-white lg:inline'>
                        <p className='text-md mb-1 p-4 pb-3 font-bold '>All Resources</p>
                        <Resource />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityPage