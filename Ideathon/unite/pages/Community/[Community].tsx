import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar';
import CommunityAvatar from '../../components/CommunityAvatar'
import CommunityData from '../../assets/CommunityData';
import PostBox from '../../components/PostBox';
import Feed from '../../components/Feed';
import { useState, useEffect } from 'react';
import PostData from '../../assets/PostData';

function Community() {
    const {
        query: { topic },
    } = useRouter();

    return (
        <div className={`h-24 bg-red-400 p-8`}>
            <div className='-mx-8 mt-10 bg-white'>
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
            <div>
                <PostBox />
                <Feed />
            </div>
        </div>
    )
}

export default Community