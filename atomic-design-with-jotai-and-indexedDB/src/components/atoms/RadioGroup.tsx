import { UseFormRegister, Path } from 'react-hook-form'

interface RadioOption {
  label: string
  value: string
}

interface RadioGroupProps<T extends Record<string, unknown>> {
  options: RadioOption[]
  name: Path<T>
  register: UseFormRegister<T>
}

export function RadioGroup<T extends Record<string, unknown>>({
  options,
  name,
  register,
}: RadioGroupProps<T>) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <input
            type="radio"
            value={option.value}
            {...register(name)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <span className="text-gray-900">{option.label}</span>
        </label>
      ))}
    </div>
  )
}

