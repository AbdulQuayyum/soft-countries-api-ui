import { useNavigate } from "react-router-dom"

import assets from "../../Assets/Index"
import { DocumentTitle } from "../../Utilities/DocumentTitle"

const PageNotFound = () => {
  const navigate = useNavigate()
  DocumentTitle("Soft Countries API || Page Not Found")

  return (
    <div className="max-w-[990px] w-full justify-start">
      <div className="flex flex-col-reverse items-center justify-between w-full px-6 py-12 mt-6 mb-12 md:items-start md:mt-12 md:mb-48 gap-y-12 md:flex-row">
        <div className="flex flex-col items-center md:items-start gap-y-4 max-w-none md:max-w-[390px]">
          <span className="text-[#000] text-4xl text-center md:text-start font-[700]">
            404 Page not found
          </span>
          <span className="text-lg font-[400] text-[#000] text-center md:text-start max-w-[350px] ">
            The page you are looking for does not exist or has been moved.
          </span>
          <button
            onClick={() => {
              navigate("/")
            }}
            className="flex items-center bg-primary text-base outlined my-4 px-8 font-medium py-3 text-white transition-all duration-150 border-[1px] border-primary rounded-md hover:bg-transparent hover:text-primary"
          >
            Back to homepage
          </button>
        </div>
        <div className="w-full h-full max-w-[232px] max-h-[168px]">
          <img src={assets.PageNotFound} className="w-full h-full " alt="" />
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
