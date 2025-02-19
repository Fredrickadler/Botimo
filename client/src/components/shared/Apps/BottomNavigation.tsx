import { AiOutlineThunderbolt } from "react-icons/ai";
import { CiHome } from "react-icons/ci";
import { MdLeaderboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
    const location = useLocation().pathname;
    console.log(location);

    return (
        <div className="grid grid-cols-4 gap-4 sticky bottom-0 bg-black py-2">
            <Link to={'/'}>
                <div className="text-white flex justify-center items-center flex-col cursor-pointer">
                    <CiHome className="text-xl" />
                    <p className={`px-2 font-montserrat font-medium rounded-full  ${location !== '/' ? 'bg-transparent text-white' : 'bg-white text-black'}  text-xs`}>Home</p>
                </div>
            </Link>
            <Link to={'/collaboration'}>
                <div className="text-white flex justify-center items-center flex-col cursor-pointer">
                    <AiOutlineThunderbolt className="text-xl" />
                    <p className={`px-2 font-montserrat font-medium rounded-full  ${location !== '/collaboration' ? 'bg-transparent text-white' : 'bg-white text-black'}  text-xs`}>Collaboration</p>
                </div>
            </Link>
            <Link to={'/leaderboard'}>
                <div className="text-white flex justify-center items-center flex-col cursor-pointer">
                    <MdLeaderboard className="text-xl" />
                    <p className={`px-2 font-montserrat font-medium rounded-full  ${location !== '/leaderboard' ? 'bg-transparent text-white' : 'bg-white text-black'}  text-xs`}>Leaderboard</p>
                </div>
            </Link>
            <Link to={'/friends'}>
                <div className="text-white flex justify-center items-center flex-col cursor-pointer">
                    <CiHome className="text-xl" />
                    <p className={`px-2 font-montserrat font-medium rounded-full  ${location !== '/friends' ? 'bg-transparent text-white' : 'bg-white text-black'}  text-xs`}>Friends</p>
                </div>
            </Link>
        </div>
    );
};

export default BottomNavigation;