import utils from './utils'
import { useState, useEffect } from "react";
import TodosComp from './Todos';
import PostsComp from './Posts'
import AddNewTodoComp from './AddNewTodo';
import AddNewPostComp from './AddNewPost';

function UserActivityComp(props)
{
    const [todos, setTodos] = useState([])
    const [posts, setPosts] = useState([])
    const [showAddNewTodo, setShowAddNewTodo] = useState(false)
    const [showAddNewPost, setShowAddNewPost] = useState(false)

    
    // Get all user's todos & posts from API
    const getData = async () => 
    {
        let userTodos = await utils.getUserTasks(props.user.id);
        setTodos(userTodos)
        
        let userPosts = await utils.getUserPosts(props.user.id);
        setPosts(userPosts)
    }
   
    useEffect(() =>
    {
        getData();

    }, [props.user.id])


     // Update Todo - mark completed
     const updateTodo  = (todoId) => 
     {    
         let updatedTodos = todos.map(item => {
            if(item.id === todoId){
                item.completed = true
                }
                return item
            })
        setTodos(updatedTodos)
     }


    // Open add new todo option
    const openAddNewTodo = () =>
    {
        setShowAddNewTodo(true);
    }

    // Close add new todo option
    const closeAddNewTodo = () =>
    {
        setShowAddNewTodo(false);
    }

    // Add new todo to the list
    const addTodo = (newTodo) =>
    {
        let usersTodos = [...todos];
        let todoData = {title: newTodo.title , completed: false};
        usersTodos.push(todoData);
        setTodos(usersTodos);
        setShowAddNewTodo(false); 
    }


    // Open add new post option
    const openAddNewPost = () =>
    {
        setShowAddNewPost(true);
    }

    // Close add new post option
    const closeAddNewPost = () =>
    {
        setShowAddNewPost(false);
    }

    // Add new post to the list
    const addPost = (newPost) =>
    {
        let usersPosts = [...posts];
        let postData = {title: newPost.title , body: newPost.body};
        usersPosts.push(postData);
        setPosts(usersPosts);
        setShowAddNewPost(false); 
    }


    return(<div>
        Todos - User {props.user.id}
        <input style={{marginLeft:"295px"}} type="button" value="Add" onClick={openAddNewTodo}/>
        <br/><br/>
        <div className='todos_and_posts_block'>
            {
                !showAddNewTodo &&
                 todos.map(todo =>
                    {
                        return(<TodosComp todoData={todo} key={todo.id} updateTodo={updateTodo}/>)
                    })
            }
            {
                showAddNewTodo && <AddNewTodoComp closeAddNewTodo={closeAddNewTodo} addTodo={addTodo}/>

            }
        </div>
        <br/><br/>
        Posts - User {props.user.id}
        <input style={{marginLeft:"300px"}} type="button" value="Add" onClick={openAddNewPost}/>
        <br/><br/>
        <div className='todos_and_posts_block'>
            {
                !showAddNewPost &&
                 posts.map(post =>
                    {
                        return(<PostsComp postData={post} key={post.id}/>)
                    })
            }
            {
                showAddNewPost && <AddNewPostComp closeAddNewPost={closeAddNewPost} addPost={addPost}/>
            }
        </div>
    </div>)
}

export default UserActivityComp;