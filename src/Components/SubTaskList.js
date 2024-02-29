import React from "react";
import SubTask from "./SubTask";

export default function SubTaskList({subTasks, MarkSTComplete, DeleteST}) {
    return (
        <div>
            {subTasks.map((subTask)=> (
                
                <SubTask key={subTask.id}
                    taskID ={subTask.taskID}
                    id={subTask.id}
                    description={subTask.description} 
                    isComplete={subTask.isComplete}
                    MarkSTComplete={MarkSTComplete} 
                    DeleteST={DeleteST}
                />
            ))}
        </div>
    );        
}
