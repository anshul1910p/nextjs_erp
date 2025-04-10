import  { useEffect, useState } from 'react'
interface Option {
    id:number;
    name:string;
   }
   
const useRelation = () => {
       const[relationOptions,setRelationOptions]=useState<Option[]>([]);
       const [relationValue,setRelationValue]=useState('');
       // const[casetype,setCasetype]=useState('');
     
       useEffect(()=>{
          const fetchEstbData=async ()=>{
           const token=localStorage.getItem("authToken");
           try 
           {
             const fetchResponse=await fetch("http://15.206.60.189/erp/masters/masters_relation/",{
               headers:{
                 "Content-Type": "application/json",
                 "Authorization":`Token ${token}`
               },
             });
             const fetchdata: Option[]=await fetchResponse.json();
             setRelationOptions(fetchdata);
           }
           catch(error)
           {
             console.error("Error fetching options:", error);
           }
          }
          fetchEstbData();
       },[]);
   return {
    relationValue,
    setRelationValue,
     relationOptions
   }
}

export default useRelation
