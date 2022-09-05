import {useState, useEffect} from 'react'
import utils from './utils'

function UserComp(props)
{
    const [user, setUser] = useState(props.userData)
    const [isGreen,setIsGreen] = useState(false);
    const [showOtherDetails, setShowOtherDetails] = useState(false)
    const [highlight, sethighlight] = useState(false)

    // If all the user's tasks are completed then his frame will be green otherwise his frame will be red
    const getTasksColor = async () => 
    {
        let userTodos = await utils.getUserTasks(user.id);
        if(userTodos.every(x => x.completed === true)){
            setIsGreen(true)
        }
        else{
            setIsGreen(false)
        } 
    }

    useEffect(() =>
    {
        getTasksColor();
    }, [])

    // Getting more information about the user
    const getOtherDeatils = () =>
    {
        setShowOtherDetails(true);
    }

    const handelClick=()=>{
        props.updeateId(user.id);
        sethighlight(true)
    }

    

    
    return(<div>
        <div style={{backgroundColor: highlight===true? "#F8D5AA" : "white", borderStyle:"solid", borderWidth:"1px", borderColor: isGreen===true? "green":"red", width:"400px", padding:"10px"}}>
            <span onClick={handelClick}> ID : {user.id}</span><br/>
            Name : <input type="text" onChange={e => {setUser({...user, name: e.target.value})}} placeholder={user.name}/><br/>
            Email :  <input type="text" onChange={e => {setUser({...user, email: e.target.value})}} placeholder={user.email} /><br/>
            <br/>
            <input type="button" value="Other Data" onMouseOver={getOtherDeatils} style={{backgroundColor:"#DADDDD", borderStyle:"solid",  borderColor:"#A2AEB8", marginRight:"50px"}}/><br/>
            {
                showOtherDetails && <div className='user_other_details'>
                    City: <input type="text" onChange={e => {setUser({...user, city: e.target.value})}} placeholder={user.address.city} /><br/>
                    Street: <input type="text" onChange={e => {setUser({...user, street: e.target.value})}} placeholder={user.address.street} /><br/>
                    Zipe Code: <input type="text" onChange={e => {setUser({...user, zipcode: e.target.value})}} placeholder={user.address.zipcode} /><br/>
                </div>
            }
            <br/>
            <input  type="button" value="Update"  onClick={() => props.updateUser(user.id, user)}/>
            {" "}
            <input type="button" value="Delete" onClick={() => props.deleteUser(user.id)}/>
            <br/>
        </div><br/>
    </div>);
}

export default UserComp;