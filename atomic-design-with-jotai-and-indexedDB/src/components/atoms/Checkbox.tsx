import React from 'react'
import { UseFormRegister, Path } from 'react-hook-form'

interface CheckboxProps<T extends Record<string, unknown>> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: Path<T>
  register: UseFormRegister<T>
}

export function Checkbox<T extends Record<string, unknown>>({ name, register, className = '', ...props }: CheckboxProps<T>) {
  return (
    <input
      type="checkbox"
      id={name}
      {...register(name)}
      className={`
        h-4 w-4 rounded border-gray-300 text-orange-500 
        focus:ring-orange-500 cursor-pointer
        ${className}
      `}
      {...props}
    />
  )
}

