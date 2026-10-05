import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import { profile } from '../data/profile'

export function EmailContact() {
  const [step, setStep] = useState<'hidden' | 'confirm' | 'revealed'>('hidden')
  const [address, setAddress] = useState('')
  const startRef = useRef<HTMLButtonElement>(null)
  const confirmRef = useRef<HTMLButtonElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const previousStep = useRef(step)

  useEffect(() => {
    if (step === 'confirm') confirmRef.current?.focus({ preventScroll: true })
    if (step === 'revealed') linkRef.current?.focus({ preventScroll: true })
    if (step === 'hidden' && previousStep.current !== 'hidden') startRef.current?.focus({ preventScroll: true })
    previousStep.current = step
  }, [step])

  if (!profile.emailEncoded) return null

  function revealEmail() {
    setAddress(atob(profile.emailEncoded!))
    setStep('revealed')
  }

  return (
    <div className="email-contact" onKeyDown={event => {
      if (event.key === 'Escape' && step === 'confirm') {
        event.preventDefault()
        setStep('hidden')
      }
    }}>
      {step === 'hidden' && (
        <button ref={startRef} className="email-row" onClick={() => setStep('confirm')}>
          <span><Mail size={19} aria-hidden="true" /> Contact by email</span><ArrowRight size={20} aria-hidden="true" />
        </button>
      )}
      {step === 'confirm' && (
        <div className="email-confirm">
          <p className="email-confirm-title"><Mail size={19} aria-hidden="true" /> Reveal my email?</p>
          <p>One more click to show the address.</p>
          <div className="email-confirm-actions">
            <button ref={confirmRef} className="button primary" onClick={revealEmail}>Show email address</button>
            <button className="text-button" onClick={() => setStep('hidden')}>Cancel</button>
          </div>
        </div>
      )}
      {step === 'revealed' && (
        <div className="email-revealed">
          <p role="status">Email address revealed</p>
          <a ref={linkRef} className="email-row" href={`mailto:${address}`} aria-label={`Email ${profile.name}`}>
            <span><Mail size={19} aria-hidden="true" /><span className="email-address">{address}</span></span><ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  )
}
