'use client'
import { useSnackbar } from "./context/SnackbarContext"

export default function Home() {
  const showSnackbar = useSnackbar()

  const handleClick = (variant: 'success' | 'error' | 'warning' | 'info') => {
    console.log('calling inside handleClick')
    showSnackbar(`This is a ${variant} message!`, variant)
  }

  return (
    <main className="p-10 min-h-screen text-center">
      <h1 className="mt-10 font-bold text-3xl xl:text-4xl">
        Custom Snackbar Demo
      </h1>
      <div className="flex flex-col justify-center items-center gap-6 px-5 sm:px-24 py-24 font-medium">
        <button className="bg-green-500 p-4 rounded-xl text-white" onClick={() => handleClick('success')}>
          Show Success Snackbar
        </button>
        <button className="bg-red-500 p-4 rounded-xl font-medium text-white" onClick={() => handleClick('error')}>
          Show Error Snackbar
        </button>
        <button className="bg-yellow-500 p-4 rounded-xl text-white" onClick={() => handleClick('warning')}>
          Show Warning Snackbar
        </button>
        <button className="bg-blue-500 p-4 rounded-xl text-white" onClick={() => handleClick('info')}>
          Show Info Snackbar
        </button>
      </div>
    </main>
  )
}