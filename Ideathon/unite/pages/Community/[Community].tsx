import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar';
import CommunityAvatar from '../../components/CommunityAvatar'
import CommunityData from '../../assets/CommunityData';
import PostBox from '../../components/PostBox';
import Feed from '../../components/Feed';
import { useState, useEffect } from 'react';
import PostData from '../../assets/PostData';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

function CommunityPage() {
    const { query } = useRouter()

    useEffect(() => {
        allPost();
    }, [])

    const [posts, setPost] = useState([])

    const supabase = useSupabaseClient()
    const allPost = async () => {
        const { data, error } = await supabase.from('posts').select('*');
        console.log(data);
        setPost(data)
    }


    return (
        <div className={` h-36 bg-red-400 pt-8`}>
            <div className='-mx-8 mt-28 bg-white'>
                <div className='mx-auto flex max-w-5xl items-center space-x-4 pb-5'>
                    <div className='-mt-5 ml-10'>
                        <CommunityAvatar />
                    </div>
                    <div className='py-2'>
                        <h1 className='text-3xl font-semibold'>
                            Welcome to the {query.Community}
                        </h1>
                        <p className='text-sm text-gray-400'>{query.Community}</p>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='sticky top-0 z-10 flex my-7 mx-auto max-w-5xl'>
                    <PostBox community={query.Community} />
                    {/* <PostBox community={community as string} /> */}
                </div>
                <div className='flex my-7 mx-auto max-w-5xl'>
                    <Feed posts={posts} />
                </div>
            </div>
        </div>
    )
}

export default CommunityPage