import  { useEffect, useRef, useState } from 'react'
interface Option {
    id:number;
    name:string;
   }

const useVillageSubdistrictId = (subdistrictValue:number) => {
 const[villageOptions,setVillageOptions]=useState<Option[]>([]);
   const [villageValue,setVillageValue]=useState('');
   const isFirstRender=useRef(true);
     useEffect(()=>{
      if(isFirstRender.current)
      {
          isFirstRender.current=false;
          return;
      }
             const fetchEstbData=async ()=>{
              const token=localStorage.getItem("authToken");
              try 
              {
               //  const fetchResponse=await fetch("http://15.206.60.189/erp/masters/country/ddl",{
                 const fetchResponse=await fetch("http://15.206.60.189/erp/masters/masters_category/",{ 
                  // const fetchResponse=await fetch(`http://15.206.60.189/erp/masters/category/${stateValue}`,{ 
                  headers:{
                    "Content-Type": "application/json",
                    "Authorization":`Token ${token}`
                  },
                });
                const fetchdata: Option[]=await fetchResponse.json();
                setVillageOptions(fetchdata);
              }
              catch(error)
              {
                console.error("Error fetching options:", error);
              }
             }
             fetchEstbData();
          },[subdistrictValue]);
      return {
        villageOptions,
        villageValue,
        setVillageValue
      }
}

export default useVillageSubdistrictId
