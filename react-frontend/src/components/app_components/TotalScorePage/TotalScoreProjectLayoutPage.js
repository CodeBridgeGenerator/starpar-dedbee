import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import TotalScorePage from "./TotalScorePage";

const TotalScoreProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <TotalScorePage />
    </ProjectLayout>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(TotalScoreProjectLayoutPage);