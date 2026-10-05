# Project: Build My Software Engineer Portfolio Website

## 1. Objective

Build a modern, professional portfolio website for me, a mid-level Full-Stack Software Engineer with 5+ years of professional experience.

The primary audience is engineering managers, technical recruiters, and software engineering interviewers.

The website should communicate three things:

1. I have real production software development experience.
2. I understand software architecture, databases, APIs, performance optimization, and engineering trade-offs.
3. I can independently own features and solve challenging technical problems.

This should feel like an experienced software engineer's portfolio, not a generic coding bootcamp website.

**Important:** Build the actual working website, not just a mockup.

---

## 2. Technology Stack

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React for icons

Requirements:

- Responsive, mobile-first design.
- Clean component architecture.
- Reusable components.
- Accessible HTML.
- SEO-friendly metadata.
- Fast loading.
- Easy to maintain and update.
- Static deployment compatible with Vercel or Netlify.

Do not introduce a backend unless necessary.

Store portfolio content in structured TypeScript data files so I can easily update projects, experience, and skills without modifying UI components.

---

## 3. Design Direction

Design a clean, modern, minimalist engineering portfolio.

Visual characteristics:

- Professional and understated.
- Strong typography.
- Generous whitespace.
- Subtle borders.
- Clean card layouts.
- Consistent spacing.
- Minimal animations.
- Light and dark mode support.

Avoid:

- Excessive animations.
- Large gradients everywhere.
- Generic stock photos.
- Animated skill progress bars.
- Overly decorative elements.
- A complicated navigation system.

Use a neutral color palette with one restrained accent color.

The website should look polished on desktop and mobile.

---

## 4. Website Architecture

Build a single-page homepage with dedicated project detail pages.

Suggested routes:

```
/
 /projects/ats-system
 /projects/usfm-converter
 /projects/waveform-optimization
```

Homepage navigation:

- Home
- About
- Experience
- Projects
- Skills
- Contact

Use smooth scrolling for homepage sections.

Provide clear navigation back to the homepage from project pages.

---

# 5. Homepage Sections

## Section 1: Hero

Name: Tony Tran

Title: Full-Stack Software Engineer

Headline:

"I build reliable software that solves real problems."

Supporting introduction:

"Full-stack software engineer with 5+ years of experience building and improving applications using C#/.NET, Java/Kotlin, React, and SQL. I enjoy solving complex technical problems, improving existing systems, and building software that delivers real value."

Include buttons:

- View My Work
- Download Resume

Also include:

- GitHub
- LinkedIn
- Email

Links:

GitHub: https://github.com/AnonymousWalker

LinkedIn: https://linkedin.com/in/anh-tran-1001

Resume should use a placeholder file at `/public/resume.pdf` until I provide the final PDF.

Do not invent my email address. Use a configurable placeholder.

Do not use generic developer illustrations or stock photographs in the hero.

---

## Section 2: About Me

Create a concise professional introduction.

Content direction:

"I'm a full-stack software engineer with over five years of experience working across the software development lifecycle. My background includes backend development, frontend applications, database design, API development, debugging, and performance optimization.

Working in a small engineering environment has given me the opportunity to take ownership of features and contribute across different parts of a system.

I'm interested in building reliable software, understanding how systems work, and continuously improving my engineering skills."

Feel free to improve the wording without inventing achievements.

Keep it professional, friendly, and straightforward.

---

## Section 3: Professional Experience

Create a professional experience section with a timeline or clean vertical layout.

My background:

- 5+ years of professional software engineering experience.
- Experience working at a nonprofit organization.
- Full-stack development.
- Backend and frontend implementation.
- API development.
- Database work.
- Debugging and performance optimization.
- Working across different parts of the software development lifecycle.

Important:

Do not invent company names, employment dates, job titles, numerical achievements, or technologies used in specific positions.

Create configurable experience data with placeholders for details that have not been provided.

Each experience entry should support:

- Company
- Position
- Employment dates
- Description
- Key contributions
- Technologies

Focus on engineering impact rather than generic job responsibilities.

---

# 6. Featured Projects

Display three featured project cards on the homepage.

Each card should include:

- Project name
- Short description
- Technology stack
- Key engineering focus
- View Case Study button
- GitHub link when available

Do not invent live demo URLs.

Use actual project screenshots when available. Otherwise, create a tasteful abstract preview or architecture-based visual rather than a fake application screenshot.

## Project 1: Applicant Tracking System

Name: ATS System

GitHub:
https://github.com/AnonymousWalker/ats-system

Known technologies:

- Java
- Spring Boot
- PostgreSQL

Description:

"A backend-focused Applicant Tracking System project exploring REST API development, relational database design, and application architecture."

Engineering topics to highlight where supported by the repository:

- REST API design
- Database schema design
- Transaction management
- Data consistency
- Optimistic locking
- Query optimization
- Pagination
- Application architecture
- Automated testing

Important:

Inspect the repository before writing detailed project descriptions.

Distinguish implemented functionality from concepts that were only discussed or planned.

Do not claim a feature was implemented unless it exists in the codebase.

The case study should explain actual architectural decisions and trade-offs supported by the implementation.

## Project 2: USFM Converter

Name: USFM Converter

Repository:
https://github.com/Bible-Translation-Tools/USFM-Converter

