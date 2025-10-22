import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  age: z.coerce.number().min(18).max(65),
  bloodGroup: z.string().min(1),
  contact: z.string().min(8),
  city: z.string().min(2),
})

export default function DonorRegistration() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    defaultValues: { bloodGroup: '' },
  })

  const onSubmit = async (data) => {
    // Placeholder submit
    await new Promise((r) => setTimeout(r, 600))
    reset()
    alert('Registered successfully!')
  }

  return (
    <div className="container-responsive py-12">
      <h1 className="text-2xl font-semibold mb-6">Donor Registration</h1>
      <form onSubmit={handleSubmit((values) => onSubmit(schema.parse(values)))} className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input {...register('name', { required: true })} className="w-full rounded-md border px-3 py-2 text-sm" />
          {errors.name && <p className="text-xs text-red-600 mt-1">Name is required</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Age</label>
          <input type="number" {...register('age', { required: true })} className="w-full rounded-md border px-3 py-2 text-sm" />
          {errors.age && <p className="text-xs text-red-600 mt-1">Age 18-65</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Blood Group</label>
          <select {...register('bloodGroup', { required: true })} className="w-full rounded-md border px-3 py-2 text-sm">
            <option value="">Select</option>
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {errors.bloodGroup && <p className="text-xs text-red-600 mt-1">Select blood group</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Contact</label>
          <input {...register('contact', { required: true })} className="w-full rounded-md border px-3 py-2 text-sm" />
          {errors.contact && <p className="text-xs text-red-600 mt-1">Contact is required</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">City</label>
          <input {...register('city', { required: true })} className="w-full rounded-md border px-3 py-2 text-sm" />
          {errors.city && <p className="text-xs text-red-600 mt-1">City is required</p>}
        </div>
        <div className="md:col-span-2">
          <button disabled={isSubmitting} type="submit" className="rounded-md bg-red-500 text-white px-5 py-2.5 text-sm font-medium hover:bg-red-600 disabled:opacity-60">{isSubmitting ? 'Submitting...' : 'Register'}</button>
        </div>
      </form>
    </div>
  )
}
