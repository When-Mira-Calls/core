import React from 'react'
import compass from '../assets/Compass.png'
import prism from '../assets/Prism.png'
import goldenKnot from '../assets/Golden Knot.png'

const SRCS = { compass, prism, knot: goldenKnot }

export default function ItemFocusOverlay({ item }) {
  const src = SRCS[item]
  if (!src) return null
  return (
    <div className="itemfocus-overlay" aria-hidden="true">
      <img src={src} alt="" className="itemfocus-img" />
    </div>
  )
}
