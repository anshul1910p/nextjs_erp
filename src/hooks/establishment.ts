import  { useEffect, useState } from 'react'
interface Option {
    id:number;
    name:string;
   }
   
const useEstablishment = () => {
      const[estbOptions,setEstbOptions]=useState<Option[]>([]);
      const [estbValue,setEstbValue]=useState('');
      // const[casetype,setCasetype]=useState('');
    
      useEffect(()=>{
         const fetchEstbData=async ()=>{
          const token=localStorage.getItem("authToken");
          try 
          {
            const fetchResponse=await fetch("http://15.206.60.189/erp/masters/masters_establishment/ddl/",{
              headers:{
                "Content-Type": "application/json",
                "Authorization":`Token ${token}`
              },
            });
            const fetchdata: Option[]=await fetchResponse.json();
            setEstbOptions(fetchdata);
          }
          catch(error)
          {
            console.error("Error fetching options:", error);
          }
         }
         fetchEstbData();
      },[]);
  return {
    estbValue,
    setEstbValue,
    estbOptions
  }
}

export default useEstablishment
