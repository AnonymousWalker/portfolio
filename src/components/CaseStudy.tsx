import { useLayoutEffect, useRef } from 'react'
import { ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { ProjectVisual } from './ProjectVisual'
import type { Project } from '../data/projects'

export function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useLayoutEffect(() => {
    const dialog = ref.current
    if (!dialog || !project) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [project])
  if (!project) return null
  return (
    <dialog ref={ref} className="case-dialog" aria-labelledby="case-title" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => {
      if (event.target === event.currentTarget) {
        const rect = event.currentTarget.getBoundingClientRect()
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
      }
    }}>
      <div className="case-content">
        <div className="case-top"><span className="eyebrow">Case study / {project.number}</span><button className="icon-button" onClick={onClose} aria-label="Close case study"><X size={21} /></button></div>
        <p className="project-category">{project.category}</p>
        <h2 id="case-title">{project.title}</h2>
        <p className="case-lead">{project.description}</p>
        <div className="tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div>
        <ProjectVisual project={project} />
        <div className="case-role"><h3>My role</h3><p>{project.role}</p></div>
        <div className={`architecture${project.architectureLayout === 'vertical' ? ' architecture-vertical' : ''}`} aria-label="Conceptual architecture">
          <p className="eyebrow">Conceptual architecture</p>
          <div>{project.architecture.map((node, i) => <div className="architecture-step" key={node}><span>{node}</span>{i < project.architecture.length - 1 && <ArrowRight size={18} aria-hidden="true" />}</div>)}</div>
        </div>
        {project.sections.map(section => <section className="case-section" key={section.title}><h3>{section.title}</h3><p>{section.text}</p></section>)}
        {project.github && <a className="button primary" href={project.github} target="_blank" rel="noopener noreferrer">Explore repository <ArrowUpRight size={17} /></a>}
        {project.backendGithub && <a className="button secondary" href={project.backendGithub} target="_blank" rel="noopener noreferrer">Explore backend <ArrowUpRight size={17} /></a>}
        <button className="text-button case-back" onClick={onClose}>Back to selected work <ArrowRight size={16} /></button>
      </div>
    </dialog>
  )
}
