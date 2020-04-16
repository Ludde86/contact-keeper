import AlertContext from './alertContext';

const AlertState = (props) => {
	const initialState = {};

	return <AlertContext.Provider value={{}}>{props.children}</AlertContext.Provider>;
};

export default AlertState;
