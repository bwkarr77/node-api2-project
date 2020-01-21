import React, { useEffect } from "react";
import { connect } from "react-redux";

import Unit from "./Unit";
import NewUser from "./NewUser";
import EditUser from "./EditUser";

import { getData } from "../actions/actions.jsx";

const List = ({ getData, posts, state, reFetch, isEditing }) => {
  useEffect(() => {
    getData();
  }, [reFetch]);

  console.log("state: ", state, "\nlist:", posts.length);
  return (
    <div>
      {!posts.length ? (
        <h3>no data...</h3>
      ) : (
        <div>
          <h2>DATA EXISTS!!</h2>
          <div className="new-edit">
            {!isEditing ? <NewUser /> : <EditUser />}
          </div>
          <div className="datashow">
            {posts.map(each => (
              <Unit each={each} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  state: state,
  posts: state.posts,
  reFetch: state.reFetch,
  isEditing: state.isEditing
});

export default connect(mapStateToProps, { getData })(List);
