import React from "react";
import { connect } from "react-redux";
import {
  handleChange,
  startEdit,
  saveEdit,
  cancelEdit
} from "../actions/actions";

const EditUser = ({
  state,
  startEdit,
  saveEdit,
  cancelEdit,
  dataToEdit,
  handleChange
}) => {
  // console.log("state: ", state);
  console.log("data:\n", dataToEdit);

  return (
    <div className="card">
      <form
        onSubmit={e => {
          console.log(dataToEdit);
          e.preventDefault();
          // saveEdit(e, dataToEdit);
          saveEdit(dataToEdit);
        }}
      >
        <h3>Edit User</h3>
        <input
          type="text"
          name="name"
          className="editData"
          placeholder="Edit Name"
          onChange={e => {
            handleChange(e, "dataToEdit");
          }}
          value={dataToEdit.name}
        />
        <input
          type="text"
          name="bio"
          className="editData"
          onChange={e => {
            handleChange(e, "dataToEdit");
          }}
          value={dataToEdit.bio}
        />
        <button type="submit">Save Changes</button>
      </form>
      {/* <button onClick={() => cancelEdit()}>Cancel Edit</button> */}
    </div>
  );
};

const mapStateToProps = state => ({
  state: state,
  posts: state.posts,
  dataToEdit: state.dataToEdit
});

export default connect(mapStateToProps, {
  startEdit,
  saveEdit,
  cancelEdit,
  handleChange
})(EditUser);
