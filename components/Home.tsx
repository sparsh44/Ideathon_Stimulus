import React from 'react'
import Navbar from './Navbar'
import { NextPage } from 'next'
import Feed from './Feed'
import PostBox from "./PostBox"
import { useState, useEffect } from 'react'
import { useSession, useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import CommunitySidebar from './CommunitySidebar'
import { useRouter } from 'next/router'
import { BeakerIcon, ChevronDownIcon, HomeIcon, FilterIcon } from '@heroicons/react/solid'


const Home: NextPage = () => {
    const supabase = useSupabaseClient()
    const user = useUser()
    const session = useSession()
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [full_name, setfullname] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const [clubNames, setClubNames] = useState(null) 
    const [allPosts, setAllPosts] = useState(null)
    const [allClubs, setAllClubs] = useState(null)
    const [joinedClubs, setJoinedClubs] = useState(null)
    const [filters, setFilters] = useState(false);
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (router.isReady) {

            getProfile()
        }
        else {
            return
        }
    }, [router.isReady])

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
        if (!router.isReady) return
        getAdminId()
    }, [router.isReady])

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
        if (!router.isReady) return
        getAllClubs()
    }, [router.isReady])
    async function getAllClubs() {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('clubs')
                .select(`clubName`)


            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setAllClubs(data)
                console.log(data)
                console.log("Clubs Name fetched")

            }
        } catch (error) {
            alert('Error loading Clubs!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!router.isReady) return
        getJoinedClubs()
    }, [router.isReady])
    async function getJoinedClubs() {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('joined_clubs')
                .select(`clubName`)
                .eq('user_id', user.id)


            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setJoinedClubs(data)
                console.log(data)
                console.log("Joined Clubs Name fetched")

            }
        } catch (error) {
            alert('Error loading Joined Clubs!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!router.isReady) return
        getPosts()
    }, [router.isReady])

    async function getPosts() {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('posts')
                .select(`*`)

            if (error) {
                throw error
            }

            if (data) {
                data.sort(function (a, b) {
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return (new Date(b.created_at) as any) - (new Date(a.created_at) as any);
                });
                setAllPosts(data)
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    console.log(allPosts);


    return (

        <div>

            <div className='  w-full relative'>
                <Navbar userId={user.id} username={username} avatar_url={avatar_url} clubs={clubNames} />
            </div>

            <div className=''>
                <div className='sticky top-0 z-10 flex my-7 mx-auto max-w-5xl'>
                    <PostBox username={username} avatar_url={avatar_url} clubName={clubNames} session={session} user={user} />
                </div>
                <div className='flex my-7 mx-auto max-w-5xl'>
                    <Feed posts={allPosts}/>
                    <div className='sticky top-20 mt-10 mx-5 ml-5 hidden h-fit min-w-[300px] rounded-md border border-grap-300 bg-white lg:inline'>
                        <p className='text-md mb-1 p-4 pb-3 font-bold '>All Communities</p>
                        <CommunitySidebar clubName={allClubs} adminList={clubNames} session={session} user={user} joinedClubs={joinedClubs} />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Home