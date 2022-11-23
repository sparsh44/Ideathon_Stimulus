import React from 'react'
import Post from '../../components/Post'
import { useRouter } from 'next/router'

function PostPage() {
    const { query } = useRouter()

    return (
        // show post with the with query.post_id
        // <Post />
        <div></div>
    )
}

export default PostPage