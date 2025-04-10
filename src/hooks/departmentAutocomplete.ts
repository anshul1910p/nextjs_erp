import React, { useEffect, useRef, useState } from 'react'
interface Option {
    id:number;
    name:string;
}
const useDepartmentAutocomplete = () => {
    const [query,setQuery]=useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions,setSuggestions]=useState<Option[]>([]);
    const [loading,setLoading]=useState(false);
    const [selectedOption,setSelectedOption]=useState<Option | null>(null)
     const isFirstRender=useRef(true);
    useEffect(()=>{
        if(isFirstRender.current)
            {
                isFirstRender.current=false;
                return;
            }

            const fetchEstbData=async (searchTerm:string)=>{
                if(!searchTerm.trim())
                {
                    setSuggestions([]);
                } 
                setLoading(true);
                const token=localStorage.getItem("authToken");
                try 
                {
                 
                //    const fetchResponse=await fetch("http://15.206.60.189/erp/masters/category/",{ 
                    const fetchResponse=await fetch(`http://15.206.60.189/erp/masters/masters_department/ddl/?name=${searchTerm}`,{ 
                    headers:{
                      "Content-Type": "application/json",
                      "Authorization":`Token ${token}`
                    },
                  });
                  const fetchdata: Option[]=await fetchResponse.json();
                  setSuggestions(fetchdata);
                }
                catch(error)
                {
                  console.error("Error fetching options:", error);
                }
                finally {
                  setLoading(false);
                }
               }
               
               
               if (query.length > 0) {
                const delayDebounce = setTimeout(() => {
                  fetchEstbData(searchQuery);
                }, 300); // Debounce time (like jQuery Autocomplete)
                return () => clearTimeout(delayDebounce);
              }
              //  fetchEstbData(query);
    },[searchQuery]);

    const handleSelect=(option:Option)=>{
        setQuery(option.name);
       
        setSelectedOption(option);
        setSuggestions([]);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setSearchQuery(e.target.value); // Triggers API call only when typing
    };
  return {
    query,
    setQuery,
    suggestions,
    loading,
    handleSelect,
    selectedOption,
    handleInputChange
  }
}

export default useDepartmentAutocomplete
