import { useState, useEffect} from "react"

function AddNewUserComp(props)
{
    const[newUser,setNewUser] = useState({name:"" , email: ""});

    useEffect(() =>
    {
        setNewUser({...newUser, id: props.newUserId});
    },[])

    return(<div>
        Add New User 
        <br/>
        <br/>
        <div className="add_new_user">
            Name: <input type="text" onChange={e => {setNewUser({...newUser, name: e.target.value})}}/><br/>
            Email: <input type="text" onChange={e => {setNewUser({...newUser, email: e.target.value})}}/><br/>
            <br/>
            <input type="button" value="Cancel" onClick={() => props.closeAddNewUser()}/>
            {" "}
            <input type="button" value="Add" onClick={() => props.addUser(newUser)}/>
        </div>
    </div>);
}

export default AddNewUserComp;