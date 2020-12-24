import LetterFilter from './LetterFilter'
import Search from './Search'
import Logo from './Logo'
import UserDropdown from './UserDropdown'
import { useRouter } from 'next/router'

export default function NavBar() {
  const router = useRouter()
  return (
    <nav className="w-full h-11 grid justify-items-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-50">
      <div className="max-w-screen-lg w-full">
        <article className="h-full px-2 sm:px-4 flex items-center justify-between gap-2 sm:gap-0">
          {/* Logo */}
          <section>
            <Logo />
          </section>

          {/* Search */}
          <section>
            {(router.asPath === '/' || router.asPath === '/#') && <Search />}
            {/* <LetterFilter /> */}
          </section>

          {/* Login button / user menu */}
          <section>
            <UserDropdown />
          </section>
        </article>
      </div>
    </nav>
  )
}
