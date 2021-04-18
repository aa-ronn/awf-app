type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Create = "CREATE_PRODUCT",
  Delete = "DELETE_PRODUCT",
  Add = "ADD_PRODUCT",
}

// Product

type ProductType = {
  id: number;
  name: string;
  price: number;
};

type ProductPayload = {
  [Types.Create]: {
    id: number;
    name: string;
    price: number;
  };
  [Types.Delete]: {
    id: number;
  };
};

export type ProductActions = ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];

export const productReducer = (
  state: ProductType[],
  action: ProductActions | ShoppingCartActions
) => {
  switch (action.type) {
    case Types.Create:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
        },
      ];
    case Types.Delete:
      return [...state.filter((product) => product.id !== action.payload.id)];
    default:
      return state;
  }
};

// ShoppingCart

type ShoppingCartPayload = {
  [Types.Add]: undefined;
};

export type ShoppingCartActions = ActionMap<ShoppingCartPayload>[keyof ActionMap<ShoppingCartPayload>];

export const shoppingCartReducer = (
  state: number,
  action: ProductActions | ShoppingCartActions
) => {
  switch (action.type) {
    case Types.Add:
      return state + 1;
    default:
      return state;
  }
};

// type ActionMap<M extends { [index: string]: any }> = {
//   [Key in keyof M]: M[Key] extends undefined
//     ? {
//         type: Key;
//       }
//     : {
//         type: Key;
//         payload: M[Key];
//       };
// };

// // Task
// type TaskType = {
//   id: number;
//   name: string;
//   details: string;
// };

// // Project
// type ProjectType = {
//   id: number;
//   name: string;
//   details: string;
//   tasks: TaskType[];
// };

// export type ProjectReducerType = {
//   projects: ProjectType[];
//   loading: boolean;
//   error: null | Error;
// };

// // Actions
// export enum ActionTypes {
//   Start = "START",
//   Complete = "COMPLETE",
//   Error = "ERROR",
//   CreateProject = "CREATE_PROJECT",
//   DeleteProject = "DELETE_PRODUCT",
//   CreateTask = "CREATE_TASK",
//   DeleteTask = "DELETE_TASK",
// }

// type ProjectPayload = {
//   [ActionTypes.Start]: {
//     loading: boolean;
//   };
//   [ActionTypes.Complete]: {
//     loading: boolean;
//   };
//   [ActionTypes.Error]: {};
//   [ActionTypes.CreateProject]: {
//     name: string;
//     details: string;
//   };
//   [ActionTypes.DeleteProject]: {
//     projectId: number;
//   };
//   [ActionTypes.CreateTask]: {
//     projectId: number;
//     name: string;
//     details: string;
//   };
//   [ActionTypes.DeleteTask]: {
//     projectId: number;
//     taskId: number;
//   };
// };

// export type ProjectActions = ActionMap<ProjectPayload>[keyof ActionMap<ProjectPayload>];

// export const initialProjectState: ProjectReducerType = {
//   projects: [],
//   loading: false,
//   error: null,
// };

// export const projectReducer = (
//   state: ProjectReducerType,
//   action: ProjectActions
// ): ProjectReducerType => {
//   switch (action.type) {
//     case ActionTypes.CreateProject:
//       return {
//         loading: state.loading,
//         error: state.error,
//         projects: [
//           ...state.projects,
//           {
//             id: Math.random(),
//             name: action.payload.name,
//             details: action.payload.details,
//             tasks: [],
//           },
//         ],
//       };
//     case ActionTypes.DeleteProject:
//       return {
//         loading: state.loading,
//         error: state.error,
//         projects: [
//           ...state.projects.filter(
//             (project) => project.id !== action.payload.projectId
//           ),
//         ],
//       };
//     case ActionTypes.CreateTask:
//       state.projects.every((project) => {
//         //check for matching project id
//         if (project.id === action.payload.projectId) {
//           project.tasks = [
//             ...project.tasks,
//             {
//               id: Math.random(),
//               name: action.payload.name,
//               details: action.payload.details,
//             },
//           ];
//           // exit loop
//           return false;
//         }
//         return true;
//       });
//       return {
//         loading: state.loading,
//         error: state.error,
//         projects: [...state.projects],
//       };
//     case ActionTypes.DeleteTask:
//       state.projects.every((project) => {
//         if (project.id === action.payload.projectId) {
//           project.tasks = [
//             ...project.tasks.filter(
//               (task) => task.id === action.payload.taskId
//             ),
//           ];
//           return false;
//         }
//         return true;
//       });
//       return {
//         loading: state.loading,
//         error: state.error,
//         projects: [...state.projects],
//       };
//     case ActionTypes.Start:
//       return {
//         loading: true,
//         error: state.error,
//         projects: [...state.projects],
//       };
//     case ActionTypes.Complete:
//       return {
//         loading: false,
//         error: state.error,
//         projects: [...state.projects],
//       };
//     case ActionTypes.Error:
//       return {
//         loading: false,
//         error: new Error(),
//         projects: [...state.projects],
//       };
//     default:
//       return {
//         loading: state.loading,
//         error: state.error,
//         projects: [...state.projects],
//       };
//   }
// };
