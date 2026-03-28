const Card = ({ children }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md w-full max-w-md">
      {children}
    </div>
  );
};

export default Card;