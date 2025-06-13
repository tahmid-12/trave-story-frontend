import Navbar from "../../components/common/Navbar";
import TravelStoryCard from "../../components/cards/TravelStoryCard";
import { useGetAllStoriesQuery } from "../../features/travel/travelApi";

const Home = () => {
  const { data, isLoading, error } = useGetAllStoriesQuery();

  // console.log("DATA", data);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1">

            <div className="grid grid-cols-2 gap-4">
              {isLoading && <p>Loading...</p>}
              {error && <p className="text-red-500">Failed to load stories.</p>}
              {data?.travelStories?.map((story) => (
                <TravelStoryCard key={story._id} story={story} />
              ))}
            </div>

          </div>

          <div className="w-[320px]"></div>
        </div>
      </div>
    </>
  )
}

export default Home