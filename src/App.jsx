import { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [task , setTask] = useState("")
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    let taskSting = localStorage.getItem("tasks");
    if(taskSting){
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      setTasks(tasks);
    }
  },[])

  const saveLocalS = () =>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
  }


  const addHandle = () => {
    setTasks([...tasks,{ id:uuidv4() , task , isCompleted : false}]);
    setTask("");
    saveLocalS();
  }


  const handleChange = (e) => {
    setTask(e.target.value);
  }

  const editHandle = (e,id) =>{
    let currTasks = tasks.filter(item =>{
      return item.id === id ;
    })
    setTask(currTasks[0].task)
    let newTasks = tasks.filter(item =>{
      return item.id !== id
    }) ;
    setTasks(newTasks);
    saveLocalS()
  }


  const deleteHandle = (e,id) =>{
    let newTasks = tasks.filter(item =>{
      return item.id !== id
    }) ;
    setTasks(newTasks);
    saveLocalS()
  }

  const handleCheckbox = (e) =>{
      let id = e.target.name ;
      let index = tasks.findIndex((item) =>{
        return item.id === id ;
      })
      
      let newTasks = [...tasks] ;
      newTasks[index].isCompleted = !(newTasks[index].isCompleted );
      setTasks(newTasks);
      saveLocalS()

  }

  return (
      <>
          <div className="container bg-blue-500 ">
                <div className="todo-container h-1/2 w-2/5 bg-slate-700" >
                  <div className="inputs">
                    <input  type="text"  id="txt"  onChange={handleChange} value={task}/>
                    <input type="button"  onClick={addHandle} value="Add"  className='btn'/>
                  </div>
                  {tasks.length == 0 && <div>No task to display</div>}
                  {tasks.map((item) =>{
                     return <div key={item.id} className="task">
                      <input type="checkbox" onChange={handleCheckbox} name={item.id} value={item.isCompleted} id="" />
                    <div className={item.isCompleted? "line-through" : ""}>{item.task}</div>
                    <div className="icons">
                      <button onClick={(e)=>editHandle(e,item.id)} className="btns">Edit</button>
                      <button onClick={(e)=>{deleteHandle(e,item.id)}} className="btns">Delete</button>
                    </div>
                  </div>
                  })}
                   
                </div>
          </div>
        </>
  )
}

export default App
