import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import '../styles/tailwind.css'
import { SWRConfig } from 'swr'
import { GlobalProvider } from '../context/GlobalState'

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  )
}

export default MyApp
