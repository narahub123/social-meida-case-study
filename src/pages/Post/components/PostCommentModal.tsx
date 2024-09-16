import "./postCommentModal.css";

interface PostCommentModalProps {
  userInfo: {
    [key: string]: string | boolean;
  };
  setOpenCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostCommentModal = ({
  userInfo,
  setOpenCommentModal,
}: PostCommentModalProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };
  return (
    <div className="post-comment-modal">
      <div className="post-comment-modal-wrapper">
        <div className="post-comment-modal-container">
          <section className="post-comment-modal-header">
            @{userInfo.userId} 님에게 보내는 답글
          </section>
          <section className="post-comment-modal-content">
            <div className="post-comment-modal-left">
              <img
                src={userInfo.userPic as string}
                alt="사진"
                className="post-comment-modal-profile"
              />
            </div>
            <div className="post-comment-modal-right">
              <input
                type="text"
                className="post-comment-modal-input"
                placeholder="답글하기"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </section>
          <section className="post-comment-modal-footer">
            여러가지 아이콘들
          </section>
          <section className="post-comment-modal-btns">
            <button
              className="post-comment-modal-close button"
              onClick={() => setOpenCommentModal(false)}
            >
              취소
            </button>
            <button className="post-comment-modal-upload button">
              게시하기
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostCommentModal;
