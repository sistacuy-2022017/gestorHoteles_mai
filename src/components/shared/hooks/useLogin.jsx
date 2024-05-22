import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as LoginRequest } from '../../../services';
import toast from "react-hot-toast";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);

        try {
            const response = await LoginRequest({ email, password });
            setIsLoading(false);

            if (response.error) {
                return toast.error(response.e?.response?.data || 'Ocurrió un error al iniciar sesión, intenta de nuevo');
            }

            const { userDetails } = response.data;
            localStorage.setItem('user', JSON.stringify(userDetails));
            navigate('/dashboardPage', { replace: true });
            window.location.reload(); // Force reload
        } catch (e) {
            setIsLoading(false);
            toast.error('Ocurrió un error al iniciar sesión, intenta de nuevo');
        }
    };

    return { login, isLoading };
};
