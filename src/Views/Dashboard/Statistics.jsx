import { DocumentTitle } from "../../Utilities/DocumentTitle"

const StatisticsPage = () => {
    DocumentTitle("Soft Countries API || Statistics Page")
    return (
        <div className='flex flex-col w-full px-4 mt-4 gap-y-6'>
            <div>
                <span className='text-2xl font-bold lg:text-4xl'>Statistics Overview</span>
            </div>
        </div>
    )
}

export default StatisticsPage