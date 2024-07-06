import { DocumentTitle } from "../../Utilities/DocumentTitle"
import { Hero } from "../../Components/Index"

const HomePage = () => {
  DocumentTitle("Soft Countries API || Landing Page")

  return (
    <section className="flex items-center justify-center w-full mt-10 sm:mt-0">
      <Hero />
    </section>
  )
}

export default HomePage
