import './Button.scss';

const Button = ({ btnClass, btn, disable, clicksEvents }) => {
  return (
    <button className={btnClass} disabled={disable} onClick={clicksEvents}>
      {btn}
    </button>
  );
};
export default Button;
