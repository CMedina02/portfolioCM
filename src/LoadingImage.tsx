import { useCallback, useState, type ImgHTMLAttributes } from 'react'
import styles from './LoadingImage.module.css'

type LoadingImageProps = Pick<ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'decoding'> & {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  preview?: boolean
}

export default function LoadingImage({ className, preview, ...image }: LoadingImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const ratio = preview ? '16 / 9' : `${image.width} / ${image.height}`
  const checkImage = useCallback((element: HTMLImageElement | null) => {
    if (element?.complete) setStatus(element.naturalWidth > 0 ? 'loaded' : 'error')
  }, [])

  return (
    <div className={`${styles.frame} ${className ?? ''}`} style={{ aspectRatio: ratio }}
      data-preview={preview || undefined} data-image-state={status}>
      <img {...image} ref={checkImage}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
      {status === 'loading' && <span className={`loadingSkeleton ${styles.placeholder}`} aria-hidden="true" />}
      {status === 'error' && <span className={styles.error}>Imagen no disponible</span>}
    </div>
  )
}
