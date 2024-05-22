import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../shared/hooks/useUserDetails.jsx";

const NavButton = ({ text, onClickHandler }) => {
    return (
        <a
            href="#"
            className="text-md no-underline text-black hover:text-blue-dark ml-2 px-1"
            onClick={onClickHandler}
        >
            {text}
        </a>
    );
};

export const Navbar = () => {
    const {isLogged, logout} = useUserDetails();
    const navigate = useNavigate();

    const handleNavigateToAuthPage = () => {
        navigate('/auth')
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <nav className="font-sans flex flex-col text-center content-right sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white shadow sm:items-baseline w-full">
            <div className="sm:mb-0 self-center">
                <NavButton text="Hotel" onClickHandler={handleNavigateToAuthPage}/>
            </div>
            <div>
            {!isLogged ? (
                 <NavButton text="Login" onClickHandler={handleNavigateToAuthPage} />
                ) : (
                <div>
                    <NavButton text="Logout" onClickHandler={handleLogout} />
                </div>
                )}
            </div>
        </nav>
    );

}