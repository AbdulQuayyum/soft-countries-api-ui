import { useState } from "react"
import { Outlet } from "react-router-dom"

import { Footer, Header, AuthModal } from "../Components/Index"
import BackToTop from "../Utilities/BackToTop"
import ScrollToTop from "../Utilities/ScrollToTop"

export default function GeneralLayout() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(false);

  return (
    <>
      <ScrollToTop />
      <div className="layout">
        <Header user={user} setShowModal={setShowModal} />
        <span className="invisible ">Soft Countries API</span>
        <main className="mt-4 main-container">
          <Outlet context={{ user, setShowModal }} />
        </main>
        <Footer />
      </div>
      <BackToTop />
      {showModal && <AuthModal prop="login" setShowModal={setShowModal} />}
    </>
  )
}
