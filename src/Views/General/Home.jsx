import { DocumentTitle } from "../../Utilities/DocumentTitle"
import { Hero } from "../../Components/Index"

const HomePage = () => {
  DocumentTitle("Soft Countries API || Landing Page")

  const WhyChooseUsData = [
    {
      header: "Extensive Data Collection",
      desc: "Our platform offers access to an extensive collection of high-quality data,meticulously researched, verified, and continuously updated to ensure the highest quality information"
    },
    {
      header: "Detailed Usage Analytics",
      desc: "Stay informed with comprehensive analytics on your API usage. Monitor total calls, successful requests, and errors with breakdowns by mode (test/live) to optimize your application's performance."
    },
    {
      header: "User-Friendly Dashboard",
      desc: "Manage your account effortlessly with our intuitive dashboard. View usage statistics, monitor subscription status, access detailed logs, and manage your settings all in one place."
    },
    {
      header: "Extensive Documentation and Support",
      desc: "Our platform provides clear, detailed guidelines, API references, and use-case examples, ensuring seamless integration and swift implementation into your projects. "
    }
  ]

  return (
    <section className="flex flex-col items-center justify-center w-full mt-10 sm:mt-0">
      <Hero />
      <div className='flex flex-col-reverse items-center justify-between w-full py-10 mt-0 gap-x-10 lg:gap-x-20 lg:mt-10 lg:flex-row'>
        <div className="flex items-center justify-center w-full lg:items-start gap-y-2 lg:gap-y-4 ">
          <span className='mb-5 text-4xl lg:text-5xl py-6 flex items-center justify-center font-extrabold text-[#000] text-center lg:text-left'> Why Should you choose our platform? </span>
        </div>
      </div>
    </section>
  )
}

export default HomePage
