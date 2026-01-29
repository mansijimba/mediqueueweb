import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddDoctor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
    status: "Active",
    availability: "",
    appointments: 0,
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "file" && value) {
        data.append("image", value);
      } else {
        data.append(key, value);
      }
    });

    try {
      await axios.post("http://localhost:5050/api/admin/doctors", data, {
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
    });
      navigate("/admin/doctors");
    } catch (err) {
      setError("Failed to add doctor. Please check the form and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 p-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-2xl p-8 transition-transform transform hover:scale-105">
        <h2 className="text-4xl font-bold text-purple-700 text-center mb-8 tracking-wide">
          Add New Doctor
        </h2>

        {error && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded-lg text-center shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Name", name: "name", type: "text", required: true },
            { label: "Specialty", name: "specialty", type: "text", required: true },
            { label: "Email", name: "email", type: "email", required: true },
            { label: "Phone", name: "phone", type: "tel", required: true },
            { label: "Availability", name: "availability", type: "text", required: false },
            { label: "Appointments", name: "appointments", type: "number", required: false, min: 0 },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-1 font-semibold text-gray-700">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                value={formData[field.name]}
                onChange={handleChange}
                min={field.min || undefined}
                className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all shadow-inner"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-400 transition-all shadow-inner"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all shadow-inner"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-xl hover:from-purple-700 hover:to-purple-800 shadow-lg transform hover:scale-105 transition-all"
            >
              {loading ? "Adding..." : "Add Doctor"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/doctors")}
              className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-500 shadow-lg transform hover:scale-105 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
