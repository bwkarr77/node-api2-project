import {
  //logging in to api...
  LOGINSTART,
  LOGINSUCCESS,
  LOGINFAIL,
  //getting data...
  GETDATASTART,
  GETDATASUCCESS,
  GETDATAFAIL,
  //registering to api...
  REGISTERSTART,
  REGISTERSUCCESS,
  REGISTERFAIL,
  //edit data from api...
  EDITDATASTART,
  EDITDATASUCCESS,
  EDITDATAFAIL,
  //add data to api...
  ADDDATASTART,
  ADDDATASUCCESS,
  ADDDATAFAIL,
  //some more names
  HANDLECHANGE,
  LOGOUT,
  DELETEUNIT,
  CANCELEDIT
} from "../actions/actions";

const initialState = {
  error: "",

  isLoggingIn: false,
  isNewUser: false,
  didNewUser: false,

  isFetching: false,
  posts: [{ id: "", title: "", contents: "", created_at: "", updated_at: "" }],
  newPost: { name: "", bio: "" },
  dataToEdit: { name: "", bio: "" },

  isAdding: false,
  isEditing: false,
  initialData: "",
  dataToEdit: "",

  reFetch: false
};

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGINSTART:
      return {
        ...state
      };
    case LOGINSUCCESS:
      return {
        ...state
      };
    case LOGINFAIL:
      return {
        ...state
      };
    //getting data...
    case GETDATASTART:
      return {
        ...state,
        error: "",
        isFetching: true
      };
    case GETDATASUCCESS:
      console.log(payload);
      return {
        ...state,
        error: "",
        isFetching: false,
        posts: payload
      };
    case GETDATAFAIL:
      return {
        ...state,
        error: payload,
        isFetching: false
      };
    //registering to api...
    case REGISTERSTART:
      return {
        ...state
      };
    case REGISTERSUCCESS:
      return {
        ...state,
        reFetch: !state.reFetch
      };
    case REGISTERFAIL:
      return {
        ...state
      };
    //edit data from api...
    case EDITDATASTART:
      // console.log(payload);
      let objReturn = state.posts.filter((dataset, index) => {
        if (dataset.id !== payload) {
          // console.log('nope\n',dataset.id)
          return false;
        } else {
          console.log("yep", dataset);
          return dataset;
        }
      });
      console.log(objReturn[0]);
      return {
        ...state,
        isEditing: true,
        error: "",
        dataToEdit: objReturn[0]
      };
    case EDITDATASUCCESS:
      console.log(payload);
      return {
        ...state,
        error: "",
        isEditing: false,
        dataToEdit: { name: "", bio: "" },
        reFetch: !state.reFetch,
        posts: state.posts.map(each => {
          if (each.id === payload.id) {
            return payload;
          } else {
            return each;
          }
        })
      };
    case EDITDATAFAIL:
      return {
        ...state,
        isEditing: false,
        err: "",
        dataToEdit: {}
      };
    //add data to api...
    case ADDDATASTART:
      return {
        ...state,
        isAdding: true,
        error: ""
      };
    case ADDDATASUCCESS:
      console.log(payload);
      var newID = state.posts[state.posts.length - 1].id + 1;
      var dt = new Date();
      var modifiedDate = `${dt.getFullYear()}-${dt.getMonth() +
        1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds() +
        1}} `;
      return {
        ...state,
        error: "",
        isAdding: false,
        reFetch: !state.reFetch,
        posts: [
          ...state.posts,
          {
            id: newID,
            name: payload.name,
            bio: payload.bio,
            created_at: modifiedDate
          }
        ]
      };
    case ADDDATAFAIL:
      return {
        ...state
      };
    case HANDLECHANGE:
      console.log("HANDLECHANGE:", payload);
      switch (payload.form) {
        case "newUser":
          return {
            ...state,
            newUser: {
              ...state.newUser,
              [payload.target.name]: payload.target.value
            }
          };
        case "dataToEdit":
          return {
            ...state,
            dataToEdit: {
              ...state.dataToEdit,
              [payload.target.name]: payload.target.value
            }
          };
        default:
          return {
            ...state
          };
      }
    case LOGOUT:
      return {
        ...state
      };
    case DELETEUNIT:
      console.log("deleteUnit:", payload, state.posts);
      return {
        ...state,
        reFetch: !state.reFetch,
        posts: state.posts.filter((dataset, index) => {
          if (dataset.id === payload.id) {
            return false;
          } else {
            return true;
          }
        })
      };
    case CANCELEDIT:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
