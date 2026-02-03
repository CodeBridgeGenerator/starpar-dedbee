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

const KraScoresCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [parAppraisersId, setParAppraisersId] = useState([])
const [kpi, setKpi] = useState([])
const [appraisalId, setAppraisalId] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [parAppraisersId,kpi,appraisalId], setError);
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
            parAppraisersId: _entity?.parAppraisersId?._id,kpi: _entity?.kpi?._id,actualAchievement: _entity?.actualAchievement,rate: _entity?.rate,weightedRate: _entity?.weightedRate,score: _entity?.score,appraisalId: _entity?.appraisalId?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("kraScores").create(_data);
        const eagerResult = await client
            .service("kraScores")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "parAppraisersId",
                    service : "parSessionAppraisers",
                    select:["appraiserEmpNo"]},{
                    path : "kpi",
                    service : "masterKpi",
                    select:["name"]},{
                    path : "appraisalId",
                    service : "appraisals",
                    select:["employeeNo"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info KraScores updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in KraScores" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount parSessionAppraisers
                    client
                        .service("parSessionAppraisers")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleParSessionAppraisersId } })
                        .then((res) => {
                            setParAppraisersId(res.data.map((e) => { return { name: e['appraiserEmpNo'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "ParSessionAppraisers", type: "error", message: error.message || "Failed get parSessionAppraisers" });
                        });
                }, []);

useEffect(() => {
                    // on mount masterKpi
                    client
                        .service("masterKpi")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMasterKpiId } })
                        .then((res) => {
                            setKpi(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "MasterKpi", type: "error", message: error.message || "Failed get masterKpi" });
                        });
                }, []);

useEffect(() => {
                    // on mount appraisals
                    client
                        .service("appraisals")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleAppraisalsId } })
                        .then((res) => {
                            setAppraisalId(res.data.map((e) => { return { name: e['employeeNo'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Appraisals", type: "error", message: error.message || "Failed get appraisals" });
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

    const parAppraisersIdOptions = parAppraisersId.map((elem) => ({ name: elem.name, value: elem.value }));
const kpiOptions = kpi.map((elem) => ({ name: elem.name, value: elem.value }));
const appraisalIdOptions = appraisalId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create KraScores" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="kraScores-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parAppraisersId">ParAppraisersId:</label>
                <Dropdown id="parAppraisersId" value={_entity?.parAppraisersId?._id} optionLabel="name" optionValue="value" options={parAppraisersIdOptions} onChange={(e) => setValByKey("parAppraisersId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parAppraisersId"]) ? (
              <p className="m-0" key="error-parAppraisersId">
                {error["parAppraisersId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="kpi">KPI:</label>
                <Dropdown id="kpi" value={_entity?.kpi?._id} optionLabel="name" optionValue="value" options={kpiOptions} onChange={(e) => setValByKey("kpi", {_id : e.value})}  />
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
                <label htmlFor="actualAchievement">ActualAchievement:</label>
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
                <label htmlFor="weightedRate">WeightedRate:</label>
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
                <label htmlFor="score">score:</label>
                <InputNumber id="score" className="w-full mb-3 p-inputtext-sm" value={_entity?.score} onChange={(e) => setValByKey("score", e.value)}  />
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
                <label htmlFor="appraisalId">AppraisalId:</label>
                <Dropdown id="appraisalId" value={_entity?.appraisalId?._id} optionLabel="name" optionValue="value" options={appraisalIdOptions} onChange={(e) => setValByKey("appraisalId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["appraisalId"]) ? (
              <p className="m-0" key="error-appraisalId">
                {error["appraisalId"]}
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

export default connect(mapState, mapDispatch)(KraScoresCreateDialogComponent);
