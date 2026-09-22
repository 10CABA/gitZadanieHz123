function Card({ children }) {
    return (
      <div style={{ border: '1px solid gray', padding: '15px', margin: '10px'}}>
        {children}
      </div>
    )
  }
  
  export default Card