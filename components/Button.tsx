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
      className="bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  )
}
