export default function Input({
  type,
  label,
  name,
  placeholder,
  register,
  defaultValue,
  hide,
}: {
  type: string
  label?: string
  name: string
  placeholder?: string
  // Info about this type here: https://react-hook-form.com/api/#register
  register: (Ref, validateRule?) => void
  defaultValue?: string | number
  hide?: boolean
}) {
  // The Input component changes based on the type
  return (
    <>
      {type === 'text' && (
        <div className={hide ? 'hidden' : ''}>
          {label && (
            <label className="font-bold" htmlFor={name}>
              {label}
            </label>
          )}
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 bg-gray-900 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            type="text"
            name={name}
            placeholder={placeholder}
            ref={register}
            defaultValue={defaultValue}
          />
        </div>
      )}
      {type === 'textarea' && (
        <div className={hide ? 'hidden' : ''}>
          <label className="font-bold" htmlFor={name}>
            {label}
          </label>
          <textarea
            className="shadow appearance-none rounded w-full py-2 px-3 text-white bg-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            name={name}
            placeholder={placeholder}
            ref={register}
            rows={4}
            defaultValue={defaultValue}
          ></textarea>
        </div>
      )}
    </>
  )
}
