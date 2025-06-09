import Navbar from "../../components/common/Navbar";
import TravelStoryCard from "../../components/cards/TravelStoryCard";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1">

            <div className="grid grid-cols-2 gap-4">
              <TravelStoryCard />
              <TravelStoryCard />
            </div>

          </div>

          <div className="w-[320px]"></div>
        </div>
      </div>
    </>
  )
}

export default Home