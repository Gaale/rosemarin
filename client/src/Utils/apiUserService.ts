const BASE_URL = 'http://localhost:3001';


const register = (user) => {
    const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json"
        },
        credentials: 'include'
    };

    return fetch(`${BASE_URL}/register`, options)
    .then(response => response.json())
    .catch(err => console.error(err));
};

const login = (user) => {
    const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json"
        },
        credentials: 'include'
    };

    return fetch(`${BASE_URL}/login`, options)
    .then(response => response.json())
    .catch(err => console.error(err));
};

// Profile is not implemented
const profile = () => {
    return fetch(`${BASE_URL}/me`,{
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .catch(err => console.error(err));
};

const logout = () => {
    return fetch(`${BASE_URL}/logout`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .catch(err => console.error(err));
};

const apiUserService = {register, login, profile, logout}
export default apiUserService;
