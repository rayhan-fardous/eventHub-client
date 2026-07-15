export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Event {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: 'Technology' | 'Business' | 'Workshop' | 'Conference' | 'Seminar' | 'Hackathon';
  location: 'Dhaka' | 'Chittagong' | 'Khulna' | 'Rajshahi';
  date: string;
  time: string;
  price: number;
  rating: number;
  seats: {
    total: number;
    booked: number;
  };
  images: string[];
  organizer: string;
  contactEmail: string;
  schedule: {
    time: string;
    activity: string;
  }[];
  reviews: Review[];
}

export const mockEvents: Event[] = [
  {
    id: "evt-01",
    title: "AI Global Summit 2026",
    shortDescription: "Explore the next generation of artificial intelligence, machine learning, and automation with world experts.",
    description: "Welcome to Dhaka's biggest AI summit. This year, we are hosting 25+ global speakers to discuss generative models, robotics, quantum AI, and structural ethics. The summit offers interactive workshops, tech showcases, and high-level networking opportunities for developers, corporate managers, and entrepreneurs.",
    category: "Technology",
    location: "Dhaka",
    date: "2026-10-24",
    time: "09:00 AM - 05:00 PM",
    price: 1500,
    rating: 4.9,
    seats: {
      total: 2000,
      booked: 1482
    },
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80"
    ],
    organizer: "Neural Tech Labs BD",
    contactEmail: "summit@neuraltech.org",
    schedule: [
      { time: "09:00 AM", activity: "Opening Keynote: Future of Intelligence" },
      { time: "11:30 AM", activity: "Panel: Ethical Governance in Generative AI" },
      { time: "01:00 PM", activity: "Networking Lunch & Product Demos" },
      { time: "02:30 PM", activity: "Workshop: Building agentic pipelines" },
      { time: "04:30 PM", activity: "Closing remarks & VIP cocktails" }
    ],
    reviews: [
      { id: "rev-11", userName: "Adnan Chowdhury", rating: 5, comment: "Incredible organization last year! Excited to join again.", date: "2026-06-12" },
      { id: "rev-12", userName: "Sadia Rahman", rating: 4.8, comment: "Top class speakers and amazing hands-on session content.", date: "2026-07-02" }
    ]
  },
  {
    id: "evt-02",
    title: "Startup Pitch Arena",
    shortDescription: "Watch the country's most promising startups pitch their ideas live to regional venture capitalists.",
    description: "Startup Pitch Arena brings together seed-stage founders and active investors. Watch 10 selected startups showcase their MVPs, receive raw feedback from top VCs, and compete for a seed prize pool. Excellent for networking, finding co-founders, and learning how to raise capital.",
    category: "Business",
    location: "Chittagong",
    date: "2026-11-12",
    time: "10:00 AM - 04:00 PM",
    price: 800,
    rating: 4.7,
    seats: {
      total: 500,
      booked: 380
    },
    images: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80"
    ],
    organizer: "Chittagong Venture Partners",
    contactEmail: "info@ctgvp.com",
    schedule: [
      { time: "10:00 AM", activity: "Welcome and VC intro" },
      { time: "10:30 AM", activity: "Pitch Session Part 1 (5 Startups)" },
      { time: "12:30 PM", activity: "Lunch and networking break" },
      { time: "01:30 PM", activity: "Pitch Session Part 2 (5 Startups)" },
      { time: "03:30 PM", activity: "Award Ceremony and Seed Allocation" }
    ],
    reviews: [
      { id: "rev-21", userName: "Tanvir Ahmed", rating: 4.5, comment: "Great insights on how pitches are evaluated.", date: "2026-05-15" }
    ]
  },
  {
    id: "evt-03",
    title: "UI/UX Design Masterclass",
    shortDescription: "A hands-on, intensive workshop on crafting clean interface layouts and delightful user journeys.",
    description: "Deep dive into Figma workflows, advanced component properties, auto layout, and interaction prototyping. You will collaborate in groups to design a solution for a real-world problem and receive live critiques from leading product designers in the industry.",
    category: "Workshop",
    location: "Dhaka",
    date: "2026-09-05",
    time: "09:30 AM - 06:00 PM",
    price: 1200,
    rating: 4.8,
    seats: {
      total: 100,
      booked: 98
    },
    images: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1000&auto=format&fit=crop&q=80"
    ],
    organizer: "Creative Loop Academy",
    contactEmail: "hello@creativeloop.design",
    schedule: [
      { time: "09:30 AM", activity: "Introduction to Design Systems" },
      { time: "11:00 AM", activity: "Figma Auto Layout Deep-dive" },
      { time: "01:00 PM", activity: "Lunch Break" },
      { time: "02:00 PM", activity: "Design Hackathon: Team Challenge" },
      { time: "05:00 PM", activity: "Presentation & Peer Review" }
    ],
    reviews: [
      { id: "rev-31", userName: "Fahim Shahriar", rating: 5, comment: "Best Figma workshop in town, learnt so many hidden shortcuts!", date: "2026-07-01" },
      { id: "rev-32", userName: "Nusrat Jahan", rating: 4.6, comment: "Very practical. Highly recommend it.", date: "2026-07-10" }
    ]
  },
  {
    id: "evt-04",
    title: "Global Fintech Summit",
    shortDescription: "Meet finance and technology pioneers leading the transformation of banking and digital transactions.",
    description: "The Global Fintech Summit is the premier gathering for digital finance, blockchain technology, digital assets, and micro-transaction regulation. This event will analyze how mobile financial services continue to redefine cash flow in developing economies.",
    category: "Conference",
    location: "Khulna",
    date: "2026-12-01",
    time: "09:00 AM - 05:00 PM",
    price: 2000,
    rating: 4.6,
    seats: {
      total: 800,
      booked: 450
    },
    images: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&auto=format&fit=crop&q=80"
    ],
    organizer: "Fintech Association BD",
    contactEmail: "summit@fintechbd.org",
    schedule: [
      { time: "09:00 AM", activity: "Panel: Cashless Frontiers in Bangladesh" },
      { time: "11:00 AM", activity: "Keynote: Cryptocurrencies and Central Bank Policies" },
      { time: "01:00 PM", activity: "Networking Lunch" },
      { time: "02:30 PM", activity: "Interactive Panel: Microfinance in Digital Spaces" },
      { time: "04:30 PM", activity: "Awards: Fintech Innovation of the Year" }
    ],
    reviews: [
      { id: "rev-41", userName: "Rakibul Hasan", rating: 4.2, comment: "Good scheduling, but some sessions were overcrowded.", date: "2026-06-25" }
    ]
  },
  {
    id: "evt-05",
    title: "Cybersecurity Trends 2026",
    shortDescription: "A comprehensive seminar covering active defense, cloud security architectures, and zero trust models.",
    description: "Learn how global organizations shield themselves from rising ransomware and multi-vector threats. Top cybersecurity officers will share threat intelligence reports, live penetration testing demonstrations, and incident response frameworks.",
    category: "Seminar",
    location: "Rajshahi",
    date: "2026-09-18",
    time: "02:00 PM - 06:00 PM",
    price: 500,
    rating: 4.5,
    seats: {
      total: 300,
      booked: 210
    },
    images: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&auto=format&fit=crop&q=80"
    ],
    organizer: "SecureBD Network",
    contactEmail: "academy@securebd.net",
    schedule: [
      { time: "02:00 PM", activity: "Introduction: Threat Landscape Overview" },
      { time: "03:15 PM", activity: "Live Hack Demo: Explaining Active Exploits" },
      { time: "04:45 PM", activity: "Session: Implementing Zero Trust Architectures" },
      { time: "05:45 PM", activity: "Q&A and Networking Session" }
    ],
    reviews: [
      { id: "rev-51", userName: "Imran Khan", rating: 4.5, comment: "The live exploit demonstration was top-notch.", date: "2026-07-08" }
    ]
  },
  {
    id: "evt-06",
    title: "CodeSpace Hackathon 2026",
    shortDescription: "Assemble your team, solve real-world problems, and code continuously for 36 hours for epic prizes.",
    description: "CodeSpace Hackathon challenges developers to build prototypes in categories like green energy, smart cities, and inclusive education. Over 36 hours, you will receive mentoring, eat free pizza, and present your project to a distinguished panel of industry judges.",
    category: "Hackathon",
    location: "Dhaka",
    date: "2026-10-02",
    time: "08:00 AM (Oct 2) - 08:00 PM (Oct 3)",
    price: 0,
    rating: 4.9,
    seats: {
      total: 400,
      booked: 395
    },
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80"
    ],
    organizer: "Devs BD Initiative",
    contactEmail: "hack@devsbd.org",
    schedule: [
      { time: "08:00 AM (Day 1)", activity: "Team Check-in & Breakfast" },
      { time: "09:30 AM (Day 1)", activity: "Problem Statements & Hack Commences" },
      { time: "08:00 PM (Day 1)", activity: "First Mentoring Round" },
      { time: "12:00 PM (Day 2)", activity: "Final Code Submission" },
      { time: "03:00 PM (Day 2)", activity: "Demos & Judging" }
    ],
    reviews: [
      { id: "rev-61", userName: "Nabil Ahmed", rating: 5, comment: "Unbelievable energy! Best hackathon I have ever been part of.", date: "2026-07-12" }
    ]
  },
  {
    id: "evt-07",
    title: "Robotics & Automation Expo",
    shortDescription: "Meet regional creators showing off autonomous vehicles, robotic arms, and smart home appliances.",
    description: "This expo highlights the practical automation advancements in agriculture, garment sectors, and logistics. Witness live runs of smart quadcopters, autonomous field surveyors, and next-generation packaging robotic arms in action.",
    category: "Technology",
    location: "Chittagong",
    date: "2026-09-29",
    time: "10:00 AM - 06:00 PM",
    price: 300,
    rating: 4.4,
    seats: {
      total: 1000,
      booked: 620
    },
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&auto=format&fit=crop&q=80"
    ],
    organizer: "CTG Robotics Club",
    contactEmail: "expo@ctgrobotics.org",
    schedule: [
      { time: "10:00 AM", activity: "Doors Open & Project Exhibition Begins" },
      { time: "12:00 PM", activity: "Keynote: Automation in Bangladesh Garment Industry" },
      { time: "02:30 PM", activity: "Drone racing championship" },
      { time: "05:00 PM", activity: "Awards for best innovations" }
    ],
    reviews: [
      { id: "rev-71", userName: "Jashim Uddin", rating: 4.0, comment: "Excellent projects, kids really enjoyed the drones.", date: "2026-06-30" }
    ]
  },
  {
    id: "evt-08",
    title: "Leadership & Strategy Forum",
    shortDescription: "A high-level boardroom seminar focusing on management frameworks and leading teams in crisis.",
    description: "An exclusive seminar for project leads, directors, and executives. The forum introduces strategy frameworks, decision matrix systems, and crisis mitigation models used by leading multinational companies around the globe.",
    category: "Business",
    location: "Rajshahi",
    date: "2026-11-20",
    time: "09:00 AM - 01:00 PM",
    price: 1800,
    rating: 4.7,
    seats: {
      total: 80,
      booked: 65
    },
    images: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop&q=80"
    ],
    organizer: "Rajshahi Executive Hub",
    contactEmail: "forum@rajshahihub.com",
    schedule: [
      { time: "09:00 AM", activity: "Welcome coffee & briefing" },
      { time: "09:30 AM", activity: "Session: Lean Operations & Boardroom Dynamics" },
      { time: "11:30 AM", activity: "Case Study: Scaling Teams under Financial Stress" },
      { time: "12:30 PM", activity: "Open Roundtable discussion" }
    ],
    reviews: [
      { id: "rev-81", userName: "Mustafa Kamal", rating: 4.8, comment: "Highly intellectual discussions, gained extremely actionable values.", date: "2026-06-18" }
    ]
  }
];
