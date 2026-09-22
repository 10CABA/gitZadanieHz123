function Button({ onClick, children }) {
    return (
      <button onClick={onClick} style={{margin: '5px', padding: '10px 15px'}}>
        {children}
      </button>
    )
  }
  
  export default Button