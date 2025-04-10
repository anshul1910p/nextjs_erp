
import { NextRequest, NextResponse  } from "next/server";
import { serialize } from "cookie";
import { z } from 'zod';
// import { error } from "console";

const loginSchema=z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6,"Password must be at least 6 characters"),
})
export  async function POST(req:NextRequest)
{
    // if(req.method!=="POST") return  res.status(405).end("Method Not Allowed");

    // const {email,password}= await  req.json();
    const body= await  req.json();
    const parsed=loginSchema.safeParse(body);
    if(!parsed.success)
    {
      const filedErrors=parsed.error.flatten().fieldErrors;
      return NextResponse.json({error:"Validation failed",filedErrors}, { status: 400 })
    }
    const {email,password}=parsed.data;
    try{
        const externalRes = await fetch("http://15.206.60.189/erp/auth/token/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
      
          const data = await externalRes.json();
      
          if (!externalRes.ok) {
            return NextResponse.json({ message: data.detail || "Login failed" }, { status: externalRes.status });
          }
          const response = NextResponse.json({ message: "Login successful" });
          const authToken = data.auth_token;
          // alert(authToken);
          response.headers.set("Set-Cookie",serialize("authToken",authToken,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
          }));
          return response;
    }
    catch(error)
    {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}