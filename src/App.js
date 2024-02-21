import './App.css';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import {useState} from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [savedTasks, setSavedTasks] = useState([]);
  const [descr, setDescr] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let nextID = GetNextID();
    
    if(descr.length > 0) {
      setTasks(
        [...tasks, 
            { id: nextID, 
              description: descr,
              isComplete: false,
            }
        ]
      );  
    }

    setDescr("");
  }

  return (
    <div className="App">

      <div className = "pageHeader">
        <h1>Abe Fisher's To Do List</h1>
        <h2>Version 1.0.0</h2>
        <h3>Last Updated {new Date().toLocaleDateString()}</h3>
      </div>

      <div className="cardContainer">

        <div className = "card">
          <form  onSubmit={handleSubmit}>
            <h2 className="card-title">Add New To Do List Item</h2>
            <h3 className = "card-description">Description:
              <input 
                className="input-box"
                type="text" 
                value={descr}
                onChange={(e) => setDescr(e.target.value)}
              />
            </h3>
            <input type="Submit" value="Add Item" disabled={descr.length==0}/>
          </form>
          
          <Filter tasks={tasks}
                FilterTasks = {(event) => {
                  const cmp = document.getElementById("C");
                  const inc = document.getElementById("I");
                  const all = document.getElementById("A");
                  let tempArray = [];

                  //  save full set of tasks to restore to if necessary
                  setSavedTasks(tasks);
          
                  if (cmp.checked) {
                      tempArray = (savedTasks.length > tasks.length) ? savedTasks : tasks;
                      setSavedTasks(tempArray);
                      const newList = tempArray.filter((task) => task.isComplete == true);
                      setTasks(newList);
                  }

                  if (inc.checked) {
                    tempArray = (savedTasks.length > tasks.length) ? savedTasks : tasks;
                    setSavedTasks(tempArray);
                    const newList = tempArray.filter((task) => task.isComplete == false);
                    setTasks(newList);
                  }

                  if (all.checked) {
                    setTasks(savedTasks);
                  }

                }} 
          />
        </div>

        <TaskList tasks = {tasks} 
            MarkComplete = {(event) => {
              const id = event.currentTarget.id-1;
              const newList = [...tasks];
              newList[id].isComplete = !newList[id].isComplete;
              setTasks(newList);                
            }}
            DeleteTask = {(event) => {
              const id = event.currentTarget.id;
              const newList = tasks.filter((task) => task.id != id);
              setTasks(newList);
            }} 
        />    

       </div>

    </div>
  );

 
  function GetNextID() {
      let ID = 0;
      tasks.forEach(function(task) 
          {
              if (task.id > ID) ID = task.id;
          }
      )
      return ID+1;
  }
  
}

export default App;
