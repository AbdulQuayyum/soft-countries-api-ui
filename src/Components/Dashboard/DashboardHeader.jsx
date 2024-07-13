const DashboardHeader = ({ setShowSidebar }) => {

    const HandleToggleSidebar = () => {
        setShowSidebar((prevState) => !prevState);
    }

    return (
        <nav className="dashboard-header-container">
            <span onClick={() => { HandleToggleSidebar() }}> DashboardHeader </span>
        </nav>
    )
}

export default DashboardHeader