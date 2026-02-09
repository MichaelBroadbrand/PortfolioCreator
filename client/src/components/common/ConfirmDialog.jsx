import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Delete',
  loading = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center py-2">
        <div className="w-12 h-12 rounded-full bg-error-50 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-error-600" />
        </div>
        <h3 className="text-lg font-semibold text-surface-900 mb-2">{title}</h3>
        <p className="text-sm text-surface-500">{message}</p>
      </div>
    </Modal>
  );
}
