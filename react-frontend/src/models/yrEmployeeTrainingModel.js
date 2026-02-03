import client from '../services/restClient';

export const yrEmployeeTraining = {
    state: {
        selectedYrEmployeeTraining: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectYrEmployeeTraining(state, yrEmployeeTraining) {
            let toReturn = { ...state, selectedYrEmployeeTraining: yrEmployeeTraining };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE YrEmployeeTraining ////
        ///////////////////////////
        async getOneYrEmployeeTraining(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.yrEmployeeTraining.selectedYrEmployeeTraining?._id === _id) {
                    resolve(reduxState.yrEmployeeTraining.selectedYrEmployeeTraining);
                    return;
                }
                client
                    .service('yrEmployeeTraining')
                    .get(_id)
                    .then((res) => {
                        this.selectYrEmployeeTraining(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.debug('Failed to get yrEmployeeTraining', error);
                        dispatch.toast.alert({ type: 'error', title: 'YrEmployeeTraining', message: 'Failed to get yrEmployeeTraining' });
                        reject(error);
                    });
            });
        },
        setOneYrEmployeeTraining(_id, reduxState) {
            if (reduxState.yrEmployeeTraining.selectedYrEmployeeTraining?._id === _id) {
              return;
            }
            client
              .service("yrEmployeeTraining")
              .get(_id)
              .then((res) => {
                this.selectYrEmployeeTraining(res);
              })
              .catch((error) => {
                console.debug("Failed to set YrEmployeeTraining", error);
                dispatch.toast.alert({
                  type: "error",
                  title: "YrEmployeeTraining",
                  message: "Failed to set yrEmployeeTraining",
                });
              });
          },
    })
};