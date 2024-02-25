import Button from "../Components/Button";
import { useState, useEffect, useRef } from "react";
import { MdAutoDelete } from "react-icons/md";
import { IoIosTime } from "react-icons/io";

const Delete = ["CO", "CA"];
const Arithmatic = ["+", "-", "*", "/"];
const Numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const validInput = [ ...Numbers,...Arithmatic,...Delete, "=","."];
const Buttons = ["(",")","CO","CA","7","8","9","+","4","5","6","-","1","2"
,"3","*",".","0","=","/"];

function Calculator() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("0");
  const [ans, setAns] = useState(0);
  let doted = useRef(false);
  const balance = useRef(0);
  const reset = useRef(false);
  const scroll = useRef(null);
  const scrollH = useRef(null);
  const [isValid, setIsValid] = useState(true);

  const handleKeyDown = (e)=>{
     let char = String.fromCharCode(e.which);
    
     if(char==="\b") char = "CO";
     if(char==="»")  char = "+";
     if(char==="½") char = "-";
     if(char==="\r") char = "=";
     if(char==="\r") char = "=";
     if(char==="¿") char = "/";
     if(char==="8" && e.shiftKey) char = "*";
     if(char==="9" && e.shiftKey) char = "(";
     if(char==="0" && e.shiftKey) char = ")";
      
     console.log("char: " + char)
     if(validInput.includes(char)){
         handleInput(char);
     }
  }
  const handleInput = (value) => {
    let tempInput = input;
    const lastInput = tempInput[tempInput.length -1 ];

    if (value === "CO") {
      switch(lastInput){
        case "(": balance.current--;
            break;
        case ")": balance.current++;
            break;
        case ".": doted.current = false;
      } 
       tempInput = (tempInput.length==0 || tempInput.length==1)
            ? "0"
            : tempInput.slice(0, -1);
    }
    else if (value === "CA") {
      tempInput = "0";
      balance.current = 0;
    }
    else if (tempInput === "0") {
    
     if ( Arithmatic.includes(value)) {
         tempInput = tempInput + value;
      }
      else if (value === "(") {
        balance.current++;
        tempInput = value;
      }
      else if (value === ".") {
        doted.current = true;
        tempInput = value;
      }
      else if( Numbers.includes(value)) {
        tempInput = value;
      }
    }
    
    else if (Arithmatic.includes(value)) {
      if(lastInput !== "."){
      if(Arithmatic.includes(lastInput)) 
          tempInput = tempInput.slice(0,-1) + value;
       else  tempInput += value;
        doted.current = false;
      }
    }
    else if(Numbers.includes(value)) {
      if (lastInput !== ")") {
        tempInput += value;
      }
    }

    switch(value){
      case "(": 
        if (Arithmatic.includes(lastInput) || lastInput === "(") {
          tempInput += value;
          balance.current++;
          doted.current = false;
        }
        break;
      case ")": 
        if (balance.current > 0 && Numbers.includes(lastInput)) {
          tempInput += value;
          balance.current--;
          doted.current = false;
        }
        break;
      case ".":
        if (!doted.current) {
          tempInput += value;
          doted.current = true;
        }
        break;
      case "=":
        try{
        let a = eval(input);
        setAns(a);
        reset.current = true;
        setHistory((h) => [...h, { i: input, o: a }]);
        tempInput = "0";
        }catch(e){
          console.log("is not valid")
        }
        break;
    }
    setInput(tempInput === "0" ? "0" : tempInput);

  }
  const handleClickAns = ()=>{
    if(Arithmatic.includes(input[input.length]) ){
       let temp = input;
       temp += ans;
       setInput(temp);
       return;
    }
     setInput(ans); 
     reset.current = false;
  }
  useEffect(() => {
    console.log(history);
    scrollH.current.scrollTo({
      left: 0,
      top: scrollH.current.scrollHeight + 20,
    })
  }, [history])

  useEffect(() => {
    try{
      eval(input);
      setIsValid(true);
    }catch(e){
      setIsValid(false);
    }
    scroll.current.scrollTo({
      top: 0,
      left: scroll.current.scrollWidth,
    })

  }, [input])


  return (
    <div className="mx-auto flex flex-col items-center justify-center">
    <div className="flex  lg:flex-row flex-col w-full items-center justify-center gap-10">
     
      <div className="sm:w-[400px]  bg-gray-900 p-3 h-fit mt-10" >
      <div className="w-full flex max-[360px]:flex-col justify-between items-center">
        <h1 className="text-3xl p-3 text-blue-200">Calculator</h1>
        <p className={`text-white px-3 py-1 break-words ${isValid?"bg-green-400":"bg-red-400"} text-sm font-semibold
        `}>{isValid?"Valid Math Expresstion": "is not Valid"}</p>
        </div>
        <div className="w-full rounded-sm border-2 border-blue-200 text-right p-2">

          <input className="
              text-[35px] overflow-scroll invisible-scrollbar
             text-white bg-gray-900 w-full text-right"
            ref={scroll}
            pattern="[0-9\+\-\*/,]*"
            value={input}
            onChange={e=>{setInput(input, e.target.value)}}
            onKeyDown={ handleKeyDown}
          />

          <p className="import Buttontext-[15px] text-slate-700
               p-[3px] bg-gray-300 w-fit rounded-lg ml-auto 
               cursor-pointer hover:text-black
             "
            onClick={ handleClickAns }
          >Ans <span>{ans}</span></p>
        </div>

        <div className="grid grid-cols-4 mt-5  text-center">
        {Buttons.map((val,index)=>(
           <Button key={index} value={val} handleClick={handleInput} />
        ))}
          
         
        </div>
      </div>

      <div className="sm:m-10">
        <h1 className="p-4 text-[20px] bg-blue-700 flex items-center font-semibold text-white">History 
        <span className="text-[15px] text-white underline ml-10 cursor-pointer
        hover:text-white" 
        onClick={()=>{setHistory([]); setAns(0);}}
        > <MdAutoDelete className="w-6 h-6 text-red-200 hover:text-yellow-400"/></span></h1>
        <hr className="border-2 border-gray-100"/>
        <div className="overflow-y-auto 
       max-h-[200px] 
       sm:max-h-[400px] p-4 
       max-w-[300px]
      mostly-customized-scrollbar bg-slate-100"
          ref={scrollH}
        >
          {history.length!==0? 
           ( history.map((h, index) => {
              return (
                <div key={index} className="bg-gray-200 p-2 m-1
                cursor-pointer rounded-lg hover:bg-blue-300 overflow-auto"
                  onClick={() => {
                    setAns(h.o);
                    setInput(h.i)
                  }}
                >
                  <h1>Input : {h.i}</h1>
                  <p className="text-black text-[13px]">Ans :<span className="ml-3"> {h.o}
                  </span></p>
                </div>
              )
            }) )
            : (<div className="w-full min-h-[100px] flex flex-col gap-2 justify-center items-center text-black text-black/80">
              <IoIosTime className="w-10 h-10 text-black/50" />
              <p className="max-w-[100px] text-center leading-4 text-[14px]">No history to Show now</p>
              </div>)
          }

        </div>
      </div>
      </div>
    </div>
  )
}


export default Calculator