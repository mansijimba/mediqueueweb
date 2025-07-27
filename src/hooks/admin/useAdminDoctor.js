import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllDoctorsService,
  getOneDoctorService,
  createDoctorService,
  updateDoctorService,
  deleteDoctorService,
} from "../../services/admin/DoctorService";
import { toast } from "react-toastify";

// GET ALL DOCTORS
export const useAdminDoctors = () => {
  const query = useQuery({
    queryKey: ["admin_doctors"],
    queryFn: getAllDoctorsService,
  });

  // Assuming backend returns doctors array directly or nested in data.data
  // Adjust depending on your API response shape
  const doctors = query.data?.data || [];

  return { ...query, doctors };
};

// GET ONE DOCTOR
export const useGetOneDoctor = (id) => {
  const query = useQuery({
    queryKey: ["admin_doctor_detail", id],
    queryFn: () => getOneDoctorService(id),
    enabled: !!id,
    retry: false,
  });

  const doctor = query.data?.data || [];
  return { ...query, doctor };
};

// CREATE DOCTOR (expects data including image URL or FormData for upload)
export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDoctorService,
    onSuccess: () => {
      toast.success("Doctor created");
      queryClient.invalidateQueries(["admin_doctors"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create doctor");
    },
  });
};

// UPDATE DOCTOR (pass id and data including updated image if any)
export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateDoctorService(id, data),
    onSuccess: () => {
      toast.success("Doctor updated");
      queryClient.invalidateQueries(["admin_doctors"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update doctor");
    },
  });
};

// DELETE DOCTOR
export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDoctorService,
    onSuccess: () => {
      toast.success("Doctor deleted");
      queryClient.invalidateQueries(["admin_doctors"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete doctor");
    },
  });
};
