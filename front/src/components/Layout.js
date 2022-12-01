import { Footer } from "./footer/Footer"
import { Header } from "./header"

export function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}