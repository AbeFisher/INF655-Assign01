import './App.css';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import {useState, useEffect} from 'react';

function App() {
  const [tasks, setTasks] = useState(loadTaskData());
  const [savedTasks, setSavedTasks] = useState([]);
  const [descr, setDescr] = useState("");
  const [newDescr, setNewDescr] = useState("");
  const [idNum, setIdNum] = useState("");

  //  Load stored task data, if any
  function loadTaskData() {
    const tasksJSON = localStorage.getItem('taskData');
    return tasksJSON !==null ? JSON.parse(tasksJSON) : [];
  }

  const dateJSON = localStorage.getItem('dateStamp');
  const dateStamp = dateJSON !== null ? `Last Updated: ${JSON.parse(dateJSON)}` : '';

  //  Save task data to local storage
  useEffect(() => {
    const newDate = new Date().toLocaleDateString();
    localStorage.setItem('taskData', JSON.stringify(tasks));
    localStorage.setItem('dateStamp', JSON.stringify(newDate));
  }, [tasks]);

  const handleAddItem = (event) => {
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

  const handleUpdateItem = (event) => {
    event.preventDefault();
    
    const id = idNum;
    const newList = [...tasks];
    newList[id].description = newDescr;
    setTasks(newList);                

    setNewDescr("");
    setIdNum("");
  }



  return (
    <div className="App">

      <div className = "pageHeader">
        <h1>Abe Fisher's To Do List</h1>
        <h2>Version 1.0.0</h2>
        <h3>{dateStamp}</h3>
      </div>

      <div className="cardContainer">

        <div className = "card">
          <form  onSubmit={handleAddItem}>
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

          <form  onSubmit={handleUpdateItem}>
            <h2 className="card-title">Update Task Item</h2>
            <h3 className = "card-description">Description:
              <input 
                className="input-box"
                type="text" 
                value={newDescr}
                onChange={(e) => setNewDescr(e.target.value)}
                disabled={tasks.length == 0}
              />
            </h3>
            <div className="item-id-panel">
              <h3 className="nbr-box-label">Item ID:</h3>
              <input 
                  className="nbr-input-box"
                  type="text" 
                  value={idNum}
                  onChange={(e) => setIdNum(e.target.value)}
                  disabled={tasks.length == 0}
                />
              <input type="Submit" id="updateBtn" value="Update" disabled={!UpdateFormValid(newDescr, idNum, tasks.length)}/>
            </div>
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

  function UpdateFormValid(newDescr, idNum, count) {
    if (newDescr.length == 0) return false;
    if (idNum.length == 0) return false;
    if (!Number.isInteger(parseInt(idNum))) return false;
    if (idNum <0 || idNum >count) return false;
    return true;
  }
  
}

export default App;
