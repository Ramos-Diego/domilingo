import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { GlobalProvider } from '../context/GlobalState'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </GlobalProvider>
  )
}

export default MyApp
