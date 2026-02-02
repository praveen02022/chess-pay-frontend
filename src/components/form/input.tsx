import { type InputHTMLAttributes } from "react"
import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form"

export interface Props<
  T extends FieldValues = FieldValues,
  U extends FieldValues = FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  name?: Path<T>                // 👈 optional
  label?: string
  register?: UseFormRegister<T> // 👈 optional
  errors?: FieldErrors<U>
}

export default function Input<
  T extends FieldValues,
  U extends FieldValues,
>({
  disabled = false,
  placeholder,
  errors,
  label,
  name,
  register,
  ...rest
}: Props<T, U>) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}

      <input
        id={name}
        className="border rounded-lg p-2 w-full"
        placeholder={placeholder}
        disabled={disabled}
        {...(register && name ? register(name) : {})} // ✅ SAFE
        {...rest}
      />

      {errors && name && errors[name] && (
        <span className="text-xs text-destructive">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  )
}
