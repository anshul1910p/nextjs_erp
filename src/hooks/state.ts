import  { useEffect, useState } from 'react'
interface Option {
    id:number;
    name:string;
   }

const useStates = () => {
  const[stateOptions,setStateOptions]=useState<Option[]>([]);
  const [stateValue,setStateValue]=useState('');
        // const[casetype,setCasetype]=useState('');
      
        useEffect(()=>{
           const fetchEstbData=async ()=>{
            const token=localStorage.getItem("authToken");
            try 
            {
              const fetchResponse=await fetch("http://15.206.60.189/erp/masters/masters_state/ddl",{ 
                headers:{
                  "Content-Type": "application/json",
                  "Authorization":`Token ${token}`
                },
              });
              const fetchdata: Option[]=await fetchResponse.json();
              setStateOptions(fetchdata);
            }
            catch(error)
            {
              console.error("Error fetching options:", error);
            }
           }
           fetchEstbData();
        },[]);
    return {
        stateValue,
        setStateValue,
     stateOptions
    }
}

export default useStates
