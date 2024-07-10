export const customStyles = {
    control: (provided, state) => ({
        ...provided,
        cursor: "pointer",
        color: "#e5e7eb",
        background: 'transparent',
        borderBottomColor: state.isFocused ? "#2E2C34" : "#667085",
        borderColor: state.isSelected ? "none" : state.isFocused ? "none" : "none",
        boxShadow: state.isFocused ? "#2E2C34" : "#667085", '&:hover': { borderBottom: '1px solid #2E2C34' },
        borderWidth: state.isSelected ? "none" : state.isFocused ? "none" : "none",
        borderBottomWidth: "1px",
        borderRadius: state.isSelected ? "none" : state.isFocused ? "none" : "none",
        minHeight: '44px',
        maxHeight: '44px',
        minWidth: '222px',
        padding: "0px 4px",
        outline: state.isSelected ? "none" : state.isFocused ? "none" : "none",
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "#fff",
        borderBottomWidth: "1px",
        outline: "none"
    }),
    menuList: (provided) => ({
        ...provided,
        backgroundColor: "#fff",
        borderBottomWidth: "1px",
        outline: "none"
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#ccc" : state.isFocused ? "#ccc" : "#fff",
        color: state.isSelected ? "#fff" : "#000",
        cursor: "pointer"
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: state.isFocused ? "#2E2C34" : "#667085",
    }),
};

export const customStyles02 = {
    control: (provided, state) => ({
        ...provided,
        cursor: "pointer",
        color: "#e5e7eb",
        background: 'transparent',
        borderColor: state.isFocused ? "#2E2C34" : "#667085",
        boxShadow: state.isFocused ? "#2E2C34" : "#667085", '&:hover': { border: '1px solid #2E2C34' },
        borderWidth: "1px",
        borderRadius: "4px",
        minHeight: '44px',
        maxHeight: '44px',
        minWidth: '222px',
        padding: "0px 4px",
        outline: state.isSelected ? "none" : state.isFocused ? "none" : "none",
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "#fff",
        outline: "none"
    }),
    menuList: (provided) => ({
        ...provided,
        backgroundColor: "#fff",
        outline: "none"
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#ccc" : state.isFocused ? "#ccc" : "#fff",
        color: state.isSelected ? "#fff" : "#000",
        cursor: "pointer"
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: state.isFocused ? "#2E2C34" : "#667085",
    }),
};

export const replaceSpacingWithHyphen = (str) => {
    return str.replace(/\s+/g, "-").toLowerCase();
};
