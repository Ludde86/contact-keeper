import React, { useState } from 'react';

const Register = () => {
	// set state for user's fields
	// -> name, email, password, password2
	const [ user, setUser ] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = user;

	const onSubmit = (e) => {
		e.preventDefault();
		console.log('Register submit');
	};

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Register</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" value={name} onChange={(e) => setUser(e.target.value)} />
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input type="email" name="email" value={email} onChange={(e) => setUser(e.target.value)} />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" value={password} onChange={(e) => setUser(e.target.value)} />
				</div>
				<div className="form-group">
					<label htmlFor="password2">Confirm Password</label>
					<input
						type="password"
						name="password2"
						value={password2}
						onChange={(e) => setUser(e.target.value)}
					/>
				</div>
				<input type="submit" value="Register" className="btn btn-primary btn-block" />
			</form>
		</div>
	);
};

export default Register;
