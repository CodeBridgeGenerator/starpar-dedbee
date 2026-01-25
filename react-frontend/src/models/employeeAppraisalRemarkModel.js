import client from '../services/restClient';

export const employeeAppraisalRemark = {
    state: {
        selectedEmployeeAppraisalRemark: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectEmployeeAppraisalRemark(state, employeeAppraisalRemark) {
            let toReturn = { ...state, selectedEmployeeAppraisalRemark: employeeAppraisalRemark };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE EmployeeAppraisalRemark ////
        ///////////////////////////
        async getOneEmployeeAppraisalRemark(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.employeeAppraisalRemark.selectedEmployeeAppraisalRemark?._id === _id) {
                    resolve(reduxState.employeeAppraisalRemark.selectedEmployeeAppraisalRemark);
                    return;
                }
                client
                    .service('employeeAppraisalRemarks')
                    .get(_id)
                    .then((res) => {
                        this.selectEmployeeAppraisalRemark(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.debug('Failed to get employeeAppraisalRemark', error);
                        dispatch.toast.alert({ type: 'error', title: 'EmployeeAppraisalRemark', message: 'Failed to get employeeAppraisalRemark' });
                        reject(error);
                    });
            });
        },
        setOneEmployeeAppraisalRemark(_id, reduxState) {
            if (reduxState.employeeAppraisalRemark.selectedEmployeeAppraisalRemark?._id === _id) {
              return;
            }
            client
              .service("employeeAppraisalRemarks")
              .get(_id)
              .then((res) => {
                this.selectEmployeeAppraisalRemark(res);
              })
              .catch((error) => {
                console.debug("Failed to set EmployeeAppraisalRemark", error);
                dispatch.toast.alert({
                  type: "error",
                  title: "EmployeeAppraisalRemark",
                  message: "Failed to set employeeAppraisalRemark",
                });
              });
          },
    })
};