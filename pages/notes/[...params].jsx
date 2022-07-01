import React from 'react'
import { useRouter } from 'next/router'

// file => /docs/[...params].jsx
// route => /docs/a/b/c

export default () => {
  const router = useRouter()
  const { params }= router.query

  // params === ['a', 'b', 'c']

  return (
    <h1>hello {params}</h1>
  )
}
