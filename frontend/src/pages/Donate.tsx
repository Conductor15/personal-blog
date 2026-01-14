import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Copy, Check } from "lucide-react";
import { useState } from "react";

const bankInfo = {
  name: "NGUYEN VAN A",
  bank: "Vietcombank",
  account: "1234567890",
};

const momoInfo = {
  name: "NGUYEN VAN A",
  phone: "0901234567",
};

const Donate = () => {
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedMomo, setCopiedMomo] = useState(false);

  const copyToClipboard = (text: string, type: "bank" | "momo") => {
    navigator.clipboard.writeText(text);
    if (type === "bank") {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    } else {
      setCopiedMomo(true);
      setTimeout(() => setCopiedMomo(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Page Header */}
        <section className="py-12 md:py-16">
          <div className="blog-container">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">
                Support My Work
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Your support helps me create more content about mindful living, travel stories, 
                and beautiful everyday moments. Every contribution makes a difference.
              </p>
            </div>
          </div>
        </section>

        {/* QR Codes Section */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="blog-container">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Bank QR */}
              <div className="bg-background rounded-lg p-6 md:p-8 border border-border text-center">
                <h3 className="font-serif text-xl font-medium text-foreground mb-6">
                  Bank Transfer
                </h3>
                <div className="w-48 h-48 mx-auto bg-muted rounded-lg mb-6 flex items-center justify-center border-2 border-dashed border-border">
                  <span className="text-muted-foreground text-sm">QR</span>
                </div>
                <div className="space-y-2 text-left">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Bank:</span> {bankInfo.bank}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Account holder:</span> {bankInfo.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Account number:</span> {bankInfo.account}
                    </p>
                    <button
                      onClick={() => copyToClipboard(bankInfo.account, "bank")}
                      className="p-2 hover:bg-secondary rounded-md transition-colors"
                    >
                      {copiedBank ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Momo QR */}
              <div className="bg-background rounded-lg p-6 md:p-8 border border-border text-center">
                <h3 className="font-serif text-xl font-medium text-foreground mb-6">
                  MoMo Wallet
                </h3>
                <div className="w-48 h-48 mx-auto bg-muted rounded-lg mb-6 flex items-center justify-center border-2 border-dashed border-border">
                  <span className="text-muted-foreground text-sm">QR</span>
                </div>
                <div className="space-y-2 text-left">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Name:</span> {momoInfo.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Phone Number:</span> {momoInfo.phone}
                    </p>
                    <button
                      onClick={() => copyToClipboard(momoInfo.phone, "momo")}
                      className="p-2 hover:bg-secondary rounded-md transition-colors"
                    >
                      {copiedMomo ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Thank You */}
        <section className="py-12 md:py-16">
          <div className="blog-container">
            <div className="max-w-2xl mx-auto text-center">
              <p className="font-serif text-xl md:text-2xl text-foreground italic">
                "Thank you for believing in this journey. Your support means the world to me 
                and helps keep this creative space alive."
              </p>
              <p className="mt-4 text-muted-foreground">— With gratitude</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;

