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
import { Dropdown } from "primereact/dropdown";
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

const AppraisalsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [employeeNo, setEmployeeNo] = useState([])
const [managerEmpNo, setManagerEmpNo] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [employeeNo,managerEmpNo], setError);
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
            appraisalId: _entity?.appraisalId,employeeNo: _entity?.employeeNo?._id,fYear: _entity?.fYear,startDate: _entity?.startDate,endDate: _entity?.endDate,kraScore: _entity?.kraScore,weightedKraScore: _entity?.weightedKraScore,competencyScore: _entity?.competencyScore,weightedCompetencyScore: _entity?.weightedCompetencyScore,demeritScore: _entity?.demeritScore,totalScore: _entity?.totalScore,finalScore: _entity?.finalScore,empComment: _entity?.empComment,mngComment: _entity?.mngComment,mngSuperiorComment: _entity?.mngSuperiorComment,managerEmpNo: _entity?.managerEmpNo?._id,kraWeight: _entity?.kraWeight,competencyWeight: _entity?.competencyWeight,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("appraisals").create(_data);
        const eagerResult = await client
            .service("appraisals")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "employeeNo",
                    service : "employees",
                    select:["empNo"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Appraisals updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Appraisals" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount employees
                    client
                        .service("employees")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleEmployeesId } })
                        .then((res) => {
                            setEmployeeNo(res.data.map((e) => { return { name: e['empNo'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Employees", type: "error", message: error.message || "Failed get employees" });
                        });
                }, []);

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

    const employeeNoOptions = employeeNo.map((elem) => ({ name: elem.name, value: elem.value }));
const managerEmpNoOptions = managerEmpNo.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Appraisals" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="appraisals-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="appraisalId">AppraisalID:</label>
                <InputNumber id="appraisalId" className="w-full mb-3 p-inputtext-sm" value={_entity?.appraisalId} onChange={(e) => setValByKey("appraisalId", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["appraisalId"]) ? (
              <p className="m-0" key="error-appraisalId">
                {error["appraisalId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="employeeNo">EmployeeNo:</label>
                <Dropdown id="employeeNo" value={_entity?.employeeNo?._id} optionLabel="name" optionValue="value" options={employeeNoOptions} onChange={(e) => setValByKey("employeeNo", {_id : e.value})}  />
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
                <label htmlFor="fYear">FYear:</label>
                <InputNumber id="fYear" className="w-full mb-3 p-inputtext-sm" value={_entity?.fYear} onChange={(e) => setValByKey("fYear", e.value)}  />
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
                <label htmlFor="startDate">StartDate:</label>
                <Calendar id="startDate"  value={_entity?.startDate ? new Date(_entity?.startDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("startDate", new Date(e.value))} showIcon showButtonBar  />
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
                <label htmlFor="endDate">EndDate:</label>
                <Calendar id="endDate"  value={_entity?.endDate ? new Date(_entity?.endDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("endDate", new Date(e.value))} showIcon showButtonBar  />
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
                <label htmlFor="kraScore">KraScore:</label>
                <InputNumber id="kraScore" className="w-full mb-3 p-inputtext-sm" value={_entity?.kraScore} onChange={(e) => setValByKey("kraScore", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["kraScore"]) ? (
              <p className="m-0" key="error-kraScore">
                {error["kraScore"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="weightedKraScore">WeightedKRAScore:</label>
                <InputNumber id="weightedKraScore" className="w-full mb-3 p-inputtext-sm" value={_entity?.weightedKraScore} onChange={(e) => setValByKey("weightedKraScore", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["weightedKraScore"]) ? (
              <p className="m-0" key="error-weightedKraScore">
                {error["weightedKraScore"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="competencyScore">CompetencyScore:</label>
                <InputNumber id="competencyScore" className="w-full mb-3 p-inputtext-sm" value={_entity?.competencyScore} onChange={(e) => setValByKey("competencyScore", e.value)}  />
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
                <label htmlFor="weightedCompetencyScore">WeightedCompetencyScore:</label>
                <InputText id="weightedCompetencyScore" className="w-full mb-3 p-inputtext-sm" value={_entity?.weightedCompetencyScore} onChange={(e) => setValByKey("weightedCompetencyScore", e.target.value)}  />
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
                <label htmlFor="demeritScore">DemeritScore:</label>
                <InputNumber id="demeritScore" className="w-full mb-3 p-inputtext-sm" value={_entity?.demeritScore} onChange={(e) => setValByKey("demeritScore", e.value)}  />
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
                <label htmlFor="totalScore">TotalScore:</label>
                <InputNumber id="totalScore" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalScore} onChange={(e) => setValByKey("totalScore", e.value)}  />
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
                <label htmlFor="finalScore">FinalScore:</label>
                <InputNumber id="finalScore" className="w-full mb-3 p-inputtext-sm" value={_entity?.finalScore} onChange={(e) => setValByKey("finalScore", e.value)}  />
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
                <label htmlFor="empComment">EmpComment:</label>
                <InputText id="empComment" className="w-full mb-3 p-inputtext-sm" value={_entity?.empComment} onChange={(e) => setValByKey("empComment", e.target.value)}  />
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
                <label htmlFor="mngComment">MngComment:</label>
                <InputText id="mngComment" className="w-full mb-3 p-inputtext-sm" value={_entity?.mngComment} onChange={(e) => setValByKey("mngComment", e.target.value)}  />
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
                <label htmlFor="mngSuperiorComment">MngSuperiorComment:</label>
                <InputText id="mngSuperiorComment" className="w-full mb-3 p-inputtext-sm" value={_entity?.mngSuperiorComment} onChange={(e) => setValByKey("mngSuperiorComment", e.target.value)}  />
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
                <label htmlFor="managerEmpNo">ManagerEmpNO:</label>
                <Dropdown id="managerEmpNo" value={_entity?.managerEmpNo?._id} optionLabel="name" optionValue="value" options={managerEmpNoOptions} onChange={(e) => setValByKey("managerEmpNo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["managerEmpNo"]) ? (
              <p className="m-0" key="error-managerEmpNo">
                {error["managerEmpNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="kraWeight">KRAWeight:</label>
                <InputNumber id="kraWeight" className="w-full mb-3 p-inputtext-sm" value={_entity?.kraWeight} onChange={(e) => setValByKey("kraWeight", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["kraWeight"]) ? (
              <p className="m-0" key="error-kraWeight">
                {error["kraWeight"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="competencyWeight">competencyWeight:</label>
                <InputNumber id="competencyWeight" className="w-full mb-3 p-inputtext-sm" value={_entity?.competencyWeight} onChange={(e) => setValByKey("competencyWeight", e.value)}  />
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

export default connect(mapState, mapDispatch)(AppraisalsCreateDialogComponent);
