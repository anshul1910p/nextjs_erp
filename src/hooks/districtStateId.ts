import  { useEffect, useRef, useState } from 'react'
interface Option {
    id:number;
    name:string;
   }

const useDistrictStateId = (stateValue:number) => {
 const[districtOptions,setDistrictOptions]=useState<Option[]>([]);
 const [districtValue,setDistrictValue]=useState('');
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
              //  const fetchResponse=await fetch("http://15.206.60.189/erp/masters/category/",{ 
                const fetchResponse=await fetch(`http://15.206.60.189/erp/masters/masters_district/ddl?state=${stateValue}`,{ 
                headers:{
                  "Content-Type": "application/json",
                  "Authorization":`Token ${token}`
                },
              });
              const fetchdata: Option[]=await fetchResponse.json();
              setDistrictOptions(fetchdata);
            }
            catch(error)
            {
              console.error("Error fetching options:", error);
            }
           }
           fetchEstbData();
        },[stateValue]);
    return {
        districtOptions,
        districtValue,
        setDistrictValue
    }

}

export default useDistrictStateId
