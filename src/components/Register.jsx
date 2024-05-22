import { useState } from "react";
import { Input } from "./Input.jsx";
import { emailValidationMessage, validateEmail, validatePassword, validatePasswordMessage } from './shared/validators';
import { useRegister } from "./shared/hooks/useRegister.jsx";

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister();
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const [formState, setFormState] = useState({
        email: {
            value: "",
            isValid: false,
            showError: false,
        },
        username: {
            value: "",
            isValid: true,
            showError: false,
        },
        password: {
            value: "",
            isValid: false,
            showError: false,
        },
        confirmPassword: {
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

        if (field === 'confirmPassword') {
            setPasswordMismatch(value !== formState.password.value);
        }
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
            case "confirmPassword":
                isValid = validatePassword(value) && value === formState.password.value;
                setPasswordMismatch(value !== formState.password.value);
                break;
            default:
                isValid = true;
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

    const handleRegister = (event) => {
        event.preventDefault();
        if (formState.password.value !== formState.confirmPassword.value) {
            setPasswordMismatch(true);
            return;
        }
        register(formState.email.value, formState.username.value, formState.password.value);
    };

    const isSubmitButtonDisabled = isLoading || !formState.email.isValid || !formState.password.isValid || !formState.confirmPassword.isValid || passwordMismatch;

    return (
        <div className="bg-white">
            <div className="flex h-screen flex-col items-center justify-center">
                <div className="max-h-auto mx-auto max-w-xl">
                    <div className="mb-8 space-y-3">
                        <p className="text-xl font-semibold">Register</p>
                        <p className="text-gray-500">Create an account to get started!</p>
                    </div>
                    <form className="w-full" onSubmit={handleRegister}>
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
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="username">Username</label>
                                    <Input
                                        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="username"
                                        placeholder="Enter your username"
                                        name="username"
                                        field="username"
                                        type="text"
                                        value={formState.username.value}
                                        onChangeHandler={handleInputValueChange}
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.username.showError}
                                        validationMessage={"Username is required"}
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
                            <div className="space-y-1">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="confirmPassword">Confirm Password</label>
                                    <Input
                                        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="confirmPassword"
                                        placeholder="Confirm your password"
                                        name="confirmPassword"
                                        field="confirmPassword"
                                        type="password"
                                        value={formState.confirmPassword.value}
                                        onChangeHandler={handleInputValueChange}
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.confirmPassword.showError}
                                        validationMessage={"Passwords must match"}
                                    />
                                    {passwordMismatch && <p className="text-red-500 text-sm">Passwords do not match</p>}
                                </div>
                            </div>

                            <button
                                className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                type="submit"
                                onClick={handleRegister}
                                disabled={isSubmitButtonDisabled}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <span onClick={switchAuthHandler} className="text-center"> Already have an account? <a className="text-blue-500 cursor-pointer">Login</a> </span>
                </div>
            </div>
        </div>
    );
};
