import utils from './utils'
import {useState, useEffect} from 'react'
import UserComp from "./User"
import AddNewUserComp from "./AddNewUser"
import UserActivityComp from "./UserActivity"

function UsersComp()
{
    const [users, setUsers] = useState([])
    const [userId,setUserId] = useState(undefined)
    const [search, setSearch] = useState("")
    const [showAddNewUser, setShowAddNewUser] = useState(false)

    // Get all users from API
    const getData = async () => 
    {
        let responseUsers = await utils.getUsers();
        setUsers(responseUsers.data)
    }

    useEffect(() =>
    {
        getData();
    }, [])

    // Search user by name or email
    const dynamicSearch = () => {
        if (search.length >= 1){
            setUsers(users.filter(function (x) {
                return x.name.toLowerCase().includes(search.toLowerCase()) || x.email.toLowerCase().includes(search.toLowerCase())
            }  ))
        }
        else { getData(); }
      }

    useEffect(() => 
    { 
        dynamicSearch(); 
    }, [search])

    // Update User's information
    const updateUser  = (userId, fields) => 
    {
        let userIndex = users.findIndex(function (user)
        {
            return user.id === userId
        })
        if(userIndex !== -1)
        {
            let newUsers = users;
            newUsers[userIndex] = {...newUsers[userIndex], ...fields}
            setUsers(newUsers)
        }
    }

    // Delete user from the list
    const deleteUser = (userId) =>
    {
        let newUsers = users.filter(function (user)
        {
            return user.id !== userId
        })
        setUsers(newUsers)
    }

    // Open add new user option
    const openAddNewUser = () =>
    {
        setShowAddNewUser(true);
        setUserId(false)
    }

    // Close add new user option
    const closeAddNewUser = () =>
    {
        setShowAddNewUser(false);
    }

    // Add new user to the list
    const addUser = (newUser) =>
    {
        let usersList = [...users];
        let userData = {id: newUser.id ,name: newUser.name, email: newUser.email, address: {city:"" ,street:"",zipcode:""}};
        usersList.push(userData);
        setUsers(usersList);
        setShowAddNewUser(false); 
    }

    // Open show user's activity by his ID
    const updeateId = (id) => 
    {
        setUserId(id)
        setShowAddNewUser(false)
    }
    


    return(<div style={{marginTop:"30px", marginLeft:"150px"}}>
        <div style={{width:"50%", float:"left"}}>
            <div>
            Search {" "} 
                <input type="text" onChange={(e) => setSearch(e.target.value)}/> 
                {" "}
                <input type="button" value="Add" onClick={openAddNewUser}/>
                <br/><br/>
                {
                    users.map(user =>
                        {
                            return(<UserComp  updeateId={updeateId} updateUser={updateUser} deleteUser={deleteUser} userData={user} key={user.id}/>)
                        })
                }
            </div>
        </div>
        <div style={{width:"50%", float:"right"}}>
            <br/><br/>
            <div>
            {
                showAddNewUser && <AddNewUserComp closeAddNewUser={closeAddNewUser} addUser={addUser} newUserId={users.length+1}/>
            }
            </div>
            <div>
            {

                userId && <UserActivityComp  user={users.find(x=> x.id===userId)}/>
            }
            </div>
        </div>
    </div>);
}

export default UsersComp;