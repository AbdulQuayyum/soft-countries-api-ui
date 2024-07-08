import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { HiOutlineServerStack } from "react-icons/hi2";
import { TiDocumentText } from "react-icons/ti";
import { RxDashboard } from "react-icons/rx";

import { DocumentTitle } from "../../Utilities/DocumentTitle"
import { Hero } from "../../Components/Index"

const HomePage = () => {
  DocumentTitle("Soft Countries API || Landing Page")

  const WhyChooseUsData = [
    {
      header: "Extensive Data Collection",
      image: <HiOutlineServerStack size={32} />,
      desc: "Our platform offers access to an extensive collection of high-quality data,meticulously researched, verified, and continuously updated to ensure the highest quality information"
    },
    {
      header: "Detailed Usage Analytics",
      image: <TbBrandGoogleAnalytics size={32} />,
      desc: "Stay informed with comprehensive analytics on your API usage. Monitor total calls, successful requests, and errors with breakdowns by mode (test/live) to optimize your application's performance."
    },
    {
      header: "User-Friendly Dashboard",
      image: <RxDashboard size={32} />,
      desc: "Manage your account effortlessly with our intuitive dashboard. View usage statistics, monitor subscription status, access detailed logs, and manage your settings all in one place."
    },
    {
      header: "Extensive Documentation and Support",
      image: <TiDocumentText size={32} />,
      desc: "Our platform provides clear, detailed guidelines, API references, and use-case examples, ensuring seamless integration and swift implementation into your projects. "
    }
  ]

  return (
    <section className="flex flex-col items-center justify-center w-full">
      <Hero />
    </section>
  )
}

export default HomePage
