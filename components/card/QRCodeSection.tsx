"use client"

import QRCode from "react-qr-code"

interface QRCodeSectionProps {
  value: string
}

export function QRCodeSection({ value }: QRCodeSectionProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-inner animate-in fade-in zoom-in duration-500 delay-150">
      <QRCode
        value={value}
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        viewBox={`0 0 256 256`}
        level="H"
      />
    </div>
  )
}
