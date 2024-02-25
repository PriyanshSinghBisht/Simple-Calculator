function Button({value , handleClick}){
    return(
        <button className={`
       ${symbols.includes(value)? (value=="="?
       "bg-blue-600 text-white": "bg-slate-300"):
       "bg-slate-200" }
       aspect-[3/1.6] 
       select-none
       min-[380px]:w-20
       w-15       
       font-semibold
       rounded-lg
       m-1
       selected-none
       btn-shadow
       h
       hover:[box-shadow:0_0_4px_0px_black_inset]
        `} onClick={()=>handleClick(value)}>{value}</button>
      )
 }
 
 const symbols = ["+","-","*","/","%","(",")","CO","CA","=","."]
 
 
 export default Button