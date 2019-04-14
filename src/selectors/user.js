import {
    createSelector
} from 'reselect';

/*
const getStateVariable = state => state.user.stateVariable;
*/

const userSelector = createSelector(
    [/*getStateVariable*/],
    (/*stateVariable*/) => ({
        /*stateVariable*/
    })
);
    
export {
    userSelector
}