import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import moment from "moment";

export const InviteeGrid = ({ data }) => {
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "600px" }),
    []
  );

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const columnDefs = [
    { field: "itsId", headerName: "ITS", flex: 1, minWidth: 200 },
    {
      field: "file_number",
      headerName: "File",
      minWidth: 100,
      flex: 1
    },
    { field: "name", headerName: "Name", flex: 3, minWidth: 400 },
    { field: "mobile", headerName: "Contact", flex: 3, minWidth: 250 },
    { field: "sector", headerName: "Sector", flex: 2, minWidth: 200 },
    { field: "sub_sector", headerName: "Sub Sector", flex: 2, minWidth: 200 },
    {
      field: "enrolled_for_khidmat",
      headerName: "Is Part of Committee",
      flex: 2,
      minWidth: 200
    },
    {
      field: "khidmat_name",
      headerName: "Khidmat Name",
      flex: 3,
      minWidth: 300
    },
    {
      field: "can_provide_utara",
      headerName: "Can Provide Utara",
      flex: 2,
      minWidth: 200
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 2,
      minWidth: 200,
      valueFormatter: parameters =>
        parameters.value
          ? moment(parameters.value).format("hh:mm A / DD-MM-YYYY")
          : "-"
    }
  ];

  const defaultColDefination = useMemo(() => {
    return {
      editable: false,
      minWidth: 100,
      flex: 1,
      resizable: true,
      sortable: true,
      filter: "agTextColumnFilter"
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDefination}
          enableRangeSelection={true}
          copyHeadersToClipboard={false}
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={20}
          rowSelection={"multiple"}
          suppressScrollOnNewData={true}
        ></AgGridReact>
      </div>
    </div>
  );
};
