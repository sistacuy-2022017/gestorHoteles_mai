import { useNavigate } from "react-router-dom";


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
    const navigate = useNavigate();

    const handleNavigateToAuthPage = () => {
        navigate('/auth')
    }

    return (
        <nav className="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white shadow sm:items-baseline w-full">
            <div className="sm:mb-0 self-center">
                <NavButton text="Login" onClickHandler={handleNavigateToAuthPage}/>
            </div>
        </nav>
    );

}