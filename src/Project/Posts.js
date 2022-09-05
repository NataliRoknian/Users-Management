import { useState } from "react"

function PostsComp(props)
{
    const [post] = useState(props.postData)

    return(<div>
        <div className="todo_and_post_frame">
            <strong>Title :</strong> {post.title}<br/>
            <strong>Body :</strong> {post.body} <br/>
            <br/>
        </div>
        <br/>
    </div>);
}

export default PostsComp;