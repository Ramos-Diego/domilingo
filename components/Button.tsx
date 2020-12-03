export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: (() => Promise<void>) | (() => void)
}) {
  return (
    <button
      onClick={onClick}
      className="block bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none text-white font-bold text-sm py-2 px-4 rounded"
    >
      {children}
    </button>
  )
}
