import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import AccessControlPage from "./AccessControlPage";

const AccessControlProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <AccessControlPage />
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

export default connect(mapState, mapDispatch)(AccessControlProjectLayoutPage);