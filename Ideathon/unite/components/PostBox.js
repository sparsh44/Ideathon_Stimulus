import React, { useState } from 'react'
import MyAvatar from './MyAvatar'
import { PhotographIcon } from '@heroicons/react/outline'
import { LinkIcon } from '@heroicons/react/outline'
// import { useForm } from "react-hook-form";
function PostBox(props) {
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [postImage, setPostImage] = useState("");
    const [postCommunity, setPostCommunity] = useState("");
    const [imageBoxOpen, setImageBoxOpen] = useState(false);
    const [uploadImageHook, setUploadImageHook] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const clubNames=props.clubName;
 

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
    const choosingOptionsForPostCommunity = (CommunityName) => {
        setPostCommunity(CommunityName);
        setShowDropdown(false);
    }
    var rows=[];
    var arr=clubNames||[];
    console.log(clubNames);
    arr.forEach(club => {
        rows.push(<div
            onClick={() => choosingOptionsForPostCommunity(club.clubName)}
            className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-blue-50 hover:text-gray-700"
        >
            {club.clubName}
        </div>)
        
    });
    console.log(rows);
    console.log("rows");
  

    return (
        <form className='sticky top-16 z-50 bg-white border rounded-md border-gray-300  w-full p-2'>
            <div className='flex items-center space-x-3'>
                {/* avatar */}
                <MyAvatar avatar_url={props.avatar_url} />
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
                                            
                                                {/* repeat line 89 to 94 to create options for more communities */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
