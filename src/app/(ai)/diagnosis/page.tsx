"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { generateCaseSummary, GenerateCaseSummaryOutput } from "@/ai/flows/generate-case-summary";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, FileText, Sparkles, AlertTriangle, Info, Activity } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

type SummaryData = Omit<GenerateCaseSummaryOutput, 'caseSummary'>;

export default function DiagnosisPage() {
  const [data, setData] = useState<GenerateCaseSummaryOutput | null>(null);
  const [prescriptionImage, setPrescriptionImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let dataUri: string | null = null;
    try {
      dataUri = sessionStorage.getItem("prescriptionDataUri");
    } catch (e) {
      console.error("Could not access sessionStorage:", e);
      setError("Your browser does not support sessionStorage or it is disabled. Please use a different browser.");
      setIsLoading(false);
      return;
    }

    if (dataUri) {
      setPrescriptionImage(dataUri);
      generateCaseSummary({ prescriptionPhotoDataUri: dataUri })
        .then(response => {
          setData(response);
        })
        .catch(err => {
          console.error(err);
          setError("Failed to generate summary. The AI model might be unavailable or the image could not be processed.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // If no image data, redirect back to upload
      router.push("/prescription-upload");
    }
  }, [router]);

  const getLikelihoodColor = (likelihood: string | undefined) => {
    switch (likelihood?.toLowerCase()) {
      case 'high':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };


  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
       <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          AI Second Opinion
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This is an AI-generated analysis. Always consult a qualified doctor.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-headline text-2xl mb-4">Your Prescription</h2>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/5 overflow-hidden">
            <CardContent className="p-4">
              {prescriptionImage ? (
                <div className="relative w-full aspect-square">
                  <Image
                    src={prescriptionImage}
                    alt="Uploaded Prescription"
                    layout="fill"
                    className="object-contain rounded-lg"
                  />
                </div>
              ) : (
                <Skeleton className="w-full aspect-square" />
              )}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                <Activity className="w-6 h-6 text-accent"/>
                Potential Diagnosis
              </CardTitle>
            </CardHeader>
            <CardContent>
               {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                ) : error ? null : (
                  <>
                  <h3 className="text-2xl font-bold text-foreground">{data?.disease}</h3>
                  <Badge variant="outline" className={`mt-2 ${getLikelihoodColor(data?.likelihood)}`}>
                    Likelihood: {data?.likelihood}
                  </Badge>
                  </>
               )}
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/5">
            <CardHeader className="flex flex-row items-center gap-3">
              <Sparkles className="w-6 h-6 text-accent"/>
              <CardTitle className="font-headline text-xl">Medication Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <div className="prose prose-invert prose-p:text-muted-foreground whitespace-pre-wrap">
                  <p>{data?.caseSummary}</p>
                </div>
              )}
            </CardContent>
          </Card>

           <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/5">
            <CardHeader className="flex flex-row items-center gap-3">
              <Info className="w-6 h-6 text-accent"/>
              <CardTitle className="font-headline text-xl">Patient Information & Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ) : error ? null : (
                <div className="prose prose-invert prose-p:text-muted-foreground whitespace-pre-wrap">
                  <p>{data?.patientInfo}</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Button onClick={() => router.push('/prescription-upload')} variant="outline" className="w-full mt-6">
             Analyze Another Prescription
           </Button>
        </div>
      </div>
    </div>
  );
}
