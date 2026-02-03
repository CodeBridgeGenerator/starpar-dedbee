import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const YrEmployeeKRAScoreCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.appraisalID)) {
                error["appraisalID"] = ` Appraisal_ I D field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.secKPIID)) {
                error["secKPIID"] = ` Sec K P I_ I D field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            appraisalID: _entity?.appraisalID,secKPIID: _entity?.secKPIID,weight: _entity?.weight,score: _entity?.score,rate: _entity?.rate,weightedRate: _entity?.weightedRate,target: _entity?.target,kRA: _entity?.kRA,kPIGoal: _entity?.kPIGoal,unitMeasurement: _entity?.unitMeasurement,sortOrder: _entity?.sortOrder,balancedScoreCard: _entity?.balancedScoreCard,importanceRelevance: _entity?.importanceRelevance,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("yrEmployeeKRAScore").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Yr Employee K R A Score created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Yr Employee K R A Score" });
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
        <Dialog header="Create Yr Employee K R A Score" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="yrEmployeeKRAScore-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="appraisalID"> Appraisal_ I D:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["appraisalID"]) ? (
              <p className="m-0" key="error-appraisalID">
                {error["appraisalID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="secKPIID"> Sec K P I_ I D:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["secKPIID"]) ? (
              <p className="m-0" key="error-secKPIID">
                {error["secKPIID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="weight">Weight:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["weight"]) ? (
              <p className="m-0" key="error-weight">
                {error["weight"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="score"> Score:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["score"]) ? (
              <p className="m-0" key="error-score">
                {error["score"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="rate"> Rate:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["rate"]) ? (
              <p className="m-0" key="error-rate">
                {error["rate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="weightedRate">Weighted Rate:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["weightedRate"]) ? (
              <p className="m-0" key="error-weightedRate">
                {error["weightedRate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="target"> Target:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["target"]) ? (
              <p className="m-0" key="error-target">
                {error["target"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="kRA"> K R A:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["kRA"]) ? (
              <p className="m-0" key="error-kRA">
                {error["kRA"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="kPIGoal"> K P I Goal:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["kPIGoal"]) ? (
              <p className="m-0" key="error-kPIGoal">
                {error["kPIGoal"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="unitMeasurement"> Unit Measurement:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["unitMeasurement"]) ? (
              <p className="m-0" key="error-unitMeasurement">
                {error["unitMeasurement"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sortOrder"> Sort Order:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sortOrder"]) ? (
              <p className="m-0" key="error-sortOrder">
                {error["sortOrder"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="balancedScoreCard"> Balanced Score Card:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["balancedScoreCard"]) ? (
              <p className="m-0" key="error-balancedScoreCard">
                {error["balancedScoreCard"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="importanceRelevance"> Importance Relevance:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["importanceRelevance"]) ? (
              <p className="m-0" key="error-importanceRelevance">
                {error["importanceRelevance"]}
              </p>
            ) : null}
          </small>
            </div>
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

export default connect(mapState, mapDispatch)(YrEmployeeKRAScoreCreateDialogComponent);
