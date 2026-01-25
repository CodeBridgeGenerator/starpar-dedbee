import client from '../services/restClient';

export const employeeCompetenciesscore = {
    state: {
        selectedEmployeeCompetenciesscore: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectEmployeeCompetenciesscore(state, employeeCompetenciesscore) {
            let toReturn = { ...state, selectedEmployeeCompetenciesscore: employeeCompetenciesscore };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE EmployeeCompetenciesscore ////
        ///////////////////////////
        async getOneEmployeeCompetenciesscore(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.employeeCompetenciesscore.selectedEmployeeCompetenciesscore?._id === _id) {
                    resolve(reduxState.employeeCompetenciesscore.selectedEmployeeCompetenciesscore);
                    return;
                }
                client
                    .service('employeeCompetenciesscore')
                    .get(_id)
                    .then((res) => {
                        this.selectEmployeeCompetenciesscore(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.debug('Failed to get employeeCompetenciesscore', error);
                        dispatch.toast.alert({ type: 'error', title: 'EmployeeCompetenciesscore', message: 'Failed to get employeeCompetenciesscore' });
                        reject(error);
                    });
            });
        },
        setOneEmployeeCompetenciesscore(_id, reduxState) {
            if (reduxState.employeeCompetenciesscore.selectedEmployeeCompetenciesscore?._id === _id) {
              return;
            }
            client
              .service("employeeCompetenciesscore")
              .get(_id)
              .then((res) => {
                this.selectEmployeeCompetenciesscore(res);
              })
              .catch((error) => {
                console.debug("Failed to set EmployeeCompetenciesscore", error);
                dispatch.toast.alert({
                  type: "error",
                  title: "EmployeeCompetenciesscore",
                  message: "Failed to set employeeCompetenciesscore",
                });
              });
          },
    })
};