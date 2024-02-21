import React from "react";

function Task({id, description, isComplete, MarkComplete, DeleteTask}) {

    return (
        <div className="task">
            <Item id={id} isComplete={isComplete} MarkComplete={MarkComplete}/>
            <Desc isComplete={isComplete} description={description}/>
            <button id={id} onClick={DeleteTask}>Delete</button>
        </div>
    )
}

function Desc({isComplete, description}) {
    if (isComplete) {
        return ( <span className="complete">{description}</span> )
    }
    else {
        return ( <span>{description}</span> )
    }
}

function Item({id, isComplete, MarkComplete}) {
    if (isComplete) {
        return (
            <input type="checkbox" 
                   id={id} 
                   name = "complete" 
                   onClick={MarkComplete}
                   checked />
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