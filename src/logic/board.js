import { combosWiner } from "../constants";
export const checkWinner = (boardToCheck)=>{
    for (const combo of combosWiner){
      const [a,b,c] = combo;
      if (boardToCheck[a]!=null &&
          boardToCheck[a]===boardToCheck[b] &&
          boardToCheck[a]===boardToCheck[c]
        ){
          return boardToCheck[a];
      }
    }
    return null; 

}
export const checkEnd = (boardToCheck)=>{
    return boardToCheck.every((square)=>square != null)}