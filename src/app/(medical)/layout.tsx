import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function MedicalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 bg-secondary/30">{children}</main>
      <Footer />
    </div>
  );
}
