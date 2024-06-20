import { useState } from "react";

let RANDOM = 0;

const rangeNumber = {
  x0: 3,
  x1: 7
};

interface SelectionProps extends React.HtmlHTMLAttributes<HTMLSelectElement>{
  data: number[];
}

function Selection({data, ...rest}:SelectionProps){
  return(
    <select {...rest}>
      <option value={0}>Selecione</option>
      {data.map((props, index)=><option key={index} value={props}>{props}</option>)}
    </select>
  )
}

function genereteRandomNumber(x0: number, x1:number){
  while(true){
    const number = Math.round(Math.random()*Math.pow(Math.round(Math.random()*Math.pow(2, 4)), 10));
    if(!RANDOM)
      RANDOM = number;
    if(number <= x1 && number >= x0){
      if(RANDOM === number)
        genereteRandomNumber(1, 7);
      return number;
    }
  } 
}

function genereteArrayNumbers(x0: number, x1: number){
  const numbers:number[] = [];

  for(let i = x0; i <= x1; i++){
    numbers.push(i);
  }

  return numbers;
}

export default function App(){
  const [ userSelectedNumber, setUserSelectedNumber ] = useState(0);
  const [ computerNumber, setComputerNumber ] = useState(0);
  const [ message, setMessage ] = useState("");

  const onUserFinished = ()=>{
    if(userSelectedNumber == computerNumber){
      setMessage('Voce acertou!!!');
    }else{
      setMessage('voce Errrou!!!');
    }

    setTimeout(()=>{
      setMessage('');
      const randomNumber = genereteRandomNumber(rangeNumber.x0, rangeNumber.x1)
      setComputerNumber(randomNumber);
    }, 3000);
  }

  const rangeGenerateNumbers:number[] = genereteArrayNumbers(rangeNumber.x0, rangeNumber.x1); 
  
  return(
    <div>
      <h2>Jogo de advinhação</h2>
      {
        !!userSelectedNumber && 
        <h1>{userSelectedNumber}</h1>
      }

      {
        !!message && 
        <h1>Numero do computador: {computerNumber}</h1>
      }

      { message && <p>{message}</p>}

      <Selection
        data={rangeGenerateNumbers} 
        onClick={({target}:{target: any})=>setUserSelectedNumber(target.value)}
      />

      <button onClick={onUserFinished}>Confirmar a Escolha</button>

      <button 
        onClick={()=>{
          genereteArrayNumbers(rangeNumber.x0, rangeNumber.x1);
          const randomNumber = genereteRandomNumber(rangeNumber.x0, rangeNumber.x1)
          setComputerNumber(randomNumber);
          setMessage('');
          setUserSelectedNumber(0);
        }}>Gerar novo numero</button>
    </div>
  );
}
