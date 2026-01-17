import React from "react";

export default function DeleteModal({ isOpen, onClose, onConfirm, title, description }) {
  if (!isOpen) return null;

  return (
    // Semi-transparent dark overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal card */}
      <div className="bg-white rounded-xl shadow-2xl w-96 p-6 transform transition-all scale-100">
        {/* Header */}
        <h3 className="text-xl font-semibold text-red-600 mb-4">{title}</h3>

        {/* Description */}
        <p className="text-gray-700 mb-6">{description}</p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
