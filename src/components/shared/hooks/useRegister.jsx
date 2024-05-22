import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as RegisterRequest } from '../../../services';
import toast from "react-hot-toast";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const register = async (email, username, password) => {
        setIsLoading(true);

        const response = await RegisterRequest({ email, username, password });
        setIsLoading(false);

        if (response.error) {
            const errorMessage = response.e?.response?.data || 'Ocurrió un error al registrarse, intenta de nuevo';
            toast.error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
            return;
        }

        const { userDetails } = response.data;
        localStorage.setItem('user', JSON.stringify(userDetails));
        navigate('/auth', { replace: true });
        window.location.reload(); // Force reload
    };

    return { register, isLoading };
};
