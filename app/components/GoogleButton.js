"use client";
import { useEffect } from "react";
import Script from "next/script";
import { signIn } from "next-auth/react";
import { jwtDecode } from "jwt-decode"; 
import { useRouter, } from "next/navigation";
import Image from "next/image";
export default function GoogleLoginButton({ width = 300 }) {

  
  return (
 <>
    <button
      id="google-signin-button"
      onClick={() => signIn("google")}  // 👈 This triggers Google login
      style={{
        width: width,
        padding: "10px",
        backgroundColor: "#fffff",
        color: "black",
        borderRadius: "5px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        cursor: "pointer",
        border: "1px solid #ccc", 
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Image src="/google.svg" alt="Google" width={20} height={20} />
      Continue with Google
    </button></>
  );
}
