import React from 'react'
import Post from '../../components/Post'
import { useRouter } from 'next/router'
import { useSession, useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
function PostPage() {

    const { query } = useRouter()
    const supabase = useSupabaseClient()
    useEffect(() => {
        posts();
    }, [])
    console.log(query);

    //PostId
    const [post,setPost]=useState([]);
    const posts = async ()=>{
        let{data,error}=await supabase.from('posts').select('*').eq('post_id',query.PostId);
        if(error){
            throw error;
        }
        setPost(data[0]);
    }
    console.log(post);

    return (
        // <div></div>
         <Post post={post}/>     
    )
}

export default PostPage