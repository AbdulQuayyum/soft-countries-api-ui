import { PiArrowFatLinesUpThin } from "react-icons/pi";

const BackToTop = () => {
    if (typeof window === "object") {
        window.addEventListener("scroll", function () {
            const backToTop = document.querySelector(".back-to-top")
            if (this?.scrollY >= 560) backToTop?.classList.add("show-back-to-top")
            else backToTop?.classList.remove("show-back-to-top")
        })
    }
    return (
        <a href="#" className='back-to-top'>
            <PiArrowFatLinesUpThin size={24} className='back-to-top-icon' />
        </a>
    )
}

export default BackToTop