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

import KraScoresPage from "../KraScoresPage/KraScoresPage";

const SingleMasterKpiPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [kra, setKra] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("masterKpi")
            .get(urlParams.singleMasterKpiId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"kra"] }})
            .then((res) => {
                set_entity(res || {});
                const kra = Array.isArray(res.kra)
            ? res.kra.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.kra
                ? [{ _id: res.kra._id, name: res.kra.name }]
                : [];
        setKra(kra);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "MasterKpi", type: "error", message: error.message || "Failed get masterKpi" });
            });
    }, [props,urlParams.singleMasterKpiId]);


    const goBack = () => {
        navigate("/masterKpi");
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
                    <h3 className="m-0">Master KPI</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>masterKpi/{urlParams.singleMasterKpiId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Name</label><p className="m-0 ml-3" >{_entity?.name}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Weight</label><p className="m-0 ml-3" >{Number(_entity?.weight)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Target</label><p className="m-0 ml-3" >{Number(_entity?.target)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">ActualAchievement</label><p className="m-0 ml-3" >{Number(_entity?.actualAchievement)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Rate</label><p className="m-0 ml-3" >{Number(_entity?.rate)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">WeightedRate</label><p className="m-0 ml-3" >{_entity?.weightedRate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">StartValue</label><p className="m-0 ml-3" >{Number(_entity?.startValue)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">EndValue</label><p className="m-0 ml-3" >{_entity?.endValue}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">ImportanceRelevance</label><p className="m-0 ml-3" >{_entity?.importanceRelevance}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">SortOrder</label><p className="m-0 ml-3" >{_entity?.sortOrder}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">UnitMeasurement</label><p className="m-0 ml-3" >{_entity?.unitMeasurement}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">KRA</label>
                    {kra.map((elem) => (
                        <Link key={elem._id} to={`/masterKra/${elem._id}`}>
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
        
                    <TabPanel header="Kra Scores" leftIcon="pi pi-building-columns mr-2">
                        <KraScoresPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleMasterKpiId}
        user={props.user}
        alert={props.alert}
        serviceName="masterKpi"
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

export default connect(mapState, mapDispatch)(SingleMasterKpiPage);
