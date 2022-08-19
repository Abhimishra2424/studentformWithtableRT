import {
  CREATE_STUDENT_BEGIN,
  CREATE_STUDENT_SUCCESS,
  CREATE_STUDENT_ERROR,
  GET_STUDENT_BEGIN,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_ERROR,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === CREATE_STUDENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_STUDENT_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      allStudent: [...state.allStudent, action.payload],
    };
  }
  if (action.type === CREATE_STUDENT_ERROR) {
    return {
        ...state,
        isLoading: false,
    };
  }
  if (action.type === GET_STUDENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_STUDENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      allStudent: action.payload,
    };
  }
  if (action.type === GET_STUDENT_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
