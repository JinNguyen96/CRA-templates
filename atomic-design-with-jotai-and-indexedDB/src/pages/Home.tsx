import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button } from '../components/atoms/Button'
import { InputField } from '../components/molecules/InputField'
import { Layout } from '../components/templates/Layout'

const schema = yup.object({
  dateAtChangeout: yup.date().required('Date at Changeout is required'),
  machineHours: yup.number().positive('Machine Hours must be positive').integer('Machine Hours must be an integer').required('Machine Hours is required'),
  partType: yup.string().oneOf(['same', 'new'], 'Invalid part type').required('Part Type is required'),
  isComplete: yup.boolean(),
  email: yup.string().email('Invalid email').required('Email is required'),
  comments: yup.string().max(500, 'Comments must not exceed 500 characters')
}).required()

type FormData = yup.InferType<typeof schema>

export const Home = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
  }

  return (
    <Layout>
      <div className="mb-6">
        <div className="text-sm text-gray-600 uppercase">Ground Engaging Tools</div>
        <h1 className="text-2xl font-bold text-blue-900">Multiple Part Types</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Changeout</h2>
          
          <InputField<FormData>
            label="Date at Changeout"
            name="dateAtChangeout"
            type="date"
            register={register}
            error={errors.dateAtChangeout}
            required
          />

          <InputField<FormData>
            label="Machine Hours at Changeout"
            name="machineHours"
            type="number"
            register={register}
            error={errors.machineHours}
            required
            placeholder="Hours (hrs)"
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            New Specifications
          </h2>
          
          <InputField<FormData>
            label="Part Type"
            name="partType"
            type="radio"
            register={register}
            error={errors.partType}
            required
            options={[
              { label: "Same Part/s", value: "same" },
              { label: "New Part/s", value: "new" }
            ]}
          />
        </section>

        <div className="bg-gray-100 p-4 rounded-md">
          <InputField<FormData>
            label="Marked as complete"
            name="isComplete"
            type="checkbox"
            register={register}
            error={errors.isComplete}
          />

          <InputField<FormData>
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            required
          />

          <InputField<FormData>
            label="Comments"
            name="comments"
            type="textarea"
            register={register}
            error={errors.comments}
          />
        </div>

        <div className="space-y-4">
          <Button variant="primary" fullWidth type="submit">
            UPDATE MULTIPLE
          </Button>
          
          <Button variant="secondary" fullWidth type="button">
            BACK TO MENU
          </Button>
        </div>
      </form>
    </Layout>
  )
}

