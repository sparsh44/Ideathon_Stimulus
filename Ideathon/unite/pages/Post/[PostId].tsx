import React from 'react'
import Post from '../../components/Post'
import { useRouter } from 'next/router'
import { useSession, useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Comment from '../../assets/Coment'
import MyAvatar from '../../components/MyAvatar'

function PostPage() {
    const session=useSession();
    const user=useUser();
    const [comment, setComment] = useState([])
    const [commentText,setCommentText]=useState("");
    const { query } = useRouter()
    const supabase = useSupabaseClient()
    useEffect(() => {
        posts(),
        comments()
    }, [])
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [full_name, setfullname] = useState(null)
    const [email, setEmail] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const [userId, setUserId] = useState(null)
    useEffect(() => {
      getProfile()
    }, [session])
  
    async function getProfile() {
      try {
        setLoading(true)
        // console.log(user.id)
        setUserId(user.id)
        setEmail(user.email)
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
        // alert('Error loading user data!')
        // console.log(error)
      } finally {
        setLoading(false)
      }
    }
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
    const comments =async () => {
        let { data:comments, error } = await supabase.from('comments').select('*').eq('post_id', query.PostId);
        if (error) {
            throw error;
        }
        setComment(comments);
        
    }
    console.log(post);


    const handleCommentSubmit = async() => {
        const { error } = await supabase
        .from('comments')
        .insert(
            {
                user_id: user.id,
                post_id:post.post_id,
                username:username,
                comment:commentText

            }
        )
        if(error){
            throw error
        }
        alert("Comment Done");
        const router=useRouter();
        router.reload();


    }
    var arr=comment||[]
    var rows: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | JSX.Element[] | null | undefined=[];
    // arr.forEach(club => {
    //     rows.push(<div
    //         onClick={() => handleClick(club.clubName)}
    //         className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-blue-50 hover:text-gray-700"
    //     >
    //         {club.clubName}
    //     </div>)

    // });
    arr.forEach(commen =>{ rows.push(
        <div className='relative flex item-center space-x-2 space-y-5'>
            <hr className='absolute top-10 h-16 left-7  border ' />
            <div className=' z-50'>
                <MyAvatar />
            </div>
            <div className='flex flex-col'>
                <p>
                    <span>{commen.username}</span> {"69 minutes ago"}
                </p>
                <p>{commen.comment}</p>
            </div>
        </div>
    )}
    );  

    return (
        <div>
            <Navbar />
            <div className='mx-auto my-7 max-w-5xl'>
                <Post post={post} />
                <div className='-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16'>
                    <div className='text-sm font-bold'>Comment as <span className='text-red-500'>{username}</span></div> {/* Guys yaha Gopal Verma hi jagah session.user.name ayega*/}
                    <form className='flex flex-col space-y-2'>
                        <textarea onChange={(e)=>{setCommentText(e.target.value)}} className='h-24 w-full rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50' value={commentText||""} placeholder="What are your thoughts?" />
                       <button onClick={handleCommentSubmit} className='rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200 '>
                            Comment
                        </button>
                    </form>
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