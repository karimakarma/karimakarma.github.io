import { useState } from "react";
import Header from './Header';
import PomodoroTimer from "./PomodoroTimer";
import ToDo from './ToDo';

export default function App() {
  const [showTasks, setShowTasks] = useState(false)

  return(
    <>
    <Header />
    <PomodoroTimer />
      <p style={{marginBottom: "1rem", textDecoration: "underline"}}>
        <a onClick={() => setShowTasks(s => !s)}>{showTasks ? "→ My Tasks" : "← My Tasks"}</a>
      </p>
    <ToDo show={showTasks}/>
    </>
  )
}