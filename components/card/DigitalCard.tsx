import Image from "next/image"
import sheilzLogo from "@/app/sheilz_logo.png"
import { QRCodeSection } from "./QRCodeSection"

interface DigitalCardProps {
  customerName: string
  cardNumber: string
  memberSince: string
  qrValue: string
}

export function DigitalCard({ customerName, cardNumber, memberSince, qrValue }: DigitalCardProps) {
  return (
    <div className="relative w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary to-rose-700 text-primary-foreground p-6 sm:p-8 animate-in slide-in-from-bottom-8 duration-500">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 h-32 w-32 rounded-full bg-black/10 blur-2xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Image src={sheilzLogo} alt="Sheilz Logo" width={24} height={24} className="object-contain brightness-0 invert" />
            <span className="font-bold tracking-widest text-sm uppercase">Sheilz Coffee</span>
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-primary-foreground/80">Loyalty</span>
        </div>

        {/* QR Code */}
        <div className="flex-1 flex justify-center items-center mb-8">
          <div className="w-48 sm:w-56">
            <QRCodeSection value={qrValue} />
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-primary-foreground/70 mb-1">Cardholder</p>
            <p className="font-semibold text-lg">{customerName}</p>
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-primary-foreground/70 mb-1">Card Number</p>
              <p className="font-mono text-sm tracking-widest">{cardNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-primary-foreground/70 mb-1">Member Since</p>
              <p className="text-xs font-medium">{memberSince}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
