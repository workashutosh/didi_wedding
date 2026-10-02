import { Fragment } from 'react'

/** Split text into word spans (keeps spaces) for staggered reveals */
export function Words({ text, className = 'word' }: { text: string; className?: string }) {
  const parts = text.split(' ')
  return (
    <>
      {parts.map((w, i) => (
        <Fragment key={i}>
          <span className={`${className} inline-block will-change-transform`}>{w}</span>
          {i < parts.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  )
}
