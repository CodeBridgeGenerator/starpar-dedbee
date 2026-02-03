import client from '../services/restClient';

export const employeeTraining = {
    state: {
        selectedEmployeeTraining: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectEmployeeTraining(state, employeeTraining) {
            let toReturn = { ...state, selectedEmployeeTraining: employeeTraining };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE EmployeeTraining ////
        ///////////////////////////
        async getOneEmployeeTraining(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.employeeTraining.selectedEmployeeTraining?._id === _id) {
                    resolve(reduxState.employeeTraining.selectedEmployeeTraining);
                    return;
                }
                client
                    .service('employeeTraining')
                    .get(_id)
                    .then((res) => {
                        this.selectEmployeeTraining(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.debug('Failed to get employeeTraining', error);
                        dispatch.toast.alert({ type: 'error', title: 'EmployeeTraining', message: 'Failed to get employeeTraining' });
                        reject(error);
                    });
            });
        },
        setOneEmployeeTraining(_id, reduxState) {
            if (reduxState.employeeTraining.selectedEmployeeTraining?._id === _id) {
              return;
            }
            client
              .service("employeeTraining")
              .get(_id)
              .then((res) => {
                this.selectEmployeeTraining(res);
              })
              .catch((error) => {
                console.debug("Failed to set EmployeeTraining", error);
                dispatch.toast.alert({
                  type: "error",
                  title: "EmployeeTraining",
                  message: "Failed to set employeeTraining",
                });
              });
          },
    })
};