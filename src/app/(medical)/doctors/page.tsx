import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const doctors = [
  { id: '1', name: 'Dr. Anjali Sharma', specialty: 'Cardiology', location: 'Mumbai, MH', rating: 4.9, available: true, image: 'https://placehold.co/400x400.png', hint: 'doctor portrait' },
  { id: '2', name: 'Dr. Rohan Mehra', specialty: 'Dermatology', location: 'Delhi, DL', rating: 4.8, available: true, image: 'https://placehold.co/400x400.png', hint: 'doctor portrait professional' },
  { id: '3', name: 'Dr. Priya Patel', specialty: 'Pediatrics', location: 'Bangalore, KA', rating: 5.0, available: false, image: 'https://placehold.co/400x400.png', hint: 'female doctor' },
  { id: '4', name: 'Dr. Vikram Singh', specialty: 'Neurology', location: 'Chennai, TN', rating: 4.7, available: true, image: 'https://placehold.co/400x400.png', hint: 'male doctor' },
  { id: '5', name: 'Dr. Sunita Reddy', specialty: 'Oncology', location: 'Kolkata, WB', rating: 4.9, available: false, image: 'https://placehold.co/400x400.png', hint: 'woman doctor' },
  { id: '6', name: 'Dr. Amit Gupta', specialty: 'Orthopedics', location: 'Hyderabad, TS', rating: 4.8, available: true, image: 'https://placehold.co/400x400.png', hint: 'doctor headshot' },
];

export default function DoctorSearchPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Find Your Doctor
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Search for top-rated doctors and specialists near you.
        </p>
      </div>
      
      <Card className="mb-8 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <Input placeholder="Doctor name..." className="md:col-span-2" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                 <SelectItem value="oncology">Oncology</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full">Search</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map(doctor => (
          <Card key={doctor.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="p-0 relative">
               <Image src={doctor.image} alt={doctor.name} width={400} height={200} data-ai-hint={doctor.hint} className="w-full h-48 object-cover"/>
               <Badge variant={doctor.available ? "secondary" : "destructive"} className={`absolute top-4 right-4 ${doctor.available ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                {doctor.available ? 'Available' : 'Unavailable'}
              </Badge>
            </CardHeader>
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-4 border-background -mt-16">
                        <AvatarImage src={doctor.image} alt={doctor.name} data-ai-hint={doctor.hint} />
                        <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="pt-2">
                        <CardTitle className="text-xl">{doctor.name}</CardTitle>
                        <CardDescription>{doctor.specialty}</CardDescription>
                    </div>
                </div>

              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-bold">{doctor.rating}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild className="w-full">
                <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
