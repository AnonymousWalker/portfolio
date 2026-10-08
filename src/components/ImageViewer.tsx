import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react'
import { publicAssetUrl } from '../lib/assets'
import type { Project } from '../data/projects'

export function ImageViewer({ project, initialIndex, onClose }: { project: Project; initialIndex: number; onClose: () => void }) {
  const images = project.images.filter(image => image.src)
  const [index, setIndex] = useState(initialIndex)
  const [zoomed, setZoomed] = useState(false)
  const ref = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const image = images[index]
  const move = (direction: number) => {
    setIndex(current => (current + direction + images.length) % images.length)
    setZoomed(false)
    viewport.current?.scrollTo(0, 0)
  }

  useLayoutEffect(() => {
    const dialog = ref.current!
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    closeButton.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])

  return createPortal(
    <dialog ref={ref} className="image-viewer" aria-labelledby="viewer-title" onCancel={event => { event.preventDefault(); event.stopPropagation(); onClose() }} onKeyDown={event => {
      if (images.length > 1 && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault()
        event.stopPropagation()
        move(event.key === 'ArrowLeft' ? -1 : 1)
      }
    }} onClick={event => {
      event.stopPropagation()
      if (event.target !== event.currentTarget) return
      const bounds = event.currentTarget.getBoundingClientRect()
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
    }}>
      <div className="viewer-header"><h2 id="viewer-title">{project.title}</h2><div className="viewer-actions">
        <button className="icon-button" aria-label={zoomed ? 'Fit image to screen' : 'View image at full size'} aria-pressed={zoomed} onClick={() => { setZoomed(!zoomed); viewport.current?.scrollTo(0, 0) }}>{zoomed ? <ZoomOut size={21} /> : <ZoomIn size={21} />}</button>
        <button ref={closeButton} className="icon-button" aria-label="Close image viewer" onClick={onClose}><X size={22} /></button>
      </div></div>
      <div ref={viewport} className={`viewer-image${zoomed ? ' zoomed' : ''}`}><img src={publicAssetUrl(image.src!)} alt={image.alt} width={image.width} height={image.height} /></div>
      <div className="viewer-footer">
        {images.length > 1 && <button className="icon-button" aria-label="Previous image" onClick={() => move(-1)}><ChevronLeft size={22} /></button>}
        <p aria-live="polite" aria-atomic="true">{image.label}<span>{index + 1} / {images.length}</span></p>
        {images.length > 1 && <button className="icon-button" aria-label="Next image" onClick={() => move(1)}><ChevronRight size={22} /></button>}
      </div>
    </dialog>, document.body,
  )
}
