import { useEffect, useState } from "react";
import { USER, USERS } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import NavHeader from "../../Component/Dashboard/NavHeader";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Pagination } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'; 
import { Form } from "react-bootstrap";

export default function Usersbymaterial() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [id_user, setId_user] = useState('');
  const [limit, setLimit] = useState(2);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function Getusers() {
      try {
        setLoading(true);
        const res = await Axios.get(`${USERS}?limit=${limit}&page=${page}`);
        setUsers(res.data.data.data);
        setTotal(res.data.pagination.total);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    Getusers();
  }, [limit, page]);

  const links = [
    { name: 'المستخدمين', link: '#' }
  ];

  const styleTable = {
    width: '100%',
    overflow: 'hidden',
    minWidth: 1340,
    borderColor: '#777666',
    backgroundColor: '#cccccc',
    margin: 0,
    padding: 0,
    '& .MuiDataGrid-cell': {
      color: '#ccc',
      backgroundColor: '#111222',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      borderRight: '1px solid #e0e0e0',
    },
    '& .MuiDataGrid-row': {
      borderBottom: '1px solid #e0e0e0',
    },
    '& .MuiDataGrid-columnHeaders': {
      fontWeight: 'bold',
      textAlign: 'center',
    },
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: '#777777',
      justifyContent: 'center',
      color: '#f5f5f5',
      fontSize: 'large',
      fontWeight: 'bold',
      width: '100%',
      textAlign: 'center'
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'الاسم', width: 150 },
    { field: 'email', headerName: 'الايميل', width: 200, sortable: false },
    {
      field: 'gender', headerName: 'الجنس', width: 70, editable: true,
      type: 'singleSelect', valueOptions: ['ذكر', 'انثى']
    },    
     { field: 'department', headerName: 'القسم', width: 100 ,
       valueGetter: (params) =>params.department_name || '',},

    { field: 'salary', headerName: 'المرتب', type: 'number', width: 100 },
    { field: 'nationality', headerName: 'الجنسية', minWidth: 145, editable: true },
    { field: 'phone_number', headerName: 'رقم الهاتف', type: 'string', width: 150, editable: true },
    { field: 'job_title', headerName: 'المسمى الوظيفي', width: 130 },
    { field: 'role', headerName: 'الصلاحية', width: 123 },
    {
      field: 'actions', headerName: 'التحكم', width: 100,
      renderCell: (params) => (
        <div>
          <IconButton color="error" onClick={() => {
            setOpen(true);
            setId_user(params.id);
          }}>
            <DeleteIcon />
          </IconButton>
          <Link to={`/dashboard/users/${params.id}`}><EditIcon className="text-primary" /></Link>
        </div>
      )
    },
  ];

  const handleClose = () => setOpen(false);

  async function handleDelete(id) {
    try {
      await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
    handleClose();
  }

  const pageCount = Math.ceil(total / limit);
  const handlePageChange = (event, value) => setPage(value);

  return (
    <div className="w-100 px-1 py-1 mt-2" style={{ position: 'relative', overflowX: 'hidden' }}>
      <NavHeader nav={links} />
      <div className="w-25 d-flex justify-content-between fs-4 me-3">
        <Link to='/dashboard/adduser' className="text-danger w-100 mb-2">إضافة موظف +</Link>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"    هل تريد حذف الموظف ؟"}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إلغاء</Button>
          <Button onClick={() => handleDelete(id_user)}>موافق</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <Box sx={{ width: '100%', overflow: 'auto' }}>
          <DataGrid
            rows={users}
            columns={columns}
            pagination={false}
            hideFooterPagination
            hideFooter
            loading={loading}
            disableColumnResize
            experimentalFeatures={{ newEditingApi: true }}
            processRowUpdate={async (newRow, oldRow) => {
              const changedField = Object.keys(newRow).find(key => newRow[key] !== oldRow[key]);
              await Axios.patch(`${USER}/editUserFromUi/${newRow.id}`, {
                [changedField]: newRow[changedField],
              });
              setUsers((prev) => prev.map((r) => r.id === oldRow.id ? newRow : r));
              return newRow;
            }}
            onProcessRowUpdateError={(error) => console.error(error)}
            sx={styleTable}
          />
        </Box>
      </Box>

      <div className="d-flex gap-3">
        <Stack spacing={2}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </Stack>
        <div className="col-2">
          <Form.Select
            className="col-2 ps-3"
            onChange={(e) => { setLimit(e.target.value); setPage(1); }}
            aria-label="تحديد عدد العناصر"
            style={{ width: '70px', paddingLeft: '30px', fontSize: '15px' }}
          >
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='6'>6</option>
            <option value='10'>10</option>
          </Form.Select>
        </div>
      </div>
    </div>
  );
}
 
 