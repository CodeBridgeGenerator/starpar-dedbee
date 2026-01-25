import client from '../services/restClient';

export const employeeAppraisalReview = {
    state: {
        selectedEmployeeAppraisalReview: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectEmployeeAppraisalReview(state, employeeAppraisalReview) {
            let toReturn = { ...state, selectedEmployeeAppraisalReview: employeeAppraisalReview };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE EmployeeAppraisalReview ////
        ///////////////////////////
        async getOneEmployeeAppraisalReview(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.employeeAppraisalReview.selectedEmployeeAppraisalReview?._id === _id) {
                    resolve(reduxState.employeeAppraisalReview.selectedEmployeeAppraisalReview);
                    return;
                }
                client
                    .service('employeeAppraisalReview')
                    .get(_id)
                    .then((res) => {
                        this.selectEmployeeAppraisalReview(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.debug('Failed to get employeeAppraisalReview', error);
                        dispatch.toast.alert({ type: 'error', title: 'EmployeeAppraisalReview', message: 'Failed to get employeeAppraisalReview' });
                        reject(error);
                    });
            });
        },
        setOneEmployeeAppraisalReview(_id, reduxState) {
            if (reduxState.employeeAppraisalReview.selectedEmployeeAppraisalReview?._id === _id) {
              return;
            }
            client
              .service("employeeAppraisalReview")
              .get(_id)
              .then((res) => {
                this.selectEmployeeAppraisalReview(res);
              })
              .catch((error) => {
                console.debug("Failed to set EmployeeAppraisalReview", error);
                dispatch.toast.alert({
                  type: "error",
                  title: "EmployeeAppraisalReview",
                  message: "Failed to set employeeAppraisalReview",
                });
              });
          },
    })
};