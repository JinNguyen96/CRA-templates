import React from 'react'
import { UseFormRegister, FieldError, Path } from 'react-hook-form'

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps<T extends Record<string, unknown>> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: Path<T>;
  options: SelectOption[];
  register: UseFormRegister<T>;
  error?: FieldError;
}

export function Select<T extends Record<string, unknown>>({
  name,
  options,
  register,
  error,
  className = '',
  ...props
}: SelectProps<T>) {
  return (
    <select
      id={name}
      className={`
        w-full px-3 py-2 border rounded-md shadow-sm appearance-none
        focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
        ${error ? 'border-red-500' : 'border-gray-300'}
        ${className}
      `}
      {...register(name)}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

