import client from '../services/restClient';

export const yrEmployeeAppraisal = {
    state: {
        selectedYrEmployeeAppraisal: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectYrEmployeeAppraisal(state, yrEmployeeAppraisal) {
            let toReturn = { ...state, selectedYrEmployeeAppraisal: yrEmployeeAppraisal };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE YrEmployeeAppraisal ////
        ///////////////////////////
        async getOneYrEmployeeAppraisal(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.yrEmployeeAppraisal.selectedYrEmployeeAppraisal?._id === _id) {
                    resolve(reduxState.yrEmployeeAppraisal.selectedYrEmployeeAppraisal);
                    return;
                }
                client
                    .service('yrEmployeeAppraisal')
                    .get(_id)
                    .then((res) => {
                        this.selectYrEmployeeAppraisal(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.debug('Failed to get yrEmployeeAppraisal', error);
                        dispatch.toast.alert({ type: 'error', title: 'YrEmployeeAppraisal', message: 'Failed to get yrEmployeeAppraisal' });
                        reject(error);
                    });
            });
        },
        setOneYrEmployeeAppraisal(_id, reduxState) {
            if (reduxState.yrEmployeeAppraisal.selectedYrEmployeeAppraisal?._id === _id) {
              return;
            }
            client
              .service("yrEmployeeAppraisal")
              .get(_id)
              .then((res) => {
                this.selectYrEmployeeAppraisal(res);
              })
              .catch((error) => {
                console.debug("Failed to set YrEmployeeAppraisal", error);
                dispatch.toast.alert({
                  type: "error",
                  title: "YrEmployeeAppraisal",
                  message: "Failed to set yrEmployeeAppraisal",
                });
              });
          },
    })
};