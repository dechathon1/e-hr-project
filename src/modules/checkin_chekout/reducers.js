import * as Actions from "./actions";

export const initialState = {
  checkInformation: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_CHECK_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_CHECK_INFORMATION.SUCCESS:
      return {
        ...state,
        checkInformation: action.payload.data,
      };
    case Actions.GET_CHECK_INFORMATION.FAILURE:
      return {
        ...state,
        checkInformation: {},
      };
    default:
      return state;
  }
};
