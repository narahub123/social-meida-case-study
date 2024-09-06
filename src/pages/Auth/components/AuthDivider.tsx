import "./authDivider.css";

interface AuthDividerProps {
  text: string;
}
const AuthDivider = ({ text }: AuthDividerProps) => {
  return (
    <div className="auth-divider">
      <div className="auth-divider-container">
        <p className="auth-divider-line"></p>
        <span className="auth-divider-text">{text}</span>
        <p className="auth-divider-line"></p>
      </div>
    </div>
  );
};

export default AuthDivider;
