"use client";
import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ToastContainer, toast } from "react-toastify";
import { Download, QrCode } from "lucide-react";

const QRCodeGenerator = ({ ShortName }) => {
  let value = ShortName;

  const handleDownload = () => {
    try {
      const canvas = document.querySelector("canvas");
      if (!canvas) throw new Error("Canvas not found");
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "trimify-qr-code.png";
      downloadLink.click();

      toast.success("Download started!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch {
      toast.error("Failed to download QR code", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full select-none">
      <div className="p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
        <QRCodeCanvas value={value} size={140} />
      </div>
      <button
        type="button"
        className="w-full brutal-btn brutal-btn-yellow py-3 px-4 font-bungee text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-3"
        onClick={handleDownload}
      >
        <Download className="w-4 h-4 stroke-[3]" />
        <span>DOWNLOAD QR PNG</span>
      </button>
    </div>
  );
};

export default QRCodeGenerator;
