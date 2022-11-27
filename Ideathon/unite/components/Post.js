import React from 'react'
import PostData from '../assets/PostData'
import MyAvatar from './MyAvatar'
// import TimeAgo from 'react-timeago'
import moment from 'moment';
import { ChatAltIcon, DotsHorizontalIcon, PaperAirplaneIcon, ShareIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/outline'
import PostAvatar from './PostAvatar'
import { useState, useEffect } from 'react'
import { useSession, useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

import Link from 'next/link'
import { useRouter } from 'next/router'
const URL_REGEX =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

function Text({ content }) {

    content = String(content)
    const words = content.split(" ");
    return (
        <p className='mt-2 text-sm font-light'>
            {words.map((word) => {
                return word.match(URL_REGEX) ? (
                    <>
                        <a href={word} className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">{word}</a>{' '}
                    </>
                ) : (
                    word + ' '
                );
            })}
        </p>
    );
}

function Post(props) {
  
    
    const router=useRouter();
   
    useEffect(()=>{
        if(!router.isReady||props.post==="" || props.userId===null) return
        getLike(),
        getcomment()
    },[props,router.isReady])
    const supabase=useSupabaseClient();
    console.log(props);
    const user=useUser();
    const session=useSession();
    const [likeNum,setlikeNum]=useState(0);
    const [commentNum,setcommentNum]=useState(0);
   
 
    const getLike=async()=>{
           let{data,error}= await supabase.from("likes").select("*").eq("post_id",props.post.post_id);
           if(error){
            throw error;
            }
        console.log(data||[]);
        const d=data||[];
           setlikeNum(d.length);
        
    }
   
    const getcomment=async()=>{
           let{data,error}=await supabase.from("comments").select("*").eq("post_id",props.post.post_id);
           if(error){
            throw error;
            }
            console.log(data);
            const d=data||[];

           setcommentNum(d.length);
        
    }
    const like=async()=>{
        let{data,err}= await supabase.from("likes").select("*").eq("user_id",user.id).eq("post_id",props.post.post_id);
     console.log(data);
     if(err){
        throw err
     }
     const d=data||[];
     if(d.length===0){
        const { error } = await supabase
        .from('likes')
        .insert(
            {
                user_id:user.id,
                post_id:props.post.post_id,

            }
        )
        if(error){
            throw error
        }
        alert("Like Done");
        router.reload();
    }
    else{
        alert("Like Done Already");
    }
    }
    return (

        
            <div className='flex cursor-pointer mt-5 rounded-md border border-gray-300 bg-white shadow-sm'>
                <div className='p-3 pb-1 w-full'>
                    <div className='flex items-center space-x-2'>
                        <MyAvatar avatar_url="" />
                        <Link href={`/Community/${props.post.clubName}`}>
                            <p className='text-xc text-gray-400'>
                                <span className='font-bold text-black hover:text-blue-400 hover:underline'>{props.post.clubName}</span> · Posted by {props.post.postedBy} {moment(new Date(props.post.created_at)).fromNow()}
                            </p>
                        </Link>
                    </div>
                    <Link href={`/Post/${props.post.post_id}`}>
                    <div className='py-4'>
                        <h2 className='text-xl font-semibold'>{props.post.title}</h2>
                        <Text content={props.post.content} />
                    </div>
                    {props.post.attachment_url ? (< img className='w-full' src={`https://hawkhcsdahiaxlsytwfd.supabase.co/storage/v1/object/public/media/${props.post.attachment_url}`} alt={props.post.title} />
                    ) : (<div />)}


                    </Link>
                    <div className='flex space-x-4 text-gray-400 justify-between'>
                        <div className='flex'>
                            <div className='postButtons'>
                                <HeartIcon className='h-6 w-6' onClick={like}/>
                                <p className='hidden sm:inline'>{likeNum} Likes</p>
                            </div>
                            <div className='postButtons'>
                                <ChatAltIcon className='h-6 w-6' />
                                <p className='hidden sm:inline'>{commentNum} Comments</p>
                            </div>
                            <div className='postButtons'>
                                <ShareIcon className='h-6 w-6' />
                                <p className='hidden sm:inline'>{69} Share</p>
                            </div>
                        </div>
                        <div className='postButtons'>
                            <DotsHorizontalIcon className='h-6 w-6' />
                            <p className='hidden sm:inline'>{69} More</p>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default Post