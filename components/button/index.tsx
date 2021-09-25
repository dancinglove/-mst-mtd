import React, { ButtonHTMLAttributes } from "react";
// import './index.less';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
const Button: React.FC<ButtonProps> = (props) => {
  const { children } = props;
  return (
    <div className="btn-warp">
      <button type="button">{children}</button>
    </div>
  );
};

export default Button;
export type { ButtonProps };
