import Head from 'next/head'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid gap-3 justify-center justify-items-center w-full mt-5 font-semibold">
        <div>Page Not Found</div>
        <Link href="/" passHref>
          <a className="block bg-white rounded px-3 py-2 text-gray-900 font-bold">
            Go home
          </a>
        </Link>
      </div>
    </>
  )
}
