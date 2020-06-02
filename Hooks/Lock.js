import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

export default function useNavigateLock () {
  const [isLocked, setIsLocked] = useState(false)

  useFocusEffect(useCallback(() => {
    setIsLocked(false)
  }, []))

  const locker = () => {
    if (isLocked) {
      return false
    } else {
      setIsLocked(true)
      return true
    }
  }

  return locker
}