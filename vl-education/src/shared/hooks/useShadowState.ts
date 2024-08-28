import { useRef } from "react"

export function useShadowState<T>(initialValue: T): [() => T, (newValue: T) => void] {
    const ref = useRef<T>(initialValue)

    const getValue = () => ref.current
    const setValue = (newValue: T) => ref.current = newValue

    return [getValue, setValue]
}