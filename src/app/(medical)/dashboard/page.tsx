"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollText, Stethoscope, User, FilePlus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const patient = {
  name: 'Priya Patel',
  email: 'priya.patel@example.com',
  memberSince: '2023-05-15',
};

const recentVisits = [
  { id: 1, doctor: 'Dr. Anjali Sharma', specialty: 'Cardiology', date: '2024-07-15' },
  { id: 2, doctor: 'Dr. Rohan Mehra', specialty: 'Dermatology', date: '2024-06-22' },
];

const recentPrescriptions = [
    { id: 1, name: "Metformin 500mg", doctor: "Dr. Anjali Sharma", date: "2024-07-15"},
    { id: 2, name: "Isotretinoin 20mg", doctor: "Dr. Rohan Mehra", date: "2024-06-22"},
    { id: 3, name: "Atorvastatin 10mg", doctor: "Dr. Anjali Sharma", date: "2024-05-10"},
]

export default function PatientDashboard() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {patient.name}!</h1>
        <p className="text-muted-foreground">Here's a summary of your recent activity.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-6 w-6 text-primary" />
                  Recent Doctor Visits
                </CardTitle>
                <CardDescription>Your latest consultations.</CardDescription>
              </div>
               <Button asChild variant="outline">
                <Link href="/dashboard/doctors">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border">
                {recentVisits.map((visit) => (
                  <li key={visit.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-semibold">{visit.doctor}</p>
                      <p className="text-sm text-muted-foreground">{visit.specialty}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{visit.date}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ScrollText className="h-6 w-6 text-primary" />
                  Prescription Locker
                </CardTitle>
                 <CardDescription>Your uploaded prescriptions.</CardDescription>
              </div>
              <Button asChild variant="outline">
                <Link href="/dashboard/prescriptions">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
               <ul className="divide-y divide-border">
                {recentPrescriptions.slice(0, 3).map((p) => (
                  <li key={p.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-muted-foreground">Prescribed by {p.doctor}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{p.date}</p>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-4" asChild>
                <Link href="/prescription-upload">
                    <FilePlus className="mr-2 h-4 w-4"/>
                    Analyze New Prescription
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                My Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Image 
                    src="https://placehold.co/128x128.png"
                    alt="Patient photo" 
                    width={128} 
                    height={128}
                    className="rounded-full mx-auto"
                />
              <div className="text-center">
                <p className="font-semibold">{patient.name}</p>
                <p className="text-sm text-muted-foreground">{patient.email}</p>
                <p className="text-xs text-muted-foreground mt-1">Member since {patient.memberSince}</p>
              </div>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/dashboard/profile">Edit Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    