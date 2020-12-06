import NavBar from './NavBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-lg mb-3 mt-14">{children}</main>
    </>
  )
}
