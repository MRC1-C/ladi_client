import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
// import './index.css'
const PublicLayout = () => {
  return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default PublicLayout