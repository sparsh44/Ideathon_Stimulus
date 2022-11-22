import React from 'react'
import Navbar from '../components/Navbar'
// import User from '../assets/User'
import { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Widge from '../components/Widget'
import Tabs from '../components/Tabs'
import PostBox from "../components/PostBox"
import { useState, useEffect } from 'react'
import { useSession, useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Post from '../components/Post'
import COmmunity from '../components/Community'


const Home: NextPage = () => {
    const supabase = useSupabaseClient()
    const user = useUser()
    const session = useSession()
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [full_name, setfullname] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const [clubNames, setClubNames] = useState(null)
    const [allPosts, setAllPosts] = useState(null)


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

    useEffect(() => {
        getAdminId()
    }, [session])

    async function getAdminId() {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('club_admins')
                .select(`clubName`)
                .eq('user_id', user.id)

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setClubNames(data)
                // console.log(data)
                // console.log("Clubs Name fetched")

            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPosts()
    }, [session])

    async function getPosts() {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('posts')
                .select(`*`)

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setAllPosts(data)
                // console.log(data)
                // console.log("All posts fetched")

            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    return (

        <div>
            <div className='  w-full relative'>
                <Navbar username={username} avatar_url={avatar_url} />
            </div>
            <div className=''>
                <div className='flex my-7 mx-auto max-w-5xl'>
                    <PostBox username={username} avatar_url={avatar_url} clubName={clubNames} session={session} user={user} />
                </div>
                <div className='flex my-7 mx-auto max-w-5xl'>
                    <Feed posts={allPosts}/>
                    <div className='sticky top-20 mt-5 mx-5 ml-5 hidden h-fit min-w-[300px] rounded-md border border-grap-300 bg-white lg:inline'>
                        <p className='text-md mb-1 p-4 pb-3 font-bold '>All Communities</p>
                        <COmmunity />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home