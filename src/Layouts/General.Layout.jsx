import { Outlet } from "react-router-dom"

import { Footer, Header } from "../Components/Index"
import BackToTop from "../Utilities/BackToTop"

export default function GeneralLayout() {
  return (
    <div className="layout">
      <Header />
      <main className="main-container mt-28">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
