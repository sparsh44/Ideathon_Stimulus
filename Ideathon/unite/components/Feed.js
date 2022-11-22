import React from 'react'
import { RefreshIcon } from '@heroicons/react/outline'
import PostData from '../assets/PostData'
import Post from './Post'

function Feed(props) {
    {/* var rows = [];
    var arr = clubNames || [];
    // console.log(clubNames);
    arr.forEach(club => {
        rows.push(<div
            onClick={() => handleClick(club.clubName)}
            className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-blue-50 hover:text-gray-700"
        >
            {club.clubName}
        </div>)

        }); */}
        var posts=props.posts||[];
    // var rows=[];
    // var arr=posts||[];
    // arr.forEach(post => {
    //     rows.push(<Post post={post}/>)
    // });
    return (
        <div className='mt-5 space-y-4'>
            {
                
                posts.map(post => 
                    <Post post={post} />
                )
            }
        </div>
    )
}

export default Feed