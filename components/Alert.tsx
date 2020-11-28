export default function Alert({ message }: { message: string }) {
  return (
    <div
      className="bg-red-100 dark:bg-red-800 dark:text-white border border-red-400 text-red-700 px-4 py-2 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  )
}
