import { DocumentTitle } from '../../Utilities/DocumentTitle'

const ResourcesPage = () => {
    DocumentTitle("Soft Countries API || Resources Page")
    return (
        <section className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center gap-y-2 lg:gap-y-4 ">
                <span className="text-4xl lg:text-6xl text-center font-extrabold text-[#2E2C34]">Resources Page!</span>
                <span className="text-xl text-[#667085] font-light text-center">This page contains resources that would help you understand out API Service better</span>
            </div>
        </section>
    )
}

export default ResourcesPage