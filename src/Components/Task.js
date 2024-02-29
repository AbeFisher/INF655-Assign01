import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import SubTaskList from "./SubTaskList";

function Task(
    {   id, 
        description, 
        isComplete, 
        MarkComplete, 
        DeleteTask, 
        MarkSTComplete, 
        DeleteST,
        subTasks,}
    ) {

    return (
        <div className="task-card">
            <div className="task">
                <div className = "task-actions">
                    <Item id={id} isComplete={isComplete} MarkComplete={MarkComplete}/>
                    <button id={id} onClick={DeleteTask}><FaTrashAlt /></button>
                </div>
                <div className="task-descr">
                    <Desc isComplete={isComplete} description={description}/>
                </div>
            </div>
            <div className="sub-tasks">
                <SubTaskList subTasks={subTasks.filter((subtask)=> subtask.taskID === id)}
                             MarkSTComplete={MarkSTComplete}
                             DeleteST={DeleteST}
                />
            </div>
        </div>
    )
}

function Desc({isComplete, description}) {
    if (isComplete) {
        return ( <div className="complete">{description}</div> )
    }
    else {
        return ( <div>{description}</div> )
    }
}

function Item({id, isComplete, MarkComplete}) {
    if (isComplete) {
        return (
            <input type="checkbox" 
                   id={id} 
                   name = "complete" 
                   onClick={MarkComplete}
                   checked
                   onChange={()=>{}} />
        )    
    }
    else {
        return (
            <input type="checkbox" 
                   id={id} 
                   name = "complete"
                   onClick={MarkComplete}
                    />
        )
    }
}

export default Task;