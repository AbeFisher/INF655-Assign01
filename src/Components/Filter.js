import React from "react";
import { useState } from "react";
import ReactDOM from 'react-dom/client';


function Filter({tasks, FilterTasks}) {
    
    return (
        <>
            <h2>Select Items to Display:</h2>
            <div class="rbPanel">
                <input className="rbtn"
                    type="radio" 
                    id="A"
                    name = "display" 
                    onClick={FilterTasks}
                    defaultChecked
                />
                <label className="rbLabel" for="A">All Tasks</label>
            </div>

            <div class="rbPanel">
                <input className="rbtn"
                    type="radio" 
                    id="C"
                    name = "display" 
                    onClick={FilterTasks}
                />
                <label className="rbLabel" for="C">Completed Tasks</label>
            </div>

            <div class="rbPanel">    
                <input className="rbtn"
                    type="radio" 
                    id="I"
                    name = "display" 
                    onClick={FilterTasks}
                />
                <label className="rbLabel" for="I">Incomplete Tasks</label>
            </div>
        </>

    );

}

export default Filter;