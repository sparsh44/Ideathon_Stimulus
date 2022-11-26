import React from 'react'
import Post from '../../components/Post'
import { useRouter } from 'next/router'
import { useSession, useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Comment from '../../assets/Coment'
import MyAvatar from '../../components/MyAvatar'

function PostPage() {
    const [comment, setComment] = useState("")
    const { query } = useRouter()
    const supabase = useSupabaseClient()
    useEffect(() => {
        posts();
    }, [])
    console.log(query);

    //PostId
    const [post, setPost] = useState([]);
    const posts = async () => {
        let { data, error } = await supabase.from('posts').select('*').eq('post_id', query.PostId);
        if (error) {
            throw error;
        }
        setPost(data[0]);
    }
    console.log(post);

    const handleCommentSubmit = () => {
        alert(comment);
    }

    return (
        <div>
            <Navbar />
            <div className='mx-auto my-7 max-w-5xl'>
                <Post post={post} />
                <div className='-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16'>
                    <p className='text-sm font-bold'>Comment as <span className='text-red-500'>Gopal Verma</span></p> {/* Guys yaha Gopal Verma hi jagah session.user.name ayega*/}
                    <form className='flex flex-col space-y-2'>
                        <textarea className='h-24 w-full rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50' placeholder="What are your thoughts?" />
                        <button onClick={handleCommentSubmit} type='submit' className='rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200 '>
                            Comment
                        </button>
                    </form>
                </div>
                <div className='-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10'>
                    <hr className='py-2' />
                    {
                        Comment.map(e => (
                            <div className='relative flex item-center space-x-2 space-y-5'>
                                <hr className='absolute top-10 h-16 left-7  border ' />
                                <div className=' z-50'>
                                    <MyAvatar />
                                </div>
                                <div className='flex flex-col'>
                                    <p>
                                        <span>Gopal Vema</span> {"69 minutes ago"}
                                    </p>
                                    <p>Awesome post!!!</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PostPage