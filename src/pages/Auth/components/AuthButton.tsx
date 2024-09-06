import "./authButton.css";

interface AuthButtonProps {
  logo: string;
  text: string;
  disabled?: boolean;
}

const AuthButton = ({ logo, text, disabled }: AuthButtonProps) => {
  return (
    <button
      className={`auth-button${disabled ? " disabled" : ""}`}
      disabled={disabled}
    >
      <div className="auth-button-container">
        {logo && <img src={logo} alt="로고" className="auth-button-logo" />}
        <p className="auth-button-text">{text}</p>
      </div>
    </button>
  );
};

export default AuthButton;
