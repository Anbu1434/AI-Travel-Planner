import { createContext } from 'react';

export const CreateTripContext = createContext({
  tripData: [],
  setTripData: () => {}, // This should match the useState setter signature
});