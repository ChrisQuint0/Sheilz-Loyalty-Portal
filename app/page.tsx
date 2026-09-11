import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QrCode, Gift, Star } from "lucide-react";
import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionCard } from "@/components/common/SectionCard";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 px-4 text-center">
        <PageContainer className="flex flex-col items-center max-w-3xl">
          <Image
            src="/logo.png"
            alt="Sheilz Coffee"
            width={120}
            height={120}
            className="mb-6 object-contain"
          />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Be part of the Sheilz Coffee Club!
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl mx-auto">
            Free 12oz Sparkling green apple upon sign-up. Earn a stamp for every
            Sheilz Coffee Purchase. Collect 9 stamps, and your next drink is on
            us. Your digital punch card, right in your pocket.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-background text-primary hover:bg-background/90 text-lg"
              >
                Join Now
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-background text-background hover:bg-background/10 text-lg"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-background">
        <PageContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              It's simple to start earning rewards.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SectionCard className="p-8 text-center flex flex-col items-center border-none shadow-md">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-primary mb-6">
                <QrCode className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Show Your Card</h3>
              <p className="text-muted-foreground">
                Present your digital QR code at the register every time you
                visit.
              </p>
            </SectionCard>
            <SectionCard className="p-8 text-center flex flex-col items-center border-none shadow-md">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-primary mb-6">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Earn Stamps</h3>
              <p className="text-muted-foreground">
                Get a stamp for every purchase. The more you sip, the more you
                earn.
              </p>
            </SectionCard>
            <SectionCard className="p-8 text-center flex flex-col items-center border-none shadow-md">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-primary mb-6">
                <Gift className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                3. Get a Free Drink
              </h3>
              <p className="text-muted-foreground">
                Collect 9 stamps and enjoy a complimentary drink on us!
              </p>
            </SectionCard>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
