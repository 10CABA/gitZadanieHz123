import { useEffect, useState } from 'react'

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      return JSON.parse(saved)
    }
    return [
      { id: 1, title: 'task 1', done: true },
      { id: 2, title: 'task2', done: false },
      { id: 3, title: 'task 3', done: false },
    ]
  });

  const [inputValue, setInputValue] = useState('')
  const [deadlineValue, setDeadlineValue] = useState('')


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  
  const addTask = (e) => {
    e.preventDefault()
    if (inputValue.trim() === '') return
    const newTask = {
      id: Date.now(),
      title: inputValue,
      done: false,
      deadline: deadlineValue
    }

    setTasks([...tasks, newTask])
    setInputValue('')
    setDeadlineValue('')
  }

  const getTaskColor = (task) => {
    if (task.done || !task.deadline) return 
    const nowT = new Date
    const deadline = new Date(task.deadline)
    const diffTime = deadline - nowT

    if (diffTime<0) return '#ff0000'
    if (diffTime < 86400000) return '#ffee00'
    return '#06731d'
  }

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
  }

  
  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, done: !task.done }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  return (
      <div style={{ padding: '20px', textAlign: 'left' }}>
      <h3>Task list</h3>

      <form onSubmit={addTask} style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="New task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <input
          type="datetime-local"
          value={deadlineValue}
          onChange={(e) => setDeadlineValue(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      {tasks.length === 0 ? (
        <p>Empty list</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 10 }}>
          {tasks.map(task => (
            <li 
              key={task.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                backgroundColor: getTaskColor(task),
                padding: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input 
                  type="checkbox" 
                  checked={task.done} 
                  onChange={() => toggleTask(task.id)} 
                />

                <span style={{ textDecoration: task.done ? 'line-through' : 'none'}}>
                  {task.title}
                </span>
              </div>
              

              <button 
                onClick={() => deleteTask(task.id)}>Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TodoList
