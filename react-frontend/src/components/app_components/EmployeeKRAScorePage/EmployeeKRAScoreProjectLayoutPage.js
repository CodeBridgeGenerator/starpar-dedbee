import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import EmployeeKRAScorePage from "./EmployeeKRAScorePage";

const EmployeeKRAScoreProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <EmployeeKRAScorePage />
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

export default connect(mapState, mapDispatch)(EmployeeKRAScoreProjectLayoutPage);