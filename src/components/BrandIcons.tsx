import type { SVGProps } from 'react'
type IconProps = SVGProps<SVGSVGElement> & { size?: number }
export function Github({ size = 20, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.5c0-1 .1-1.4-.5-2 3.3-.4 6.7-1.6 6.7-7.3a5.7 5.7 0 0 0-1.5-4c.2-1 .2-2.5-.2-3.5 0 0-1.3-.4-4.2 1.5a14.7 14.7 0 0 0-7.6 0C4.8 1.3 3.5 1.7 3.5 1.7c-.4 1-.4 2.5-.2 3.5a5.7 5.7 0 0 0-1.5 4c0 5.7 3.4 6.9 6.7 7.3-.6.6-.5 1-.5 2V22" /></svg>
}
export function Linkedin({ size = 20, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7M7 7h.01M11 17v-7M11 13c0-4 6-4 6 0v4" /></svg>
}
