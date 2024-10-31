import { baseUrl } from "./baseUrl";

export const fetchWithAuth = async (url: string, options: any = {}) => {
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {

        const refreshResponse = await fetch(`${baseUrl}/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });

        if (refreshResponse.ok) {
            const data: any = await refreshResponse.json();
            localStorage.setItem('accessToken', data.accessToken);

            const retryResponse = await fetch(url, {
                ...options,
                headers: {
                    ...headers,
                    Authorization: `Bearer ${accessToken}`
                }
            });

            return retryResponse;
        }

        return response;
    }

    return response;
};