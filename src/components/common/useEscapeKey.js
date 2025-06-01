import { useEffect } from 'react'

/**
 * Hook customizado para lidar com a tecla ESC
 * @param {Function} onEscape - Função a ser executada quando ESC é pressionado
 * @param {boolean} isActive - Se o listener deve estar ativo
 */
export function useEscapeKey(onEscape, isActive = true) {
  useEffect(() => {
    if (!isActive) return

    const handleEscape = (event) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        onEscape()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onEscape, isActive])
}

export default useEscapeKey