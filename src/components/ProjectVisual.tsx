import { Image } from 'lucide-react'
import type { Project } from '../data/projects'

export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-gallery gallery-${project.id}`} aria-label={`${project.title} image gallery`}>
      {project.images.map((image, index) => (
        <figure className={`project-image image-${index + 1}`} key={image.label}>
          {image.src
            ? <img src={image.src} alt={image.alt} loading="lazy" decoding="async" width={1200} height={900} />
            : <div className="image-placeholder" role="img" aria-label={`${project.title} ${image.label.toLowerCase()} placeholder`}>
                <span className="image-number">0{index + 1}</span>
                <div className="image-placeholder-center"><Image size={32} strokeWidth={1.2} aria-hidden="true" /><span>{image.label}</span><span className="image-placeholder-note">Image coming soon</span></div>
              </div>}
          <figcaption>{image.src ? image.alt : `${image.label} · placeholder`}</figcaption>
        </figure>
      ))}
    </div>
  )
}
