import DeleteModal from './DeleteModal'
import NavBar from './NavBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DeleteModal />
      <NavBar />
      <main className="mb-3 mt-5">{children}</main>
    </>
  )
}
