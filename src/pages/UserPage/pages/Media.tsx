import "./media.css";

const Media = () => {
  const images = [
    "/test/profile1.jpg",
    "/test/profile2.jpg",
    "/test/profile1.jpg",
    "/test/profile2.jpg",
  ];
  return (
    <div className="media">
      <ul className="media-container">
        {images.map((image) => (
          <li className="media-item">
            <img src={image} alt="" className="media-item-img" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Media;
