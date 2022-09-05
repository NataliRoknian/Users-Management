import { useState } from "react"

function TodosComp(props)
{
    //update todo from uncompleted to completed
    const updateTodo = () =>
    {   
        props.updateTodo(props.todoData.id);
    }

    

    return(<div>
        <div className="todo_and_post_frame">
            <strong>Title :</strong> {props.todoData.title}<br/>
            <strong>Completed :</strong> {props.todoData.completed? 'True' : 'False'} <br/>
            {
                !props.todoData.completed && <div>
                    <input type="button" value="Mark Completed" onClick={updateTodo} style={{marginLeft:"260px"}}></input>
                </div>
            } 
        </div>
        <br/>
    </div>);
}

export default TodosComp;