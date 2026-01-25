import client from '../services/restClient';

export const employeeAppraisal = {
    state: {
        selectedEmployeeAppraisal: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectEmployeeAppraisal(state, employeeAppraisal) {
            let toReturn = { ...state, selectedEmployeeAppraisal: employeeAppraisal };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE EmployeeAppraisal ////
        ///////////////////////////
        async getOneEmployeeAppraisal(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.employeeAppraisal.selectedEmployeeAppraisal?._id === _id) {
                    resolve(reduxState.employeeAppraisal.selectedEmployeeAppraisal);
                    return;
                }
                client
                    .service('employeeAppraisal')
                    .get(_id)
                    .then((res) => {
                        this.selectEmployeeAppraisal(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.debug('Failed to get employeeAppraisal', error);
                        dispatch.toast.alert({ type: 'error', title: 'EmployeeAppraisal', message: 'Failed to get employeeAppraisal' });
                        reject(error);
                    });
            });
        },
        setOneEmployeeAppraisal(_id, reduxState) {
            if (reduxState.employeeAppraisal.selectedEmployeeAppraisal?._id === _id) {
              return;
            }
            client
              .service("employeeAppraisal")
              .get(_id)
              .then((res) => {
                this.selectEmployeeAppraisal(res);
              })
              .catch((error) => {
                console.debug("Failed to set EmployeeAppraisal", error);
                dispatch.toast.alert({
                  type: "error",
                  title: "EmployeeAppraisal",
                  message: "Failed to set employeeAppraisal",
                });
              });
          },
    })
};