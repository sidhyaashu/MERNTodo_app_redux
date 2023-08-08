import axios from 'axios';
import './App.css'
import { useState,useRef } from 'react'
import { useLocation } from 'react-router-dom'


const Todo = () => {
    const location = useLocation() // using useLocation
    const [task, setTask] = useState([]);
    const taskInputRef = useRef()

    const addTask=(e)=>{
        e.preventDefault()
        const taskText = taskInputRef.current.value.trim();
        if(taskText !==""){
            setTask((prevTask)=>[...prevTask,taskText])
            taskInputRef.current.value = "";
        }
        console.log("Tasks are ",task)

    }


    const toggleTask=(index)=>{
        setTask((prevTask)=>{
            const updatedTask = [...prevTask]
            updatedTask.splice(index,1)
            return updatedTask
        })
    }

    const saveTask =async()=>{
        try {
            await axios.post("http://localhost:4000/addTask",{
                username:location.state.username,
                task
            })
            console.log("Task saved succesfully")
        } catch (error) {
            console.log("Error while save task",error)
        }
    }




  return (
    <>
    <div  className='container' >
      <h2>Todo List</h2>
      <div className="input-container">
        <input type="text" className='todoInput' placeholder='Add todo' ref={taskInputRef} />
        <button className='add-btn' onClick={addTask} >
            Add
        </button>
        
      </div>
    </div>

    <ul className="task-list">
        {
            task.map((task,index)=>(
                <li className='task-li' key={index}>
                    <input type="checkbox" className='taskCheck' 
                    onChange={()=>toggleTask(index)}
                    />
                    <span className="task-text">{task}</span>
                </li>
            ))
        }
        <button className='upload-task' onClick={saveTask} >Save</button>
    </ul>
    
    </>
  )
}

export default Todo
