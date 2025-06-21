import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllQueuesService,
  getOneQueueService,
  createQueueService,
  updateQueueService,
  deleteQueueService,
} from "../../services/admin/QueueService"; // Adjust import path
import { toast } from "react-toastify";

// GET ALL QUEUES
export const useAdminQueues = () => {
  const query = useQuery({
    queryKey: ["admin_queues"],
    queryFn: getAllQueuesService,
  });

  // Assuming backend returns data as { data: [...] }
  const queues = query.data?.data || [];

  return { ...query, queues };
};

// GET ONE QUEUE ITEM BY ID
export const useGetOneQueue = (id) => {
  const query = useQuery({
    queryKey: ["admin_queue_detail", id],
    queryFn: () => getOneQueueService(id),
    enabled: !!id,
    retry: false,
  });

  const queueItem = query.data?.data || null;
  return { ...query, queueItem };
};

// CREATE QUEUE ITEM
export const useCreateQueue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createQueueService,
    onSuccess: () => {
      toast.success("Queue entry created");
      queryClient.invalidateQueries(["admin_queues"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create queue entry");
    },
  });
};

// UPDATE QUEUE ITEM
export const useUpdateQueue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateQueueService(id, data),
    onSuccess: () => {
      toast.success("Queue entry updated");
      queryClient.invalidateQueries(["admin_queues"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update queue entry");
    },
  });
};

// DELETE QUEUE ITEM
export const useDeleteQueue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteQueueService,
    onSuccess: () => {
      toast.success("Queue entry deleted");
      queryClient.invalidateQueries(["admin_queues"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete queue entry");
    },
  });
};
