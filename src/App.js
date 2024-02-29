import './App.css';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(loadTaskData());
  const [savedTasks, setSavedTasks] = useState([]);
  const [descr, setDescr] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [stDescr, setSTDescr] = useState("");
  const [subTasks, setSubTasks] = useState([]);

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
    let newID = uuidv4();
    
    if(descr.length > 0) {
      setTasks(
        [...tasks, 
            { id: newID, 
              description: descr,
              isComplete: false,
            }
        ]
      );  
    }
    setDescr("");
  }

  const handleAddSubItem = (event) => {
    event.preventDefault();
    const results = tasks.filter((task)=>task.description === searchStr);

    if (results.length > 0 ) {
      const taskID=results[0].id;
      const newID = uuidv4();

      if (stDescr.length > 0) {
        setSubTasks(
          [...subTasks, 
              { taskID: taskID,
                id: newID, 
                description: stDescr,
                isComplete: false,
              }
          ]
        );  
      }

      //  decided not to clear the search string, because sometimes it's handy to leave it
      //  if you want to add more than one sub-task to a task.
      //      setSearchStr("");
      setSTDescr("");  
    }

  }

  return (
    <div className="App">

      <div className = "pageHeader">
        <h1>Abe Fisher's To Do List</h1>
        <h2>Version 2.0.0</h2>
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

          <form  onSubmit={handleAddSubItem}>
            <h2 className="card-title">Add Sub-Task</h2>
            <h3 className = "card-description">Parent Item Name:
              <input 
                className="input-box"
                type="text" 
                value={searchStr}
                onChange={(e) => setSearchStr(e.target.value)}
                disabled={tasks.length == 0}
              />
            </h3>
            <h3 className="card-description">Sub Item Description:
            <input 
                className="input-box"
                type="text" 
                value={stDescr}
                onChange={(e) => setSTDescr(e.target.value)}
                disabled={tasks.length == 0}
              />
              </h3>
            <input type="Submit" id="updateBtn" value="Add Sub-Item" disabled={!UpdateFormValid(searchStr, stDescr)}/>
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
              const id = event.currentTarget.id;
              setTasks(tasks.map((task) =>
                  task.id === id ? { ...task, isComplete: !task.isComplete } : task
                ))          
            }}

            DeleteTask = {(event) => {
              const id = event.currentTarget.id;
              const newList = tasks.filter((task) => task.id != id);
              setTasks(newList);
            }} 

            MarkSTComplete = {(event) => {
              const id = event.currentTarget.id;

              //  Get task ID from subtask id
              const st = subTasks.filter((task)=>id === id);
              const taskID = st.length > 0 ? st[0].taskID : null;

              //  Update state of sub-task
              setSubTasks(
                subTasks.map((subTask) =>
                  subTask.id === id ? { ...subTask, isComplete: !subTask.isComplete } : subTask
                ))     

              //  Then check to see if we need to update the completion status of the parent task
              if (taskID !== null) {
                const subs = subTasks.filter((subtask)=>subtask.taskID === taskID && !subtask.isComplete);
                if (subs.length > 0) {
                    //  there is at least one subtask that is still incomplete
                    setTasks(tasks.map((task) =>
                    task.id === taskID ? { ...task, isComplete: true } : task
                  ))          
                }
                else {
                  //  all sub-tasks are complete, so mark the task complete as well
                  setTasks(tasks.map((task) =>
                  task.id === taskID ? { ...task, isComplete: false } : task
                  ))
                }  
              }  
            }}

            DeleteST = {(event) => {
              const id = event.currentTarget.id;
              const newList = subTasks.filter((subTask) => subTask.id != id);
              setSubTasks(newList);
            }} 

            subTasks = {subTasks}
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

  function UpdateFormValid(searchStr, stDescr) {
    if (searchStr.length == 0) return false;
    if (stDescr.length == 0) return false;
    return true;
  }
  
}

export default App;
