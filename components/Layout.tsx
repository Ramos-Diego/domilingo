import DeleteModal from './DeleteModal'
import NavBar from './NavBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DeleteModal />
      <NavBar />
      <main className="mx-auto max-w-prose lg:max-w-4xl mb-3 mt-14">
        {children}
      </main>
    </>
  )
}
