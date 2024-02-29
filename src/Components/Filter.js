import React from "react";
import { useState } from "react";
import ReactDOM from 'react-dom/client';


function Filter({tasks, FilterTasks}) {
    
    return (
        <div className="filter">
            <h2>Select Items to Display:</h2>
            <div className="rbPanel">
                <input className="rbtn"
                    type="radio" 
                    id="A"
                    name = "display" 
                    onClick={FilterTasks}
                    defaultChecked
                />
                <label className="rbLabel" htmlFor="A">All Tasks</label>
            </div>

            <div className="rbPanel">
                <input className="rbtn"
                    type="radio" 
                    id="C"
                    name = "display" 
                    onClick={FilterTasks}
                />
                <label className="rbLabel" htmlFor="C">Completed Tasks</label>
            </div>

            <div className="rbPanel">    
                <input className="rbtn"
                    type="radio" 
                    id="I"
                    name = "display" 
                    onClick={FilterTasks}
                />
                <label className="rbLabel" htmlFor="I">Incomplete Tasks</label>
            </div>
        </div>

    );

}

export default Filter;