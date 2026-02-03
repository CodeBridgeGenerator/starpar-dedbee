import client from '../services/restClient';

export const yrEmployeeAppraisalRemark = {
    state: {
        selectedYrEmployeeAppraisalRemark: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectYrEmployeeAppraisalRemark(state, yrEmployeeAppraisalRemark) {
            let toReturn = { ...state, selectedYrEmployeeAppraisalRemark: yrEmployeeAppraisalRemark };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE YrEmployeeAppraisalRemark ////
        ///////////////////////////
        async getOneYrEmployeeAppraisalRemark(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.yrEmployeeAppraisalRemark.selectedYrEmployeeAppraisalRemark?._id === _id) {
                    resolve(reduxState.yrEmployeeAppraisalRemark.selectedYrEmployeeAppraisalRemark);
                    return;
                }
                client
                    .service('yrEmployeeAppraisalRemarks')
                    .get(_id)
                    .then((res) => {
                        this.selectYrEmployeeAppraisalRemark(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.debug('Failed to get yrEmployeeAppraisalRemark', error);
                        dispatch.toast.alert({ type: 'error', title: 'YrEmployeeAppraisalRemark', message: 'Failed to get yrEmployeeAppraisalRemark' });
                        reject(error);
                    });
            });
        },
        setOneYrEmployeeAppraisalRemark(_id, reduxState) {
            if (reduxState.yrEmployeeAppraisalRemark.selectedYrEmployeeAppraisalRemark?._id === _id) {
              return;
            }
            client
              .service("yrEmployeeAppraisalRemarks")
              .get(_id)
              .then((res) => {
                this.selectYrEmployeeAppraisalRemark(res);
              })
              .catch((error) => {
                console.debug("Failed to set YrEmployeeAppraisalRemark", error);
                dispatch.toast.alert({
                  type: "error",
                  title: "YrEmployeeAppraisalRemark",
                  message: "Failed to set yrEmployeeAppraisalRemark",
                });
              });
          },
    })
};