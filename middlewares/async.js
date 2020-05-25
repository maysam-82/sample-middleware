// next is a reference to the next middleware on the middlewares' chain
// action is the one that returns from action creator
// boiler plate to create a middleware function
export default ({ dispatch }) => (next) => (action) => {
	// 1- Check if the action has a promise on it's `payload` property.
	// 2- If yes, then wait for it to resolve.
	// 3- if no, then send the action on to the next middleware.
	if (!action.payload || !action.payload.then) {
		return next(action);
	}
	// If yes, we are going to wait for that promise to be reolved and get its data and then create a new action with relevant data and dispatch that action.
	// The dispatch function will take an action and called all the middlewares in the chain and send that action to all reducers.
	action.payload.then((response) => {
		// take previous action with all properties and overwrite the payload with response
		const newAction = { ...action, payload: response };
		// Take a newAction and send it to the all other middlewares in the chain
		dispatch(newAction);
	});
};
