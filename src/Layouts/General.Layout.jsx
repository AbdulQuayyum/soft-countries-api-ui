import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import { Footer, Header, AuthModal } from "../Components/Index";
import BackToTop from "../Utilities/BackToTop";
import ScrollToTop from "../Utilities/ScrollToTop";

export default function GeneralLayout() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="flex items-center justify-center w-full">
      <ScrollToTop />
      <div className="layout">
        <Header setShowModal={setShowModal} />
        <span className="invisible">Soft Countries API</span>
        <main className="mt-4 main-container">
          <Outlet context={{ setShowModal }} />
        </main>
        <Footer />
      </div>
      <BackToTop />
      {showModal && (
        <div ref={modalRef}>
          <AuthModal prop="login" setShowModal={setShowModal} />
        </div>
      )}
    </div>
  );
}
