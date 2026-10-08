import { useState } from 'react'
import { ImageViewer } from './ImageViewer'
import { Image } from 'lucide-react'
import { publicAssetUrl } from '../lib/assets'
import type { Project } from '../data/projects'

export function ProjectVisual({ project }: { project: Project }) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  return (
    <>
    <div className={`project-gallery gallery-${project.id}${project.images.length === 1 ? ' gallery-single' : ''}`} aria-label={`${project.title} image gallery`}>
      {project.images.map((image, index) => (
        <figure className={`project-image image-${index + 1}`} key={image.label}>
          {image.src
            ? <button className="project-image-link" type="button" onClick={() => setViewerIndex(project.images.slice(0, index).filter(item => item.src).length)} aria-label={`View ${project.title} ${image.label.toLowerCase()} in image viewer`} aria-haspopup="dialog"><img src={publicAssetUrl(image.src)} alt={image.alt} loading="lazy" decoding="async" width={image.width} height={image.height} style={{ aspectRatio: image.width && image.height ? `${image.width} / ${image.height}` : undefined }} /></button>
            : <div className="image-placeholder" role="img" aria-label={`${project.title} ${image.label.toLowerCase()} placeholder`}>
                <span className="image-number">0{index + 1}</span>
                <div className="image-placeholder-center"><Image size={32} strokeWidth={1.2} aria-hidden="true" /><span>{image.label}</span><span className="image-placeholder-note">Image coming soon</span></div>
              </div>}
          <figcaption>{image.src ? image.label : `${image.label} · placeholder`}</figcaption>
        </figure>
      ))}
    </div>
    {viewerIndex !== null && <ImageViewer project={project} initialIndex={viewerIndex} onClose={() => setViewerIndex(null)} />}
    </>
  )
}
