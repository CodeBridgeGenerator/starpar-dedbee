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

import MasterKpiPage from "../MasterKpiPage/MasterKpiPage";

const SingleMasterKraPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [departmentId, setDepartmentId] = useState([]);
const [parSessionId, setParSessionId] = useState([]);
const [balancedScorecard, setBalancedScorecard] = useState([]);
const [sectionId, setSectionId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("masterKra")
            .get(urlParams.singleMasterKraId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"departmentId","parSessionId","balancedScorecard","sectionId"] }})
            .then((res) => {
                set_entity(res || {});
                const departmentId = Array.isArray(res.departmentId)
            ? res.departmentId.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.departmentId
                ? [{ _id: res.departmentId._id, name: res.departmentId.name }]
                : [];
        setDepartmentId(departmentId);
const parSessionId = Array.isArray(res.parSessionId)
            ? res.parSessionId.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.parSessionId
                ? [{ _id: res.parSessionId._id, name: res.parSessionId.name }]
                : [];
        setParSessionId(parSessionId);
const balancedScorecard = Array.isArray(res.balancedScorecard)
            ? res.balancedScorecard.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.balancedScorecard
                ? [{ _id: res.balancedScorecard._id, name: res.balancedScorecard.name }]
                : [];
        setBalancedScorecard(balancedScorecard);
const sectionId = Array.isArray(res.sectionId)
            ? res.sectionId.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.sectionId
                ? [{ _id: res.sectionId._id, name: res.sectionId.name }]
                : [];
        setSectionId(sectionId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "MasterKra", type: "error", message: error.message || "Failed get masterKra" });
            });
    }, [props,urlParams.singleMasterKraId]);


    const goBack = () => {
        navigate("/masterKra");
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
                    <h3 className="m-0">Master KRA</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>masterKra/{urlParams.singleMasterKraId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">KPI</label><p className="m-0 ml-3" >{_entity?.kpi}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">WEIGHT (%)</label><p className="m-0 ml-3" >{Number(_entity?.weight)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Target</label><p className="m-0 ml-3" >{Number(_entity?.target)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Actual Achievement</label><p className="m-0 ml-3" >{Number(_entity?.actualAchievement)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Rate</label><p className="m-0 ml-3" >{Number(_entity?.rate)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Weighted Rate</label><p className="m-0 ml-3" >{Number(_entity?.weightedRate)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Name</label><p className="m-0 ml-3" >{_entity?.name}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">DepartmentId</label>
                    {departmentId.map((elem) => (
                        <Link key={elem._id} to={`/departments/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">ParSessionId</label>
                    {parSessionId.map((elem) => (
                        <Link key={elem._id} to={`/parSession/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Balanced Scorecard</label>
                    {balancedScorecard.map((elem) => (
                        <Link key={elem._id} to={`/masterBsc/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">SectionId</label>
                    {sectionId.map((elem) => (
                        <Link key={elem._id} to={`/sections/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      
    <div className="col-12 mt-2">
        <TabView>
        
                    <TabPanel header="Master Kpi" leftIcon="pi pi-building-columns mr-2">
                        <MasterKpiPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleMasterKraId}
        user={props.user}
        alert={props.alert}
        serviceName="masterKra"
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

export default connect(mapState, mapDispatch)(SingleMasterKraPage);
