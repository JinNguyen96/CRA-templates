import React from 'react'
import { UseFormRegister, FieldError, Path } from 'react-hook-form'

interface InputProps<T extends Record<string, unknown>> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>
  register: UseFormRegister<T>
  error?: FieldError
}

export function Input<T extends Record<string, unknown>>({ 
  name,
  register,
  error,
  className = '',
  ...props 
}: InputProps<T>) {
  return (
    <input
      id={name}
      className={`
        w-full px-3 py-2 border rounded-md shadow-sm
        focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
        ${error ? 'border-red-500' : 'border-gray-300'}
        ${className}
      `}
      {...register(name)}
      {...props}
    />
  )
}

