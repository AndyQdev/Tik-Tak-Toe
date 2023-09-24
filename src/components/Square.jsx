export const Square = ({children, isSelect, updateBoard, TurnComputador, index})=>{
    const className= `square ${isSelect ? 'is-selected':''}`
    
    const handleClick = ()=>{
      updateBoard(index);
      if (TurnComputador!=undefined)
        TurnComputador(index)
    }
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }