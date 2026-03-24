import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import Feedbacks from "@/app/models/UserFeedback";


export async function POST(request) {
  let data = await request.json();
  let email = data.Email;
  let feedback = data.Feedback;
  let username = data.Username;
  let pageNo = data.blogPageNo;
  console.log(data);
  await connectDB();
  let newFeedback = await Feedbacks.create({
    Email: email,
    Username: username,
    Feedback: feedback,
    blogPageNo: pageNo,
  });
  console.log("Data inserted");
  return NextResponse.json({
    data: newFeedback,
    status: 200,
  });
}
export async function GET(req) {
  const {searchParams}= new URL(req.url);
  
  const blogPageNo = searchParams.get("blogPageNo");

  await connectDB();
  const feedback = await Feedbacks.find({ blogPageNo: blogPageNo });

  return NextResponse.json({
    Feedback: feedback,
    success: true,
  });
}
