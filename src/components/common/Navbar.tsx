import LOGO from "../../assets/images/LOGO.jpg";
import ProfileInfo from "../cards/ProfileInfo";

const Navbar = () => {
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
        <img src={LOGO} alt="Travel Story" className="h-17"/>
        <ProfileInfo />
    </div>
  )
}

export default Navbar