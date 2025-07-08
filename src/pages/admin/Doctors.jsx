import React from 'react';
import { Outlet } from 'react-router-dom';
import DoctorTable from '../../components/admin/DoctorTable';

export default function Doctors() {
  return (
    <div>
      <h1>Doctors</h1>
      <DoctorTable />
      {/* Nested routes render here */}
      <Outlet />
    </div>
  );
}
