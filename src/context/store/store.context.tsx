import { FC, createContext, useReducer, Dispatch } from "react";
import {
  productReducer,
  shoppingCartReducer,
  ProductActions,
  ShoppingCartActions,
} from "./store.reducer";

type ProjectType = {
  id: number;
  name: string;
  price: number;
};

type InitialStateType = {
  projects: ProjectType[];
  shoppingCart: number;
};

const initialState = {
  projects: [],
  shoppingCart: 0,
};

const StoreContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ProductActions | ShoppingCartActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { projects: products, shoppingCart }: InitialStateType,
  action: ProductActions | ShoppingCartActions
) => ({
  projects: productReducer(products, action),
  shoppingCart: shoppingCartReducer(shoppingCart, action),
});

const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };

// import { createContext, FC, useReducer } from "react";
// import "./store.reducer";
// import {
//   initialProjectState,
//   ProjectReducerType,
//   ProjectActions,
//   projectReducer,
// } from "./store.reducer";

// const mainReducer = (projects: ProjectReducerType, action: ProjectActions) => ({
//   projects: projectReducer(projects, action),
// });

// // type StoreContextType = {};

// /**
//  * Context to handle user auth state and actions.
//  * @see AuthProvider
//  */
// export const StoreContext = createContext<{
//   state: ProjectReducerType;
//   dispatch: React.Dispatch<ProjectActions>;
// }>({
//   state: initialProjectState,
//   dispatch: () => null,
// });

// /**
//  * Provides logic to and app wide access to the store context.
//  * @see StoreContext
//  * @param children all children tsx component
//  */
// export const StoreProvider: FC = ({ children }) => {
//   const [state, dispatch] = useReducer(mainReducer, initialProjectState);

//   return (
//     <StoreContext.Provider value={{ state, dispatch }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };
