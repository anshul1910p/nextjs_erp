import  { useEffect, useState } from 'react'
interface Option {
    id:number;
    name:string;
   }

const useCountry = () => {
  const[countryOptions,setCountryOptions]=useState<Option[]>([]);
  const [countryValue,setCountryValue]=useState('');
     
       useEffect(()=>{
          const fetchEstbData=async ()=>{
           const token=localStorage.getItem("authToken");
           try 
           {
            //  const fetchResponse=await fetch("http://15.206.60.189/erp/masters/country/",{
              const fetchResponse=await fetch("http://15.206.60.189/erp/masters/masters_country/ddl/",{ 
               headers:{
                 "Content-Type": "application/json",
                 "Authorization":`Token ${token}`
               },
             });
             const fetchdata: Option[]=await fetchResponse.json();
             setCountryOptions(fetchdata);
           }
           catch(error)
           {
             console.error("Error fetching options:", error);
           }
          }
          fetchEstbData();
       },[]);
   return {
    countryValue,
    setCountryValue,
     countryOptions
   }
}

export default useCountry
