import stateSchema from '../SCHEMA';
import tv4 from 'tv4';
export default ({ dispatch, getState }) => (next) => (action) => {
	// We are going to  first send the action to the next middleware. because we are going
	// to first hit the reducers and get updated state and then run this middleware.
	next(action);
	if (!tv4.validate(getState(), stateSchema)) {
		console.warn('Invalid data in state');
	}
};
