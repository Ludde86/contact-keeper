import axios from 'axios';

// check to see if a token is passed in
// -> if, set it to the global (default) header
// -> if not, delete it from the global header
const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};

export default setAuthToken;
