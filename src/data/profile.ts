// Keep personal details here. null means the UI omits or disables an unavailable link.
export const profile = {
  name: 'Tony Tran',
  title: 'Full-Stack Software Engineer',
  // Place your portrait in public/images/, then use its /images/... URL here.
  avatar: { src: null as string | null, alt: 'Tony Tran' },
  email: null as string | null,
  github: 'https://github.com/AnonymousWalker',
  linkedin: 'https://linkedin.com/in/anh-tran-1001',
  // Replace public/resume.pdf with your real résumé, then set this to '/resume.pdf'.
  resumeUrl: null as string | null,
  introduction: 'Full-stack software engineer with 5+ years of experience building and improving applications with C#/.NET, Java/Kotlin, React, and SQL.',
  about: [
    'I’m Tony, a full-stack software engineer who enjoys understanding how systems work — and making them work better.',
    'Over five years in software development, I’ve worked across backend services, frontend applications, databases, and APIs. Working in a small engineering environment has given me the opportunity to own features and follow a problem through different parts of a system.',
    'I care about reliable software, clear trade-offs, and the details that make an application useful. Whether I’m debugging an existing system or building something new, I start by understanding the problem.',
  ],
}

export interface Experience {
  company: string | null
  position: string | null
  dates: string | null
  context: string
  description: string
  contributions: string[]
  technologies: string[]
}

export const experience: Experience[] = [{
  company: null,
  position: null,
  dates: null,
  context: 'Nonprofit organization',
  description: 'Full-stack development in a small engineering environment, contributing across the software development lifecycle.',
  contributions: [
    'Contribute to backend and frontend implementation, APIs, and database work.',
    'Investigate bugs and performance bottlenecks across application layers.',
    'Take ownership of features from understanding the problem through implementation.',
  ],
  // Add only technologies confirmed for this position.
  technologies: [],
}]

export const skills = [
  { name: 'Backend', items: ['C#', '.NET', 'ASP.NET', 'Java', 'Kotlin', 'Spring Boot', 'REST APIs'] },
  { name: 'Frontend', items: ['JavaScript', 'React', 'HTML', 'CSS', 'Bootstrap'] },
  { name: 'Databases', items: ['PostgreSQL', 'SQL Server', 'MySQL', 'SQLite'] },
  { name: 'Engineering & tools', items: ['Git', 'Docker', 'CI/CD', 'Automated testing', 'Code reviews', 'Architecture', 'Design patterns'] },
]
