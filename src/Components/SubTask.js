import React from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function SubTask({
    taskID,
    id, 
    description, 
    isComplete,
    MarkSTComplete,
    DeleteST
    }) {

    return (
        <div className="sub-task">
            <div className="sub-task-actions">
                <Item taskID={taskID} id={id} isComplete={isComplete} MarkSTComplete={MarkSTComplete}/>
                <button taskID={taskID} id={id} onClick={DeleteST}><FaTrashAlt /></button>
            </div>
            <div className="sub-task-descr">
                <Desc isComplete={isComplete} description={description}/>
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

function Item({taskID, id, isComplete, MarkSTComplete}) {
    if (isComplete) {
        return (
            <input type="checkbox" 
                taskID={taskID}
                id={id} 
                name = "complete" 
                onClick={MarkSTComplete}
                checked
                onChange={()=>{}} />
        )    
    }
    else {
        return (
            <input type="checkbox"
                taskID={taskID} 
                id={id} 
                name = "complete"
                onClick={MarkSTComplete}
                    />
        )
    }
}
