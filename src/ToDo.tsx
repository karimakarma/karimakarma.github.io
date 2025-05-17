import React, { useEffect, useState } from 'react'
import Task from './Task'
import TextField from './TextField'
import './App.css'

export default function ToDo({show}: {show: boolean}) {
  if(show) {
    toDoContainer = {...toDoContainer, right:"0%"}
  } else {
    toDoContainer = {...toDoContainer, right:"-100vw"}
  }
  const [input, setInput] = useState<string>('')

  const storedTasks = localStorage.getItem('tasksList')
  const [tasksList, setTasksList] = useState<string []>([...storedTasks ? JSON.parse(storedTasks) : ""])

  // Save tasks to local storage whenever tasksList changes
  useEffect(() => {
    localStorage.setItem('tasksList', JSON.stringify(tasksList))
  }, [tasksList])

  // Methods
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
  }

  function addTask() {
    setTasksList(tl => [...tl, input])
  }

  function removeTask(index: number) {
    setTasksList(tasksList.filter( (_, i) => i !== index))
  }

  function moveUp(index: number) {
    if(index !== undefined && index !== 0){
      const newIndex: number = index-1
      const copy = [...tasksList]
      const [task] = copy.splice(index, 1)
      copy.splice(newIndex, 0, task)
      setTasksList(copy)
    }
  }

  function moveDown(index: number) {
    if (index !== undefined && index !== tasksList.length - 1) {
      const newIndex: number = index + 1
      const copy = [...tasksList]
      const [task] = copy.splice(index, 1)
      copy.splice(newIndex, 0, task)
      setTasksList(copy)
    }
  }

  // Render
  return (
    <div style={toDoContainer}>
      <h1 style={{marginBottom: "1rem"}}>TO DO!!</h1>

      {tasksList.map( (t, i) => {
        return(
          <Task 
          value={t} 
          key={i} 
          removeTask={() => removeTask(i)} 
          moveUp={() => moveUp(i)} 
          moveDown={() => moveDown(i)}
          conditionalRounding={i === 0 ? "First" : i === tasksList.length-1 ? "Last" : undefined}
          />
        )
      })}

      <TextField onChange={ e => handleInputChange(e)} addTask={addTask}/>
    </div>
  )
}

let toDoContainer: React.CSSProperties = {
  display: "block",
  position: "relative",
  right: "-100vw",
  transition: "all 0.5s ease-in-out",
}