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

const MasterKraCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [departmentId, setDepartmentId] = useState([])
const [parSessionId, setParSessionId] = useState([])
const [balancedScorecard, setBalancedScorecard] = useState([])
const [sectionId, setSectionId] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [departmentId,parSessionId,balancedScorecard,sectionId], setError);
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
            departmentId: _entity?.departmentId?._id,parSessionId: _entity?.parSessionId?._id,balancedScorecard: _entity?.balancedScorecard?._id,kpi: _entity?.kpi,weight: _entity?.weight,target: _entity?.target,actualAchievement: _entity?.actualAchievement,rate: _entity?.rate,weightedRate: _entity?.weightedRate,name: _entity?.name,sectionId: _entity?.sectionId?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("masterKra").create(_data);
        const eagerResult = await client
            .service("masterKra")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "departmentId",
                    service : "departments",
                    select:["name"]},{
                    path : "parSessionId",
                    service : "parSession",
                    select:["name"]},{
                    path : "balancedScorecard",
                    service : "masterBsc",
                    select:["name"]},{
                    path : "sectionId",
                    service : "sections",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Master KRA updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Master KRA" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount departments
                    client
                        .service("departments")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleDepartmentsId } })
                        .then((res) => {
                            setDepartmentId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Departments", type: "error", message: error.message || "Failed get departments" });
                        });
                }, []);

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
                    // on mount masterBsc
                    client
                        .service("masterBsc")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMasterBscId } })
                        .then((res) => {
                            setBalancedScorecard(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "MasterBsc", type: "error", message: error.message || "Failed get masterBsc" });
                        });
                }, []);

useEffect(() => {
                    // on mount sections
                    client
                        .service("sections")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleSectionsId } })
                        .then((res) => {
                            setSectionId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
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

    const departmentIdOptions = departmentId.map((elem) => ({ name: elem.name, value: elem.value }));
const parSessionIdOptions = parSessionId.map((elem) => ({ name: elem.name, value: elem.value }));
const balancedScorecardOptions = balancedScorecard.map((elem) => ({ name: elem.name, value: elem.value }));
const sectionIdOptions = sectionId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Master KRA" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="masterKra-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="departmentId">DepartmentId:</label>
                <Dropdown id="departmentId" value={_entity?.departmentId?._id} optionLabel="name" optionValue="value" options={departmentIdOptions} onChange={(e) => setValByKey("departmentId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["departmentId"]) ? (
              <p className="m-0" key="error-departmentId">
                {error["departmentId"]}
              </p>
            ) : null}
          </small>
            </div>
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
                <label htmlFor="balancedScorecard">Balanced Scorecard:</label>
                <Dropdown id="balancedScorecard" value={_entity?.balancedScorecard?._id} optionLabel="name" optionValue="value" options={balancedScorecardOptions} onChange={(e) => setValByKey("balancedScorecard", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["balancedScorecard"]) ? (
              <p className="m-0" key="error-balancedScorecard">
                {error["balancedScorecard"]}
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
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="weight">WEIGHT (%):</label>
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
                <label htmlFor="target">Target:</label>
                <InputNumber id="target" className="w-full mb-3 p-inputtext-sm" value={_entity?.target} onChange={(e) => setValByKey("target", e.value)}  />
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
                <label htmlFor="actualAchievement">Actual Achievement:</label>
                <InputNumber id="actualAchievement" className="w-full mb-3 p-inputtext-sm" value={_entity?.actualAchievement} onChange={(e) => setValByKey("actualAchievement", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["actualAchievement"]) ? (
              <p className="m-0" key="error-actualAchievement">
                {error["actualAchievement"]}
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
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sectionId">SectionId:</label>
                <Dropdown id="sectionId" value={_entity?.sectionId?._id} optionLabel="name" optionValue="value" options={sectionIdOptions} onChange={(e) => setValByKey("sectionId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sectionId"]) ? (
              <p className="m-0" key="error-sectionId">
                {error["sectionId"]}
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

export default connect(mapState, mapDispatch)(MasterKraCreateDialogComponent);
