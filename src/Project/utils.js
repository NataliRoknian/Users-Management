import axios from "axios";

const getUsers = () => 
{
    return axios.get("https://jsonplaceholder.typicode.com/users");
}

const getUserTasks = async (userId) =>
{
    let response = await axios.get("https://jsonplaceholder.typicode.com/todos?userId=" + userId);
    let userTasks = response.data;
    return userTasks;
}

const getUserPosts = async (userId) =>
{
    let response = await axios.get("https://jsonplaceholder.typicode.com/posts?userId=" + userId);
    let userPosts = response.data;
    return userPosts;
}


export default {getUsers, getUserTasks, getUserPosts}