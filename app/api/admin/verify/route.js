import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET() {
    try{
        console.log("Start")
        const cookieStore = await cookies(); // no await
        const token = cookieStore.get("admin_token")?.value;
        console.log(token)
        
        if(token){
            return NextResponse.json({success:true,message:"Admin Authorized"})
        }else{
            return NextResponse.json({error:404,message:"Invalid Login"})
        }
        
        
    }catch(err){
        console.log(err)
        return NextResponse.json({error:200}) 
    }
}
