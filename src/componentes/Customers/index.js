import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";

const ProgressBar = ({ value }) => (
  <LinearProgress variant="determinate" value={value} sx={{ width: "100%" }} />
);

const EditProgress = (params) => {
  return <input type="number" value={params.value} onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })} />;
};

const rows = [
  {
    id: 1,
    desk: "D-985",
    commodity: "Adzuki bean",
    traderName: "Roy Green",
    quantity: "83,996",
    filledQuantity: 50, // Example percentage
    status: "PartiallyFilled",
  },
];

const columns = [
  { field: "desk", headerName: "Desk", width: 120 },
  { field: "commodity", headerName: "Commodity", width: 150 },
  { field: "traderName", headerName: "Trader", width: 150 },
  { field: "quantity", headerName: "Quantity", width: 120 },
  {
    field: "filledQuantity",
    headerName: "Filled",
    width: 150,
    editable: true,
    renderCell: (params) => <ProgressBar value={Number(params.value)} />,
    renderEditCell: (params) => <EditProgress {...params} />,
  },
  { field: "status", headerName: "Status", width: 150 },
];

export default function App() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        density="compact"
        hideFooter
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}
