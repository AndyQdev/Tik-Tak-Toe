import { Square } from "./Square";
export function WinnerModal({winner, resetJuego}){
    if (winner === null) return null
    const winnerText = winner === false ? 'Empate':'Ganó: ';
    return(
      <section className='winner'>
          <div className='text'>
            <h2>
              {winnerText}
            </h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>
            <button onClick={resetJuego}>Volver a Jugar</button>
          </div>
      </section>
    )
}