import { useState } from "react";
import { GrMapLocation } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import moment from "moment";
import {
  useEditIsFavouriteMutation,
} from "../../features/travel/travelApi";

interface TravelStory {
  _id: string;
  title: string;
  story: string;
  visitedLocation: string[];
  isFavourite: boolean;
  userId: string;
  imageUrl: string;
  visitedDate: string;
  createdOn: string;
}

interface TravelStoryCardProps {
  story: TravelStory;
}

const TravelStoryCard = ({ story }: TravelStoryCardProps) => {

  const [editIsFavourite, { isLoading }] = useEditIsFavouriteMutation();

  const [isFavourite, setIsFavourite] = useState(story.isFavourite);

  const toggleFavourite = async () => {
    const updatedStatus = !isFavourite;
    setIsFavourite(updatedStatus); 

    try {
      await editIsFavourite({
        id: story._id,
        data: { isFavourite: updatedStatus },
      }).unwrap();
      
    } catch {
      console.error("Toggle failed. Reverting...");
      setIsFavourite(!updatedStatus);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer">
      <img
        src={story.imageUrl}
        alt={story.title}
        className="w-full h-56 object-cover rounded-lg"
      />

      <button
        onClick={toggleFavourite}
        disabled={isLoading}
        className="w-12 h-12 flex items-center justify-center bg-orange-50 rounded-lg border border-white/30 absolute top-4 right-4 transition-colors duration-200"
        title={isFavourite ? "Unfavourite" : "Mark as favourite"}
      >
        <FaHeart
          className={`icon-btn text-xl transition-colors duration-200 ${
            isFavourite ? "text-red-500" : "text-gray-300"
          }`}
        />
      </button>

      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-sm font-medium">{story.title}</h6>
            <span className="text-xs text-slate-500">
              {story?.visitedDate
                ? moment(story.visitedDate).format("DD MM YYYY")
                : "-"}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 mt-2">
          {story.story.slice(0, 60)}
        </p>

        <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-3 px-2 py-1">
          <GrMapLocation className="text-xs" />
          {story.visitedLocation.map((item, index) => (
            <span key={index}>
              {item}
              {index < story.visitedLocation.length - 1 && ", "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelStoryCard;