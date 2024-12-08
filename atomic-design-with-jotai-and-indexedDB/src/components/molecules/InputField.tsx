import { UseFormRegister, FieldError, Path } from 'react-hook-form'
import { Label } from '../atoms/Label'
import { Input } from '../atoms/Input'
import { Select } from '../atoms/Select'
import { RadioGroup } from '../atoms/RadioGroup'
import { Checkbox } from '../atoms/Checkbox'
import { HTMLInputTypeAttribute, useState } from 'react'
import { TooltipModal } from './TooltipModal'
import { HelpCircle } from 'lucide-react'

interface InputFieldProps<T extends Record<string, unknown>> {
  label: string
  name: Path<T>
  type: HTMLInputTypeAttribute | 'select' | 'textarea'
  register: UseFormRegister<T>
  error?: FieldError
  options?: { label: string; value: string }[]
  tooltip?: {
    title: string
    content: string
  }
  [key: string]: unknown
}

export function InputField<T extends Record<string, unknown>>({
  label,
  name,
  type,
  register,
  error,
  options,
  tooltip,
  ...rest
}: InputFieldProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="mb-4">
      <div className="flex items-center mb-1">
        {type === 'checkbox' ? (
          <div className="flex items-center">
            <Checkbox<T> name={name} register={register} {...rest} />
            <Label htmlFor={name} className="ml-2 cursor-pointer">{label}</Label>
          </div>
        ) : (
          <>
            <Label htmlFor={name}>{label}</Label>
            {tooltip && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="ml-2 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <HelpCircle size={16} />
              </button>
            )}
          </>
        )}
      </div>
      {type === 'select' && options ? (
        <Select<T> name={name} register={register} error={error} options={options} {...rest} />
      ) : type === 'radio' && options ? (
        <RadioGroup<T> name={name} register={register} options={options} />
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
          {...register(name)}
          {...rest}
        />
      ) : (
        <Input<T> name={name} type={type as 'text' | 'number' | 'email' | 'date'} register={register} error={error} {...rest} />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error.message}
        </p>
      )}
      {tooltip && (
        <TooltipModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={tooltip.title}
          content={tooltip.content}
        />
      )}
    </div>
  )
}

