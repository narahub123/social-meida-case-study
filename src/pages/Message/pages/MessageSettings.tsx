import { useState } from "react";
import "./messageSettings.css";
import { LuArrowLeft, LuCheckCircle2, LuCircle } from "react-icons/lu";
import { MessageSettingsType } from "../../../types/settings.types";
import { FaCheckCircle, FaCheckSquare } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MessageSettings = () => {
  const [messageSettings, setMessageSettings] = useState<MessageSettingsType>({
    permission: "none",
    showRead: true,
  });
  return (
    <div className="message-settings">
      <section className="message-settings-header">
        <Link to={`/messages`} className="message-settings-header-past">
          <LuArrowLeft className="icon" />
        </Link>
        <span className="message-settings-header-title">쪽지</span>
      </section>
      <section className="message-settings-content">
        <div className="message-settings-item">
          <p className="message-settings-item-title">
            다음 사용자의 쪽지 요청 허용
          </p>
          <p className="message-settings-item-detail">
            내가 팔로우하는 사용자가 보낸 쪽지는 항상 받을 수 있습니다.
          </p>
          <ul className="message-settings-choice-container">
            <li className="message-settings-choice">
              <span className="message-settings-choice-text">받지 않음</span>
              {messageSettings.permission === "none" ? (
                <FaCheckCircle className="message-settings-choice-icon checked icon" />
              ) : (
                <LuCircle
                  className="message-settings-choice-icon icon"
                  onClick={() =>
                    setMessageSettings((prev) => ({
                      ...prev,
                      permission: "none",
                    }))
                  }
                />
              )}
            </li>
            <li className="message-settings-choice">
              <span className="message-settings-choice-text">
                인증된 사용자
              </span>
              {messageSettings.permission === "permitted" ? (
                <FaCheckCircle className="message-settings-choice-icon checked icon" />
              ) : (
                <LuCircle
                  className="message-settings-choice-icon icon"
                  onClick={() =>
                    setMessageSettings((prev) => ({
                      ...prev,
                      permission: "permitted",
                    }))
                  }
                />
              )}
            </li>
            <li className="message-settings-choice">
              <span className="message-settings-choice-text">모든 사람</span>
              {messageSettings.permission === "all" ? (
                <FaCheckCircle className="message-settings-choice-icon checked icon" />
              ) : (
                <LuCircle
                  className="message-settings-choice-icon icon"
                  onClick={() =>
                    setMessageSettings((prev) => ({
                      ...prev,
                      permission: "all",
                    }))
                  }
                />
              )}
            </li>
          </ul>
        </div>
        <div className="message-settings-item">
          <div className="message-settings-item-header">
            <p className="message-settings-item-title">읽음 표시 보기</p>
            {messageSettings.showRead ? (
              <FaCheckSquare
                className="message-settings-choice-icon checked icon"
                onClick={() =>
                  setMessageSettings((prev) => ({
                    ...prev,
                    showRead: false,
                  }))
                }
              />
            ) : (
              <FaRegSquare
                className="message-settings-choice-icon icon"
                onClick={() =>
                  setMessageSettings((prev) => ({
                    ...prev,
                    showRead: true,
                  }))
                }
              />
            )}
          </div>
          <p className="message-settings-item-detail">
            쪽지를 주고 받는 사람들이 내가 메시지를 확인했을 때를 알 수 있도록
            허용합니다. 읽음 표시는 쪽지 요청에 나타나지 않습니다.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MessageSettings;
