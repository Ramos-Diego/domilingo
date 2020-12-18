import Link from 'next/link'
import Search from './Search'
import UserDropdown from './UserDropdown'

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 flex gap-1 justify-between place-items-center py-2 px-3 max-w-screen-lg mx-auto">
      {/* Logo */}
      <section>
        <Link href="/" passHref>
          <a
            tabIndex={-1}
            className="font-semibold focus:outline-none text-lg bg-gray-900 px-2 py-1 rounded"
          >
            <div className="text-blue-400 group inline-block">
              <span className="inline-block transform group-hover:-translate-y-1 transition duration-200 ease-out">
                do
              </span>
            </div>
            <div className="text-blue-400 group inline-block">
              <span className="inline-block transform group-hover:-translate-y-1 transition duration-200 ease-out">
                mi
              </span>
            </div>
            <div className="text-red-400 group inline-block">
              <span className="inline-block transform group-hover:-translate-y-1 transition duration-200 ease-out">
                lin
              </span>
            </div>
            <div className="text-red-400 group inline-block">
              <span className="inline-block transform group-hover:-translate-y-1 transition duration-200 ease-out">
                go
              </span>
            </div>
          </a>
        </Link>
      </section>

      {/* Search bar */}
      <section>
        <Search />
      </section>

      {/* Login button / user menu */}
      <section>
        <UserDropdown />
      </section>
    </nav>
  )
}
