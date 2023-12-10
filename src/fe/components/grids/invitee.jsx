import { useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export const InviteeGrid = ({ data }) => {
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "600px" }),
    []
  );

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const columnDefs = [
    { field: "itsId", headerName: "ITS", flex: 1, minWidth: 100 },
    {
      field: "file_number",
      headerName: "File",
      minWidth: 100,
      flex: 1
    },
    { field: "name", headerName: "Name", flex: 3, minWidth: 400 },
    { field: "sector", headerName: "Sector", flex: 2, minWidth: 200 },
    {
      field: "has_filled_response",
      headerName: "Form Filled",
      flex: 2,
      minWidth: 200,
      valueFormatter: parameters =>
        parameters.value && parameters.value === true ? "Yes" : "No"
    },
    {
      field: "will_attend",
      headerName: "Will Attend",
      flex: 2,
      minWidth: 200,
      valueFormatter: parameters =>
        parameters.value && parameters.value === true ? "Yes" : "No"
    }
  ];

  const defaultColDefination = useMemo(() => {
    return {
      editable: false,
      minWidth: 100,
      flex: 1,
      resizable: false,
      filter: "agTextColumnFilter"
    };
  }, []);

  const processCellFromClipboard = useCallback(parameters => {
    return parameters.value;
  }, []);

  const processCellForClipboard = useCallback(parameters => {
    return parameters.value;
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
