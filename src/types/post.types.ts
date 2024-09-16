export interface PostInfoType {
  text: string | undefined;
  images: string[] | undefined;
  postDate: Date;
  userId: string;
  comments: string[];
  retweets: string[];
  favorites: string[];
  views: number;
}
