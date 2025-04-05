import React, { useState } from 'react';
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

const initialLeads = [];

const Telecaller = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', status: '', response: '' });
  const [statusDialog, setStatusDialog] = useState(false);
  const [selectedLeadIndex, setSelectedLeadIndex] = useState(null);

  const statusOptions = {
    Connected: ['Discussed', 'Callback', 'Interested'],
    'Not Connected': ['Busy', 'RNR', 'Switched Off'],
  };

  const handleInputChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddOrEdit = () => {
    const updatedLeads = [...leads];
    if (editIndex !== null) {
      updatedLeads[editIndex].address = form.address;
    } else {
      updatedLeads.push({ ...form });
    }
    setLeads(updatedLeads);
    resetForm();
  };

  const resetForm = () => {
    setForm({ name: '', email: '', phone: '', address: '', status: '', response: '' });
    setEditIndex(null);
    setDialogOpen(false);
    setStatusDialog(false);
    setSelectedLeadIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setForm({ ...leads[index] });
    setDialogOpen(true);
  };

  const handleDelete = (index) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter((_, i) => i !== index));
    }
  };

  const handleStatusUpdate = (index) => {
    setSelectedLeadIndex(index);
    setForm({ ...leads[index] });
    setStatusDialog(true);
  };

  const saveStatus = () => {
    const updatedLeads = [...leads];
    updatedLeads[selectedLeadIndex] = { ...form };
    setLeads(updatedLeads);
    resetForm();
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
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead, index) => (
              <TableRow key={index}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>{lead.address}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(index)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(index)}><Delete /></IconButton>
                  <IconButton onClick={() => handleStatusUpdate(index)}><Update /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={resetForm} fullWidth>
        <DialogTitle>{editIndex !== null ? 'Edit Lead' : 'Add New Lead'}</DialogTitle>
        <DialogContent className="flex flex-col gap-4 mt-2">
          {editIndex === null && (
            <>
              <TextField label="Name" name="name" value={form.name} onChange={handleInputChange} fullWidth />
              <TextField label="Email" name="email" value={form.email} onChange={handleInputChange} fullWidth />
              <TextField label="Phone" name="phone" value={form.phone} onChange={handleInputChange} fullWidth />
            </>
          )}
          <TextField label="Address" name="address" value={form.address} onChange={handleInputChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm}>Cancel</Button>
          <Button onClick={handleAddOrEdit} variant="contained">Save</Button>
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
            <MenuItem value="">Select Call Status</MenuItem>
            <MenuItem value="Connected">Connected</MenuItem>
            <MenuItem value="Not Connected">Not Connected</MenuItem>
          </Select>

          {form.status && (
            <Select
              fullWidth
              name="response"
              value={form.response}
              onChange={handleInputChange}
              displayEmpty
            >
              <MenuItem value="">Select Response</MenuItem>
              {statusOptions[form.status].map((option, i) => (
                <MenuItem key={i} value={option}>{option}</MenuItem>
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