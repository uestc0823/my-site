import { useState, useEffect, useCallback } from 'react'

export const useHash = () => {
  const [hash, setHash] = useState(
    () => window.location.hash.slice(1) || '/'
  )

  useEffect(() => {
    const onHashChange = () =>
      setHash(window.location.hash.slice(1) || '/')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((path: string) => {
    window.location.hash = path
  }, [])

  return { hash, navigate }
}
