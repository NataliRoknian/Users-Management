import { useState} from "react"

function AddNewPostComp(props)
{
    const[newPost,setNewPost] = useState({title:"" , body:""});


    return(<div>
        Add New Post
        <br/>
        <br/>
        <div className="add_new_todo_and_post">
            Title: <input type="text" onChange={e => {setNewPost({...newPost, title: e.target.value})}}/><br/>
            Body: <input type="text" onChange={e => {setNewPost({...newPost, body: e.target.value})}}/><br/>
            <br/>
            <input type="button" value="Cancel" onClick={() => props.closeAddNewPost()}/>
            {" "}
            <input type="button" value="Add" onClick={() => props.addPost(newPost)}/>
        </div>
    </div>);
}

export default AddNewPostComp;