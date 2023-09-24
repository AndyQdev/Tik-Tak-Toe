import { useState } from 'react'
import './App.css'
import { Square } from './components/Square'
import { TURNS, Fichas} from './constants'
import { WinnerModal } from './components/WinnerModal'
import conffetti from "canvas-confetti"
import { checkEnd, checkWinner } from './logic/board'
import { RandomComputador } from './logic/randomNum'
import { pos } from './logic/randomNum'

function App() {
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board'); 
    return boardFromStorage ? JSON.parse(boardFromStorage): Array(9).fill(null) ;
  })
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ??TURNS.x
  });
  const [winner, setwinner] = useState(null);

  const [fichaJugador, setFichaJugador] = useState(()=>{
    const fichaJStorage = window.localStorage.getItem('fichaJ')
    return fichaJStorage ? fichaJStorage: null;
  })
  const [fichaComputador, setFichaComputador] = useState(()=>{
    const fichaCStorage = window.localStorage.getItem('fichaC')
    return fichaCStorage ? fichaCStorage: null;
  })

  const [GameClass, setGameClass] = useState(()=>{
    const GameStorage = window.localStorage.getItem('Game')
    return GameStorage? GameStorage: 'game inicial';
  })

  const [TableroClass, setTablero] = useState(()=>{
    const TableroStorage = window.localStorage.getItem('Tablero')
    return TableroStorage? TableroStorage: 'Tablero inicial';
  })

  const SelectFJugador = (index)=>{
    if (fichaComputador===Fichas[index]) return
        const newFicha = Fichas[index];
        TURNS.x = newFicha;
        setFichaJugador(newFicha);
  } 

  const SelectFComputador = (index)=>{
      if (fichaJugador===Fichas[index]) return
        const newFicha = Fichas[index];
        TURNS.o = newFicha
        setFichaComputador(newFicha);
  }


  TURNS.o = fichaComputador;
  TURNS.x = fichaJugador;
  const resetJuego = ()=>{
    setBoard(Array(9).fill(null));
    setwinner(null);
    setTurn(TURNS.x);
    // pos = [];
    pos.splice(0, pos.length)
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
    //borramos la anterior partida
    window.localStorage.removeItem('fichaJ');
    window.localStorage.removeItem('fichaC');
    window.localStorage.removeItem('Game');
    window.localStorage.removeItem('Tablero');
    const TableroClass = document.querySelectorAll(".Tablero");
    const GameClass = document.querySelector(".game");
    GameClass.classList.add('inicial');
    TableroClass[0].classList.add('inicial');
    TableroClass[1].classList.add('inicial');
  }
  const empezarJuego = ()=>{
    //escuchamos las clases
    const TableroClass = document.querySelectorAll(".Tablero.inicial")
    const GameClassName = document.querySelector(".game.inicial")
    //actualizamos las clases
    GameClassName.classList.remove('inicial');
    TableroClass[0].classList.remove('inicial');
    TableroClass[1].classList.remove('inicial');
    setTurn(TURNS.x);
    //guardamos la partida
    window.localStorage.setItem('fichaJ',fichaJugador);
    window.localStorage.setItem('fichaC',fichaComputador);
    window.localStorage.setItem('Game',GameClassName.classList.value);
    window.localStorage.setItem('Tablero',TableroClass[0].classList.value);
  }
  const newBoard = [...board];
  let newTurn = turn;

  const updateBoard = (index)=>{
    if(board[index]!=null || winner!=null) return
    /*Actualizamos el turno*/  

    newBoard[index] = (newTurn===TURNS.x)? turn: newTurn; 
    newTurn = newTurn === TURNS.x ? TURNS.o: TURNS.x;
    setBoard(newBoard);      
    setTurn(newTurn);
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner){ 
      conffetti()   
      setwinner(newWinner);
    }
    else if (checkEnd(newBoard))
       setwinner(false)
  }

  const TurnComputador = (index)=>{
    const number = RandomComputador(index);
    updateBoard(number);
  }
  return (    
    <div className='cuerpo'>
      <section className='Fichas in-flex'>
        <h1>Ficha Jugador</h1>
        <section className={TableroClass}>
          {
            Fichas.map((square, index)=>{
              return (
                <Square index={index} key={index} isSelect={square === fichaJugador} updateBoard={SelectFJugador}>
                  {square}
                </Square>
              )
            })
          }
        </section>
        <h1>Ficha Computador</h1>
        <section className={TableroClass}>
          {
            Fichas.map((square, index)=>{
              return (
                <Square index={index} key={index} isSelect={square === fichaComputador} updateBoard={SelectFComputador}>
                  {square}
                </Square>
              )
            })
          }
        </section>
      </section>
      <main className="board in-flex">
        <h1>Tik Tak Toe</h1>
        <button onClick={empezarJuego}>Empezar Juego</button>
        <button onClick={resetJuego}>Reset del juego</button>
        <section className={GameClass}>
          {
            board.map( (square, index)=>{
              return(
                <Square index={index} key={index} updateBoard={updateBoard} TurnComputador={TurnComputador}>
                  {square}
                </Square>
              )
            })
          }
        </section>
        <section className='turn'>
          <Square isSelect = {(turn ===TURNS.x) && TURNS.x!=''}>
            {TURNS.x}
          </Square>
          <Square isSelect = {(turn ===TURNS.o) && TURNS.o!=''}>
            {TURNS.o}
          </Square>
        </section>
        <WinnerModal resetJuego={resetJuego} winner={winner}/>
      </main>
    </div>
  )
}

export default App
