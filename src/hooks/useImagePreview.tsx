import { useState } from "react";

const useImagePreview = () => {
  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setImgUrl(null);
    }
  };

  return { handleImageChange, imgUrl, setImgUrl };
};

export default useImagePreview;
