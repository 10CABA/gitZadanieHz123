import { useState } from 'react';

function MyForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {
        if (email.includes("@") === false) {
            alert("Email must contain the @ symbol")
            return
        }

        let hasNum = false
        let hasSymb = false
        const specialSymbols = "!@#$%^&*()_+~`|}{[]:;?><,./-="

        if (password.length < 8) {
            alert("Password cant be less then 8 chars")
            return
        }

        for (let i = 0; i < password.length; i++) {
            const char = password[i]
            if (char >= '0' && char <= '9') {hasNum = true}
            if (specialSymbols.includes(char)) {hasSymb = true}
        }

        if (hasNum === false || hasSymb === false) {
            alert("Password must contain 1 digit and 1 special symbol")
            return
        }
    }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Form</h2>
      
      <div>
        <label>Name: </label>
        <input 
          type="text" 
          placeholder="name" 
          value={name} 
          onChange={(e) => {
            console.log("Name:", e.target.value)
            setName(e.target.value)
          }} 
        />
      </div>

      <div>
        <label>Email: </label>
        <input 
          type="text" 
          placeholder="email" 
          value={email} 
          onChange={(e) => {
            console.log("Email:", e.target.value)
            setEmail(e.target.value)
          }} 
        />
      </div>

      <div>
        <label>Password: </label>
        <input 
          type="password" 
          placeholder="password" 
          value={password} 
          onChange={(e) => {
            console.log("Password:", e.target.value)
            setPassword(e.target.value)
          }} 
        />
      </div>

      <button type="submit">send</button>

      <div><h2>Name: {name}</h2></div>
      <div><h2>Email: {email}</h2></div>
      <div><h2>Password: {password}</h2></div>
    </form>
  )
}


export default MyForm