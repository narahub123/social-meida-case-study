import "./postImages.css";
import { useRef, useState } from "react";
import { PostInfoType } from "../../../types/post.types";

interface PostImagesProps {
  postInfo: PostInfoType;
  setPostInfo: React.Dispatch<React.SetStateAction<PostInfoType>>;
}

const PostImages = ({ postInfo, setPostInfo }: PostImagesProps) => {
  const imagesRef = useRef<HTMLDivElement>(null);
  const [imgNum, setImgNum] = useState(0);

  // 사진 dot 핸들러
  const handleDots = (index: number) => {
    if (!imagesRef.current) return;

    const width = Math.floor(imagesRef.current.getBoundingClientRect().width);

    imagesRef.current.style.setProperty(
      "--preview-width",
      `-${width * index}px`
    );

    setImgNum(index);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!imagesRef.current || !postInfo.images) return;

    let idx = 0;
    const width = Math.floor(imagesRef.current.getBoundingClientRect().width);
    if (e.key === "ArrowRight" && imgNum + 1 < postInfo.images.length) {
      idx = imgNum + 1;
    }

    if (e.key === "ArrowLeft" && imgNum - 1 >= 0) {
      idx = imgNum - 1;
    }

    imagesRef.current.style.setProperty("--preview-width", `-${width * idx}px`);

    setImgNum(idx);
  };

  return (
    <div className="post-images-wrapper">
      <div
        className="post-images"
        ref={imagesRef}
        tabIndex={1}
        onKeyDown={(e) => handleKeydown(e)}
      >
        {postInfo.images?.map((img) => (
          <img src={img} className="post-images-photo" />
        ))}
      </div>
      <div className="post-images-dots">
        {postInfo.images?.map((_, i) => (
          <p
            className={`dot-indicator${imgNum === i ? " selected" : ""}`}
            onClick={() => handleDots(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default PostImages;
