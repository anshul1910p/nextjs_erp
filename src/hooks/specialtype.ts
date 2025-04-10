import  { useEffect, useState } from 'react'
interface Option {
    id:number;
    name:string;
   }
   

const useSpecialtype = () => {
 const[specialtypeOptions,setSpecialtypeOptions]=useState<Option[]>([]);
 const [specialtypeValue,setSpecialtypeValue]=useState('');
      // const[casetype,setCasetype]=useState('');
    
      useEffect(()=>{
         const fetchEstbData=async ()=>{
          const token=localStorage.getItem("authToken");
          try 
          {
            const fetchResponse=await fetch("http://15.206.60.189/erp/masters/masters_category/",{
              headers:{
                "Content-Type": "application/json",
                "Authorization":`Token ${token}`
              },
            });
            const fetchdata: Option[]=await fetchResponse.json();
            setSpecialtypeOptions(fetchdata);
          }
          catch(error)
          {
            console.error("Error fetching options:", error);
          }
         }
         fetchEstbData();
      },[]);
  return {
    specialtypeOptions,
    specialtypeValue,
    setSpecialtypeValue
  }
}

export default useSpecialtype
