export interface TravelStory {
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

export interface GetAllStoriesResponse {
  message: string;
  travelStories: TravelStory[];
}