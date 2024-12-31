import ButtonSvg from "../assets/svg/ButtonSvg";

const Button = ({ className, href, onClick, children, px, white }) => {
  const classess = `button relative inline-flex items-center justfy-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;

  const spanClassess = "relative  z-10";

  const renderButton = () => (
    <button className={classess} onClick={onClick}>
      <span className={spanClassess}>{children}</span>
      {ButtonSvg(white)}
    </button>
  );

  const renderLink = () => (
  
    <a href={href} className={classess}>

    <span className={spanClassess}>{children}</span>

    {ButtonSvg(white)}
  </a>
    
    );

  return href ? renderLink() : renderButton();
};

export default Button;
