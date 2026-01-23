import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Imgslider from "@/components/ui/imgslider";
import {
  CalendarDays, Users, Sparkles, MapPin,
  Download,
  ExternalLink,
} from "lucide-react";

import Hero1 from "@/assets/Tournaments/img1.webp";
import Hero2 from "@/assets/Tournaments/img2.jpeg";
import Hero3 from "@/assets/Tournaments/img3.avif";
import Hero4 from "@/assets/Tournaments/img4.webp";


const heroImages = [Hero1, Hero2, Hero3, Hero4];



type Tournament = {
  name: string;
  location: string;
  date: string;
  venue: string;
  image: string;
  brochureUrl: string;
  mapUrl: string;
};

const tournaments: Tournament[] = [
  {
    name: "Open District Chess Tournament",
    location: "Chennai",
    date: "15 Oct 2026",
    venue: "Community Hall",
    image:
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=800&auto=format&fit=crop",
    brochureUrl: "https://example.com/chennai-open.pdf",
    mapUrl: "https://maps.google.com/?q=Community+Hall+Chennai",
  },
  {
    name: "Junior Category Chess Meet",
    location: "Coimbatore",
    date: "22 Oct 2026",
    venue: "Indoor Stadium",
    image:
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=800&auto=format&fit=crop",
    brochureUrl: "https://example.com/coimbatore-junior.pdf",
    mapUrl: "https://maps.google.com/?q=Indoor+Stadium+Coimbatore",
  },
  {
    name: "Inter-College Chess Tournament",
    location: "Madurai",
    date: "30 Oct 2026",
    venue: "College Auditorium",
    image:
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=800&auto=format&fit=crop",
    brochureUrl: "https://example.com/madurai-college.pdf",
    mapUrl: "https://maps.google.com/?q=College+Auditorium+Madurai",
  },
];


export default function Home() {
  return (
    <main className="w-full">

      {/* HERO SECTION */}

      {/* HERO SECTION */}
      <section className="w-full py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

          {/* IMAGE SLIDER */}
          <div
            className="
    relative w-full overflow-hidden rounded-xl
    px-4 lg:px-0
    lg:justify-self-center
    lg:max-w-[90%]
  "
          >
            <Imgslider heroImages={heroImages} />
          </div>



          {/* TEXT CONTENT */}
          <div className="px-4 sm:px-6 lg:px-10 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Chess Tournament Hub
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Discover upcoming chess tournaments, register easily,
              and stay connected with competitive chess events
              across districts and colleges.
            </p>

            <ul className="space-y-2 text-gray-700">
              <li>♟️ District & State Level Events</li>
              <li>📅 Updated Schedules</li>
              <li>📝 Easy Player Registration</li>
            </ul>
          </div>

        </div>
      </section>


      {/* UPCOMING TOURNAMENTS */}


      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            Upcoming Tournaments
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tournaments.map((tournament, index) => (
              <Card
                key={index}
                className="
            group overflow-hidden rounded-2xl
            border border-gray-200
            bg-white
            transition-all duration-300
            hover:-translate-y-2 hover:shadow-2xl
          "
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={tournament.image}
                    alt={tournament.name}
                    className="
                h-44 w-full object-cover
                transition-transform duration-500
                group-hover:scale-105
              "
                  />

                  {/* UPCOMING BADGE (optional but nice) */}
                  <span className="
              absolute top-3 left-3
              bg-green-600 text-white text-xs
              px-3 py-1 rounded-full
            ">
                    Upcoming
                  </span>
                </div>

                <CardContent className="p-6 space-y-5">

                  {/* TITLE */}
                  <h3 className="text-lg font-semibold leading-snug">
                    {tournament.name}
                  </h3>

                  {/* META INFO */}
                  <div className="space-y-2 text-sm text-gray-600">

                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-blue-600" />
                      <span>{tournament.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-green-600" />
                      <span>
                        {tournament.location} — {tournament.venue}
                      </span>
                    </div>

                  </div>

                  {/* PRIMARY ACTION */}
                  <Button className="w-full hover:bg-[#93BFC7] cursor-pointer">
                    Register
                  </Button>

                  {/* SECONDARY ACTIONS */}
                  <div className="flex items-center justify-between pt-3 border-t text-sm">

                    <a
                      href={tournament.brochureUrl}
                      className="
                  flex items-center gap-1
                  text-gray-500
                  hover:text-green-600 transition
                "
                    >
                      <Download size={16} />
                      <span>Details</span>
                    </a>

                    <a
                      href={tournament.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                  flex items-center gap-1
                  text-gray-500
                  hover:text-blue-600 transition
                "
                    >
                      <ExternalLink size={16} />
                      <span>Map</span>
                    </a>

                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* PLATFORM FEATURES */}

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            What This Platform Offers
          </h2>

          <div className="grid gap-8 md:grid-cols-3">

            {/* CARD 1 */}
            <Card className="
        group rounded-2xl border
        transition-all duration-300
        hover:-translate-y-2 hover:shadow-xl
      ">
              <CardContent className="p-8 text-center space-y-4">
                <div className="
            mx-auto w-14 h-14 rounded-full
            bg-green-100 text-green-700
            flex items-center justify-center
            group-hover:scale-110 transition
          ">
                  <CalendarDays size={26} />
                </div>

                <h3 className="text-xl font-semibold">
                  Tournament Publishing
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Organizers can publish chess tournaments with venue, date,
                  and category details effortlessly.
                </p>
              </CardContent>
            </Card>

            {/* CARD 2 */}
            <Card className="
        group rounded-2xl border
        transition-all duration-300
        hover:-translate-y-2 hover:shadow-xl
      ">
              <CardContent className="p-8 text-center space-y-4">
                <div className="
            mx-auto w-14 h-14 rounded-full
            bg-blue-100 text-blue-700
            flex items-center justify-center
            group-hover:scale-110 transition
          ">
                  <Users size={26} />
                </div>

                <h3 className="text-xl font-semibold">
                  Player Registration
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Players can easily browse tournaments and register
                  in just a few clicks.
                </p>
              </CardContent>
            </Card>

            {/* CARD 3 */}
            <Card className="
        group rounded-2xl border
        transition-all duration-300
        hover:-translate-y-2 hover:shadow-xl
      ">
              <CardContent className="p-8 text-center space-y-4">
                <div className="
            mx-auto w-14 h-14 rounded-full
            bg-purple-100 text-purple-700
            flex items-center justify-center
            group-hover:scale-110 transition
          ">
                  <Sparkles size={26} />
                </div>

                <h3 className="text-xl font-semibold">
                  Simple & Focused
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Built exclusively for tournament publishing and
                  player registrations — nothing extra.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </main >
  );
}
