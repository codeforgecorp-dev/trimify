"use client";
import React from "react";
import { QRCodeCanvas } from "qrcode.react"; // ✅ Correct
import { ToastContainer, toast } from "react-toastify";
const QRCodeGenerator = ({ ShortName }) => {
  let value = ShortName
  const handleDownload = () => {
    try {
      const canvas = document.querySelector("canvas");
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const downloadLink = document.createElement("a");

      downloadLink.href = pngUrl;
      downloadLink.download = "trimify-qr-code.png";

      downloadLink.click();
     
      toast.success("Download Started", {
        position: "top-right",
        autoClose: 1000
      })
    } catch (err) {
      toast.error("Failed to Download", {
        position: "top-right",
        autoClose: 1000
      })
    }
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <ToastContainer className={"mt-12"} />
      <QRCodeCanvas value={value} size={128} />
      <button
        className="bg-blue-400 w-full p-4 rounded-xl mt-8 hover:bg-blue-300 transition-all duration-300 ease-in-out poppins-semi cursor-pointer"
        onClick={handleDownload}
      >
        Download QR Code
      </button>
    </div>
  );
};

export default QRCodeGenerator;
