import client from '../services/restClient';

export const yrEmployeeKPIRateRange = {
    state: {
        selectedYrEmployeeKPIRateRange: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectYrEmployeeKPIRateRange(state, yrEmployeeKPIRateRange) {
            let toReturn = { ...state, selectedYrEmployeeKPIRateRange: yrEmployeeKPIRateRange };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE YrEmployeeKPIRateRange ////
        ///////////////////////////
        async getOneYrEmployeeKPIRateRange(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.yrEmployeeKPIRateRange.selectedYrEmployeeKPIRateRange?._id === _id) {
                    resolve(reduxState.yrEmployeeKPIRateRange.selectedYrEmployeeKPIRateRange);
                    return;
                }
                client
                    .service('yrEmployeeKPIRateRange')
                    .get(_id)
                    .then((res) => {
                        this.selectYrEmployeeKPIRateRange(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.debug('Failed to get yrEmployeeKPIRateRange', error);
                        dispatch.toast.alert({ type: 'error', title: 'YrEmployeeKPIRateRange', message: 'Failed to get yrEmployeeKPIRateRange' });
                        reject(error);
                    });
            });
        },
        setOneYrEmployeeKPIRateRange(_id, reduxState) {
            if (reduxState.yrEmployeeKPIRateRange.selectedYrEmployeeKPIRateRange?._id === _id) {
              return;
            }
            client
              .service("yrEmployeeKPIRateRange")
              .get(_id)
              .then((res) => {
                this.selectYrEmployeeKPIRateRange(res);
              })
              .catch((error) => {
                console.debug("Failed to set YrEmployeeKPIRateRange", error);
                dispatch.toast.alert({
                  type: "error",
                  title: "YrEmployeeKPIRateRange",
                  message: "Failed to set yrEmployeeKPIRateRange",
                });
              });
          },
    })
};