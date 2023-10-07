import { useRef, useEffect, useState } from 'react'
import { Tooltip } from '@mui/material'

interface IProps {
  text: string
}

function TextWithTooltip({ text }: IProps) {
  const textRef = useRef<HTMLParagraphElement | null>(null) // Explicitly specify the type
  const [isTruncated, setIsTruncated] = useState(false)

  useEffect(() => {
    if (textRef.current && textRef.current.scrollWidth > textRef.current.clientWidth) {
      setIsTruncated(true)
    } else {
      setIsTruncated(false)
    }
  }, [text])

  return (
    <Tooltip title={isTruncated ? text : ''}>
      <p
        ref={textRef}
        className={`text-black line-clamp-1 ${isTruncated ? 'with-tooltip' : ''}`}>
        {text}
      </p>
    </Tooltip>
  )
}

export default TextWithTooltip
