import React from 'react';

type Commission = {
  id: number;
  title: string;
  description: string | null;
  price: number;
  status: string;
  startDate: string;
  dueDate: string | null;
  completedAt: string | null;
  clientId: number;
  edit?: boolean; // Used to toggle edit mode, per ClientDetails
};

type CommissionDetailModalProps = {
  commission: Commission;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
  onDeleted: () => void;
};

/**
 * Modal to view or edit commission details.
 * Placeholder implementation; expand as needed.
 */
const CommissionDetailModal: React.FC<CommissionDetailModalProps> = ({
  commission,
  isOpen,
  onClose,
  onUpdated,
  onDeleted,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 rounded-xl shadow-xl w-full max-w-lg p-8 relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-300 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="material-icons" style={{ fontSize: 24 }}>close</span>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-100">
          {commission.edit ? 'Edit Commission' : 'Commission Details'}
        </h2>
        <div className="space-y-2">
          <div>
            <span className="font-semibold text-gray-300">Title:</span> {commission.title}
          </div>
          {commission.description && (
            <div>
              <span className="font-semibold text-gray-300">Description:</span> {commission.description}
            </div>
          )}
          <div>
            <span className="font-semibold text-gray-300">Price:</span> ${commission.price.toFixed(2)}
          </div>
          <div>
            <span className="font-semibold text-gray-300">Status:</span> {commission.status}
          </div>
          <div>
            <span className="font-semibold text-gray-300">Start Date:</span> {new Date(commission.startDate).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold text-gray-300">Due Date:</span> {commission.dueDate ? new Date(commission.dueDate).toLocaleDateString() : 'N/A'}
          </div>
          {commission.completedAt && (
            <div>
              <span className="font-semibold text-gray-300">Completed:</span> {new Date(commission.completedAt).toLocaleDateString()}
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-8 justify-end">
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
            onClick={() => {
              onUpdated();
              onClose();
            }}
          >
            {commission.edit ? 'Save' : 'Refresh'}
          </button>
          <button
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded"
            onClick={() => {
              onDeleted();
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommissionDetailModal;