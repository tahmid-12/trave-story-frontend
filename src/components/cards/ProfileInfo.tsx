// import { getInitials } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../features/auth/auththunks";

const ProfileInfo = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onLogOut = () => {
        // localStorage.clear();
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
               {/* {getInitials()}  */}
               WJ
            </div>
            <div>
                <p className="text-sm font-medium">Dustin</p>
                <button className="text-sm text-slate-700 underline hover:cursor-pointer" onClick={onLogOut}>Log Out</button>
            </div>
        </div>
    )
}

export default ProfileInfo