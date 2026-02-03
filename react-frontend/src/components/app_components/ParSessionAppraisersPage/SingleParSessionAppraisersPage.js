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

import CompetenciesScoresPage from "../CompetenciesScoresPage/CompetenciesScoresPage";
import KraScoresPage from "../KraScoresPage/KraScoresPage";

const SingleParSessionAppraisersPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [parSessionId, setParSessionId] = useState([]);
const [appraiseeEmpNo, setAppraiseeEmpNo] = useState([]);
const [appraiserEmpNo, setAppraiserEmpNo] = useState([]);
const [department, setDepartment] = useState([]);
const [section, setSection] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("parSessionAppraisers")
            .get(urlParams.singleParSessionAppraisersId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"parSessionId","appraiseeEmpNo","appraiserEmpNo","department","section"] }})
            .then((res) => {
                set_entity(res || {});
                const parSessionId = Array.isArray(res.parSessionId)
            ? res.parSessionId.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.parSessionId
                ? [{ _id: res.parSessionId._id, name: res.parSessionId.name }]
                : [];
        setParSessionId(parSessionId);
const appraiseeEmpNo = Array.isArray(res.appraiseeEmpNo)
            ? res.appraiseeEmpNo.map((elem) => ({ _id: elem._id, empNo: elem.empNo }))
            : res.appraiseeEmpNo
                ? [{ _id: res.appraiseeEmpNo._id, empNo: res.appraiseeEmpNo.empNo }]
                : [];
        setAppraiseeEmpNo(appraiseeEmpNo);
const appraiserEmpNo = Array.isArray(res.appraiserEmpNo)
            ? res.appraiserEmpNo.map((elem) => ({ _id: elem._id, empNo: elem.empNo }))
            : res.appraiserEmpNo
                ? [{ _id: res.appraiserEmpNo._id, empNo: res.appraiserEmpNo.empNo }]
                : [];
        setAppraiserEmpNo(appraiserEmpNo);
const department = Array.isArray(res.department)
            ? res.department.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.department
                ? [{ _id: res.department._id, name: res.department.name }]
                : [];
        setDepartment(department);
const section = Array.isArray(res.section)
            ? res.section.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.section
                ? [{ _id: res.section._id, name: res.section.name }]
                : [];
        setSection(section);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "ParSessionAppraisers", type: "error", message: error.message || "Failed get parSessionAppraisers" });
            });
    }, [props,urlParams.singleParSessionAppraisersId]);


    const goBack = () => {
        navigate("/parSessionAppraisers");
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
                    <h3 className="m-0">Par Session Appraisers</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>parSessionAppraisers/{urlParams.singleParSessionAppraisersId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Weightage</label><p className="m-0 ml-3" >{Number(_entity?.weightage)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">AppraiserComment</label><p className="m-0 ml-3" >{_entity?.appraiserComment}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">KRAScore</label><p className="m-0 ml-3" >{Number(_entity?.kraScore)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">WeightedKRAScore</label><p className="m-0 ml-3" >{Number(_entity?.weightedKraScore)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">CompetencyScore</label><p className="m-0 ml-3" >{Number(_entity?.competencyScore)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">WeightedCompetencyScore</label><p className="m-0 ml-3" >{Number(_entity?.weightedCompetencyScore)}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">ParSessionId</label>
                    {parSessionId.map((elem) => (
                        <Link key={elem._id} to={`/parSession/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">AppraiseeEmpNo</label>
                    {appraiseeEmpNo.map((elem) => (
                        <Link key={elem._id} to={`/employees/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.empNo}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">AppraiserEmpNo</label>
                    {appraiserEmpNo.map((elem) => (
                        <Link key={elem._id} to={`/employees/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.empNo}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Department</label>
                    {department.map((elem) => (
                        <Link key={elem._id} to={`/departments/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Section</label>
                    {section.map((elem) => (
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
        
                    <TabPanel header="Competencies Scores" leftIcon="pi pi-building-columns mr-2">
                        <CompetenciesScoresPage/>
                    </TabPanel>
                    

                    <TabPanel header="Kra Scores" leftIcon="pi pi-building-columns mr-2">
                        <KraScoresPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleParSessionAppraisersId}
        user={props.user}
        alert={props.alert}
        serviceName="parSessionAppraisers"
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

export default connect(mapState, mapDispatch)(SingleParSessionAppraisersPage);
