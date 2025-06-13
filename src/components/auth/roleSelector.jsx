import React from "react";

function RoleSelector({ selectedRole, onRoleChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Select Role</label>
      <div className="flex space-x-4">
        <button
          type="button"
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            selectedRole === "patient"
              ? "bg-teal-600 text-white border-teal-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
          onClick={() => onRoleChange("patient")}
        >
          Patient
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            selectedRole === "doctor"
              ? "bg-teal-600 text-white border-teal-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
          onClick={() => onRoleChange("doctor")}
        >
          Doctor
        </button>
      </div>
    </div>
  );
}

export default RoleSelector;
