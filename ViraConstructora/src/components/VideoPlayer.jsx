import { useState } from 'react'

const VideoPlayer = ({ src, style, className, ...props }) => {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = (e) => {
    console.error('Video error:', e)
    console.error('Video src:', src)
    setHasError(true)
    setIsLoading(false)
  }

  const handleLoadStart = () => {
    console.log('Video loading started:', src)
    setIsLoading(true)
    setHasError(false)
  }

  const handleCanPlay = () => {
    console.log('Video can play:', src)
    setIsLoading(false)
  }

  if (hasError) {
    return (
      <div style={style} className={className}>
        <div style={{ 
          width: '100%', 
          height: '100%', 
          backgroundColor: '#000', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#fff'
        }}>
          Error cargando video: {src}
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', ...style }} className={className}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          zIndex: 1
        }}>
          Cargando video...
        </div>
      )}
      <video
        src={src}
        onError={handleError}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        {...props}
      />
    </div>
  )
}

export default VideoPlayer
