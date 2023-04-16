import { useState } from "react";
import "../styles/FormInput.css";
import "../styles/Register.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleBlur = (e) => {
    setFocused(false);
  };

  const isValid = () => {
    const { pattern, required, value } = inputProps;

    if (required && value === "") return false;

    const regex = pattern ? new RegExp(pattern) : null;
    if (regex && !regex.test(value)) return false;

    return true;
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        className="input-register"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      {!isValid() && focused && (
        <span style={{ color: "red", display: "block" }}>{errorMessage}</span>
      )}
    </div>
  );
};

export default FormInput;
