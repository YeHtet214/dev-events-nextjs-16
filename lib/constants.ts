export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "Tech Conference 2026",
    image: "/images/event1.png",
    slug: "tech-conference-2026",
    location: "San Francisco, CA",
    date: "2026-02-15",
    time: "09:00 AM - 05:00 PM",
  },
  {
    title: "Music Festival",
    image: "/images/event2.png",
    slug: "music-festival-2026",
    location: "Austin, TX",
    date: "2026-03-20",
    time: "06:00 PM - 11:00 PM",
  },
  {
    title: "Art Exhibition",
    image: "/images/event3.png",
    slug: "art-exhibition-2026",
    location: "New York, NY",
    date: "2026-04-10",
    time: "10:00 AM - 08:00 PM",
  },
  {
    title: "Sports Tournament",
    image: "/images/event4.png",
    slug: "sports-tournament-2026",
    location: "Los Angeles, CA",
    date: "2026-05-05",
    time: "02:00 PM - 10:00 PM",
  },
  {
    title: "Food Fair",
    image: "/images/event5.png",
    slug: "food-fair-2026",
    location: "Chicago, IL",
    date: "2026-06-12",
    time: "11:00 AM - 09:00 PM",
  },
  {
    title: "Film Screening",
    image: "/images/event6.png",
    slug: "film-screening-2026",
    location: "Seattle, WA",
    date: "2026-07-18",
    time: "07:00 PM - 10:00 PM",
  },
];