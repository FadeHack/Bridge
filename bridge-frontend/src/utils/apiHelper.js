// src/utils/apiHelper.js

export const apiHelper = {
    get: async (url) => {
        const response = await fetch(`/api${url}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },
    post: async (url, body) => {
        const response = await fetch(`/api${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },
};
