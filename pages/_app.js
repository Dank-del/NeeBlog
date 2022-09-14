import '../styles/globals.css'
import { createTheme, NextUIProvider } from '@nextui-org/react';

const darkTheme = createTheme({
  type: 'dark',
})

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider theme={darkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
