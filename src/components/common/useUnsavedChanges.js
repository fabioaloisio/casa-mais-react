import { useState, useEffect, useCallback } from 'react'

/**
 * Hook para gerenciar mudanças não salvas em formulários
 * @param {Object} initialData - Dados iniciais do formulário
 * @param {Object} currentData - Dados atuais do formulário
 * @returns {Object} - { hasUnsavedChanges, confirmClose }
 */
export function useUnsavedChanges(initialData, currentData) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  useEffect(() => {
    // Compara dados iniciais com atuais
    const hasChanges = JSON.stringify(initialData) !== JSON.stringify(currentData)
    setHasUnsavedChanges(hasChanges)
  }, [initialData, currentData])

  const confirmClose = useCallback((onClose) => {
    if (hasUnsavedChanges) {
      const confirmMessage = 'Você tem alterações não salvas. Deseja realmente sair?'
      if (window.confirm(confirmMessage)) {
        onClose()
      }
    } else {
      onClose()
    }
  }, [hasUnsavedChanges])

  return { hasUnsavedChanges, confirmClose }
}

export default useUnsavedChanges