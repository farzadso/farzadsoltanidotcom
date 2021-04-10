import Alert from './alert'
import Footer from './footer'
import Meta from './meta'

type Props = {
  alert?: boolean
  children: React.ReactNode
}

const Layout = ({ alert, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        { alert && <Alert alert={alert} /> }
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
