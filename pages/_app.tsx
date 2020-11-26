import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { GlobalProvider } from '../context/GlobalState'
import '../styles/tailwind.css'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <SWRConfig
        value={{
          refreshInterval: 3000,
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
