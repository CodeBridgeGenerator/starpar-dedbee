import client from '../services/restClient';

export const yrEmployeeAppraisalReview = {
    state: {
        selectedYrEmployeeAppraisalReview: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectYrEmployeeAppraisalReview(state, yrEmployeeAppraisalReview) {
            let toReturn = { ...state, selectedYrEmployeeAppraisalReview: yrEmployeeAppraisalReview };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE YrEmployeeAppraisalReview ////
        ///////////////////////////
        async getOneYrEmployeeAppraisalReview(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.yrEmployeeAppraisalReview.selectedYrEmployeeAppraisalReview?._id === _id) {
                    resolve(reduxState.yrEmployeeAppraisalReview.selectedYrEmployeeAppraisalReview);
                    return;
                }
                client
                    .service('yrEmployeeAppraisalReview')
                    .get(_id)
                    .then((res) => {
                        this.selectYrEmployeeAppraisalReview(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.debug('Failed to get yrEmployeeAppraisalReview', error);
                        dispatch.toast.alert({ type: 'error', title: 'YrEmployeeAppraisalReview', message: 'Failed to get yrEmployeeAppraisalReview' });
                        reject(error);
                    });
            });
        },
        setOneYrEmployeeAppraisalReview(_id, reduxState) {
            if (reduxState.yrEmployeeAppraisalReview.selectedYrEmployeeAppraisalReview?._id === _id) {
              return;
            }
            client
              .service("yrEmployeeAppraisalReview")
              .get(_id)
              .then((res) => {
                this.selectYrEmployeeAppraisalReview(res);
              })
              .catch((error) => {
                console.debug("Failed to set YrEmployeeAppraisalReview", error);
                dispatch.toast.alert({
                  type: "error",
                  title: "YrEmployeeAppraisalReview",
                  message: "Failed to set yrEmployeeAppraisalReview",
                });
              });
          },
    })
};