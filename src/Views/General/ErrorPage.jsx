import assets from "../../Assets/Index"
import { DocumentTitle } from "../../Utilities/DocumentTitle"

const ErrorPage = () => {
  DocumentTitle("Soft Countries API || Error Page")

  return (
    <div className="flex-col flex items-center justify-center max-w-2xl gap-4 py-32 mx-auto text-center">
      <img src={assets.NoData} alt="" />
      <h1 className="text-4xl font-medium">Oops! Something went wrong.</h1>
      <p>
        We&apos;re sorry, but something went wrong. Please try refreshing the
        page, or contact support if the problem persists.
      </p>
    </div>
  )
}

export default ErrorPage
