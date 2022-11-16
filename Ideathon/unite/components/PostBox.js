import React, { useState } from 'react'
import MyAvatar from './MyAvatar'
import { PhotographIcon } from '@heroicons/react/outline'
import { LinkIcon } from '@heroicons/react/outline'
// import { useForm } from "react-hook-form";
function PostBox() {
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [postImage, setPostImage] = useState("");
    const [postCommunity, setPostCommunity] = useState("");
    const [imageBoxOpen, setImageBoxOpen] = useState(false);
    const [uploadImageHook, setUploadImageHook] = useState(false);

    const uploadImage = () => {
        setImageBoxOpen("")
        setUploadImageHook(!uploadImageHook)
    }
    const uploadURL = () => {
        setUploadImageHook("")
        setImageBoxOpen(!imageBoxOpen)
    }
    const onSubmit = () => {

    }

    return (
        <form className='sticky top-16 z-50 bg-white border rounded-md border-gray-300  w-full p-2'>
            <div className='flex items-center space-x-3'>
                {/* avatar */}
                <MyAvatar />
                <input
                    onChange={e => setPostTitle(e.target.value)}
                    className='flex-1 rounded-md bg-gray-50 p-2 outline-none w-screen'
                    type="text"
                    placeholder="Create a post by entering the Title..."
                />
                <PhotographIcon className={`h-6 cursor-pointer text-gray-400 ${uploadImageHook && `text-blue-200`}`} onClick={uploadImage} />
                <LinkIcon onClick={uploadURL} className={`h-6 cursor-pointer text-gray-400 ${imageBoxOpen && `text-blue-200`}`}
                />
            </div>
            {
                ((!!postTitle) && (
                    <div className='flex flex-col py-2'>
                        <div className='flex items-center px-2'>
                            <div className='min-w-[90px]'>Body: </div>
                            <input
                                className='m-2 flex-1 bg-blue-50 outline-none p-2'
                                onChange={(e) => setPostBody(e.target.value)}
                                placeholder="Text (Optional)..."
                            />
                        </div>

                        <div className='flex items-center px-2'>
                            <div className='min-w-[90px]'>Community: </div>
                            <input
                                className='m-2 flex-1 bg-blue-50 outline-none p-2'
                                onChange={(e) => setPostCommunity(e.target.value)}
                                placeholder="i.e. ACM.."
                            />
                        </div>
                        {
                            imageBoxOpen && (
                                <div className='flex items-center px-2'>
                                    <div className='min-w-[90px]'>Image: </div>
                                    <input
                                        className='m-2 flex-1 bg-blue-50 outline-none p-2'
                                        onChange={(e) => setPostImage(e.target.value)}
                                        placeholder="Enter Image URL..."
                                    />
                                </div>
                            )
                        }
                        {
                            (postCommunity) && (imageBoxOpen || uploadImageHook || postBody) && (
                                <div className='pt-5'>
                                    <button onClick={onSubmit} type='submit' className='w-full rounded-full bg-blue-400 font-bold p-2 text-white'>Create Post</button>
                                </div>
                            )
                        }

                    </div>
                ))
            }
        </form>

    )
}

export default PostBox