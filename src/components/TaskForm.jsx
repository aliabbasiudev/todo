import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApp } from '../context/AppContext';

const schema = z.object({
  title: z.string().min(1, "اسم تسک رو بنویس"),
  time: z.coerce.number().min(1, 'حداقل یک دقیقه').max(120, "حداکثر ۱۲۰ دقیقه")
})

const TaskForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) });
  const { addTasks, theme } = useApp()

  const onSubmit = (data) => {
    addTasks(data)
    reset()
  }

  return (
    <div className={`rounded-2xl p-4 sm:p-6 shadow-lg transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1A1A2E]' : 'bg-white'}`}>
      <h2 className="text-[#6C63FF] font-bold text-base sm:text-xl mb-4">تسک جدید</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:gap-4">
        <div>
          <input
            {...register('title')}
            type="text"
            placeholder="اسم تسک"
            className={`w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-xl border-2 outline-none transition-colors ${errors.title ? 'border-red-500' : 'border-[#6C63FF44]'} focus:border-[#6C63FF] ${theme === 'dark' ? 'bg-[#0F0F1A] text-[#E8E8F0]' : 'bg-[#F8F5F0] text-[#1A1A2E]'}`}
          />
          {errors.title && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.title?.message}</p>}
        </div>
        <div>
          <input
            {...register('time')}
            type="number"
            placeholder="مدت زمان (دقیقه)"
            className={`w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-xl border-2 outline-none transition-colors ${errors.time ? 'border-red-500' : 'border-[#6C63FF44]'} focus:border-[#6C63FF] ${theme === 'dark' ? 'bg-[#0F0F1A] text-[#E8E8F0]' : 'bg-[#F8F5F0] text-[#1A1A2E]'}`}
          />
          {errors.time && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.time?.message}</p>}
        </div>
        <button type="submit" className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-[#6C63FF] text-white rounded-xl font-bold hover:bg-[#5a52e0] transition-colors">
          اضافه کن
        </button>
      </form>
    </div>
  )
}

export default TaskForm