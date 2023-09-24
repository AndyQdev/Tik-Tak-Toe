
const randomNumer = (min, max)=>{
    return (Math.floor(Math.random() * (max-min)))+min
}

export let pos = Array();

export const RandomComputador = (index)=>{
    let number = randomNumer(0,9);
    pos.push(index);
    let i = 0; 
    while (i < pos.length){
        if (pos.length>=8) return null
        if (pos[i]===number){
            number = randomNumer(0,9)
            i = 0;
        } else 
            i++
    }
    pos.push(number)
    return number;
}