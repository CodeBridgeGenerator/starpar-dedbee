import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";
import { Checkbox } from "primereact/checkbox";

const EmployeeAppraisalDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user,   selectedDelete,
  setSelectedDelete, onCreateResult}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);

const p_inputtextTemplate1 = (rowData, { rowIndex }) => <p >{rowData.employeeNo}</p>
const p_inputtextTemplate2 = (rowData, { rowIndex }) => <p >{rowData.staffName}</p>
const p_inputnumberTemplate3 = (rowData, { rowIndex }) => <p >{rowData.fYear}</p>
const p_calendarTemplate4 = (rowData, { rowIndex }) => <p >{moment(rowData.startDate).fromNow()}</p>
const p_calendarTemplate5 = (rowData, { rowIndex }) => <p >{moment(rowData.endDate).fromNow()}</p>
const p_inputnumberTemplate6 = (rowData, { rowIndex }) => <p >{rowData.kRAScore}</p>
const p_inputnumberTemplate7 = (rowData, { rowIndex }) => <p >{rowData.weightedKRAScore}</p>
const p_inputnumberTemplate8 = (rowData, { rowIndex }) => <p >{rowData.competencyScore}</p>
const p_inputnumberTemplate9 = (rowData, { rowIndex }) => <p >{rowData.weightedCompetencyScore}</p>
const p_inputnumberTemplate10 = (rowData, { rowIndex }) => <p >{rowData.demeritScore}</p>
const p_inputnumberTemplate11 = (rowData, { rowIndex }) => <p >{rowData.totalScore}</p>
const p_inputnumberTemplate12 = (rowData, { rowIndex }) => <p >{rowData.finalScore}</p>
const p_textareaTemplate13 = (rowData, { rowIndex }) => <p >{rowData.empComment}</p>
const p_textareaTemplate14 = (rowData, { rowIndex }) => <p >{rowData.mngComment}</p>
const p_textareaTemplate15 = (rowData, { rowIndex }) => <p >{rowData.mngSuperiorComment}</p>
const p_inputtextTemplate16 = (rowData, { rowIndex }) => <p >{rowData.managerEmpNO}</p>
const p_inputtextTemplate17 = (rowData, { rowIndex }) => <p >{rowData.managerName}</p>
const p_inputnumberTemplate18 = (rowData, { rowIndex }) => <p >{rowData.kRAWeight}</p>
const p_inputnumberTemplate19 = (rowData, { rowIndex }) => <p >{rowData.competencyWeight}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
      const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };
    
  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

    return (
        <>
        <DataTable 
           value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
        >
                <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
<Column field="employeeNo" header=" Employee_ No" body={p_inputtextTemplate1} filter={selectedFilterFields.includes("employeeNo")} hidden={selectedHideFields?.includes("employeeNo")}  sortable style={{ minWidth: "8rem" }} />
<Column field="staffName" header=" Staff Name" body={p_inputtextTemplate2} filter={selectedFilterFields.includes("staffName")} hidden={selectedHideFields?.includes("staffName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="fYear" header=" F Year" body={p_inputnumberTemplate3} filter={selectedFilterFields.includes("fYear")} hidden={selectedHideFields?.includes("fYear")}  sortable style={{ minWidth: "8rem" }} />
<Column field="startDate" header=" Start Date" body={p_calendarTemplate4} filter={selectedFilterFields.includes("startDate")} hidden={selectedHideFields?.includes("startDate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="endDate" header=" End Date" body={p_calendarTemplate5} filter={selectedFilterFields.includes("endDate")} hidden={selectedHideFields?.includes("endDate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="kRAScore" header=" K R A Score" body={p_inputnumberTemplate6} filter={selectedFilterFields.includes("kRAScore")} hidden={selectedHideFields?.includes("kRAScore")}  sortable style={{ minWidth: "8rem" }} />
<Column field="weightedKRAScore" header=" Weighted K R A Score" body={p_inputnumberTemplate7} filter={selectedFilterFields.includes("weightedKRAScore")} hidden={selectedHideFields?.includes("weightedKRAScore")}  sortable style={{ minWidth: "8rem" }} />
<Column field="competencyScore" header=" Competency Score" body={p_inputnumberTemplate8} filter={selectedFilterFields.includes("competencyScore")} hidden={selectedHideFields?.includes("competencyScore")}  sortable style={{ minWidth: "8rem" }} />
<Column field="weightedCompetencyScore" header=" Weighted Competency Score" body={p_inputnumberTemplate9} filter={selectedFilterFields.includes("weightedCompetencyScore")} hidden={selectedHideFields?.includes("weightedCompetencyScore")}  sortable style={{ minWidth: "8rem" }} />
<Column field="demeritScore" header=" Demerit Score" body={p_inputnumberTemplate10} filter={selectedFilterFields.includes("demeritScore")} hidden={selectedHideFields?.includes("demeritScore")}  sortable style={{ minWidth: "8rem" }} />
<Column field="totalScore" header=" Total Score" body={p_inputnumberTemplate11} filter={selectedFilterFields.includes("totalScore")} hidden={selectedHideFields?.includes("totalScore")}  sortable style={{ minWidth: "8rem" }} />
<Column field="finalScore" header=" Final Score" body={p_inputnumberTemplate12} filter={selectedFilterFields.includes("finalScore")} hidden={selectedHideFields?.includes("finalScore")}  sortable style={{ minWidth: "8rem" }} />
<Column field="empComment" header=" Emp_ Comment" body={p_textareaTemplate13} filter={selectedFilterFields.includes("empComment")} hidden={selectedHideFields?.includes("empComment")}  sortable style={{ minWidth: "8rem" }} />
<Column field="mngComment" header=" Mng_ Comment" body={p_textareaTemplate14} filter={selectedFilterFields.includes("mngComment")} hidden={selectedHideFields?.includes("mngComment")}  sortable style={{ minWidth: "8rem" }} />
<Column field="mngSuperiorComment" header=" Mng Superior_ Comment" body={p_textareaTemplate15} filter={selectedFilterFields.includes("mngSuperiorComment")} hidden={selectedHideFields?.includes("mngSuperiorComment")}  sortable style={{ minWidth: "8rem" }} />
<Column field="managerEmpNO" header=" Manager Emp N O" body={p_inputtextTemplate16} filter={selectedFilterFields.includes("managerEmpNO")} hidden={selectedHideFields?.includes("managerEmpNO")}  sortable style={{ minWidth: "8rem" }} />
<Column field="managerName" header=" Manager Name" body={p_inputtextTemplate17} filter={selectedFilterFields.includes("managerName")} hidden={selectedHideFields?.includes("managerName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="kRAWeight" header=" K R A Weight" body={p_inputnumberTemplate18} filter={selectedFilterFields.includes("kRAWeight")} hidden={selectedHideFields?.includes("kRAWeight")}  sortable style={{ minWidth: "8rem" }} />
<Column field="competencyWeight" header=" Competency Weight" body={p_inputnumberTemplate19} filter={selectedFilterFields.includes("competencyWeight")} hidden={selectedHideFields?.includes("competencyWeight")}  sortable style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>


      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}


        <Dialog header="Upload EmployeeAppraisal Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="employeeAppraisal"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search EmployeeAppraisal" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default EmployeeAppraisalDataTable;