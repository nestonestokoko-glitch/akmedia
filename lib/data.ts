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
  image?: string; // photo URL or local asset path
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
    category: "AI + Tech",
    image: "https://yt3.ggpht.com/wb0gYFHfPxM89Pp0M8_S3WbH7solkXcuMCfOybAf_dEriGhhTx-dNWMNnJgYsQA7wOGfYc7Nyw=s400-c-k-c0x00ffffff-no-rj",
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
    category: "Tech Creator",
    image: "https://i.ibb.co/hRynYPfh/516451981-17934414708058449-7233703388245179038-n.jpg",
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
    category: "E-Com",
    image: "https://yt3.googleusercontent.com/fE3LXgl-YA6Hc2-tsL4W0JM1-F6tExAL9dT_WY7NmU1d1Jh6lifnhn-PmPt-W9-3g5RfriAa=s400-c-k-c0x00ffffff-no-rj",
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
    category: "Tech",
    image: "https://i.ibb.co/pBdWJmby/436952712-2433701267019248-2350207277516786535-n.jpg",
    metrics: [
      { label: "Followers", value: "63.1K" },
      { label: "Earned", value: "₹2.8L+" },
      { label: "Campaigns", value: "10+" },
    ],
    hue: "from-mint/60 to-transparent",
  },
  {
    id: "invisible-gyan",
    name: "Invisible Gyan",
    initials: "IG",
    category: "Knowledge Creator",
    image: "https://yt3.googleusercontent.com/pCKMsDtKzVb8SUtFHLoFpyrmTE7eoELR_-0kLNbFpTTwyfe5ijRDdGd_luOMC4kBrfVCzjEo=s900-c-k-c0x00ffffff-no-rj",
    metrics: [
      { label: "Subscribers", value: "210K+" },
      { label: "Earned", value: "₹2.0L+" },
      { label: "Campaigns", value: "5+" },
    ],
    hue: "from-blue/70 to-transparent",
  },
  {
    id: "spreading-gyan",
    name: "Spreading Gyan",
    initials: "SG",
    category: "YouTube Growth",
    image: "https://yt3.ggpht.com/wb0gYFHfPxM89Pp0M8_S3WbH7solkXcuMCfOybAf_dEriGhhTx-dNWMNnJgYsQA7wOGfYc7Nyw=s400-c-k-c0x00ffffff-no-rj",
    metrics: [
      { label: "Subscribers", value: "2.7M+" },
      { label: "Earned", value: "₹12L+" },
      { label: "Campaigns", value: "15+" },
    ],
    hue: "from-mint/80 to-transparent",
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
  firstName: "Krishna",
  lastName: "Chandrawanshi",
  badge: "Founder & Creator",
  role: "Founder & YouTube Creator",
  aka: ["Active Krishna", "Techy Krishna", "Founder & YouTube Creator"],
  image: "/images/founder.jpg",
  bio: "Krishna Chandrawanshi, also known as Active Krishna and Techy Krishna, is a YouTuber and founder of AK Media India. With 6+ years of experience and 300K+ followers, he's a six-figure earner who has worked with 2,000+ creators and 100+ brands including Hostinger, Filmora, Doola, and Superprofile, helping 1,000+ people succeed in online earning.",
  brandPartners: [
    { name: "Hostinger", href: "https://www.hostinger.com/" },
    { name: "Filmora", href: "https://filmora.wondershare.com/" },
    { name: "Doola", href: "https://doola.com/" },
    { name: "Superprofile", href: "https://superprofile.com" },
  ],
  years: "6+",
  followers: "300K+",
  creators: "2000+",
  brands: "100+",
  successStories: "1000+",
  yearsLabel: "Years Experience",
  followersLabel: "Followers",
  creatorsLabel: "Creators Helped",
  brandsLabel: "Brands Worked",
  successStoriesLabel: "Success Stories",
  stats: [
    { value: "6+", label: "Years Experience" },
    { value: "300K+", label: "Followers" },
    { value: "2000+", label: "Creators Helped" },
    { value: "100+", label: "Brands Worked" },
    { value: "1000+", label: "Success Stories" },
  ],
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