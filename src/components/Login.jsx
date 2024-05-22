import { useState } from "react";
import { Input } from "./Input.jsx";
import { emailValidationMessage, validateEmail, validatePassword, validatePasswordMessage } from './shared/validators';
import { useLogin } from "./shared/hooks/useLogin.jsx";

export const Login = ({ switchAuthHandler }) => {
    const { login, isLoading } = useLogin();

    const [formState, setFormState] = useState({
        email: {
            value: "",
            isValid: false,
            showError: false,
        },
        password: {
            value: "",
            isValid: false,
            showError: false,
        },
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value,
            },
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case "email":
                isValid = validateEmail(value);
                break;
            case "password":
                isValid = validatePassword(value);
                break;
            default:
                break;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }))
    };

    const handleLogin = (event) => {
        event.preventDefault();
        login(formState.email.value, formState.password.value);
    };

    const isSubmitButtonDisabled = isLoading || !formState.email.isValid || !formState.password.isValid;

    return (
        <div className="bg-white">
            <div className="flex h-screen flex-col items-center justify-center">
                <div className="max-h-auto mx-auto max-w-xl">
                    <div className="mb-9 space-y-6">
                        <p className="text-xl font-semibold">Login</p>
                        <p className="text-gray-500">Enter your email, and we'll send a code to your inbox. <br />No need for passwords -- like magic!</p>
                    </div>
                    <form className="w-full" onSubmit={handleLogin}>
                        <div className="mb-10 space-y-3">
                            <div className="space-y-1">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
                                    <Input
                                        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="email"
                                        placeholder="mail@example.com"
                                        name="email"
                                        field="email"
                                        type="text"
                                        value={formState.email.value}
                                        onChangeHandler={handleInputValueChange}
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.email.showError}
                                        validationMessage={emailValidationMessage}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">Password</label>
                                    <Input
                                        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="password"
                                        placeholder="Enter your password"
                                        name="password"
                                        field="password"
                                        type="password"
                                        value={formState.password.value}
                                        onChangeHandler={handleInputValueChange}
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.password.showError}
                                        validationMessage={validatePasswordMessage}
                                    />
                                </div>
                            </div>

                            <button
                                className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                type="submit"
                                onClick={handleLogin}
                                disabled={isSubmitButtonDisabled}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <span onClick={switchAuthHandler} className="text-center"> No account? <a className="text-blue-500">Create one</a> </span>
                </div>
            </div>
        </div>
    );
};
