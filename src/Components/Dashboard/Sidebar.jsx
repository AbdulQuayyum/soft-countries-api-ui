const Sidebar = ({ showSidebar, setShowSidebar }) => {

    const HandleToggleSidebar = () => {
        setShowSidebar((prevState) => !prevState);
    }

    return (
        <>
            {showSidebar &&
                <aside className="sidebar-container">Sidebar</aside>
            }
        </>
    )
}

export default Sidebar