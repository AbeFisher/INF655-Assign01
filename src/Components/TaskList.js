import React from "react";
import Task from "./Task";

function TaskList({tasks, MarkComplete, DeleteTask, MarkSTComplete, DeleteST, subTasks}) {
    return (
        <div className="taskPanel">
        <h2 className="card-title">To Do Item List</h2>
            {tasks.map((task)=> (
                <Task key={task.id} 
                    id={task.id}
                    description={task.description} 
                    isComplete={task.isComplete}
                    MarkComplete={MarkComplete} 
                    DeleteTask={DeleteTask}
                    MarkSTComplete={MarkSTComplete}
                    DeleteST={DeleteST}
                    subTasks={subTasks}
                />
            ))}
        </div>
    );        
}

export default TaskList;