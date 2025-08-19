import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, GraduationCap, Briefcase, DollarSign, Check } from "lucide-react";

const doctor = {
  id: '1',
  name: 'Dr. Anjali Sharma',
  specialty: 'Cardiology',
  location: 'Mumbai, MH',
  rating: 4.9,
  image: 'https://placehold.co/150x150.png',
  hint: 'doctor portrait',
  bio: 'Dr. Anjali Sharma is a board-certified cardiologist with over 15 years of experience in treating a wide range of cardiovascular conditions. She is a graduate of AIIMS, New Delhi and completed her fellowship at Fortis Escorts Heart Institute. Dr. Sharma is dedicated to providing compassionate and comprehensive care to her patients, utilizing the latest advancements in cardiovascular medicine to ensure the best possible outcomes.',
  qualifications: ['MBBS, DNB (Cardiology)', 'Fellowship in Interventional Cardiology'],
  experience: '15+ Years',
  fees: '₹1500 per consultation',
  availability: [
    { day: 'Monday', time: '9:00 AM - 5:00 PM' },
    { day: 'Wednesday', time: '10:00 AM - 6:00 PM' },
    { day: 'Friday', time: '9:00 AM - 1:00 PM' },
  ],
};

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch doctor data based on params.id
  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4 border-4 border-primary shadow-lg">
                <AvatarImage src={doctor.image} alt={doctor.name} data-ai-hint={doctor.hint} />
                <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold">{doctor.name}</h1>
              <p className="text-primary font-medium">{doctor.specialty}</p>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{doctor.location}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-lg font-bold">{doctor.rating}</span>
              </div>
              <Button className="mt-6 w-full text-lg py-6">Book Appointment</Button>
            </div>
            
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">About Dr. {doctor.name.split(' ').pop()}</h2>
              <p className="text-muted-foreground mb-6">{doctor.bio}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                <InfoCard icon={GraduationCap} title="Qualifications" items={doctor.qualifications} />
                <InfoCard icon={Briefcase} title="Experience" items={[doctor.experience]} />
                <InfoCard icon={DollarSign} title="Consultation Fee" items={[doctor.fees]} />
              </div>
              
              <Separator className="my-8" />
              
              <h2 className="text-xl font-semibold mb-4">Availability</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctor.availability.map(slot => (
                  <Card key={slot.day} className="bg-secondary/50 border-primary/20">
                    <CardContent className="p-4 text-center">
                      <p className="font-semibold text-primary-foreground text-base" style={{color: 'hsl(var(--primary))'}}>{slot.day}</p>
                      <p className="text-sm text-muted-foreground">{slot.time}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoCard({ icon: Icon, title, items }: { icon: React.ElementType, title: string, items: string[] }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
        <Icon className="h-5 w-5 text-primary" />
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <Check className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span>{item}</span>
            </li>
        ))}
      </ul>
    </div>
  );
}
