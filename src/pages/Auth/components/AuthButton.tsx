import "./authButton.css";

interface AuthButtonProps {
  logo: string;
  text: string;
}

const AuthButton = ({ logo, text }: AuthButtonProps) => {
  return (
    <button className="auth-button">
      <div className="auth-button-container">
        {logo && <img src={logo} alt="로고" className="auth-button-logo" />}
        <p className="auth-button-text">{text}</p>
      </div>
    </button>
  );
};

export default AuthButton;
