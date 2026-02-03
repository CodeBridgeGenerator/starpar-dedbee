/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const YrEmployeeKRAScoreEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            appraisalID: _entity?.appraisalID,
secKPIID: _entity?.secKPIID,
weight: _entity?.weight,
score: _entity?.score,
rate: _entity?.rate,
weightedRate: _entity?.weightedRate,
target: _entity?.target,
kRA: _entity?.kRA,
kPIGoal: _entity?.kPIGoal,
unitMeasurement: _entity?.unitMeasurement,
sortOrder: _entity?.sortOrder,
balancedScoreCard: _entity?.balancedScoreCard,
importanceRelevance: _entity?.importanceRelevance,
        };

        setLoading(true);
        try {
            
        const result = await client.service("yrEmployeeKRAScore").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info yrEmployeeKRAScore updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Edit Yr Employee K R A Score" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="yrEmployeeKRAScore-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="appraisalID"> Appraisal_ I D:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["appraisalID"]) && (
              <p className="m-0" key="error-appraisalID">
                {error["appraisalID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="secKPIID"> Sec K P I_ I D:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["secKPIID"]) && (
              <p className="m-0" key="error-secKPIID">
                {error["secKPIID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="weight">Weight:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["weight"]) && (
              <p className="m-0" key="error-weight">
                {error["weight"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="score"> Score:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["score"]) && (
              <p className="m-0" key="error-score">
                {error["score"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="rate"> Rate:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["rate"]) && (
              <p className="m-0" key="error-rate">
                {error["rate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="weightedRate">Weighted Rate:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["weightedRate"]) && (
              <p className="m-0" key="error-weightedRate">
                {error["weightedRate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="target"> Target:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["target"]) && (
              <p className="m-0" key="error-target">
                {error["target"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="kRA"> K R A:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["kRA"]) && (
              <p className="m-0" key="error-kRA">
                {error["kRA"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="kPIGoal"> K P I Goal:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["kPIGoal"]) && (
              <p className="m-0" key="error-kPIGoal">
                {error["kPIGoal"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="unitMeasurement"> Unit Measurement:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["unitMeasurement"]) && (
              <p className="m-0" key="error-unitMeasurement">
                {error["unitMeasurement"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sortOrder"> Sort Order:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sortOrder"]) && (
              <p className="m-0" key="error-sortOrder">
                {error["sortOrder"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="balancedScoreCard"> Balanced Score Card:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["balancedScoreCard"]) && (
              <p className="m-0" key="error-balancedScoreCard">
                {error["balancedScoreCard"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="importanceRelevance"> Importance Relevance:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["importanceRelevance"]) && (
              <p className="m-0" key="error-importanceRelevance">
                {error["importanceRelevance"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(YrEmployeeKRAScoreEditDialogComponent);
