import { ChangeEvent, useCallback, useState } from 'react'

/**
 * usePayload<T> — hook for managing the state of a form of object type T
 * @param initialState — initial state object
 */
export function usePayload<T extends Record<string, any>>(initialState: T) {
    const [payload, setPayload] = useState<T>(initialState)

    const handleChange = useCallback(
        <K extends keyof T>(field: K) =>
            (
                arg:
                    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
                    | boolean
            ) => {
                const value: T[K] =
                    typeof arg === 'boolean'
                        ? arg
                        : (((arg.target as HTMLInputElement).type === 'checkbox'
                              ? (arg.target as HTMLInputElement).checked
                              : arg.target.value) as any)

                setPayload(prev => ({
                    ...prev,
                    [field]: value,
                }))
            },
        []
    )

    return { payload, handleChange, setPayload }
}
