import React from "react";
import { connect } from "react-redux";

import { handleChange, addUser } from "../actions/actions.jsx";

const NewUser = ({ state, posts, newPost, handleChange, addUser }) => {
  return (
    <div className="card">
      <form
        onSubmit={e => {
          e.preventDefault();
          addUser(e, newPost);
        }}
      >
        <h3>New User</h3>
        <input
          type="text"
          name="name"
          placeholder="User's Name"
          onChange={e => {
            handleChange(e, "newPost");
          }}
          value={newPost.name}
        />
        <input
          type="text"
          name="bio"
          placeholder="User's Bio"
          onChange={e => handleChange(e, "newPost")}
          value={newPost.bio}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  state: state,
  posts: state.posts,
  newPost: state.newPost
});

export default connect(mapStateToProps, { handleChange, addUser })(NewUser);
