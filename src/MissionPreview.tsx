import { useState } from 'react'
import styles from './MissionPreview.module.css'

const stops = ['Origen', 'Punto intermedio', 'Destino']

function globePoint(latitude: number, longitude: number) {
  const tilt = -.32
  const x = Math.cos(latitude) * Math.sin(longitude)
  const y = Math.sin(latitude) * .94 - Math.cos(latitude) * Math.cos(longitude) * .34
  return [200 + 149 * (x * Math.cos(tilt) - y * Math.sin(tilt)), 172 + 149 * (x * Math.sin(tilt) + y * Math.cos(tilt))]
}

const contours = Array.from({ length: 58 }, (_, row) => {
  const lat = (row / 57 - .5) * Math.PI
  return Array.from({ length: 100 }, (_, col) => {
    const lon = (col / 99 - .5) * Math.PI
    const relief = .045 * Math.cos(6 * lon + 4 * lat) + .025 * Math.sin(13 * lon - 9 * lat)
    return globePoint(lat + relief * Math.cos(lat), lon).map(n => n.toFixed(1)).join(',')
  }).join(' ')
})

const points = [[104, 213], [182, 149], [274, 128]]

export default function MissionPreview() {
  const [stop, setStop] = useState(0)
  return (
    <figure className={styles.preview}>
      <figcaption><span>MAPTE</span> Exploración de Marte</figcaption>
      <svg viewBox="0 0 400 345" role="img" aria-label="Globo ilustrado con una ruta de tres puntos">
        <circle cx="200" cy="172" r="149" fill="#26392e" />
        <g fill="none" stroke="#c9ab78" strokeWidth="1.05">
          {contours.map((line, index) => <polyline key={index} points={line} />)}
        </g>
        <path d="M104 213 L182 149 L274 128" fill="none" stroke="#fff4d3" strokeWidth="2" strokeDasharray="4 4" />
        {points.map(([x,y], i) => <circle key={x} cx={x} cy={y} r={stop === i ? 6 : 3} fill="#fff4d3" />)}
        <circle className={styles.marker} cx={points[stop][0]} cy={points[stop][1]} r="12" fill="none" stroke="#fff4d3" />
      </svg>
      <div className={styles.controls}>
        <span aria-live="polite">{stop + 1}/3 · {stops[stop]}</span>
        <button type="button" onClick={() => setStop((stop + 1) % stops.length)}>Recorrer ruta <span aria-hidden="true">→</span></button>
      </div>
    </figure>
  )
}
