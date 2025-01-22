import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Submission } from "../../models/Submission";
import './SubmissionsTable.css'; // Import the CSS file

interface ViewSubmissionsProps {
    submissions: Submission[];
}

const columns: GridColDef[] = [
    { field: 'submissionId', headerName: 'Submission ID', width: 200 }, // Increased width
    { field: 'submissionDate', headerName: 'Submission Date', width: 200 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
];

const SubmissionsTable = ({ submissions } : ViewSubmissionsProps) => {
    return (
        <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
            {submissions.length > 0 && (
                <DataGrid 
                    rows={submissions} 
                    columns={columns} 
                    getRowId={(row: { submissionId: string; }) => row.submissionId} 
                    getRowClassName={() => 'custom-row'} // Apply custom class to rows
                    disableRowSelectionOnClick // Disable row selection
                    slotProps={{
                        pagination: {
                            sx: {
                                '& .MuiTablePagination-root': {
                                    color: 'white'
                                },
                                '& .MuiTablePagination-actions': {
                                    color: 'white'
                                },
                                '& .MuiTablePagination-selectLabel': {
                                    color: 'white'
                                },
                                '& .MuiTablePagination-input': {
                                    color: 'white'
                                },
                                '& .MuiTablePagination-displayedRows': {
                                    color: 'white'
                                }
                            }
                        }
                    }}
                />
            )}
        </div>
    );
};

export default SubmissionsTable;