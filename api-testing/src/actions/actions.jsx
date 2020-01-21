import Axios from "axios";

export const LOGINSTART = "LOGINSTART";
export const LOGINSUCCESS = "LOGINSUCCESS";
export const LOGINFAIL = "LOGINFAIL";

export const GETDATASTART = "GETDATASTART";
export const GETDATASUCCESS = "GETDATASUCCESS";
export const GETDATAFAIL = "GETDATAFAIL";

export const REGISTERSTART = "REGISTERSTART";
export const REGISTERSUCCESS = "REGISTERSUCCESS";
export const REGISTERFAIL = "REGISTERFAIL";

export const EDITDATASTART = "EDITDATASTART";
export const EDITDATASUCCESS = "EDITDATASUCCESS";
export const EDITDATAFAIL = "EDITDATAFAIL";

export const ADDDATASTART = "ADDDATASTART";
export const ADDDATASUCCESS = "ADDDATASUCCESS";
export const ADDDATAFAIL = "ADDDATAFAIL";

export const HANDLECHANGE = "HANDLECHANGE";
export const LOGOUT = "LOGOUT";
export const DELETEUNIT = "DELETEUNIT";
export const CANCELEDIT = "CANCELEDIT";

const apiBase = "http://localhost:6060";
const apiGet = `${apiBase}/api/posts`;
const apiPost = `${apiBase}/api/posts`;
const apiDelete = `${apiBase}/api/posts`;
const apiPut = `${apiBase}/api/posts`;

export const getData = () => dispatch => {
  //   console.log("getData start");
  dispatch({ type: GETDATASTART });
  Axios.get(apiGet)
    .then(res => {
      console.log("api.get: ", res.data);
      dispatch({ type: GETDATASUCCESS, payload: res.data });
    })
    .catch(e => {
      console.log("api.get.err: ", e);
      return dispatch({ type: GETDATAFAIL });
    });
};
export const addUser = (event, newUser) => dispatch => {
  event.preventDefault();
  console.log("addData start\n", newUser);
  dispatch({ type: ADDDATASTART });
  Axios.post(apiPost, newUser)
    .then(res => {
      console.log("api.post: ", res.data);
      dispatch({ type: ADDDATASUCCESS, payload: newUser });
    })
    .catch(e => {
      console.log("actions > addData.err: ", e);
      return dispatch({ type: ADDDATAFAIL, payload: e });
    });
};
export const deleteUnit = unit => dispatch => {
  Axios.delete(`${apiDelete}/${unit}`)
    .then(res => {
      console.log("successful delete", res);
      return dispatch({ type: DELETEUNIT, payload: unit });
    })
    .catch(e => {
      console.log(e);
    });
};

export const handleChange = (event, formType) => {
  // console.log("handleChange:", event.target.value, formType);
  return {
    type: HANDLECHANGE,
    payload: { target: event.target, form: formType }
  };
};

export const startEdit = id => {
  console.log(id);
  return {
    type: EDITDATASTART,
    payload: id
  };
};
export const saveEdit = data => dispatch => {
  console.log("saveEdit: ", data);
  const axiosPut = `${apiPut}/${data.id}`;
  console.log(axiosPut);
  Axios.put(axiosPut, data)
    .then(res => {
      console.log(".put success: ", res);
      dispatch({ type: EDITDATASUCCESS, payload: res.data });
    })
    .catch(e => {
      console.log(e);
      return dispatch({ type: EDITDATAFAIL, payload: e });
    });
};
export const cancelEdit = () => ({
  type: CANCELEDIT
});
