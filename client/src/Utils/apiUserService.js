const BASE_URL = 'http://localhost:3001';

const apiUserService = {};

apiUserService.register = (user) => {
	const options = {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-type': 'application/json',
		},
		credentials: 'include',
	};

	return fetch(`${BASE_URL}/register`, options)
		.then((response) => {
			if (response) return response;
		})
		.catch((err) => console.error(err));
};

apiUserService.login = (user) => {
	const options = {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-type': 'application/json',
		},
		credentials: 'include',
	};

	return fetch(`${BASE_URL}/login`, options)
		.then((response) => {
			console.log(response);
			if (response.status < 400) return response;
		})
		.catch((err) => console.error(err));
};

apiUserService.profile = () => {
	return fetch(`${BASE_URL}/me`, {
		method: 'GET',
		credentials: 'include',
	})
		.then((response) => response.json())
		.catch((err) => console.error(err));
};

apiUserService.logout = () => {
	return fetch(`${BASE_URL}/logout`, {
		method: 'GET',
		credentials: 'include',
	})
		.then((response) => response.json())
		.catch((err) => console.error(err));
};

export default apiUserService;
