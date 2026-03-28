const Button = ({ children, disabled, ...props }) => {
  return (
    <button
      disabled={disabled}
      className={`w-full py-2 rounded font-semibold ${
        disabled
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-yellow-400 text-black hover:bg-yellow-300"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;