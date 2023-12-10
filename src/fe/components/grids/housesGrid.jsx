/* eslint-disable react/display-name */
/* eslint-disable security/detect-object-injection */
/* eslint-disable unicorn/prevent-abbreviations */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import moment from "moment";
import { VISIT_STATUS } from "@/appConstants";
import { Select } from "antd";

const SelectEditor = forwardRef((properties, reference) => {
  const [value, setValue] = useState(properties.value);
  const referenceInput = useRef(null);

  useEffect(() => {
    referenceInput.current.focus();
  }, []);

  useImperativeHandle(reference, () => {
    return {
      getValue() {
        return value;
      },

      isCancelBeforeStart() {
        return false;
      },

      isCancelAfterEnd() {
        return !Object.values(VISIT_STATUS).includes(value);
      }
    };
  });

  return (
    <Select
      ref={referenceInput}
      value={value}
      onChange={data => setValue(data)}
      className="w-full"
    >
      {Object.values(VISIT_STATUS).map(visit => (
        <Select.Option key={visit} value={visit}>
          {visit}
        </Select.Option>
      ))}
    </Select>
  );
});

export const HousesGrid = ({ data, setDataChanges }) => {
  const gridRef = useRef();
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "600px" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const columnDefs = [
    { field: "itsId", headerName: "ITS", flex: 2, minWidth: 150 },
    {
      field: "tanzeem_file_no",
      headerName: "File No",
      minWidth: 100,
      flex: 1
    },
    { field: "hof_id", headerName: "HOF ITS", flex: 2, minWidth: 150 },
    { field: "full_name", headerName: "Name", flex: 3, minWidth: 300 },
    { field: "address", headerName: "Address", flex: 3, minWidth: 300 },
    { field: "sector", headerName: "Sector", flex: 2, minWidth: 150 },
    { field: "sub_sector", headerName: "Sub Sector", flex: 2, minWidth: 200 },
    {
      field: "visit_date",
      headerName: "Visit Date",
      flex: 2,
      minWidth: 200,
      valueFormatter: params =>
        params.value ? moment(params.value).format("DD-MM-YYYY") : "-"
    },
    {
      field: "status",
      editable: true,
      headerName: "Status",
      flex: 2,
      minWidth: 200,
      cellClassRules: {
        errorCell: params => !Object.values(VISIT_STATUS).includes(params.value)
      },
      cellEditor: SelectEditor
    },
    {
      field: "comments",
      headerName: "Comments",
      flex: 4,
      editable: true,
      minWidth: 400
    },
    {
      field: "added_by_name",
      headerName: "Added by Name",
      flex: 2,
      minWidth: 200
    },
    {
      field: "added_by_contact",
      headerName: "Added By Contact",
      flex: 2,
      minWidth: 200
    },
    {
      field: "visited_by_name",
      headerName: "Visited by Name",
      flex: 2,
      minWidth: 200
    },
    {
      field: "visited_by_contact",
      headerName: "Visited By Contact",
      flex: 2,
      minWidth: 200
    }
  ];
  const defaultColDef = useMemo(() => {
    return {
      editable: false,
      minWidth: 100,
      flex: 1,
      resizable: false,
      filter: "agTextColumnFilter"
    };
  }, []);

  const processDataFromClipboard = useCallback(params => {
    return params.data;
  }, []);

  const onCellValueChanged = event => {
    setDataChanges(prevData => {
      let tempData = { ...prevData };
      if (tempData[event.data._id]) {
        tempData[event.data._id].status = event.data.status;
      } else {
        tempData[event.data._id] = {
          status: event.data.status
        };
      }
      if (event.data.comments) {
        tempData[event.data._id].comments = event.data.comments;
      }
      return tempData;
    });
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          copyHeadersToClipboard={false}
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={20}
          rowSelection={"multiple"}
          editType="fullRow"
          suppressScrollOnNewData={true}
          onCellValueChanged={onCellValueChanged}
          processDataFromClipboard={processDataFromClipboard}
        />
      </div>
    </div>
  );
};
