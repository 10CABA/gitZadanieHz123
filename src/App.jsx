import './App.css'
import MyForm from './MyForm'

import Card from './Card'
import UserCard from './UserCard'
import Button from './Button'
import TodoList from './TodoList'

function App() {
  const handleAlert = () => {alert("First btn")}
  const handleLog = () => {console.log("Second btn")}

  return (
    <div>
       <div style={{ marginBottom: '40px' }}>
        <TodoList />
      </div>
      <div style={{marginBottom: '40px'}}>
        <MyForm/>
        </div>
      <div>
       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
       <Card>
          <UserCard name="Мамут" age={40} />
        </Card>

        <Card>
          <UserCard name="Анна" age={18} />
        </Card>

        <Card>
          <UserCard name="Макс" age={2} />
        </Card>
       </div>

       <Button onClick={handleAlert}>1</Button>
       <Button onClick={handleLog}>2</Button>
    </div>
    </div>
  )
}

export default App
