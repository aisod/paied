export interface ProgramMonth {
  month: number
  title: string
  focus: string
  primaryTools: string
  keySkills: string[]
  duration: string
  filename: string
}

export const programMonths: ProgramMonth[] = [
  {
    month: 1,
    title: 'AI Essentials & Foundations',
    focus: 'AI concepts, prompting, ethical use',
    primaryTools: 'Grok/Claude, VS Code, GitHub',
    keySkills: ['Prompt engineering', 'Tool setup', 'Ethical AI basics'],
    duration: 'Weeks 1-4',
    filename: 'PAIED Program_ Detailed Curriculum for Month 1 – AI Essentials & Foundations.md'
  },
  {
    month: 2,
    title: 'UI/UX Design & Graphics for Developers',
    focus: 'Professional visuals and prototypes',
    primaryTools: 'Figma, AI image tools (ethical use)',
    keySkills: ['User-centered design', 'Prototyping', 'Design systems'],
    duration: 'Weeks 5-8',
    filename: 'PAIED Program_ Detailed Curriculum for Month 2 – UI_UX Design & Graphics for Developers.md'
  },
  {
    month: 3,
    title: 'AI-Powered Web Development',
    focus: 'Responsive websites with AI features',
    primaryTools: 'Next.js, React, Supabase, Vercel',
    keySkills: ['Full-stack web', 'Deployment', 'AI integrations'],
    duration: 'Weeks 9-12',
    filename: 'PAIED Program_ Detailed Curriculum for Month 3 – AI-Powered Web Development.md'
  },
  {
    month: 4,
    title: 'AI-Powered Mobile Development',
    focus: 'Cross-platform mobile apps',
    primaryTools: 'Flutter + Dart (primary), Supabase',
    keySkills: ['Mobile UI', 'State management', 'App publishing'],
    duration: 'Weeks 13-16',
    filename: 'PAIED Program_ Detailed Curriculum for Month 4 – AI-Powered Mobile Development.md'
  },
  {
    month: 5,
    title: 'Core Programming Mastery with AI',
    focus: 'Deep dive into key languages',
    primaryTools: 'Python, Dart, JavaScript/TypeScript',
    keySkills: ['Clean code', 'APIs', 'Debugging with AI'],
    duration: 'Weeks 17-20',
    filename: 'PAIED Program_ Detailed Curriculum for Month 5 – Core Programming Mastery with AI.md'
  },
  {
    month: 6,
    title: 'AI Agents & Automation Development',
    focus: 'Autonomous agents and workflows',
    primaryTools: 'Python, LangChain, Supabase Functions',
    keySkills: ['Agentic AI', 'Multi-step automation', 'API integration'],
    duration: 'Weeks 21-24',
    filename: 'PAIED Program_ Detailed Curriculum for Month 6 – AI Agents & Automation Development.md'
  },
  {
    month: 7,
    title: 'Model Fine-Tuning & Customization',
    focus: 'Adapting LLMs ethically',
    primaryTools: 'Python, Hugging Face, LoRA',
    keySkills: ['Custom models', 'Domain adaptation', 'Ethical fine-tuning'],
    duration: 'Weeks 25-28',
    filename: 'PAIED Program_ Detailed Curriculum for Month 7 – Model Fine-Tuning & Customization.md'
  },
  {
    month: 8,
    title: 'Advanced AI Integrations',
    focus: 'Real-world connections (MCP, APIs)',
    primaryTools: 'Supabase, APIs, MCP protocols',
    keySkills: ['Secure integrations', 'Scaling', 'Advanced APIs'],
    duration: 'Weeks 29-32',
    filename: 'PAIED Program_ Detailed Curriculum for Month 8 – Advanced AI Integrations.md'
  },
  {
    month: 9,
    title: 'Capstone Projects, Portfolio & Career Launch',
    focus: 'Full products + professional launch',
    primaryTools: 'All tools + freelancing platforms',
    keySkills: ['End-to-end builds', 'Pitching', 'Earning strategies'],
    duration: 'Weeks 33-36',
    filename: 'PAIED Program_ Detailed Curriculum for Month 9 – Capstone Projects, Portfolio & Career Launch.md'
  }
]

