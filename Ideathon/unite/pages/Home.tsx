import React from 'react'
import Navbar from '../components/Navbar'
import User from '../assets/User'
import { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Widge from '../components/Widget'
import Tabs from '../components/Tabs'
import PostBox from "../components/PostBox"

const Home: NextPage = () => {
    return (
        
        <div>
            <div className='  w-full relative'>
                <Navbar />
            </div>
            <div className='flex my-7 mx-auto max-w-5xl'>
                {/* feed */}
                <PostBox />
                {/* communities */}

            </div>
        </div>
    )
}

export default Home