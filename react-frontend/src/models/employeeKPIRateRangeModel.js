import client from '../services/restClient';

export const employeeKPIRateRange = {
    state: {
        selectedEmployeeKPIRateRange: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectEmployeeKPIRateRange(state, employeeKPIRateRange) {
            let toReturn = { ...state, selectedEmployeeKPIRateRange: employeeKPIRateRange };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE EmployeeKPIRateRange ////
        ///////////////////////////
        async getOneEmployeeKPIRateRange(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.employeeKPIRateRange.selectedEmployeeKPIRateRange?._id === _id) {
                    resolve(reduxState.employeeKPIRateRange.selectedEmployeeKPIRateRange);
                    return;
                }
                client
                    .service('employeeKPIRateRange')
                    .get(_id)
                    .then((res) => {
                        this.selectEmployeeKPIRateRange(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.debug('Failed to get employeeKPIRateRange', error);
                        dispatch.toast.alert({ type: 'error', title: 'EmployeeKPIRateRange', message: 'Failed to get employeeKPIRateRange' });
                        reject(error);
                    });
            });
        },
        setOneEmployeeKPIRateRange(_id, reduxState) {
            if (reduxState.employeeKPIRateRange.selectedEmployeeKPIRateRange?._id === _id) {
              return;
            }
            client
              .service("employeeKPIRateRange")
              .get(_id)
              .then((res) => {
                this.selectEmployeeKPIRateRange(res);
              })
              .catch((error) => {
                console.debug("Failed to set EmployeeKPIRateRange", error);
                dispatch.toast.alert({
                  type: "error",
                  title: "EmployeeKPIRateRange",
                  message: "Failed to set employeeKPIRateRange",
                });
              });
          },
    })
};