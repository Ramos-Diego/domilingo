export default function Form({
  children,
  onSubmit
}: {
  children: React.ReactNode
  onSubmit: any
}) {
  return (
    <form onSubmit={onSubmit} className="grid place-content-center gap-3 bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">{children}</form>
  )
}
