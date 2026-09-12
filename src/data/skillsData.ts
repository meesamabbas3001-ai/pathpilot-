export interface SkillRoadmap {
  beginner: string[];
  intermediate: string[];
  advanced: string[];
}

export interface SkillFaq {
  q: string;
  a: string;
}

export interface SkillDetail {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  whatIsIt: string[];
  whyImportant: string[];
  whatCanYouDo: string[];
  coreAbilities: string[];
  roadmap: SkillRoadmap;
  toolsAndTech: string[];
  projectsToPractice: string[];
  whereUsed: string[];
  relatedDegrees: string[];
  relatedCareers: string[];
  firstToLearn: string[];
  futureRelevance: string;
  faqs: SkillFaq[];
  sources: string[];
  lastUpdated: string;
  isAiAgentsSpecial?: boolean;
}

export const SKILLS_DATA: SkillDetail[] = [
  {
    id: 'ai-agents-ai-automation',
    name: 'AI Agents & AI Automation',
    slug: 'ai-agents-ai-automation',
    category: 'Future Intelligence',
    description: 'Master autonomous AI agents, tool use, multi-step orchestration, API integrations, and workflow automation systems.',
    whatIsIt: [
      'AI agents are autonomous software systems powered by Large Language Models (LLMs) that can reason, plan, use external tools, execute APIs, and accomplish multi-step objectives with minimal human intervention.',
      'Unlike traditional conversational chatbots that only respond to immediate prompts in isolation, AI agents maintain state, evaluate task progress, self-correct errors, and chain multiple tools together.'
    ],
    whyImportant: [
      'Represents the shift from passive AI generation to active autonomous task execution.',
      'Massively amplifies knowledge-worker productivity by automating complex end-to-end workflows.',
      'Enables intelligent systems to interact directly with databases, SaaS tools, and web APIs.'
    ],
    whatCanYouDo: [
      'Build autonomous research agents that gather web data, synthesize reports, and verify facts.',
      'Automate complex customer support and operations pipelines requiring multiple API lookups.',
      'Create self-debugging software development agents that write, test, and fix code.'
    ],
    coreAbilities: [
      'Prompt chaining and agent reasoning frameworks (ReAct pattern).',
      'Function calling and structured JSON output parsing.',
      'Vector memory management and retrieval-augmented generation (RAG).',
      'Error handling, fallback loops, and human-in-the-loop supervision.'
    ],
    roadmap: {
      beginner: [
        'Learn Python fundamentals and asynchronous programming.',
        'Understand REST APIs, JSON payloads, and HTTP request lifecycles.',
        'Explore basic LLM prompt engineering and API integration (OpenAI / Gemini APIs).'
      ],
      intermediate: [
        'Master function calling, tool use, and structured output parsing.',
        'Build multi-step agent loops using frameworks like LangChain, LlamaIndex, or custom Python scripts.',
        'Implement vector embeddings and semantic search memory.'
      ],
      advanced: [
        'Architect multi-agent collaborative swarms with specialized roles (Planner, Executor, Critic).',
        'Implement robust evaluation frameworks, guardrails, and deterministic state machines.',
        'Deploy production agents with secure sandboxed execution environments and rate-limiting.'
      ]
    },
    toolsAndTech: ['Python', 'LangChain', 'LlamaIndex', 'OpenAI/Gemini APIs', 'Docker', 'PostgreSQL', 'FastAPI'],
    projectsToPractice: [
      'Autonomous Web Research Assistant that scrapes sources and compiles a structured PDF report.',
      'Customer Support Triage Agent that reads tickets, queries CRM databases, and drafts verified responses.',
      'Automated Code Reviewer that clones GitHub repositories, runs test suites, and posts PR comments.'
    ],
    whereUsed: ['Tech Enterprises', 'AI Startups', 'Fintech Operations', 'Customer Experience Platforms'],
    relatedDegrees: ['Computer Science', 'Software Engineering', 'Data Science'],
    relatedCareers: ['AI Engineer', 'Automation Architect', 'Machine Learning Engineer', 'Software Developer'],
    firstToLearn: ['Python programming', 'Basic API requests', 'LLM prompt engineering'],
    futureRelevance: 'AI agents are becoming the fundamental interface between human intent and enterprise software execution.',
    faqs: [
      {
        q: 'How do AI agents differ from normal chatbots?',
        a: 'Normal chatbots reply to a single prompt using pre-trained weights. AI agents can plan multi-step workflows, call external tools/APIs, evaluate intermediate results, and correct their own errors autonomously.'
      },
      {
        q: 'What is the ReAct pattern in AI agents?',
        a: 'ReAct (Reason + Act) is a prompting and execution loop where the LLM alternates between generating a reasoning trace, executing an external action (like an API call), and observing the result.'
      }
    ],
    sources: ['IEEE Intelligent Systems', 'OpenAI Research Papers', 'Stanford AI Lab'],
    lastUpdated: '2026-09-11',
    isAiAgentsSpecial: true
  },
  {
    id: 'generative-ai-ai-engineering',
    name: 'Generative AI & AI Engineering',
    slug: 'generative-ai-ai-engineering',
    category: 'Future Intelligence',
    description: 'Build robust applications utilizing foundation models, fine-tuning, RAG architectures, and model evaluation.',
    whatIsIt: [
      'Generative AI Engineering bridges cutting-edge machine learning research with practical software engineering.',
      'It involves building scalable applications on top of foundation models (LLMs, vision models, multimodal models).'
    ],
    whyImportant: [
      'Every major industry is embedding generative AI into core workflows.',
      'Requires specialized skills beyond standard web development.'
    ],
    whatCanYouDo: [
      'Develop enterprise Retrieval-Augmented Generation (RAG) knowledge systems.',
      'Fine-tune open-source models for domain-specific tasks.',
      'Optimize token costs, latency, and model output reliability.'
    ],
    coreAbilities: [
      'Vector databases and semantic retrieval.',
      'Prompt engineering and evaluation benchmarks.',
      'Model quantization and deployment.'
    ],
    roadmap: {
      beginner: ['Basic LLM usage', 'Prompt structuring', 'Python basics'],
      intermediate: ['RAG pipelines', 'Vector embeddings', 'API integration'],
      advanced: ['Model fine-tuning', 'LoRA / QLoRA', 'Custom latency optimization']
    },
    toolsAndTech: ['PyTorch', 'Hugging Face', 'Pinecone', 'LangChain', 'Python'],
    projectsToPractice: ['Private Enterprise Knowledge Q&A System', 'Multimodal Image Analysis Web App'],
    whereUsed: ['AI Labs', 'SaaS Companies', 'Enterprise IT'],
    relatedDegrees: ['Computer Science', 'Data Science', 'Applied Mathematics'],
    relatedCareers: ['AI Engineer', 'Machine Learning Developer', 'Software Architect'],
    firstToLearn: ['Python', 'Basic API concepts'],
    futureRelevance: 'Foundation models are standard infrastructure; engineers who can orchestrate them are in high demand.',
    faqs: [
      {
        q: 'What is RAG?',
        a: 'Retrieval-Augmented Generation connects an LLM to external documents or databases so it can answer accurately using proprietary data.'
      }
    ],
    sources: ['IEEE', 'ACM'],
    lastUpdated: '2026-09-11'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    category: 'Technical Skills',
    description: 'Protect critical digital infrastructure, networks, and data against sophisticated cyber threats and unauthorized breaches.',
    whatIsIt: ['The practice of defending computers, servers, mobile devices, electronic systems, networks, and data from malicious attacks.'],
    whyImportant: ['Digital transformation makes every organization a target for cybercrime, making security paramount.'],
    whatCanYouDo: ['Conduct penetration testing', 'Secure cloud architectures', 'Respond to security incidents'],
    coreAbilities: ['Network defense', 'Cryptography', 'Ethical hacking', 'Risk assessment'],
    roadmap: {
      beginner: ['Networking basics', 'Linux administration', 'Security fundamentals'],
      intermediate: ['Penetration testing', 'Cryptography', 'SIEM monitoring'],
      advanced: ['Red teaming', 'Security architecture', 'Incident response leadership']
    },
    toolsAndTech: ['Wireshark', 'Metasploit', 'Burp Suite', 'Linux', 'Python'],
    projectsToPractice: ['Set up a secure home lab', 'Perform vulnerability scan on test environment'],
    whereUsed: ['Financial Institutions', 'Government', 'Cloud Providers', 'Enterprise Security'],
    relatedDegrees: ['Cybersecurity', 'Computer Science', 'Information Technology'],
    relatedCareers: ['Cybersecurity Analyst', 'Penetration Tester', 'Security Engineer'],
    firstToLearn: ['Networking fundamentals (TCP/IP)', 'Linux OS'],
    futureRelevance: 'As cyber attacks grow more automated and AI-driven, defense systems require sophisticated engineering.',
    faqs: [
      { q: 'What is ethical hacking?', a: 'Authorized simulation of cyberattacks to identify vulnerabilities before malicious hackers do.' }
    ],
    sources: ['NIST', 'ISACA'],
    lastUpdated: '2026-09-11'
  },
  {
    id: 'data-analytics-data-science',
    name: 'Data Analytics & Data Science',
    slug: 'data-analytics-data-science',
    category: 'Analytical Skills',
    description: 'Transform raw data into strategic business intelligence through statistical modeling, SQL querying, and machine learning.',
    whatIsIt: ['Extracting actionable insights and predictive patterns from complex, high-volume datasets.'],
    whyImportant: ['Data-driven organizations outperform competitors by making empirical decisions.'],
    whatCanYouDo: ['Build predictive churn models', 'Design interactive executive dashboards', 'Perform A/B testing'],
    coreAbilities: ['SQL & Python', 'Statistical hypothesis testing', 'Data visualization'],
    roadmap: {
      beginner: ['Excel & SQL basics', 'Basic statistics'],
      intermediate: ['Python / R programming', 'Pandas & NumPy', 'Tableau / PowerBI'],
      advanced: ['Machine learning modeling', 'Big data processing (Spark)', 'Advanced experimentation']
    },
    toolsAndTech: ['SQL', 'Python', 'Tableau', 'Pandas', 'PostgreSQL'],
    projectsToPractice: ['Customer Churn Prediction Model', 'Sales Performance Dashboard'],
    whereUsed: ['Retail', 'Finance', 'Tech', 'Healthcare'],
    relatedDegrees: ['Data Science', 'Statistics', 'Computer Science', 'Economics'],
    relatedCareers: ['Data Scientist', 'Data Analyst', 'Business Intelligence Analyst'],
    firstToLearn: ['SQL querying', 'Basic statistics'],
    futureRelevance: 'Continuous growth in digital data ensures high demand for analytical translators.',
    faqs: [
      { q: 'What is the difference between data analysis and data science?', a: 'Data analysis focuses on interpreting historical data; data science builds predictive machine learning models.' }
    ],
    sources: ['ASA', 'INFORMS'],
    lastUpdated: '2026-09-11'
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    slug: 'cloud-computing',
    category: 'Technical Skills',
    description: 'Architect, deploy, and scale fault-tolerant applications on modern cloud infrastructure (AWS, GCP, Azure).',
    whatIsIt: ['On-demand delivery of computing power, database storage, and IT resources over the internet.'],
    whyImportant: ['Virtually all modern software runs in the cloud rather than on physical on-premise servers.'],
    whatCanYouDo: ['Design highly available microservices architectures', 'Automate infrastructure provisioning with Terraform'],
    coreAbilities: ['Containerization (Docker/Kubernetes)', 'CI/CD pipelines', 'Cloud IAM security'],
    roadmap: {
      beginner: ['Linux fundamentals', 'Networking basics', 'Intro to AWS/GCP'],
      intermediate: ['Docker containers', 'Infrastructure as Code (Terraform)', 'CI/CD'],
      advanced: ['Kubernetes orchestration', 'Multi-region disaster recovery', 'Cloud security architecture']
    },
    toolsAndTech: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Linux'],
    projectsToPractice: ['Deploy a scalable 3-tier web app on AWS with auto-scaling'],
    whereUsed: ['Cloud Providers', 'SaaS Enterprises', 'Tech Consultancies'],
    relatedDegrees: ['Computer Science', 'Software Engineering', 'Information Technology'],
    relatedCareers: ['Cloud Engineer', 'DevOps Engineer', 'Systems Architect'],
    firstToLearn: ['Linux command line', 'Basic networking'],
    futureRelevance: 'Cloud infrastructure is the bedrock of all modern digital services.',
    faqs: [
      { q: 'What is Infrastructure as Code?', a: 'Managing and provisioning computing infrastructure through machine-readable definition files rather than physical hardware configuration.' }
    ],
    sources: ['Cloud Security Alliance', 'AWS Architecture Center'],
    lastUpdated: '2026-09-11'
  },
  {
    id: 'software-development',
    name: 'Software Development',
    slug: 'software-development',
    category: 'Technical Skills',
    description: 'Design, write, test, and maintain robust full-stack web and mobile applications using modern frameworks.',
    whatIsIt: ['The craft of creating reliable, maintainable software products using clean code and structured engineering principles.'],
    whyImportant: ['Software underpins modern commerce, communication, and entertainment.'],
    whatCanYouDo: ['Build responsive web applications', 'Design high-throughput backend APIs', 'Write automated test suites'],
    coreAbilities: ['JavaScript/TypeScript & Python', 'Version control (Git)', 'Database design'],
    roadmap: {
      beginner: ['HTML/CSS/JS fundamentals', 'Git version control'],
      intermediate: ['React/Node.js or Python/FastAPI', 'REST APIs', 'SQL databases'],
      advanced: ['System design patterns', 'Microservices', 'Performance optimization']
    },
    toolsAndTech: ['TypeScript', 'React', 'Node.js', 'Git', 'PostgreSQL'],
    projectsToPractice: ['Full-stack SaaS task management platform with authentication'],
    whereUsed: ['Tech Industry', 'Startups', 'Enterprise IT', 'Agencies'],
    relatedDegrees: ['Computer Science', 'Software Engineering'],
    relatedCareers: ['Software Engineer', 'Full-Stack Developer', 'Frontend Developer'],
    firstToLearn: ['JavaScript fundamentals', 'Git'],
    futureRelevance: 'Core engineering capabilities remain foundational despite generative AI assistance.',
    faqs: [
      { q: 'What is full-stack development?', a: 'Building both the client-facing user interface (frontend) and server database logic (backend).' }
    ],
    sources: ['ACM', 'IEEE'],
    lastUpdated: '2026-09-11'
  },
  {
    id: 'digital-marketing-seo',
    name: 'Digital Marketing & SEO',
    slug: 'digital-marketing-seo',
    category: 'Business & Growth',
    description: 'Drive organic search visibility, conversion optimization, performance marketing, and digital brand growth.',
    whatIsIt: ['Strategic promotion of products and services using digital channels, search engines, and data-driven analytics.'],
    whyImportant: ['Organic search and digital acquisition are primary drivers of customer acquisition for modern businesses.'],
    whatCanYouDo: ['Execute technical SEO audits', 'Manage multi-channel acquisition campaigns', 'Analyze user conversion funnels'],
    coreAbilities: ['Technical & On-page SEO', 'Analytics & Attribution', 'Content strategy'],
    roadmap: {
      beginner: ['Marketing fundamentals', 'Keyword research basics'],
      intermediate: ['Technical SEO audits', 'Google Analytics', 'Content marketing'],
      advanced: ['Programmatic SEO', 'Global growth strategy', 'Conversion rate optimization (CRO)']
    },
    toolsAndTech: ['Google Search Console', 'GA4', 'Semrush', 'Ahrefs'],
    projectsToPractice: ['Perform a comprehensive technical SEO and content audit for a live website'],
    whereUsed: ['E-commerce', 'Digital Agencies', 'SaaS Growth Teams'],
    relatedDegrees: ['Business Administration', 'Marketing', 'Communications'],
    relatedCareers: ['SEO Specialist', 'Growth Marketer', 'Digital Marketing Manager'],
    firstToLearn: ['Search intent analysis', 'Basic HTML structure'],
    futureRelevance: 'Search engines are evolving into AI answer engines; technical and semantic optimization is more vital than ever.',
    faqs: [
      { q: 'What is technical SEO?', a: 'Optimizing website infrastructure so search engines can crawl, render, and index pages efficiently.' }
    ],
    sources: ['Search Engine Journal', 'Google Search Central'],
    lastUpdated: '2026-09-11'
  },
  {
    id: 'ux-ui-product-design',
    name: 'UX/UI & Product Design',
    slug: 'ux-ui-product-design',
    category: 'Design & Creativity',
    description: 'Create intuitive, accessible, and human-centered digital interfaces and end-to-end product experiences.',
    whatIsIt: ['Designing user experiences (UX) and user interfaces (UI) that are functional, accessible, and delightful to use.'],
    whyImportant: ['Great design differentiates successful software products from unusable alternatives.'],
    whatCanYouDo: ['Conduct user research and usability testing', 'Design high-fidelity design systems in Figma', 'Prototype interactive flows'],
    coreAbilities: ['Wireframing & Prototyping', 'User research', 'Design systems'],
    roadmap: {
      beginner: ['Design principles', 'Figma basics', 'Color theory & typography'],
      intermediate: ['User research methods', 'Interaction design', 'Design systems'],
      advanced: ['Product strategy', 'Design ops', 'Accessibility (WCAG) compliance']
    },
    toolsAndTech: ['Figma', 'Miro', 'Principle', 'Tailwind CSS'],
    projectsToPractice: ['Design a mobile banking app with a complete accessible design system'],
    whereUsed: ['Tech Product Teams', 'Design Agencies', 'SaaS Enterprises'],
    relatedDegrees: ['Graphic Design', 'Computer Science', 'Psychology'],
    relatedCareers: ['UX Designer', 'UI Designer', 'Product Designer'],
    firstToLearn: ['Figma fundamentals', 'User empathy & research'],
    futureRelevance: 'Human-centered design is essential to ensure AI and software tools remain intuitive and usable.',
    faqs: [
      { q: 'What is the difference between UX and UI?', a: 'UX focuses on the user journey and problem-solving structure; UI focuses on the visual look, feel, and interface components.' }
    ],
    sources: ['Interaction Design Foundation', 'Nielsen Norman Group'],
    lastUpdated: '2026-09-11'
  }
];
