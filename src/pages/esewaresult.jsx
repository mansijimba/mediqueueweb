// import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import MainLayout from "../layout/MainLayout";
// import { CheckCircle, XCircle, Loader2 } from "lucide-react";
// import axios from "axios";

// export default function EsewaAppointmentResultPage() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [verifying, setVerifying] = useState(true);
//   const [paymentStatus, setPaymentStatus] = useState(null);

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         const data = searchParams.get("data");

//         if (!data) {
//           setPaymentStatus("failed");
//           toast.error("Invalid payment callback");
//           return;
//         }

//         // Decode Base64 data
//         const decodedData = atob(data);
//         const paymentData = JSON.parse(decodedData);

//         if (paymentData.status !== "COMPLETE") {
//           setPaymentStatus("failed");
//           toast.error("Payment was not completed");
//           return;
//         }

//         const token = localStorage.getItem("token");
//         if (!token) {
//           toast.error("Please login to continue");
//           setPaymentStatus("failed");
//           return;
//         }

//         // Verify payment and update appointment
//         const verifyResponse = await axios.post(
//           "http://localhost:5050/api/appointments/esewa/verify",
//           {
//             appointmentId: paymentData.appointmentId,
//             transaction_uuid: paymentData.transaction_uuid,
//             total_amount: paymentData.total_amount,
//             status: paymentData.status,
//           },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (verifyResponse.data.success) {
//           setPaymentStatus("success");
//           toast.success("Payment successful 🎉 Appointment confirmed!");
//         } else {
//           setPaymentStatus("failed");
//           toast.error(
//             verifyResponse.data.message || "Payment verification failed"
//           );
//         }
//       } catch (error) {
//         console.error(error);
//         setPaymentStatus("failed");
//         toast.error("Payment verification failed");
//       } finally {
//         setVerifying(false);
//       }
//     };

//     verifyPayment();
//   }, [searchParams]);

//   return (
//     <MainLayout>
//       <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center p-6">
//         <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full text-center">
//           {verifying ? (
//             <>
//               <Loader2 className="w-16 h-16 text-amber-600 animate-spin mx-auto mb-4" />
//               <h2 className="text-2xl font-serif text-gray-800 mb-2">
//                 Verifying Payment
//               </h2>
//               <p className="text-gray-600">
//                 Please wait while we confirm your payment for the appointment...
//               </p>
//             </>
//           ) : paymentStatus === "success" ? (
//             <>
//               <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
//               <h2 className="text-2xl font-serif text-gray-800 mb-2">
//                 Payment Successful!
//               </h2>
//               <p className="text-gray-600 mb-6">
//                 Your appointment has been confirmed.
//               </p>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => navigate("/appointments")}
//                   className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-medium"
//                 >
//                   View Appointments
//                 </button>
//                 <button
//                   onClick={() => navigate("/")}
//                   className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium"
//                 >
//                   Go Home
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
//               <h2 className="text-2xl font-serif text-gray-800 mb-2">
//                 Payment Failed
//               </h2>
//               <p className="text-gray-600 mb-6">
//                 Your payment was not successful. Appointment is not confirmed.
//               </p>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => navigate("/")}
//                   className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-medium"
//                 >
//                   Go Home
//                 </button>
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </MainLayout>
//   );
// }
