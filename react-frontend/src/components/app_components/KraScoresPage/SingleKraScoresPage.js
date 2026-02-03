import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";


const SingleKraScoresPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [parAppraisersId, setParAppraisersId] = useState([]);
const [kpi, setKpi] = useState([]);
const [appraisalId, setAppraisalId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("kraScores")
            .get(urlParams.singleKraScoresId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"parAppraisersId","kpi","appraisalId"] }})
            .then((res) => {
                set_entity(res || {});
                const parAppraisersId = Array.isArray(res.parAppraisersId)
            ? res.parAppraisersId.map((elem) => ({ _id: elem._id, appraiserEmpNo: elem.appraiserEmpNo }))
            : res.parAppraisersId
                ? [{ _id: res.parAppraisersId._id, appraiserEmpNo: res.parAppraisersId.appraiserEmpNo }]
                : [];
        setParAppraisersId(parAppraisersId);
const kpi = Array.isArray(res.kpi)
            ? res.kpi.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.kpi
                ? [{ _id: res.kpi._id, name: res.kpi.name }]
                : [];
        setKpi(kpi);
const appraisalId = Array.isArray(res.appraisalId)
            ? res.appraisalId.map((elem) => ({ _id: elem._id, employeeNo: elem.employeeNo }))
            : res.appraisalId
                ? [{ _id: res.appraisalId._id, employeeNo: res.appraisalId.employeeNo }]
                : [];
        setAppraisalId(appraisalId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "KraScores", type: "error", message: error.message || "Failed get kraScores" });
            });
    }, [props,urlParams.singleKraScoresId]);


    const goBack = () => {
        navigate("/kraScores");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">KraScores</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>kraScores/{urlParams.singleKraScoresId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">ActualAchievement</label><p className="m-0 ml-3" >{Number(_entity?.actualAchievement)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Rate</label><p className="m-0 ml-3" >{Number(_entity?.rate)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">WeightedRate</label><p className="m-0 ml-3" >{Number(_entity?.weightedRate)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">score</label><p className="m-0 ml-3" >{Number(_entity?.score)}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">ParAppraisersId</label>
                    {parAppraisersId.map((elem) => (
                        <Link key={elem._id} to={`/parSessionAppraisers/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.appraiserEmpNo}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">KPI</label>
                    {kpi.map((elem) => (
                        <Link key={elem._id} to={`/masterKpi/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">AppraisalId</label>
                    {appraisalId.map((elem) => (
                        <Link key={elem._id} to={`/appraisals/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.employeeNo}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      


      <CommentsSection
        recordId={urlParams.singleKraScoresId}
        user={props.user}
        alert={props.alert}
        serviceName="kraScores"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleKraScoresPage);
