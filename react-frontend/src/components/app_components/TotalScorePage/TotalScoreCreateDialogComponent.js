import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";


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

const TotalScoreCreateDialogComponent = (props) => {
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
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            parId: _entity?.parId,appraisorId: _entity?.appraisorId,appraiseeId: _entity?.appraiseeId,description: _entity?.description,rate: _entity?.rate,weight: _entity?.weight,weightedRate: _entity?.weightedRate,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("totalScore").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Total Score created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Total Score" });
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
        <Dialog header="Create Total Score" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="totalScore-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parId">PARId:</label>
                <InputNumber id="parId" className="w-full mb-3 p-inputtext-sm" value={_entity?.parId} onChange={(e) => setValByKey("parId", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parId"]) ? (
              <p className="m-0" key="error-parId">
                {error["parId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="appraisorId">AppraisorId:</label>
                <InputNumber id="appraisorId" className="w-full mb-3 p-inputtext-sm" value={_entity?.appraisorId} onChange={(e) => setValByKey("appraisorId", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["appraisorId"]) ? (
              <p className="m-0" key="error-appraisorId">
                {error["appraisorId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="appraiseeId">AppraiseeId:</label>
                <InputNumber id="appraiseeId" className="w-full mb-3 p-inputtext-sm" value={_entity?.appraiseeId} onChange={(e) => setValByKey("appraiseeId", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["appraiseeId"]) ? (
              <p className="m-0" key="error-appraiseeId">
                {error["appraiseeId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputText id="description" className="w-full mb-3 p-inputtext-sm" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) ? (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="rate">Rate:</label>
                <InputNumber id="rate" className="w-full mb-3 p-inputtext-sm" value={_entity?.rate} onChange={(e) => setValByKey("rate", e.value)}  />
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
                <label htmlFor="weight">Weight:</label>
                <InputNumber id="weight" className="w-full mb-3 p-inputtext-sm" value={_entity?.weight} onChange={(e) => setValByKey("weight", e.value)}  />
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
                <label htmlFor="weightedRate">Weighted Rate:</label>
                <InputNumber id="weightedRate" className="w-full mb-3 p-inputtext-sm" value={_entity?.weightedRate} onChange={(e) => setValByKey("weightedRate", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["weightedRate"]) ? (
              <p className="m-0" key="error-weightedRate">
                {error["weightedRate"]}
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

export default connect(mapState, mapDispatch)(TotalScoreCreateDialogComponent);
