import { useState, useEffect} from "react"

function AddNewTodoComp(props)
{
    const[newTodo,setNewTodo] = useState({title:"" });


    return(<div>
        Add New Todo
        <br/>
        <br/>
        <div className="add_new_todo_and_post">
            Title: <input type="text" onChange={e => {setNewTodo({...newTodo, title: e.target.value})}}/><br/>
            <br/>
            <input type="button" value="Cancel" onClick={() => props.closeAddNewTodo()}/>
            {" "}
            <input type="button" value="Add" onClick={() => props.addTodo(newTodo)}/>
        </div>
    </div>);
}

export default AddNewTodoComp;