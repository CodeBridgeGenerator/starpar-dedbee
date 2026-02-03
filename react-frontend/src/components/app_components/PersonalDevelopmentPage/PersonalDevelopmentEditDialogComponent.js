/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
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

const PersonalDevelopmentEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            appraiseeId: _entity?.appraiseeId,
strengthsAndAreasOfConcernIdentified: _entity?.strengthsAndAreasOfConcernIdentified,
specialAchievementsForThePeriodUnderReview: _entity?.specialAchievementsForThePeriodUnderReview,
        };

        setLoading(true);
        try {
            
        const result = await client.service("personalDevelopment").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info personalDevelopment updated successfully" });
        props.onEditResult(result);
        
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

    

    return (
        <Dialog header="Edit Personal Development" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="personalDevelopment-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="appraiseeId">AppraiseeId:</label>
                <InputNumber id="appraiseeId" className="w-full mb-3 p-inputtext-sm" value={_entity?.appraiseeId} onChange={(e) => setValByKey("appraiseeId", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["appraiseeId"]) && (
              <p className="m-0" key="error-appraiseeId">
                {error["appraiseeId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="strengthsAndAreasOfConcernIdentified">Strengths and Areas of Concern Identified:</label>
                <InputText id="strengthsAndAreasOfConcernIdentified" className="w-full mb-3 p-inputtext-sm" value={_entity?.strengthsAndAreasOfConcernIdentified} onChange={(e) => setValByKey("strengthsAndAreasOfConcernIdentified", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["strengthsAndAreasOfConcernIdentified"]) && (
              <p className="m-0" key="error-strengthsAndAreasOfConcernIdentified">
                {error["strengthsAndAreasOfConcernIdentified"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="specialAchievementsForThePeriodUnderReview">Special Achievements for the Period Under Review:</label>
                <InputText id="specialAchievementsForThePeriodUnderReview" className="w-full mb-3 p-inputtext-sm" value={_entity?.specialAchievementsForThePeriodUnderReview} onChange={(e) => setValByKey("specialAchievementsForThePeriodUnderReview", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["specialAchievementsForThePeriodUnderReview"]) && (
              <p className="m-0" key="error-specialAchievementsForThePeriodUnderReview">
                {error["specialAchievementsForThePeriodUnderReview"]}
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

export default connect(mapState, mapDispatch)(PersonalDevelopmentEditDialogComponent);
