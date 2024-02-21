// import React from "react";
// import { useState } from "react";
// import AddTask from '../App';

// function AddTaskForm() {
//     const [descr, setDescr] = useState("");

//     const handleSubmit = (event) => {
//         alert(`Form has been submitted.\n\tDescription:  ${descr}`);
//         event.preventDefault();
        
//         AddTask({descr});
//         setDescr("");
//     }
  
//     return (
//       <form className="NewTaskForm" onSubmit={handleSubmit}>
//         <label>Description:
//           <input 
//             type="text" 
//             value={descr}
//             onChange={(e) => setDescr(e.target.value)}
//           />
//         </label>
//         <input type="submit" />
//       </form>
//     )

// }

// export default AddTaskForm;