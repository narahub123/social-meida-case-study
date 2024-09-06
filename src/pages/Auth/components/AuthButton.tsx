import { LuLoader2 } from "react-icons/lu";
import "./authButton.css";

interface AuthButtonProps {
  logo: string;
  text: string;
  disabled?: boolean;
  width?: string;
  loading?: boolean;
}

const AuthButton = ({
  logo,
  text,
  disabled,
  width = "300px",
  loading = false,
}: AuthButtonProps) => {
  return (
    <button
      className={`auth-button${disabled ? " disabled" : ""}`}
      disabled={disabled}
      style={{ width }}
    >
      <div className="auth-button-container">
        {logo && <img src={logo} alt="로고" className="auth-button-logo" />}
        <p className="auth-button-text">
          {loading ? <LuLoader2 className="auth-button-spinner" /> : text}
        </p>
      </div>
    </button>
  );
};

export default AuthButton;
