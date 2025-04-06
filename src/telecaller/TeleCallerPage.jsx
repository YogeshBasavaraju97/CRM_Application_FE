import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit, Delete, Update } from '@mui/icons-material';
import useGetLeads from "./customHooks/useGetLeads";
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import toast from 'react-hot-toast';

const initialLeads = [];

const Telecaller = () => {

  const { data, refetch } = useGetLeads();



  const [leads, setLeads] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ name: '', emailId: '', phoneNumber: '', address: '', status: '', response: '' });
  const [statusDialog, setStatusDialog] = useState(false);
  const [selectedLeadIndex, setSelectedLeadIndex] = useState(null);

  const statusOptions = {
    connected: [{ index: 1, status: "Discussed" }, { index: 2, status: "Callback" }, { index: 3, status: "Interested" }],
    notConnected: [{ index: 4, status: "busy" }, { index: 5, status: "RNR (Ring no Response)" }, { index: 6, status: "switchedOff" }]

  };




  useEffect(() => {
    setLeads(data);
  }, [data, leads]);

  const handleInputChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSaveData = async () => {

    if (editIndex !== null) {
      // UPDATE
      try {
        const res = await axios.patch(`${BASE_URL}/update/lead/${editIndex}`, { address: form.address }, { withCredentials: true });
        console.log(res?.data?.lead);

        if (res.status === 200) {
          const updatedLeads = leads.map(lead =>
            lead._id === editIndex ? res?.data?.lead : lead
          );
          await refetch();
          toast.success("address updated successfully");


        }

      } catch (err) {
        console.error("Failed to update lead", err);
      }
    } else {
      // ADD
      try {
        const res = await axios.post(`${BASE_URL}/create/lead`, form, { withCredentials: true });
        console.log(res);
        if (res.status === 200) {
          await refetch();
          toast.success("lead created successfully");

        }

      } catch (err) {
        console.error("Failed to create lead", err);
      }
    }
    resetForm();


  };

  const resetForm = () => {
    setForm({ name: '', emailId: '', phoneNumber: '', address: '', status: '', response: '' });
    setEditIndex(null);
    setDialogOpen(false);
    setStatusDialog(false);
    setSelectedLeadIndex(null);
  };

  const handleEdit = async (id) => {
    setEditIndex(id);
    setForm({ ...leads[id] });
    setDialogOpen(true);
  };


  const handleDelete = async (id) => {

    const confirmed = confirm('Are you sure you want to delete this lead?');
    if (!confirmed) return;
    try {
      const res = await axios.delete(`${BASE_URL}/delete/${id}`, { withCredentials: true });

      if (res.status === 200) {
        await refetch();
        toast.success("lead deleted successfully!");


      }

    } catch (err) {
      console.error("Failed to delete lead", err);
      toast.error("failed to delete lead");
    }
  };

  const handleStatusUpdate = (index) => {
    setSelectedLeadIndex(index);

    setStatusDialog(true);
  };

  const saveStatus = async () => {

    try {
      const leadId = selectedLeadIndex;
      console.log(leadId);

      const res = await axios.patch(
        `${BASE_URL}/update/status/${leadId}`,
        {
          status: form.status,
          response: form.response,
        },
        { withCredentials: true }
      );
      console.log(res?.data.lead);

      if (res.status === 200) {
        await refetch();
        resetForm();
        setStatusDialog(false);
        toast.success("Status updated successfully!");

      }
    } catch (err) {
      console.error("Failed to update lead status:", err);
      toast.error("status not updated");
    }
  };


  return (
    <div className="p-6 mt-15">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Customer Leads</h2>
        <Button variant="contained" onClick={() => setDialogOpen(true)}>Add New</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>status</TableCell>
              <TableCell>Response</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              leads.length === 0 ? (<TableRow>
                <TableCell colSpan={7}>No leads found</TableCell>
              </TableRow>
              ) : (leads.map((lead) => (

                <TableRow key={lead._id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.emailId}</TableCell>
                  <TableCell>{lead.phoneNumber}</TableCell>
                  <TableCell>{lead.address}</TableCell>

                  <TableCell>
                    <IconButton onClick={() => handleEdit(lead._id)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(lead._id)}><Delete /></IconButton>
                    <IconButton onClick={() => handleStatusUpdate(lead._id)}><Update /></IconButton>
                  </TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>{lead.response}</TableCell>
                </TableRow>)
              ))
            }

          </TableBody>
        </Table>
      </TableContainer>



      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={resetForm} fullWidth>
        <DialogTitle>{editIndex !== null ? 'Edit Lead' : 'Add New Lead'}</DialogTitle>
        <DialogContent className="flex flex-col gap-2 mt-2  ">
          {editIndex === null && (
            <>
              <TextField label="Name" name="name" value={form.name} onChange={handleInputChange} fullWidth />
              <TextField label="Email" name="emailId" value={form.emailId} onChange={handleInputChange} fullWidth />
              <TextField label="Phone" name="phoneNumber" value={form.phoneNumber} onChange={handleInputChange} fullWidth />
            </>
          )}
          <TextField label="Address" name="address" value={form.address} onChange={handleInputChange} fullWidth />


        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm}>Cancel</Button>
          <Button onClick={handleSaveData} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog open={statusDialog} onClose={resetForm} fullWidth>
        <DialogTitle>Update Lead Status</DialogTitle>
        <DialogContent className="flex flex-col gap-4 mt-2">
          <Select
            fullWidth
            name="status"
            value={form.status}
            onChange={handleInputChange}
            displayEmpty

          >
            <MenuItem value="">Select the status</MenuItem>
            <MenuItem value="connected">Connected</MenuItem>
            <MenuItem value="notConnected">Not Connected</MenuItem>
          </Select>

          {form.status && (
            <Select
              fullWidth
              name="response"
              value={form.response}
              onChange={handleInputChange}
              displayEmpty
            >
              <MenuItem value=""> select the response</MenuItem>
              {statusOptions[form.status].map((option, index) => (
                <MenuItem key={option.id} value={option.status}>
                  {option.status}
                </MenuItem>
              ))}
            </Select>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm}>Cancel</Button>
          <Button onClick={saveStatus} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default Telecaller;