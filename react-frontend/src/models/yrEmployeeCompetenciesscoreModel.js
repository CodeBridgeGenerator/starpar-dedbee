import client from '../services/restClient';

export const yrEmployeeCompetenciesscore = {
    state: {
        selectedYrEmployeeCompetenciesscore: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectYrEmployeeCompetenciesscore(state, yrEmployeeCompetenciesscore) {
            let toReturn = { ...state, selectedYrEmployeeCompetenciesscore: yrEmployeeCompetenciesscore };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE YrEmployeeCompetenciesscore ////
        ///////////////////////////
        async getOneYrEmployeeCompetenciesscore(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.yrEmployeeCompetenciesscore.selectedYrEmployeeCompetenciesscore?._id === _id) {
                    resolve(reduxState.yrEmployeeCompetenciesscore.selectedYrEmployeeCompetenciesscore);
                    return;
                }
                client
                    .service('yrEmployeeCompetenciesscore')
                    .get(_id)
                    .then((res) => {
                        this.selectYrEmployeeCompetenciesscore(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.debug('Failed to get yrEmployeeCompetenciesscore', error);
                        dispatch.toast.alert({ type: 'error', title: 'YrEmployeeCompetenciesscore', message: 'Failed to get yrEmployeeCompetenciesscore' });
                        reject(error);
                    });
            });
        },
        setOneYrEmployeeCompetenciesscore(_id, reduxState) {
            if (reduxState.yrEmployeeCompetenciesscore.selectedYrEmployeeCompetenciesscore?._id === _id) {
              return;
            }
            client
              .service("yrEmployeeCompetenciesscore")
              .get(_id)
              .then((res) => {
                this.selectYrEmployeeCompetenciesscore(res);
              })
              .catch((error) => {
                console.debug("Failed to set YrEmployeeCompetenciesscore", error);
                dispatch.toast.alert({
                  type: "error",
                  title: "YrEmployeeCompetenciesscore",
                  message: "Failed to set yrEmployeeCompetenciesscore",
                });
              });
          },
    })
};