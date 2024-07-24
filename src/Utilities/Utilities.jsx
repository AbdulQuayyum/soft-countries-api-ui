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

export const compareTimestamps = (a, b) => {
    // Extract date and time parts from timestamps
    let [timeA, dateA] = a.timestamp.split(' ');
    let [timeB, dateB] = b.timestamp.split(' ');

    // Parse dates in format dd-mm-yyyy
    let [dayA, monthA, yearA] = dateA.split('-').map(Number);
    let [dayB, monthB, yearB] = dateB.split('-').map(Number);

    // Parse times in format hh:mm:ss
    let [hourA, minA, secA] = timeA.split(':').map(Number);
    let [hourB, minB, secB] = timeB.split(':').map(Number);

    // Create date objects for comparison
    let dateObjA = new Date(yearA, monthA - 1, dayA, hourA, minA, secA);
    let dateObjB = new Date(yearB, monthB - 1, dayB, hourB, minB, secB);

    // Compare dates and times
    if (dateObjA < dateObjB) {
        return 1;
    }
    if (dateObjA > dateObjB) {
        return -1;
    }
    // If dates are equal, compare times
    if (dateObjA.getTime() === dateObjB.getTime()) {
        if (hourA < hourB) {
            return 1;
        }
        if (hourA > hourB) {
            return -1;
        }
        if (minA < minB) {
            return 1;
        }
        if (minA > minB) {
            return -1;
        }
        if (secA < secB) {
            return 1;
        }
        if (secA > secB) {
            return -1;
        }
    }
    return 0;
};

export const IsValidUrl = (url) => {
    const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
        "i"
    );
    return !!pattern.test(url);
};