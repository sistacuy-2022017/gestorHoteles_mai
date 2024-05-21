import { useState } from "react";
import { Login } from "../../components/Login";


export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true)

    const handleAuthPageToggle = () => {
        setIsLogin((prev) => !prev)
    }

    return (
        <div>
            {isLogin ? (
                <Login switchAuthHandler={handleAuthPageToggle} />
            ) : (
                <p>oli</p>
               /* <Register switchAuthHandler={handleAuthPageToggle} /> */
            )}
        </div>
    )
}