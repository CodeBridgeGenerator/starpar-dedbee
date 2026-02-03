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

const ScoreConfigEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [parSessionId, setParSessionId] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount parSession
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

    const onSave = async () => {
        let _data = {
            parSessionId: _entity?.parSessionId?._id,
empGradeCode: _entity?.empGradeCode,
kpiWeight: _entity?.kpiWeight,
competencyWeight: _entity?.competencyWeight,
demeritWeight: _entity?.demeritWeight,
meritPointRule: _entity?.meritPointRule,
ratingScaleMax: _entity?.ratingScaleMax,
        };

        setLoading(true);
        try {
            
        await client.service("scoreConfig").patch(_entity._id, _data);
        const eagerResult = await client
            .service("scoreConfig")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "parSessionId",
                    service : "parSession",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info scoreConfig updated successfully" });
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

    const parSessionIdOptions = parSessionId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Score Config" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="scoreConfig-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parSessionId">ParSessionId:</label>
                <Dropdown id="parSessionId" value={_entity?.parSessionId?._id} optionLabel="name" optionValue="value" options={parSessionIdOptions} onChange={(e) => setValByKey("parSessionId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parSessionId"]) && (
              <p className="m-0" key="error-parSessionId">
                {error["parSessionId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="empGradeCode">EmpGradeCode:</label>
                <InputText id="empGradeCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.empGradeCode} onChange={(e) => setValByKey("empGradeCode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["empGradeCode"]) && (
              <p className="m-0" key="error-empGradeCode">
                {error["empGradeCode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="kpiWeight">KpiWeight:</label>
                <InputText id="kpiWeight" className="w-full mb-3 p-inputtext-sm" value={_entity?.kpiWeight} onChange={(e) => setValByKey("kpiWeight", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["kpiWeight"]) && (
              <p className="m-0" key="error-kpiWeight">
                {error["kpiWeight"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="competencyWeight">CompetencyWeight:</label>
                <InputText id="competencyWeight" className="w-full mb-3 p-inputtext-sm" value={_entity?.competencyWeight} onChange={(e) => setValByKey("competencyWeight", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["competencyWeight"]) && (
              <p className="m-0" key="error-competencyWeight">
                {error["competencyWeight"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="demeritWeight">DemeritWeight:</label>
                <InputText id="demeritWeight" className="w-full mb-3 p-inputtext-sm" value={_entity?.demeritWeight} onChange={(e) => setValByKey("demeritWeight", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["demeritWeight"]) && (
              <p className="m-0" key="error-demeritWeight">
                {error["demeritWeight"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="meritPointRule">MeritPointRule:</label>
                <InputText id="meritPointRule" className="w-full mb-3 p-inputtext-sm" value={_entity?.meritPointRule} onChange={(e) => setValByKey("meritPointRule", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["meritPointRule"]) && (
              <p className="m-0" key="error-meritPointRule">
                {error["meritPointRule"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ratingScaleMax">RatingScaleMax:</label>
                <InputText id="ratingScaleMax" className="w-full mb-3 p-inputtext-sm" value={_entity?.ratingScaleMax} onChange={(e) => setValByKey("ratingScaleMax", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ratingScaleMax"]) && (
              <p className="m-0" key="error-ratingScaleMax">
                {error["ratingScaleMax"]}
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

export default connect(mapState, mapDispatch)(ScoreConfigEditDialogComponent);
