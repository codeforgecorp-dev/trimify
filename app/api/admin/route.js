import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import Data from "@/app/models/Sign-up";
import Transactions from "@/app/models/transactions";

import Feedbacks from "@/app/models/UserFeedback";
export async function GET(req) {
   
 const {searchParams}=new URL(req.url)  
 const DataType=searchParams.get("Data")
 connectDB()
 if(DataType==="transactional"){
   
    const transactionalData=await Transactions.find({})
   
    return NextResponse.json({success:true, transactionData:transactionalData})
 }else if(DataType==="Feedback"){
           const Feedback=await Feedbacks.find({})
            
    return NextResponse.json({success:true, FeedbackData:Feedback})
 }else{ 
 
 const userData=await Data.find({Role:"user"})

 return NextResponse.json({success:true,Data:userData})
} }
export async function DELETE(req) {
    connectDB()
    const body=await req.json()
    const user2Delete=body.username
    
    await Data.deleteOne({Username:user2Delete})
    
    return NextResponse.json({success:true})
}
