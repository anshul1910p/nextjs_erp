import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
import {  NextResponse } from "next/server";
// export async function GET(req:NextRequest) {
    export async function GET() {
    const token=(await cookies()).get('authToken')?.value;
    if(!token)
    {
        return NextResponse.json({message:"Unauthorized"},{status:401});
    }

    try 
    {
    const response=await fetch("http://15.206.60.189/erp/masters/masters_category/",{
    
     headers:{
          "Content-Type": "application/json",
         "Authorization":`Token ${token}`
     }
    });

    
    if (!response.ok) {
        return NextResponse.json({ message: "Failed to fetch data" }, { status: response.status });
      }
      const data=await response.json();
      return NextResponse.json(data); 
  
 }
 catch(error)
 {
    return NextResponse.json({ message: "Internal Server Error"+error }, { status: 500 });
 }
   
}