Description:

"A software project involving structured Scripture data conversion and processing."

Engineering areas to investigate:

- Parsing
- Structured text processing
- Data transformation
- Kotlin implementation
- Compatibility
- Error handling

Inspect the repository to identify the actual architecture, technologies, and implementation.

Do not attribute every repository contribution to me.

If my specific contributions cannot be established from the available source or commit history, use neutral wording and mark the section for my review.

## Project 3: Waveform Performance Optimization

Name: Audio Waveform Performance Optimization

Type: Professional engineering case study.

Context:

A desktop application experienced increasingly sluggish waveform visualization when processing long audio files.

The previous implementation generated a single waveform representation that became expensive to render as audio length increased.

I investigated the problem by isolating expensive sections, narrowing down the bottleneck, and measuring execution times.

The optimization involved dividing waveform processing into smaller segments and using asynchronous computation to improve responsiveness.

The case study should cover:

1. Problem
2. Investigation
3. Root cause
4. Solution
5. Technical trade-offs
6. Results
7. Lessons learned

Do not invent performance percentages, benchmark results, or exact implementation details.

Use diagrams or simplified examples rather than proprietary source code.

Clearly label any illustrative diagram as conceptual.

---

# 7. Project Detail Page Template

Create a reusable project case study component.

Each project detail page should follow this structure:

### Overview

What is the project, and what problem does it solve?

### My Role

What was my involvement?

### Technical Stack

Technologies actually used.

### Architecture

Display a simple architecture diagram where appropriate.

### Key Engineering Decisions

Explain important implementation choices and alternatives.

### Challenges

Describe meaningful technical difficulties.

### Solutions

Explain how the problems were addressed.

### Results

Describe actual outcomes without inventing statistics.

### Lessons Learned

Discuss engineering insights and possible future improvements.

### Links

GitHub repository and live demo when available.

Use structured project data to populate this template.

If details are unavailable, do not fabricate content. Use clearly identified placeholders or omit the section until verified.

---

# 8. Technical Skills

Organize skills by category.

Backend:

- C#
- .NET
- ASP.NET
- Java
- Kotlin
- Spring Boot
- REST APIs

Frontend:

- JavaScript
- React
- HTML
- CSS
- Bootstrap

Database:

- PostgreSQL
- Microsoft SQL Server
- MySQL
- SQLite

Engineering and Tools:

- Git
- Docker
- CI/CD
- Automated Testing
- Code Reviews
- Software Architecture
- Design Patterns

Display these as clean grouped lists or tags.

Do not use percentage-based skill bars or subjective proficiency ratings.

---

# 9. Contact Section

Heading:

"Let's Connect"

Description:

"I'm interested in opportunities to build reliable software and contribute to a collaborative engineering team. Feel free to reach out."

Include:

- Email
- LinkedIn
- GitHub
- Download Resume

Use a configurable email placeholder.

Do not build a contact form unless there is a reliable delivery solution.

---

# 10. User Experience Requirements

Navigation:

- Sticky navigation bar.
- Mobile navigation menu.
- Smooth scrolling.
- Active section indication where practical.

Interaction:

- Subtle hover effects.
- Accessible focus indicators.
- Dark/light theme toggle.
- Respect reduced-motion preferences.

Performance:

- Optimize images.
- Avoid unnecessary dependencies.
- Minimize layout shifts.
- Ensure good Lighthouse performance.

Accessibility:

- Semantic HTML.
- Keyboard navigation.
- Appropriate color contrast.
- Accessible buttons and links.
- Alt text for meaningful images.

SEO:

- Descriptive page titles.
- Meta descriptions.
- Open Graph metadata.
- Appropriate heading hierarchy.

---

# 11. Implementation Structure

Use a structure similar to:

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── ProjectCard.tsx
│       └── SectionHeading.tsx
├── data/
│   ├── projects.ts
│   ├── experience.ts
│   └── skills.ts
├── pages/
│   ├── Home.tsx
│   └── ProjectDetail.tsx
├── App.tsx
└── main.tsx
```

Adjust the architecture if a simpler or more maintainable approach is appropriate.

Avoid unnecessary abstraction.

---

# 12. Deliverables

Implement the project in the working repository.

Complete the following:

1. Initialize the application if the repository is empty.
2. Install necessary dependencies.
3. Implement the complete responsive homepage.
4. Implement project detail pages.
5. Add content data files.
6. Add dark/light theme support.
7. Ensure navigation works.
8. Add README with setup and deployment instructions.
9. Add placeholders for missing personal information and assets.
10. Verify that the production build succeeds.

If testing tools are available, also run relevant checks.

Fix any build or type errors before completing the task.

Do not claim tests passed unless they were actually executed successfully.

---

# 13. Definition of Done

The website is complete when:

- The homepage is fully implemented.
- All main sections are present.
- Project cards navigate to project detail pages.
- The layout works on mobile, tablet, and desktop.
- All existing links work.
- Unavailable links are clearly disabled or omitted.
- Theme switching works.
- No fabricated professional achievements appear.
- Portfolio content is easy to update.
- The production build succeeds.
- The README explains how to run and deploy the website.

Build the website now. Make reasonable implementation decisions without repeatedly asking for confirmation. Clearly identify any missing information that requires my input after implementation.