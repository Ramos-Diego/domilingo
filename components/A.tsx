import Link from 'next/link'

export default function A({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href}>
      <a className="bg-green-600 hover:bg-green-800 focus:bg-green-800 focus:outline-none text-white font-bold py-2 px-4 rounded">
        {children}
      </a>
    </Link>
  )
}
