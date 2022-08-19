import React, { useReducer, useContext } from "react";

import reducer from "./reducer";
import axios from "axios";
import {
  CREATE_STUDENT_BEGIN,
  CREATE_STUDENT_SUCCESS,
  CREATE_STUDENT_ERROR,
  GET_STUDENT_BEGIN,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_ERROR,
} from "./actions";

const initialState = {
  isLoading: false,
  allStudent: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createStudent = async ({ student }) => {
    dispatch({ type: CREATE_STUDENT_BEGIN });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/student",
        student
      );
      dispatch({ type: CREATE_STUDENT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_STUDENT_ERROR, payload: error });
    }
  };

  const getStudent = async () => {
    dispatch({ type: GET_STUDENT_BEGIN });
    try {
      const response = await axios.get("http://localhost:5000/api/student");
      dispatch({ type: GET_STUDENT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_STUDENT_ERROR, payload: error });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        createStudent,
        getStudent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
