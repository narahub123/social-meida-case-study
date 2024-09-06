import "./loginDisabledInput.css";

interface LoginDisabledInputProps {
  title: string;
  value: string;
}

const LoginDisabledInput = ({ title, value }: LoginDisabledInputProps) => {
  return (
    <div className="login-disabled-input">
      <p className={`login-disabled-input-title`}>{title}</p>
      <input
        type="text"
        className={`login-disabled-input-input`}
        disabled
        defaultValue={value}
      />
    </div>
  );
};

export default LoginDisabledInput;
