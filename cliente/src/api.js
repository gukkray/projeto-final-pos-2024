const API_BASE_URL = "http://localhost:8000/api";

export const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}/`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error; // Repassa o erro para o componente tratar
    }
};

export const createData = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Create error:", error);
        throw error; // Repassa o erro para o componente tratar
    }
};

export const updateData = async (endpoint, id, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Update error:", error);
        throw error;
    }
};

export const deleteData = async (endpoint, id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}/`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Delete error:", error);
        throw error;
    }
};
