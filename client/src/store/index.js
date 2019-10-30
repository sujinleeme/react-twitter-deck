import React, { createContext, useContext, useReducer } from 'react';
import logger from 'use-reducer-logger';

export const StateContext = createContext();

export const StoreProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider
    value={useReducer(logger(reducer), initialState)}
    children={children}
  />
);

export const useStore = () => useContext(StateContext);
