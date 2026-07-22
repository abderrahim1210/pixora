import { FaCheck } from 'react-icons/fa6';
import { toast } from 'sonner';

export const showPixoraToast = (message) => {
  toast.custom((t) => (
    <div className="pixora-toast">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>{message}</span>
      </div>
    </div>
  ), {
    duration: 2500,
    position: 'top-center',
  });
};