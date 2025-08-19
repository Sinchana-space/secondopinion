"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileCheck, AlertCircle, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function PrescriptionUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          return prev;
        }
        return prev + 5;
      });
    }, 100);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      clearInterval(interval);
      setUploadProgress(100);
      const dataUri = reader.result as string;
      // Store in session storage to pass to next page
      try {
        sessionStorage.setItem("prescriptionDataUri", dataUri);
        setTimeout(() => router.push("/diagnosis"), 500);
      } catch (e) {
        // Handle potential sessionStorage quota errors
        setError("Could not store prescription image. It might be too large.");
        setIsUploading(false);
        setUploadProgress(0);
      }
    };
    reader.onerror = () => {
        clearInterval(interval);
        setError("Failed to read file.");
        setIsUploading(false);
    };
  };

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Upload Your Prescription
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get a confidential, AI-powered second opinion on your prescription.
        </p>
      </div>
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/5">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2"><Sparkles className="text-accent" />Prescription Upload</CardTitle>
          <CardDescription>Drag and drop your file or click to browse. Your data is not stored.</CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-muted-foreground/50 rounded-lg cursor-pointer hover:border-primary transition-colors bg-background/50"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input id="file-upload" type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />
            {file ? (
              <div className="text-center">
                <FileCheck className="mx-auto h-12 w-12 text-green-400" />
                <p className="mt-2 text-sm font-medium">{file.name}</p>
              </div>
            ) : (
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG or PDF</p>
              </div>
            )}
          </div>
          {isUploading && (
            <div className="mt-4">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-center mt-2 text-muted-foreground">Uploading...</p>
            </div>
          )}
          {error && (
            <p className="mt-2 text-sm text-destructive flex items-center gap-2"><AlertCircle className="w-4 h-4"/> {error}</p>
          )}
          <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full mt-6">
            {isUploading ? "Analyzing..." : "Get AI Second Opinion"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
