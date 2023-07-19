import { AuthProvider } from "@/context/UserContext"
import "@/styles/globals.css"
import { ThemeProvider } from "@mui/system"
import type { AppProps } from "next/app"
import Layout from "../layout/appLayout"
import { theme } from "@/styles/appTheme"
import { AccProvider } from "@/context/AccountContext"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AccProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AccProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
