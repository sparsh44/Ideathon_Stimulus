import React from 'react'
import Post from '../../components/Post'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useSession, useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import MyAvatar from '../../components/MyAvatar'


function PostPage() {
    const session = useSession();
    const user = useUser();
    const supabase = useSupabaseClient()
    console.log(session);
    console.log(user)
    const [comment, setComment] = useState([])
    const [commentText, setCommentText] = useState("");

    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [full_name, setfullname] = useState(null)
    const [userId, setUserId] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
   
    const [qu,setqu]=useState(null);
    const router=useRouter();


    useEffect(()=>{
        if(!router.isReady) return;
    
        // codes using router.query
       else{
        console.log(router.query.PostId);
        // setqu(nw);
        // console.log(qu);
        posts(),comments();
       }
    
    }, [router.isReady]);
 
    useEffect(() => {
        getProfile()
    }, [session])

    async function getProfile() {
        try {
          setLoading(true)
          // console.log(user.id)
   
          let { data, error, status } = await supabase
            .from('profiles')
            .select(`id,username, avatar_url,full_name`)
            .eq('id', user.id)
            .single()
    
          if (error && status !== 406) {
            throw error
          }
          console.log(data);
          if (data) {
            setUsername(data.username)
            setUserId(data.id);
            setAvatarUrl(data.avatar_url)
            setfullname(data.full_name)
          }
        } catch (error) {
          // alert('Error loading user data!')
          // console.log(error)
        } finally {
          setLoading(false)
        }
      }

   
    //PostId
    const [post, setPost] = useState("");
    
    const posts = async () => {
        let { data, error } = await supabase.from('posts').select('*').eq('post_id', router.query.PostId);
        if (error) {
            throw error;
        }
        

            setPost(data[0]);
        
    }
    const comments = async () => {
        let { data, error } = await supabase.from('comments').select('*').eq('post_id', router.query.PostId);

        if (error) {
            throw error;
        }
        
        setComment(data);

    }

    const handleCommentSubmit = async () => {
        const {  error } = await supabase
            .from('comments')
            .insert(
                {
                    user_id: user.id,
                    username: username,
                    comment: commentText
                }
            )
        if (error) {
            throw error
        }
     
            alert("Comment Done");
      router.reload();
        
        


    }
    var arr = comment || []
    var rows=[];
    arr.forEach(commen => {
        rows.push(
            <div className='relative flex item-center space-x-2 space-y-5'>
                <hr className='absolute top-10 h-16 left-7  border ' />
                <div className=' z-50'>
                    <MyAvatar />
                </div>
                <div className='flex flex-col'>
                    <div>
                        <span>{commen.username}</span> {moment(new Date(commen.created_at)).fromNow()}
                    </div>
                    <div>{commen.comment}</div>
                </div>
            </div>
        )
    }
    );

    return (
        <div>
            <Navbar userId={userId} username={username} avatar_url={avatar_url} />
            <div className='mx-auto my-7 max-w-5xl'>
                <Post post={post} userId={userId}/>
                <div className='-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16'>
                    <div className='text-sm font-bold'>Comment by <span className='text-red-500'>{username}</span></div> {/* Guys yaha Gopal Verma hi jagah session.user.name ayega*/}
                    {/* <form className='flex flex-col space-y-2'> */}
                        <textarea onChange={(e) => { setCommentText(e.target.value) }} className='h-24 w-full rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50' value={commentText || ""} placeholder="What are your thoughts?" />
                        <button onClick={() => { handleCommentSubmit() }} className='rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200 '>
                            Comment
                        </button>
                    {/* </form> */}
                </div>
                <div className='-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10'>
                    <hr className='py-2' />
                    {rows}
                </div>

            </div>
        </div>
    )
}

export default PostPage