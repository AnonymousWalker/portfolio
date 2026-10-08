import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Database, Layers3, Menu, Moon, Sun, X } from 'lucide-react'
import { Github, Linkedin, GithubMark, LinkedinMark, GooglePlay } from './components/BrandIcons'
import { profile, experience, skills, education } from './data/profile'
import { projects, type Project } from './data/projects'
import { ProjectVisual } from './components/ProjectVisual'
import { EmailContact } from './components/EmailContact'
import { Avatar } from './components/Avatar'
import { CaseStudy } from './components/CaseStudy'

const sections = ['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact']

function App() {
  const [dark, setDark] = useState(document.documentElement.dataset.theme === 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#000000' : '#ffffff')
    try { localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light') } catch { /* storage is optional */ }
  }, [dark])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
      if (visible.length) setActive(visible[0].target.id)
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 })
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('heading-entered')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.2 })
    document.querySelectorAll('.section-heading').forEach(heading => observer.observe(heading))
    const stopMotion = () => { if (motion.matches) observer.disconnect() }
    motion.addEventListener('change', stopMotion)
    return () => { observer.disconnect(); motion.removeEventListener('change', stopMotion) }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus() } }
    const media = window.matchMedia('(min-width: 761px)')
    const onResize = () => { if (media.matches) setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    media.addEventListener('change', onResize)
    return () => { document.removeEventListener('keydown', onKey); media.removeEventListener('change', onResize) }
  }, [menuOpen])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="nav-shell">
          <a className="wordmark" href="#home" aria-label={`${profile.headerName}, home`} onClick={() => setMenuOpen(false)}>{profile.headerName}</a>
          <nav className={menuOpen ? 'navigation open' : 'navigation'} id="primary-navigation" aria-label="Main navigation">
            {sections.map(label => <a href={`#${label.toLowerCase()}`} key={label} aria-current={active === label.toLowerCase() ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
          </nav>
          <div className="nav-actions">
            <button className="icon-button theme-toggle" onClick={() => setDark(!dark)} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{dark ? <Sun size={19} /> : <Moon size={19} />}</button>
            <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-controls="primary-navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero page-shell" id="home" aria-labelledby="hero-title">
          <Avatar />
          <div className="hero-copy">
            <h1 className="hero-name" id="hero-title">Hi, I’m {profile.name}.</h1>
            <p className="eyebrow hero-eyebrow"><span className="status-dot" /> {profile.title} · {profile.location}</p>
            <p className="hero-description">{profile.introduction}</p>
            <section className="hero-tech-stack" aria-labelledby="hero-tech-stack-title">
              <h2 id="hero-tech-stack-title">Tech stack</h2>
              <ul>{profile.techStack.map(technology => <li key={technology}>{technology}</li>)}</ul>
            </section>
            <div className="hero-actions"><a className="button primary" href="#projects">Explore my work</a></div>
            <div className="hero-socials">
              <a className="icon-button github-link" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Tony Tran on GitHub" title="GitHub"><GithubMark /></a>
              <a className="icon-button linkedin-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Tony Tran on LinkedIn" title="LinkedIn"><LinkedinMark /></a>
            </div>
          </div>
          <div className="hero-bottom"><a className="icon-button scroll-down" href="#about" aria-label="Scroll to about"><ArrowDown size={22} aria-hidden="true" /></a></div>
        </section>

        <section className="section page-shell" id="about" aria-labelledby="about-title">
          <div className="section-heading"><span className="eyebrow"><span className="section-number">01 /</span> A little about me</span><h2 id="about-title">Reliable software.<br /><span className="serif">Thoughtful engineering.</span></h2></div>
          <div className="about-grid"><div className="about-copy">{profile.about.map((paragraph, i) => <p key={paragraph} className={i === 0 ? 'lead' : ''}>{paragraph}</p>)}</div><div className="principles"><div><Layers3 size={21} /><h3>Across the stack</h3><p>Connecting the interface, the API, and the data behind it.</p></div><div><Database size={21} /><h3>Built to be understood</h3><p>Readable code, considered architecture, and explicit trade-offs.</p></div></div></div>
        </section>

        <section className="section page-shell" id="experience" aria-labelledby="experience-title">
          <div className="section-heading horizontal-heading"><div><span className="eyebrow"><span className="section-number">02 /</span> Experience</span><h2 id="experience-title">Real-world <span className="serif">engineering.</span></h2></div><p>Ownership across the<br />software development lifecycle.</p></div>
          <ol className="experience-timeline" role="list" aria-label="Professional experience timeline">
            {experience.map((item, i) => (
              <li className="timeline-item" key={i}>
                <span className="timeline-dot" aria-hidden="true" />
                <article className="experience-row">
                  <div className="experience-meta">
                    <p className="eyebrow">{item.dates || 'Professional experience'}</p>
                    <h3>{item.companyUrl ? <a className="company-link" href={item.companyUrl} target="_blank" rel="noopener noreferrer">{item.company}<ArrowUpRight size={15} aria-hidden="true" /></a> : item.company || item.context}</h3>
                    {item.position && <p>{item.position}</p>}
                    <p>{item.context}</p>
                    {(!item.company || !item.dates) && <span className="experience-note">Company and dates to be added</span>}
                  </div>
                  <div className="experience-description">
                    <p>{item.description}</p>
                    <ul>{item.contributions.map(contribution => <li key={contribution}>{contribution}</li>)}</ul>
                    {item.technologies.length > 0 && <div className="tags">{item.technologies.map(technology => <span key={technology}>{technology}</span>)}</div>}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section className="projects-section" id="projects" aria-labelledby="projects-title"><div className="page-shell section">
          <div className="section-heading horizontal-heading"><div><span className="eyebrow"><span className="section-number">03 /</span> Selected work</span><h2 id="projects-title">Problems worth <span className="serif">solving.</span></h2></div><p>A closer look at the work,<br />and the thinking behind it.</p></div>
          <div className="project-grid">{projects.map(project => <article className="project-card" key={project.id}><ProjectVisual project={project} /><div className="project-card-content"><div className="project-card-meta"><span>{project.category}</span><span>{project.number}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div><p className="project-focus">{project.focus}</p><div className="project-card-links"><button className="text-button" onClick={() => setSelectedProject(project)} aria-label={`Read ${project.title} case study`}>Read case study <ArrowRight size={16} /></button>{project.github && <a className="icon-button" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`}><Github size={19} /></a>}{project.googlePlay && <a className="icon-button" href={project.googlePlay} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on Google Play`} title="Get it on Google Play"><GooglePlay /></a>}</div></div></article>)}</div>
        </div></section>

        <section className="section page-shell" id="skills" aria-labelledby="skills-title">
          <div className="section-heading"><span className="eyebrow"><span className="section-number">04 /</span> My toolkit</span><h2 id="skills-title">The right tools.<br /><span className="serif">A solid foundation.</span></h2></div>
          <dl className="skills-list">{skills.map(group => <div className="skill-row" key={group.name}><dt>{group.name}</dt><dd><ul>{group.items.map(skill => <li key={skill}>{skill}</li>)}</ul></dd></div>)}</dl>
        </section>

        <section className="section page-shell" id="education" aria-labelledby="education-title">
          <div className="section-heading"><span className="eyebrow">Education</span><h2 id="education-title">A foundation in <span className="serif">computer science.</span></h2></div>
          <div className="education-grid">{education.map(item => <article className="education-card" key={item.degree}><p className="eyebrow">{item.dates}</p><h3>{item.degree}</h3><p>{item.school}</p><span>GPA {item.gpa}</span></article>)}</div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="page-shell contact-inner"><div><span className="eyebrow"><span className="section-number">05 /</span> Let’s connect</span><h2 id="contact-title">Good work starts<br />with a <span className="serif">conversation.</span></h2><p>I’m interested in opportunities to build reliable software and contribute to a collaborative engineering team. Feel free to reach out.</p></div><div className="contact-links"><EmailContact /><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><span><Linkedin size={19} /> Connect on LinkedIn</span><ArrowUpRight size={20} /></a><a href={profile.github} target="_blank" rel="noopener noreferrer"><span><Github size={19} /> Explore my GitHub</span><ArrowUpRight size={20} /></a></div></div></section>
      </main>
      <footer className="page-shell footer"><a className="wordmark" href="#home">Tony Tran</a><p>Built with care, React, and a little curiosity.</p><a href="#home">Back to top <ArrowUpRight size={14} /></a></footer>
      <CaseStudy project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}

export default App
