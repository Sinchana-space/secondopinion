import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileScan, ShieldCheck, BrainCircuit, User, Stethoscope } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background dark">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-6xl xl:text-7xl/none">
                SECOP: Your AI Second Opinion
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Choose your role to get started. Access personalized health insights with clarity and confidence.
              </p>
            </div>
            
            <div className="mx-auto grid max-w-4xl grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                <Card className="bg-card/50 border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <User className="h-10 w-10 text-primary"/>
                            <div>
                                <CardTitle className="text-2xl font-headline">For Patients</CardTitle>
                                <CardDescription>Create an account to manage your health.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6">Upload prescriptions, view your health records, and connect with doctors securely.</p>
                        <Button size="lg" className="w-full text-lg py-6" asChild>
                           <Link href="/signup">Get Started</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Stethoscope className="h-10 w-10 text-primary"/>
                            <div>
                                <CardTitle className="text-2xl font-headline">For Doctors</CardTitle>
                                <CardDescription>Access your professional dashboard.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6">Log in to view your patient information, appointments, and consultation history.</p>
                        <Button size="lg" className="w-full text-lg py-6" asChild>
                            <Link href="/login">Doctor Login</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Why SECOP?</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">An Intelligent Approach to Your Health</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We leverage state-of-the-art AI to provide a fast, secure, and understandable second opinion.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              <Card className="bg-background border-primary/10">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>AI-Powered Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Our advanced AI analyzes your prescription to identify the likely condition and provide a detailed summary.</p>
                </CardContent>
              </Card>
              <Card className="bg-background border-primary/10">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <FileScan className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Instant & Clear Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Receive an easy-to-understand report in seconds, breaking down complex medical terms.</p>
                </CardContent>
              </Card>
              <Card className="bg-background border-primary/10">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Secure & Confidential</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Your privacy is our priority. Your data is processed securely and is never stored or shared.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
