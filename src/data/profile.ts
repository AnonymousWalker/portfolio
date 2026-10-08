// Public portfolio content. The résumé document is not stored in this repository.
export const profile = {
  name: 'Tony Tran',
  headerName: 'Tony Anh Tran',
  title: 'Full-Stack Software Engineer',
  location: 'Orlando, FL',
  avatar: { src: '/my-avatar.png' as string | null, alt: 'Portrait of Tony Tran' },
  // Obfuscation limits plain-text scraping; this is not encryption or access control.
  emailEncoded: 'aG9hbmdhbmh0cmFuMTk5OEBnbWFpbC5jb20=' as string | null,
  github: 'https://github.com/AnonymousWalker',
  linkedin: 'https://linkedin.com/in/anh-tran-1001',
  introduction: 'I bring 5+ years of experience building reliable applications, thoughtful APIs, and tools that make everyday work easier.',
  techStack: ['Kotlin', 'Java', 'C# / .NET', 'Python', 'SQL', 'React'],
  about: [
    'I enjoy turning complex problems into software that’s reliable, useful, and easy to maintain.',
    'At Wycliffe Associates, I own applications end to end — from understanding user needs and designing the architecture to implementation, testing, deployment, and documentation. Working with a small Agile team has given me experience across the entire development lifecycle.',
    'My work spans cross-platform desktop tools, web applications, APIs, and databases. I care about clean architecture, clear trade-offs, and developer productivity, and use AI-assisted tools to support debugging, refactoring, testing, and modernization.',
  ],
}

export interface Experience {
  company: string | null
  companyUrl?: string
  position: string | null
  dates: string | null
  context: string
  description: string
  contributions: string[]
  technologies: string[]
}

export const experience: Experience[] = [
  {
    company: 'Wycliffe Associates',
    companyUrl: 'https://wycliffeassociates.org/about/our-mission/',
    position: 'Software Developer',
    dates: 'Oct 2022 — Present',
    context: 'Orlando, FL · On-site',
    description: 'Own and ship end-to-end applications, REST APIs, and developer tools in a small Agile engineering team.',
    contributions: [
      'Led AI integration initiatives that saved 10+ hours of manual work each week.',
      'Improved software performance by 40% using multithreading and caching.',
      'Built and shipped Orature, a cross-platform audio Bible translation tool, with Kotlin, Java, JavaFX, and SQLite; modernized the codebase with clean architecture.',
      'Built and deployed an AI document translation web application and cloud services in 2025.',
      'Design application architecture and SQL databases, and deploy containerized services with Docker, GitHub Actions, and Jenkins.',
    ],
    technologies: ['C#/.NET', 'Kotlin', 'Python', 'JavaScript', 'React', 'SQL', 'Docker'],
  },
  {
    company: 'Wycliffe Associates',
    companyUrl: 'https://wycliffeassociates.org/about/our-mission/',
    position: 'Software Developer Intern',
    dates: 'Jun 2020 — Nov 2021',
    context: 'Orlando, FL · Hybrid',
    description: 'Developed cross-platform applications and APIs, contributing to architecture, technical design, testing, and iterative delivery.',
    contributions: [
      'Co-designed and built USFM Converter in three weeks with a two-developer team, converting Scripture files into DOCX and HTML for hundreds of translators.',
      'Built applications and APIs with C#/.NET, Kotlin, Java, Python, and JavaScript/React.',
      'Contributed to data solutions using SQLite and MySQL, alongside technical design and automated testing.',
    ],
    technologies: ['C#/.NET', 'Kotlin', 'Java', 'Python', 'React', 'SQLite', 'MySQL'],
  },
  {
    company: 'Amaris Consulting',
    companyUrl: 'https://amaris.com/',
    position: 'Web Development Intern',
    dates: 'Jan 2018 — Jun 2018',
    context: 'Ho Chi Minh City, Vietnam',
    description: 'Developed web applications and responsive interfaces as part of a Scrum team.',
    contributions: [
      'Implemented C#/.NET MVC applications and SQL Server data features.',
      'Built responsive interfaces with CSS, Bootstrap, and jQuery.',
      'Supported reliable sprint delivery through code review, debugging, and database troubleshooting.',
    ],
    technologies: ['C#/.NET MVC', 'SQL Server', 'CSS', 'Bootstrap', 'jQuery'],
  },
]

export const skills = [
  { name: 'Backend', items: ['C# / .NET', 'Kotlin', 'Java', 'Python', 'RESTful APIs'] },
  { name: 'Frontend & mobile', items: ['React', 'React Native', 'TypeScript', 'HTML', 'CSS'] },
  { name: 'Data & systems', items: ['SQL', 'MySQL', 'SQL Server', 'SQLite', 'PostgreSQL', 'Multithreading', 'Caching'] },
  { name: 'Delivery & cloud', items: ['Git', 'Docker', 'GitHub Actions', 'Jenkins', 'AWS', 'CI/CD'] },
  { name: 'AI & developer tools', items: ['Claude', 'Cursor', 'ChatGPT'] },
  { name: 'Engineering practices', items: ['System design', 'Clean architecture', 'Design patterns', 'Automated testing', 'Debugging', 'Code review', 'Agile framework'] },
]

export const education = [
  { degree: 'Master’s in Computer Science', school: 'Troy University', dates: '2022 — 2023', gpa: '3.8' },
  { degree: 'Bachelor’s in Computer Science', school: 'Troy University', dates: '2016 — 2020', gpa: '3.9' },
]
