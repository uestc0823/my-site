import { useState, useEffect, useCallback } from 'react'

function decodeHash(raw: string): string {
  try {
    return decodeURIComponent(raw) || '/'
  } catch {
    return raw || '/'
  }
}

export const useHash = () => {
  const [hash, setHash] = useState(() => decodeHash(window.location.hash.slice(1)))

  useEffect(() => {
    const onHashChange = () =>
      setHash(decodeHash(window.location.hash.slice(1)))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((path: string) => {
    window.location.hash = path
  }, [])

  return { hash, navigate }
}
