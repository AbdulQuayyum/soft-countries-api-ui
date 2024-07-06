export const FetchUserFlag = async () => {
    const apiUrl = `${import.meta.env.VITE_SERVER_URL}/v1/Service/GetService/calling-code-flag`
    const username = import.meta.env.VITE_USERNAME
    const apiKey = import.meta.env.VITE_API_KEY

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'username': username,
                'apiKey': apiKey
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (!data.status) {
            throw new Error("Failed to fetch data");
        }

        return data;
    } catch (error) {
        console.error("Error fetching data: ", error)
    }
}