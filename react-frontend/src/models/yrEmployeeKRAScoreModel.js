import client from '../services/restClient';

export const yrEmployeeKRAScore = {
    state: {
        selectedYrEmployeeKRAScore: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectYrEmployeeKRAScore(state, yrEmployeeKRAScore) {
            let toReturn = { ...state, selectedYrEmployeeKRAScore: yrEmployeeKRAScore };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE YrEmployeeKRAScore ////
        ///////////////////////////
        async getOneYrEmployeeKRAScore(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.yrEmployeeKRAScore.selectedYrEmployeeKRAScore?._id === _id) {
                    resolve(reduxState.yrEmployeeKRAScore.selectedYrEmployeeKRAScore);
                    return;
                }
                client
                    .service('yrEmployeeKRAScore')
                    .get(_id)
                    .then((res) => {
                        this.selectYrEmployeeKRAScore(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.debug('Failed to get yrEmployeeKRAScore', error);
                        dispatch.toast.alert({ type: 'error', title: 'YrEmployeeKRAScore', message: 'Failed to get yrEmployeeKRAScore' });
                        reject(error);
                    });
            });
        },
        setOneYrEmployeeKRAScore(_id, reduxState) {
            if (reduxState.yrEmployeeKRAScore.selectedYrEmployeeKRAScore?._id === _id) {
              return;
            }
            client
              .service("yrEmployeeKRAScore")
              .get(_id)
              .then((res) => {
                this.selectYrEmployeeKRAScore(res);
              })
              .catch((error) => {
                console.debug("Failed to set YrEmployeeKRAScore", error);
                dispatch.toast.alert({
                  type: "error",
                  title: "YrEmployeeKRAScore",
                  message: "Failed to set yrEmployeeKRAScore",
                });
              });
          },
    })
};