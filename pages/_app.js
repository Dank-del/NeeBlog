import '../styles/globals.css'
import { createTheme, NextUIProvider } from '@nextui-org/react';
import Layout from '../components/Layout';

const darkTheme = createTheme({
  type: 'dark',
})

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider theme={darkTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  )
}

export default MyApp
