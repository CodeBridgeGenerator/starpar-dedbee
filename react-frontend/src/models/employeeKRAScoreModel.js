import client from '../services/restClient';

export const employeeKRAScore = {
    state: {
        selectedEmployeeKRAScore: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectEmployeeKRAScore(state, employeeKRAScore) {
            let toReturn = { ...state, selectedEmployeeKRAScore: employeeKRAScore };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE EmployeeKRAScore ////
        ///////////////////////////
        async getOneEmployeeKRAScore(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.employeeKRAScore.selectedEmployeeKRAScore?._id === _id) {
                    resolve(reduxState.employeeKRAScore.selectedEmployeeKRAScore);
                    return;
                }
                client
                    .service('employeeKRAScore')
                    .get(_id)
                    .then((res) => {
                        this.selectEmployeeKRAScore(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.debug('Failed to get employeeKRAScore', error);
                        dispatch.toast.alert({ type: 'error', title: 'EmployeeKRAScore', message: 'Failed to get employeeKRAScore' });
                        reject(error);
                    });
            });
        },
        setOneEmployeeKRAScore(_id, reduxState) {
            if (reduxState.employeeKRAScore.selectedEmployeeKRAScore?._id === _id) {
              return;
            }
            client
              .service("employeeKRAScore")
              .get(_id)
              .then((res) => {
                this.selectEmployeeKRAScore(res);
              })
              .catch((error) => {
                console.debug("Failed to set EmployeeKRAScore", error);
                dispatch.toast.alert({
                  type: "error",
                  title: "EmployeeKRAScore",
                  message: "Failed to set employeeKRAScore",
                });
              });
          },
    })
};