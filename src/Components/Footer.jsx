const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <div className='flex flex-col items-center justify-between max-w-[1400px] w-full pt-4 pb-10 gap-y-4 md:flex-row'>
            <span className="text-base text-black">{currentYear} &#169; Soft Countries API , All rights reserved</span>
            <span className="text-base text-black">Developed by   <a href="https://abdul-quayyum.vercel.app/" target="_blank" rel="noopener noreferrer">Abdul-Quayyum Alao</a>
            </span>
        </div>
    )
}

export default Footer