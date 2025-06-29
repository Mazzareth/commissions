'use client';

interface CommissionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  commission: {
    id: number;
    title: string;
    description: string | null;
    price: number;
    status: string;
    startDate: string;
    dueDate: string | null;
    completedAt: string | null;
  };
}

export default function CommissionDetailModal({
  isOpen,
  onClose,
  commission,
}: CommissionDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-card border border-border rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fadeIn">
        <button
          className="absolute top-3 right-4 text-muted-foreground hover:text-foreground text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-foreground">{commission.title}</h2>
        <div className="mb-2 text-muted-foreground">{commission.description || <span className="italic text-muted-foreground">No description</span>}</div>
        <div className="mb-2 text-muted-foreground">Price: <span className="text-foreground">${commission.price.toFixed(2)}</span></div>
        <div className="mb-2 text-muted-foreground">Status: <span className="text-foreground">{commission.status}</span></div>
        <div className="mb-2 text-muted-foreground">Started: <span className="text-foreground">{new Date(commission.startDate).toLocaleDateString()}</span></div>
        {commission.dueDate && (
          <div className="mb-2 text-muted-foreground">Due: <span className="text-foreground">{new Date(commission.dueDate).toLocaleDateString()}</span></div>
        )}
        {commission.completedAt && (
          <div className="mb-2 text-muted-foreground">Completed: <span className="text-foreground">{new Date(commission.completedAt).toLocaleDateString()}</span></div>
        )}
      </div>
    </div>
  );
}),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || 'Failed to update commission');
      }
      onUpdated();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update commission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900/95 rounded-xl shadow-xl w-full max-w-lg p-8 relative animate-fadeIn glass">
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
        <div className="space-y-4">
          {commission.edit ? (
            <>
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Title</label>
                <input
                  className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                  value={editData.title}
                  onChange={e => setEditData(d => ({ ...d, title: e.target.value }))}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Description</label>
                <textarea
                  className="w-full min-h-[60px] p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                  value={editData.description}
                  onChange={e => setEditData(d => ({ ...d, description: e.target.value }))}
                  disabled={loading}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-semibold text-gray-300 mb-1">Price ($)</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                    value={editData.price}
                    onChange={e => setEditData(d => ({ ...d, price: Number(e.target.value) }))}
                    disabled={loading}
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold text-gray-300 mb-1">Status</label>
                  <select
                    className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700"
                    value={editData.status}
                    onChange={e => setEditData(d => ({ ...d, status: e.target.value }))}
                    disabled={loading}
                  >
                    {statuses.map(s => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-semibold text-gray-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700"
                    value={editData.startDate?.slice(0, 10)}
                    onChange={e => setEditData(d => ({ ...d, startDate: e.target.value }))}
                    disabled={loading}
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold text-gray-300 mb-1">Due Date</label>
                  <input
                    type="date"
                    className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700"
                    value={editData.dueDate?.slice(0, 10) || ''}
                    onChange={e => setEditData(d => ({ ...d, dueDate: e.target.value }))}
                    disabled={loading}
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold text-gray-300 mb-1">Completed</label>
                  <input
                    type="date"
                    className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700"
                    value={editData.completedAt?.slice(0, 10) || ''}
                    onChange={e => setEditData(d => ({ ...d, completedAt: e.target.value }))}
                    disabled={loading}
                  />
                </div>
              </div>
              {error && <div className="text-red-400 text-xs mt-2">{error}</div>}
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        <div className="flex gap-2 mt-8 justify-end">
          <Button
            variant="primary"
            onClick={commission.edit ? handleSave : onUpdated}
            loading={loading}
          >
            {commission.edit ? 'Save' : 'Refresh'}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onDeleted();
              onClose();
            }}
            disabled={loading}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommissionDetailModal;