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
}
}