/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';


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

const CompetenciesScoresEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [parAppraisersId, setParAppraisersId] = useState([])
const [competency, setCompetency] = useState([])
const [appraisalId, setAppraisalId] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount parSessionAppraisers
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
                    //on mount masterCompetencies
                    client
                        .service("masterCompetencies")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMasterCompetenciesId } })
                        .then((res) => {
                            setCompetency(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "MasterCompetencies", type: "error", message: error.message || "Failed get masterCompetencies" });
                        });
                }, []);
 useEffect(() => {
                    //on mount appraisals
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

    const onSave = async () => {
        let _data = {
            parAppraisersId: _entity?.parAppraisersId?._id,
competency: _entity?.competency?._id,
rate: _entity?.rate,
weightedRate: _entity?.weightedRate,
remarks: _entity?.remarks,
appraisalId: _entity?.appraisalId?._id,
        };

        setLoading(true);
        try {
            
        await client.service("competenciesScores").patch(_entity._id, _data);
        const eagerResult = await client
            .service("competenciesScores")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "parAppraisersId",
                    service : "parSessionAppraisers",
                    select:["appraiserEmpNo"]},{
                    path : "competency",
                    service : "masterCompetencies",
                    select:["name"]},{
                    path : "appraisalId",
                    service : "appraisals",
                    select:["employeeNo"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info competenciesScores updated successfully" });
        props.onEditResult(eagerResult.data[0]);
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

    const parAppraisersIdOptions = parAppraisersId.map((elem) => ({ name: elem.name, value: elem.value }));
const competencyOptions = competency.map((elem) => ({ name: elem.name, value: elem.value }));
const appraisalIdOptions = appraisalId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit CompetenciesScores" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="competenciesScores-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parAppraisersId">ParAppraisersId:</label>
                <Dropdown id="parAppraisersId" value={_entity?.parAppraisersId?._id} optionLabel="name" optionValue="value" options={parAppraisersIdOptions} onChange={(e) => setValByKey("parAppraisersId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parAppraisersId"]) && (
              <p className="m-0" key="error-parAppraisersId">
                {error["parAppraisersId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="competency">competency:</label>
                <Dropdown id="competency" value={_entity?.competency?._id} optionLabel="name" optionValue="value" options={competencyOptions} onChange={(e) => setValByKey("competency", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["competency"]) && (
              <p className="m-0" key="error-competency">
                {error["competency"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="rate">Rate:</label>
                <InputNumber id="rate" className="w-full mb-3 p-inputtext-sm" value={_entity?.rate} onChange={(e) => setValByKey("rate", e.value)}  useGrouping={false}/>
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
                <label htmlFor="weightedRate">WeightedRate:</label>
                <InputNumber id="weightedRate" className="w-full mb-3 p-inputtext-sm" value={_entity?.weightedRate} onChange={(e) => setValByKey("weightedRate", e.value)}  useGrouping={false}/>
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
                <label htmlFor="remarks">Remarks:</label>
                <InputText id="remarks" className="w-full mb-3 p-inputtext-sm" value={_entity?.remarks} onChange={(e) => setValByKey("remarks", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["remarks"]) && (
              <p className="m-0" key="error-remarks">
                {error["remarks"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="appraisalId">AppraisalId:</label>
                <Dropdown id="appraisalId" value={_entity?.appraisalId?._id} optionLabel="name" optionValue="value" options={appraisalIdOptions} onChange={(e) => setValByKey("appraisalId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["appraisalId"]) && (
              <p className="m-0" key="error-appraisalId">
                {error["appraisalId"]}
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

export default connect(mapState, mapDispatch)(CompetenciesScoresEditDialogComponent);
