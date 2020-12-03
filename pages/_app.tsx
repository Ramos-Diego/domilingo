import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import '../styles/tailwind.css'
import { SWRConfig } from 'swr'
import { GlobalProvider } from '../context/GlobalState'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Dominilingo is the dominican slang dictionary."
        />
        <meta name="keywords" content="Dictionary" />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/icons/apple-icon.png"></link>
        <meta name="theme-color" content="#2563eb" />
      </Head>
      <GlobalProvider>
        <SWRConfig
          value={{
            // refreshInterval: 3000,
            revalidateOnFocus: true,
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <Provider session={pageProps.session}>
            <Component {...pageProps} />
          </Provider>
        </SWRConfig>
      </GlobalProvider>
    </>
  )
}

export default MyApp
