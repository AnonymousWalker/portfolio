import { UserRound } from 'lucide-react'
import { publicAssetUrl } from '../lib/assets'
import { profile } from '../data/profile'

export function Avatar() {
  return (
    <figure className="avatar">
      <div className="avatar-frame">
        {profile.avatar.src
          ? <img src={publicAssetUrl(profile.avatar.src)} alt={profile.avatar.alt} width={112} height={112} decoding="async" />
          : <div className="avatar-placeholder" role="img" aria-label="Avatar photo placeholder for Tony Tran"><UserRound size={40} strokeWidth={1.3} aria-hidden="true" /></div>}
      </div>
      {!profile.avatar.src && <figcaption>Your photo here</figcaption>}
    </figure>
  )
}
