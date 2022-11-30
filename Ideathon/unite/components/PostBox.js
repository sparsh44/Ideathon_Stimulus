import React, { useState, useEffect } from 'react'
import MyAvatar from './MyAvatar'
import { PhotographIcon } from '@heroicons/react/outline'
import { LinkIcon } from '@heroicons/react/outline'
import { useSession, useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
// import { useForm } from "react-hook-form";
function PostBox(props) {

    const user = useUser();
    const router = useRouter();
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [postImage, setPostImage] = useState("");
    const [postCommunity, setPostCommunity] = props.community ? useState(props.community) : useState("")
    const [imageBoxOpen, setImageBoxOpen] = useState(false);
    const [uploadImageHook, setUploadImageHook] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imagePreviewing, setImagePreviewing] = useState();
    const [isOpen, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false)
    const supabase = useSupabaseClient()
    const clubNames = props.clubName;


    const toggleMenu = () => setOpen(!isOpen);

    const previewImage = (e) => {
        setImagePreviewing(URL.createObjectURL(e.target.files[0]));
    }

    const uploadMedia = async (event) => {
        try {
            setUploading(true)
            console.log(event);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name
            const fileName = `${user.id}.${fileExt}`
            const filePath = `${fileName}`

            previewImage(event)

            let { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file, { upsert: true })

            if (uploadError) {
                throw uploadError
            }
            else {

                setPostImage(filePath);

                alert("Image Loaded");
                toggleMenu();
                // alert("File Uploaded");
            }

        } catch (error) {
            alert(error)
            console.log(error)
        } finally {
            setUploading(false)
        }
    }
    const uploadImage = () => {
        setImageBoxOpen("")
        setUploadImageHook(!uploadImageHook)
    }
    // const uploadURL = () => {
    //     setUploadImageHook("")
    //     setImageBoxOpen(!imageBoxOpen)
    // }

    const removeMedia = async () => {
        const { data, error } = await supabase.storage.from('media').remove([postImage]);
        setPostImage("");
        setUploadImageHook(false);

        toggleMenu();
        setImagePreviewing();
        alert("Image Removed");
        if (error) {
            alert(error);
            console.log(error);
        }

    }


    const onSubmit = async ({ postTitle, postBody, postImage, postCommunity }) => {
            setLoading(true)

            const { error } = await supabase
                .from('posts')
                .insert(
                    {
                        user_id: user.id,
                        title: postTitle,
                        content: postBody,
                        attachment_url: postImage,
                        clubName: postCommunity,
                        postedBy: props.username,

                    }
                )
                if(error){
                    throw error
                }
             
          
                alert("Post created")
                router.reload();
               

          

     
            setLoading(false)
        
    }
    const handleClick = (clubName) => {
        setPostCommunity(clubName)
        setShowDropdown(false)
    }
    var rows = [];
    var arr = clubNames || [];
    // console.log(clubNames);
    arr.forEach(club => {
        rows.push(<div
            onClick={() => handleClick(club.clubName)}
            className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-blue-50 hover:text-gray-700"
        >
            {club.clubName}
        </div>)

    });
    // console.log(rows);
    // console.log("rows");

    return (
        <div className='sticky top-16 z-50 bg-white border rounded-md border-gray-300  w-full p-2'>
            <div className='flex items-center space-x-3'>
                {/* avatar */}
                <MyAvatar avatar_url={props.avatar_url} />
                <input
                    onChange={e => setPostTitle(e.target.value)}
                    className='flex-1 rounded-md bg-gray-50 p-2 outline-none w-screen'
                    type="text"
                    placeholder={
                        props.community ? `Create a post in ${props.community}` : "Create a post by entering a title!"
                    }
                />
                <PhotographIcon className={`h-6 cursor-pointer text-gray-400 ${uploadImageHook && `text-blue-200`}`} onClick={uploadImage} />
                {/* <LinkIcon onClick={uploadURL} className={`h-6 cursor-pointer text-gray-400 ${imageBoxOpen && `text-blue-200`}`}
                /> */}
            </div>
            {
                ((!!postTitle) && (
                    <div className='flex flex-col py-2'>
                        <div className='flex items-center px-2'>
                            <div className='min-w-[90px]'>Body: </div>
                            <input
                                className='m-2 flex-1 bg-blue-50 outline-none p-2'
                                onChange={(e) => setPostBody(e.target.value)}
                                placeholder="Content of Body"
                            />
                        </div>

                        {!props.community && (
                            <div className='flex items-center px-2'>
                                <div className='min-w-[90px]'>Community: </div>
                                <div className='m-2 w-56'>
                                    <div className="inline-flex bg-blue-50 w-full justify-between">
                                        <div
                                            href="#"
                                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md"
                                        >
                                            {
                                                (postCommunity == "") ? (<text>Choose Community</text>) : (<text>{postCommunity}</text>)
                                            }

                                        </div>

                                        <div className="relative">
                                            <button
                                                onClick={() => setShowDropdown(!showDropdown)}
                                                type="button"
                                                className="inline-flex items-center justify-center h-full px-2 text-gray-600 border-l border-white-50 hover:text-gray-700 rounded-r-md hover:bg-gray-50"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>

                                            <div className={` ${!showDropdown && `hidden`} absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 shadow-lg`}>
                                                <div className="p-2">
                                                    {rows}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {
                            uploadImageHook && (
                                <div className='flex items-center px-2'>
                                    <div className='min-w-[90px]'>Image: </div>
                                    <input
                                        type="file"
                                        accept='image/*'
                                        className='m-2 flex-1 bg-blue-50 outline-none p-2'
                                        onChange={uploadMedia}


                                    />
                                    {/* <a onClick={removeMedia}>Remove Pic</a> */}
                                    <svg onClick={removeMedia} class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                                </div>
                            )
                        }
                        {isOpen && (<div>
                            <img src={imagePreviewing} className="m-auto w-1/3 h-1/3" alt="Image to pe previewed" />
                        </div>)}
                        {
                            (postCommunity) && (uploadImageHook || postBody) && (
                                <div className='pt-5'>
                                    <button onClick={() => onSubmit({ postTitle, postBody, postImage, postCommunity })}  className='w-full rounded-full bg-blue-400 font-bold p-2 text-white'>Create Post</button>
                                </div>
                            )
                        }

                    </div>
                ))
            }
        </div>

    )
}

export default PostBox
