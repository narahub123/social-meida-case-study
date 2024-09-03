import "./stage3.css";
import { useRef, useState } from "react";
import { Stage0Props } from "./Stage0";
import { MdAddAPhoto, MdOutlineAddAPhoto } from "react-icons/md";
import { handleNext } from "../../../../utils/auth";
import { UserSignupValidType } from "../../../../types/auth";

const Stage3 = ({ userSignup, setUserSignup, setStage }: Stage0Props) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [isValid, setIseValid] = useState<UserSignupValidType>({
    image: false,
  });

  return (
    <>
      <section className="email-signup-section">
        <div className="email-signup-title">프로필 사진 선택하기</div>
        <p className="email-signup-detail">
          마음에 드는 사진이 있나요? 지금 업로드 하세요.
        </p>
      </section>
      <section className="email-signup-section">
        {/* 이미지 업로드 */}
        <div className="email-signup-image-wrapper">
          <input type="file" ref={imageRef} hidden />
          <img
            src="./images/default-profile.png   "
            alt="사진"
            className="email-signup-image-item"
            onClick={() => imageRef.current?.click()}
          />
          <i
            className="email-signup-image-icon"
            onClick={() => imageRef.current?.click()}
          >
            {/* <MdOutlineAddAPhoto />  */}
            <MdAddAPhoto />
          </i>
        </div>
      </section>
      <section className="email-signup-section">
        <button
          className={`email-signup-button${isValid.image ? " valid" : ""}`}
          onClick={() => handleNext("userId", setStage)}
        >
          다음
        </button>
      </section>
    </>
  );
};

export default Stage3;
