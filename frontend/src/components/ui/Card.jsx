const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-gray-900 p-6 rounded-xl shadow-md w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;