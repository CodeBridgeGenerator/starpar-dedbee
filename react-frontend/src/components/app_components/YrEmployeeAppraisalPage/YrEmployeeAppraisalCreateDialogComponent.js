import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";


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

const YrEmployeeAppraisalCreateDialogComponent = (props) => {
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
          
            if (_.isEmpty(_entity?.employeeNo)) {
                error["employeeNo"] = ` Employee_ No field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.fYear)) {
                error["fYear"] = ` F Year field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.startDate)) {
                error["startDate"] = ` Start Date field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.endDate)) {
                error["endDate"] = ` End Date field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            employeeNo: _entity?.employeeNo,staffName: _entity?.staffName,fYear: _entity?.fYear,startDate: _entity?.startDate,endDate: _entity?.endDate,kRAScore: _entity?.kRAScore,weightedKRAScore: _entity?.weightedKRAScore,competencyScore: _entity?.competencyScore,weightedCompetencyScore: _entity?.weightedCompetencyScore,demeritScore: _entity?.demeritScore,totalScore: _entity?.totalScore,finalScore: _entity?.finalScore,empComment: _entity?.empComment,mngComment: _entity?.mngComment,mngSuperiorComment: _entity?.mngSuperiorComment,managerEmpNO: _entity?.managerEmpNO,managerName: _entity?.managerName,kRAWeight: _entity?.kRAWeight,competencyWeight: _entity?.competencyWeight,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("yrEmployeeAppraisal").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Yr Employee Appraisal created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Yr Employee Appraisal" });
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
        <Dialog header="Create Yr Employee Appraisal" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="yrEmployeeAppraisal-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="employeeNo"> Employee_ No:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["employeeNo"]) ? (
              <p className="m-0" key="error-employeeNo">
                {error["employeeNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="staffName"> Staff Name:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["staffName"]) ? (
              <p className="m-0" key="error-staffName">
                {error["staffName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="fYear"> F Year:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fYear"]) ? (
              <p className="m-0" key="error-fYear">
                {error["fYear"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="startDate"> Start Date:</label>
                <Calendar id="startDate"  value={_entity?.startDate ? new Date(_entity?.startDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("startDate", new Date(e.value))} showIcon showButtonBar  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["startDate"]) ? (
              <p className="m-0" key="error-startDate">
                {error["startDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="endDate"> End Date:</label>
                <Calendar id="endDate"  value={_entity?.endDate ? new Date(_entity?.endDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("endDate", new Date(e.value))} showIcon showButtonBar  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["endDate"]) ? (
              <p className="m-0" key="error-endDate">
                {error["endDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="kRAScore"> K R A Score:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["kRAScore"]) ? (
              <p className="m-0" key="error-kRAScore">
                {error["kRAScore"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="weightedKRAScore"> Weighted K R A Score:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["weightedKRAScore"]) ? (
              <p className="m-0" key="error-weightedKRAScore">
                {error["weightedKRAScore"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="competencyScore"> Competency Score:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["competencyScore"]) ? (
              <p className="m-0" key="error-competencyScore">
                {error["competencyScore"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="weightedCompetencyScore"> Weighted Competency Score:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["weightedCompetencyScore"]) ? (
              <p className="m-0" key="error-weightedCompetencyScore">
                {error["weightedCompetencyScore"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="demeritScore"> Demerit Score:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["demeritScore"]) ? (
              <p className="m-0" key="error-demeritScore">
                {error["demeritScore"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalScore"> Total Score:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalScore"]) ? (
              <p className="m-0" key="error-totalScore">
                {error["totalScore"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="finalScore"> Final Score:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["finalScore"]) ? (
              <p className="m-0" key="error-finalScore">
                {error["finalScore"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="empComment"> Emp_ Comment:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["empComment"]) ? (
              <p className="m-0" key="error-empComment">
                {error["empComment"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="mngComment"> Mng_ Comment:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["mngComment"]) ? (
              <p className="m-0" key="error-mngComment">
                {error["mngComment"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="mngSuperiorComment"> Mng Superior_ Comment:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["mngSuperiorComment"]) ? (
              <p className="m-0" key="error-mngSuperiorComment">
                {error["mngSuperiorComment"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="managerEmpNO"> Manager Emp N O:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["managerEmpNO"]) ? (
              <p className="m-0" key="error-managerEmpNO">
                {error["managerEmpNO"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="managerName"> Manager Name:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["managerName"]) ? (
              <p className="m-0" key="error-managerName">
                {error["managerName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="kRAWeight"> K R A Weight:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["kRAWeight"]) ? (
              <p className="m-0" key="error-kRAWeight">
                {error["kRAWeight"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="competencyWeight"> Competency Weight:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["competencyWeight"]) ? (
              <p className="m-0" key="error-competencyWeight">
                {error["competencyWeight"]}
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

export default connect(mapState, mapDispatch)(YrEmployeeAppraisalCreateDialogComponent);
