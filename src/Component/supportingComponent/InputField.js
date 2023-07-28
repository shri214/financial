import './InputField.scss';

const InputField = ({ label, type, place, value, clickEvent }) => {
  return (
    <div className="input-field">
      <p>{label}</p>
      <input
        type={type}
        placeholder={place}
        value={value}
        onChange={clickEvent}
      />
    </div>
  );
};
export default InputField;
