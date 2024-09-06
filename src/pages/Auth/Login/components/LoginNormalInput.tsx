import { debounce } from "../../../../utils/debounce";
import "./loginNormalInput.css";

interface LoginNormalInputProps {
  focused: boolean;
  divRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const LoginNormalInput = ({
  focused,
  divRef,
  inputRef,
  setValue,
}: LoginNormalInputProps) => {
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const debouncedHandleValue = debounce<typeof handleValue>(handleValue, 500);
  return (
    <div
      className={`login-normal-input${focused ? " focused" : ""}`}
      ref={divRef}
    >
      <p className={`login-normal-input-title${focused ? " focused" : ""}`}>
        사용자 아이디 혹은 이메일 주소
      </p>
      <input
        type="text"
        ref={inputRef}
        className={`login-normal-input-input${focused ? " focused" : ""}`}
        onChange={debouncedHandleValue}
      />
    </div>
  );
};

export default LoginNormalInput;
