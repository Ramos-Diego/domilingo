export default function Input({
  children,
  type,
  name,
  placeholder,
  register
}: {
  children: React.ReactNode
  type: string
  name: string
  placeholder: string
  // Info about this type here: https://react-hook-form.com/api/#register
  register: (Ref, validateRule?) => void
}) {
  return (
    <>
      <label className="font-bold" htmlFor={name}>
        {children}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        type={type}
        name={name}
        placeholder={placeholder}
        ref={register}
      />
    </>
  )
}
