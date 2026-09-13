// ------------------------------------------------------------
// AK Media India — Content & data model
// Every number below comes from the existing published site.
// Nothing is fabricated.
// ------------------------------------------------------------

export type Creator = {
  id: string;
  name: string;
  initials: string;
  category: string;
  metrics: { label: string; value: string }[];
  hue: string; // accent pair for the monogram tile
};

export const stats = [
  { value: 2000, suffix: "+", label: "Creators helped grow their careers" },
  { value: 100, suffix: "+", label: "Brands scaling with authentic campaigns" },
  { value: 1000, suffix: "+", label: "Success stories and campaigns" },
  { value: 300, suffix: "K+", label: "Founder's active audience" },
];

export const brandMarks = ["Hostinger", "Filmora", "Manomay", "XECH", "Brand"];

export const creators: Creator[] = [
  {
    id: "grow-with-me",
    name: "Grow with ME",
    initials: "GM",
    category: "Tech Creator",
    metrics: [
      { label: "Subscribers", value: "403K+" },
      { label: "Earned", value: "₹3.5L+" },
      { label: "Campaigns", value: "2+" },
    ],
    hue: "from-blue/80 to-transparent",
  },
  {
    id: "sonu-yadav",
    name: "Sonu Yadav",
    initials: "SY",
    category: "Lifestyle",
    metrics: [
      { label: "Followers", value: "38.5K" },
      { label: "Earned", value: "₹1.5L+" },
      { label: "Campaigns", value: "8+" },
    ],
    hue: "from-mint/70 to-transparent",
  },
  {
    id: "fardeen",
    name: "Fardeen",
    initials: "FD",
    category: "Tech & Gaming",
    metrics: [
      { label: "Subscribers", value: "111K" },
      { label: "Earned", value: "₹3.5L+" },
      { label: "Campaigns", value: "4+" },
    ],
    hue: "from-blue/60 to-transparent",
  },
  {
    id: "me-tech",
    name: "Me Tech",
    initials: "MT",
    category: "Tech Reviews",
    metrics: [
      { label: "Followers", value: "63.1K" },
      { label: "Earned", value: "₹2.8L+" },
      { label: "Campaigns", value: "10+" },
    ],
    hue: "from-mint/60 to-transparent",
  },
];

export type Campaign = {
  id: string;
  brand: string;
  creator: string;
  type: string;
  headline: string;
  result: string;
  resultLabel: string;
  gradient: string;
};

export const campaigns: Campaign[] = [
  {
    id: "filmora",
    brand: "Filmora",
    creator: "Tech Creator Network",
    type: "Authentic content campaign",
    headline:
      "A creation-focused approach that turned editors into the story.",
    result: "320%",
    resultLabel: "Boost in engagement",
    gradient: "from-mint/25 via-transparent to-transparent",
  },
  {
    id: "hostinger",
    brand: "Hostinger",
    creator: "Creator Network",
    type: "Qualified signup campaign",
    headline:
      "Real creators, real tutorials — and a pipeline of qualified signups.",
    result: "50K+",
    resultLabel: "Qualified website signups in 3 months",
    gradient: "from-blue/25 via-transparent to-transparent",
  },
];

export const whyPoints = [
  {
    n: "01",
    title: "Verified Creators",
    body: "Every creator in our network is checked for authentic audiences and professional standards. No bots. No fake engagement.",
  },
  {
    n: "02",
    title: "Strategy First",
    body: "We start with your goals, not a template. Every campaign is built around a specific outcome and the ROI you actually need.",
  },
  {
    n: "03",
    title: "Guaranteed Delivery",
    body: "We only work with creators who meet our delivery and quality bar — so campaigns ship complete, on time, every time.",
  },
  {
    n: "04",
    title: "Transparent Reporting",
    body: "See exactly what's working with real-time analytics and plain-language performance data. No vanity metrics.",
  },
];

export const brandProcess = [
  { n: "01", label: "Discover", detail: "We map creators who genuinely fit your brand and audience." },
  { n: "02", label: "Match", detail: "Strategic pairing based on niche, tone and reach." },
  { n: "03", label: "Create", detail: "Briefs, assets and authentic content direction." },
  { n: "04", label: "Launch", detail: "Campaign goes live across the right creators." },
  { n: "05", label: "Measure", detail: "Track, report and scale what performs." },
];

export const creatorProcess = [
  { n: "01", label: "Apply", detail: "Join the network with your niche and audience." },
  { n: "02", label: "Get Verified", detail: "We confirm audience authenticity and quality." },
  { n: "03", label: "Get Matched", detail: "Brands that fit your audience come to you." },
  { n: "04", label: "Create", detail: "Make content you're proud of — on brief." },
  { n: "05", label: "Get Paid", detail: "Reliable, on-time compensation. Every campaign." },
];

export const founder = {
  name: "Krishna Chandrawanshi",
  years: "6+",
  followers: "300K+",
  creators: "2000+",
  brands: "100+",
  yearsLabel: "Years creating",
  followersLabel: "Followers across platforms",
  creatorsLabel: "Creators helped",
  brandsLabel: "Brands partnered",
  quote:
    "Creator-first marketing works because the incentives are aligned. Brands get authentic reach, creators get fair compensation.",
};

export const testimonials = [
  {
    quote:
      "AK Media helped us find creators who truly understood our product. The campaigns drove 3x the engagement we'd seen before.",
    person: "Brand Partner",
    role: "Venture Partners",
    type: "Brand",
  },
  {
    quote:
      "As a creator, I finally have a partner who understands my audience and values my work. The campaigns pay well and deliver results.",
    person: "Creator",
    role: "Tech Creator",
    type: "Creator",
  },
];

export const navLinks = [
  { label: "For Brands", href: "#brands", section: "brands" },
  { label: "For Creators", href: "#creators", section: "creators" },
  { label: "Work", href: "#work", section: "work" },
  { label: "Process", href: "#process", section: "process" },
  { label: "Founder", href: "#founder", section: "founder" },
];