import { useMutation } from '@tanstack/react-query';
import { registerApi } from '@/lib/apis/auth.api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      // We don't need to unwrap data here strictly since we aren't using it,
      // but good to know if success.
      // Usually provided apis throw on error status (!= 2xx), so onSuccess implies success.

      toast.success('Registration successful! Please login.');
      navigate(0); // Reload to reset state
    },
  });
};
