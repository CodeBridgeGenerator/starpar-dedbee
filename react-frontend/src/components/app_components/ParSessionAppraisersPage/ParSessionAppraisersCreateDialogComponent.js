import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
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

const ParSessionAppraisersCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [parSessionId, setParSessionId] = useState([])
const [appraiseeEmpNo, setAppraiseeEmpNo] = useState([])
const [appraiserEmpNo, setAppraiserEmpNo] = useState([])
const [department, setDepartment] = useState([])
const [section, setSection] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [parSessionId,appraiseeEmpNo,appraiserEmpNo,department,section], setError);
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
            parSessionId: _entity?.parSessionId?._id,appraiseeEmpNo: _entity?.appraiseeEmpNo?._id,appraiserEmpNo: _entity?.appraiserEmpNo?._id,weightage: _entity?.weightage,department: _entity?.department?._id,section: _entity?.section?._id,appraiserComment: _entity?.appraiserComment,kraScore: _entity?.kraScore,weightedKraScore: _entity?.weightedKraScore,competencyScore: _entity?.competencyScore,weightedCompetencyScore: _entity?.weightedCompetencyScore,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("parSessionAppraisers").create(_data);
        const eagerResult = await client
            .service("parSessionAppraisers")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "parSessionId",
                    service : "parSession",
                    select:["name"]},{
                    path : "appraiseeEmpNo",
                    service : "employees",
                    select:["empNo"]},{
                    path : "department",
                    service : "departments",
                    select:["name"]},{
                    path : "section",
                    service : "sections",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Par Session Appraisers updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Par Session Appraisers" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount parSession
                    client
                        .service("parSession")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleParSessionId } })
                        .then((res) => {
                            setParSessionId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "ParSession", type: "error", message: error.message || "Failed get parSession" });
                        });
                }, []);

useEffect(() => {
                    // on mount employees
                    client
                        .service("employees")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleEmployeesId } })
                        .then((res) => {
                            setAppraiseeEmpNo(res.data.map((e) => { return { name: e['empNo'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Employees", type: "error", message: error.message || "Failed get employees" });
                        });
                }, []);

useEffect(() => {
                    // on mount departments
                    client
                        .service("departments")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleDepartmentsId } })
                        .then((res) => {
                            setDepartment(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Departments", type: "error", message: error.message || "Failed get departments" });
                        });
                }, []);

useEffect(() => {
                    // on mount sections
                    client
                        .service("sections")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleSectionsId } })
                        .then((res) => {
                            setSection(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Sections", type: "error", message: error.message || "Failed get sections" });
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

    const parSessionIdOptions = parSessionId.map((elem) => ({ name: elem.name, value: elem.value }));
const appraiseeEmpNoOptions = appraiseeEmpNo.map((elem) => ({ name: elem.name, value: elem.value }));
const appraiserEmpNoOptions = appraiserEmpNo.map((elem) => ({ name: elem.name, value: elem.value }));
const departmentOptions = department.map((elem) => ({ name: elem.name, value: elem.value }));
const sectionOptions = section.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Par Session Appraisers" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="parSessionAppraisers-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parSessionId">ParSessionId:</label>
                <Dropdown id="parSessionId" value={_entity?.parSessionId?._id} optionLabel="name" optionValue="value" options={parSessionIdOptions} onChange={(e) => setValByKey("parSessionId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parSessionId"]) ? (
              <p className="m-0" key="error-parSessionId">
                {error["parSessionId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="appraiseeEmpNo">AppraiseeEmpNo:</label>
                <Dropdown id="appraiseeEmpNo" value={_entity?.appraiseeEmpNo?._id} optionLabel="name" optionValue="value" options={appraiseeEmpNoOptions} onChange={(e) => setValByKey("appraiseeEmpNo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["appraiseeEmpNo"]) ? (
              <p className="m-0" key="error-appraiseeEmpNo">
                {error["appraiseeEmpNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="appraiserEmpNo">AppraiserEmpNo:</label>
                <Dropdown id="appraiserEmpNo" value={_entity?.appraiserEmpNo?._id} optionLabel="name" optionValue="value" options={appraiserEmpNoOptions} onChange={(e) => setValByKey("appraiserEmpNo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["appraiserEmpNo"]) ? (
              <p className="m-0" key="error-appraiserEmpNo">
                {error["appraiserEmpNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="weightage">Weightage:</label>
                <InputNumber id="weightage" className="w-full mb-3 p-inputtext-sm" value={_entity?.weightage} onChange={(e) => setValByKey("weightage", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["weightage"]) ? (
              <p className="m-0" key="error-weightage">
                {error["weightage"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="department">Department:</label>
                <Dropdown id="department" value={_entity?.department?._id} optionLabel="name" optionValue="value" options={departmentOptions} onChange={(e) => setValByKey("department", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["department"]) ? (
              <p className="m-0" key="error-department">
                {error["department"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="section">Section:</label>
                <Dropdown id="section" value={_entity?.section?._id} optionLabel="name" optionValue="value" options={sectionOptions} onChange={(e) => setValByKey("section", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["section"]) ? (
              <p className="m-0" key="error-section">
                {error["section"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="appraiserComment">AppraiserComment:</label>
                <InputText id="appraiserComment" className="w-full mb-3 p-inputtext-sm" value={_entity?.appraiserComment} onChange={(e) => setValByKey("appraiserComment", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["appraiserComment"]) ? (
              <p className="m-0" key="error-appraiserComment">
                {error["appraiserComment"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="kraScore">KRAScore:</label>
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
                <InputNumber id="weightedCompetencyScore" className="w-full mb-3 p-inputtext-sm" value={_entity?.weightedCompetencyScore} onChange={(e) => setValByKey("weightedCompetencyScore", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["weightedCompetencyScore"]) ? (
              <p className="m-0" key="error-weightedCompetencyScore">
                {error["weightedCompetencyScore"]}
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

export default connect(mapState, mapDispatch)(ParSessionAppraisersCreateDialogComponent);
