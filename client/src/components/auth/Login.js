import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const { isAuthenticated, error, clearErrors } = authContext;
	const { setAlert } = alertContext;
	useEffect(
		() => {
			if (isAuthenticated) {
				props.history.push('/');
			}

			if (error === 'Invalid Credentials') {
				setAlert(error, 'danger');
				clearErrors();
			}
		},
		// eslint-disable-next-line
		[ isAuthenticated, props.history ]
	);

	const [ user, setUser ] = useState({
		email: '',
		password: ''
	});

	const { email, password } = user;

	const onSubmit = (e) => {
		e.preventDefault();
		console.log('Login submit');
	};

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Login</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Email</label>
					<input type="email" name="email" value={email} onChange={(e) => setUser(e.target.value)} />
				</div>
				<div className="form-group">
					<label>Password</label>
					<input type="password" name="password" value={password} onChange={(e) => setUser(e.target.value)} />
				</div>
				<input type="submit" value="Login" className="btn btn-primary btn-block" />
			</form>
		</div>
	);
};

export default Login;
