import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllAppointmentsService,
  getOneAppointmentService,
  createAppointmentService,
  updateAppointmentService,
  deleteAppointmentService,
} from "../../services/admin/AppointmentService";
import { toast } from "react-toastify";

//  GET ALL APPOINTMENTS
export const useAdminAppointments = () => {
  const query = useQuery({
    queryKey: ["admin_appointments"],
    queryFn: getAllAppointmentsService,
  });

  // Extract actual appointments array from nested response
  const appointments = query.data?.data?.data || [];
  return { ...query, appointments };
};

//  GET ONE APPOINTMENT
export const useGetOneAppointment = (id) => {
  const query = useQuery({
    queryKey: ["admin_appointment_detail", id],
    queryFn: () => getOneAppointmentService(id),
    enabled: !!id,
    retry: false,
  });

  // Extract the actual appointment object
  const appointment = query.data?.data?.data || {};
  return { ...query, appointment };
};

//  CREATE APPOINTMENT
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAppointmentService,
    onSuccess: () => {
      toast.success("Appointment created");
      queryClient.invalidateQueries(["admin_appointments"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create");
    },
  });
};

//  UPDATE APPOINTMENT
export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateAppointmentService(id, data),
    onSuccess: () => {
      toast.success("Appointment updated");
      queryClient.invalidateQueries(["admin_appointments"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update");
    },
  });
};

//  DELETE APPOINTMENT
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAppointmentService,
    onSuccess: () => {
      toast.success("Appointment deleted");
      queryClient.invalidateQueries(["admin_appointments"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete");
    },
  });
};
