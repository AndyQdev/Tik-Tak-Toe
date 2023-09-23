export const Square = ({children, isSelect, updateBoard, index})=>{
    const className= `square ${isSelect ? 'is-selected':''}`
    
    const handleClick = ()=>{
      updateBoard(index);
    }
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }