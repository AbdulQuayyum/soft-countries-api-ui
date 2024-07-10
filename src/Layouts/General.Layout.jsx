import { Outlet } from "react-router-dom"

import { Footer, Header } from "../Components/Index"
import BackToTop from "../Utilities/BackToTop"
import ScrollToTop from "../Utilities/ScrollToTop"

export default function GeneralLayout() {
  return (
    <>
      <ScrollToTop />
      <div className="layout">
        <Header />
        <span className="invisible ">shshhs</span>
        <main className="mt-4 main-container">
          <Outlet />
        </main>
        <Footer />
      </div>
      <BackToTop />
    </>
  )
}
