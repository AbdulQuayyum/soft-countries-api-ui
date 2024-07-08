const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <div className='flex flex-col items-center justify-between max-w-[1400px] w-full gap-y-4 md:flex-row'>
            <span className="text-base text-[#2E2C34]">{currentYear} &#169; Soft Countries API , All rights reserved</span>
            <span className="text-base text-[#2E2C34]">Developed by   <a href="https://abdul-quayyum.vercel.app/" target="_blank" rel="noopener noreferrer">Abdul-Quayyum Alao</a>
            </span>
        </div>
    )
}

export default Footer