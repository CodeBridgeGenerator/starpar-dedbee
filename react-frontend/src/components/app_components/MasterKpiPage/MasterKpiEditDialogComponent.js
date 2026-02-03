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

const MasterKpiEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [kra, setKra] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount masterKra
                    client
                        .service("masterKra")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMasterKraId } })
                        .then((res) => {
                            setKra(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "MasterKra", type: "error", message: error.message || "Failed get masterKra" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            kra: _entity?.kra?._id,
name: _entity?.name,
weight: _entity?.weight,
target: _entity?.target,
actualAchievement: _entity?.actualAchievement,
rate: _entity?.rate,
weightedRate: _entity?.weightedRate,
startValue: _entity?.startValue,
endValue: _entity?.endValue,
importanceRelevance: _entity?.importanceRelevance,
sortOrder: _entity?.sortOrder,
unitMeasurement: _entity?.unitMeasurement,
        };

        setLoading(true);
        try {
            
        await client.service("masterKpi").patch(_entity._id, _data);
        const eagerResult = await client
            .service("masterKpi")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "kra",
                    service : "masterKra",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info masterKpi updated successfully" });
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

    const kraOptions = kra.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Master KPI" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="masterKpi-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="kra">KRA:</label>
                <Dropdown id="kra" value={_entity?.kra?._id} optionLabel="name" optionValue="value" options={kraOptions} onChange={(e) => setValByKey("kra", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["kra"]) && (
              <p className="m-0" key="error-kra">
                {error["kra"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) && (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="weight">Weight:</label>
                <InputNumber id="weight" className="w-full mb-3 p-inputtext-sm" value={_entity?.weight} onChange={(e) => setValByKey("weight", e.value)}  useGrouping={false}/>
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
                <label htmlFor="target">Target:</label>
                <InputNumber id="target" className="w-full mb-3 p-inputtext-sm" value={_entity?.target} onChange={(e) => setValByKey("target", e.value)}  useGrouping={false}/>
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
                <label htmlFor="actualAchievement">ActualAchievement:</label>
                <InputNumber id="actualAchievement" className="w-full mb-3 p-inputtext-sm" value={_entity?.actualAchievement} onChange={(e) => setValByKey("actualAchievement", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["actualAchievement"]) && (
              <p className="m-0" key="error-actualAchievement">
                {error["actualAchievement"]}
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
                <InputText id="weightedRate" className="w-full mb-3 p-inputtext-sm" value={_entity?.weightedRate} onChange={(e) => setValByKey("weightedRate", e.target.value)}  />
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
                <label htmlFor="startValue">StartValue:</label>
                <InputNumber id="startValue" className="w-full mb-3 p-inputtext-sm" value={_entity?.startValue} onChange={(e) => setValByKey("startValue", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["startValue"]) && (
              <p className="m-0" key="error-startValue">
                {error["startValue"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="endValue">EndValue:</label>
                <InputText id="endValue" className="w-full mb-3 p-inputtext-sm" value={_entity?.endValue} onChange={(e) => setValByKey("endValue", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["endValue"]) && (
              <p className="m-0" key="error-endValue">
                {error["endValue"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="importanceRelevance">ImportanceRelevance:</label>
                <InputText id="importanceRelevance" className="w-full mb-3 p-inputtext-sm" value={_entity?.importanceRelevance} onChange={(e) => setValByKey("importanceRelevance", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["importanceRelevance"]) && (
              <p className="m-0" key="error-importanceRelevance">
                {error["importanceRelevance"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sortOrder">SortOrder:</label>
                <InputText id="sortOrder" className="w-full mb-3 p-inputtext-sm" value={_entity?.sortOrder} onChange={(e) => setValByKey("sortOrder", e.target.value)}  />
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
                <label htmlFor="unitMeasurement">UnitMeasurement:</label>
                <InputText id="unitMeasurement" className="w-full mb-3 p-inputtext-sm" value={_entity?.unitMeasurement} onChange={(e) => setValByKey("unitMeasurement", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["unitMeasurement"]) && (
              <p className="m-0" key="error-unitMeasurement">
                {error["unitMeasurement"]}
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

export default connect(mapState, mapDispatch)(MasterKpiEditDialogComponent);
