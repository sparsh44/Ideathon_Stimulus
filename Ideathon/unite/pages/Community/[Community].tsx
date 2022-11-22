import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar';
import CommunityAvatar from '../../components/CommunityAvatar'
import CommunityData from '../../assets/CommunityData';
import PostBox from '../../components/PostBox';
import Feed from '../../components/Feed';
import { useState, useEffect } from 'react';
import PostData from '../../assets/PostData';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

function Community() {



    useEffect(() => {
        allPost();
    })

    const [posts, setPost] = useState([])

//  following query to fetch community using next router
    // const {
    //     query: { community },
    // } = useRouter();

    const supabase = useSupabaseClient()
    const allPost = async () => {
        const { data, error } = await supabase.from('posts').select('*');
        console.log(data);
        setPost(data)
    }


    return (
        <div className={` h-36 bg-red-400 p-8`}>
            <div className='-mx-8 mt-28 bg-white'>
                <div className='mx-auto flex max-w-5xl items-center space-x-4 pb-5'>
                    <div className='-mt-5 ml-0'>
                        <CommunityAvatar />
                    </div>
                    <div className='py-2'>
                        <h1 className='text-3xl font-semibold'>
                            Welcome to the {CommunityData[0].title}
                        </h1>
                        <p className='text-sm text-gray-400'>{CommunityData[0].title}</p>
                    </div>
                </div>
            </div>
            <div className='mx-auto mt-5 max-w-5xl pb-10'>
                <div className='flex my-7 mx-auto max-w-5xl'>
                    <PostBox community={"ACM CSS"} />
                    {/* <PostBox community={community as string} /> */}
                </div>
                <Feed posts={posts} />
            </div>
        </div>
    )
}

export default Community