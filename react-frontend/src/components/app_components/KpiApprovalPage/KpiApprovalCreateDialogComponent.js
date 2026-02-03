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
import { Checkbox } from "primereact/checkbox";


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

const KpiApprovalCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {approved: false};
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
            parId: _entity?.parId,appraisorId: _entity?.appraisorId,appraiseeId: _entity?.appraiseeId,kpi: _entity?.kpi,approved: _entity?.approved || false,approvedDate: _entity?.approvedDate,kpiSetDate: _entity?.kpiSetDate,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("kpiApproval").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info KPI Approval created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in KPI Approval" });
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
        <Dialog header="Create KPI Approval" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="kpiApproval-create-dialog-component">
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
                <label htmlFor="kpi">KPI:</label>
                <InputText id="kpi" className="w-full mb-3 p-inputtext-sm" value={_entity?.kpi} onChange={(e) => setValByKey("kpi", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["kpi"]) ? (
              <p className="m-0" key="error-kpi">
                {error["kpi"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="approved">Approved:</label>
                <Checkbox id="approved" className="ml-3" checked={_entity?.approved} onChange={(e) => setValByKey("approved", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["approved"]) ? (
              <p className="m-0" key="error-approved">
                {error["approved"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="approvedDate">Approved Date:</label>
                <InputNumber id="approvedDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.approvedDate} onChange={(e) => setValByKey("approvedDate", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["approvedDate"]) ? (
              <p className="m-0" key="error-approvedDate">
                {error["approvedDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="kpiSetDate">KPI Set Date:</label>
                <InputNumber id="kpiSetDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.kpiSetDate} onChange={(e) => setValByKey("kpiSetDate", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["kpiSetDate"]) ? (
              <p className="m-0" key="error-kpiSetDate">
                {error["kpiSetDate"]}
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

export default connect(mapState, mapDispatch)(KpiApprovalCreateDialogComponent);