export const programStats = {
  duration: '9 Months',
  totalHours: '360+ Hours',
  projects: '9+ Major Projects',
  technologies: '7+ Core Technologies',
  support: '24/7 Community',
  cost: 'FREE (Premium available)'
}

export const pricingOptions = [
  {
    name: 'FREE Access',
    price: 'N$0',
    description: 'Complete self-paced learning with community support',
    features: [
      'Full curriculum access',
      'Community forums',
      'Basic project reviews',
      'Self-paced learning',
      'Certificate of completion'
    ],
    popular: false,
    link: 'https://aisodx.tech'
  },
  {
    name: 'Premium Support',
    price: 'N$200/month',
    description: 'Personalized tutoring and premium services',
    features: [
      'Everything in Free',
      '1-on-1 mentoring',
      'Live tutoring sessions',
      'Priority support',
      'Advanced resources',
      'Job placement assistance'
    ],
    popular: true,
    link: 'https://aisodx.tech/premium'
  },
  {
    name: 'School Program',
    price: 'N$1,334 total',
    description: 'Structured program for schools and institutions',
    features: [
      'Institutional access',
      'Teacher training',
      'Curriculum integration',
      'Bulk pricing available',
      'Progress tracking dashboard'
    ],
    popular: false,
    link: 'https://www.aisodinstitute.tech/schools'
  }
]

export const testimonials = [
  {
    name: 'Maria K.',
    role: 'AI Developer',
    location: 'Windhoek, Namibia',
    content: 'From knowing nothing about coding to launching my first AI app in 3 months. The PAIED program changed my life completely.',
    rating: 5
  },
  {
    name: 'John M.',
    role: 'Entrepreneur',
    location: 'Swakopmund, Namibia',
    content: 'The practical approach is incredible. I built 3 projects that are now generating income. Best investment in myself ever.',
    rating: 5
  },
  {
    name: 'Sarah T.',
    role: 'Student',
    location: 'Walvis Bay, Namibia',
    content: 'As a complete beginner, I was scared to start. But the step-by-step guidance and ethical AI focus made it possible.',
    rating: 5
  }
]

// Main PROGRAM_DATA export used by components
export const PROGRAM_DATA = {
  description: 'AISOD Institute\'s flagship PAIED (Practical AI Engineering & Development) Program is a comprehensive 9-month journey designed to transform beginners into professional AI-powered developers. Our ethical AI-first approach ensures you build real-world applications while maintaining responsible development practices.',

  contact: {
    email: 'info@aisodinstitute.tech',
    phone: '+264 81 497 1482',
    address: 'Office 18, Go Work Offices Suits, Maerua Mall, Cnr of Jan Jonker and Centaurus Road, Windhoek, Namibia'
  },

  pricing: {
    free: {
      name: 'FREE Access',
      description: 'Complete self-paced learning with community support',
      price: 'N$0',
      features: [
        'Full curriculum access',
        'Community forums',
        'Basic project reviews',
        'Self-paced learning',
        'Certificate of completion'
      ]
    },
    individual: {
      name: 'Standard Support',
      description: 'Personalized program for developers and those with some skills',
      price: 'N$200',
      features: [
        'Everything in Free',
        'Group mentoring',
        'Live tutoring sessions',
        'Office support',
        'Advanced resources',
        'Job placement assistance',
        'Investment hub access',
        'Limited marketplace access'
      ]
    },
    school: {
      name: 'Premium Program',
      description: 'For complete beginners who want to be professionals without prior experience',
      price: 'N$1,334',
      features: [
        'Everything in Standard',
        'Institutional access',
        '1-on-1 mentoring',
        'In-person training 4 days/month',
        'Curriculum integration',
        'Investment hub access',
        'Unlimited marketplace access'
      ]
    }
  },

  links: {
    aisodX: 'https://aisodx.tech',
    aisodInstitute: 'https://www.aisodinstitute.tech/schools'
  },

  startDates: {
    nonWorkers: 'February 6, 2026',
    workers: 'February 7, 2026'
  },

  philosophy: 'Transform your career with hands-on AI engineering. Build real projects, master cutting-edge tools, and launch your future—all while maintaining ethical development practices.',

  stats: {
    duration: '9 Months',
    projects: '9+ Projects',
    skills: '7+ Technologies',
    support: '24/7 Community'
  }
}