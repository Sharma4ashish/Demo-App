const Input = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      <label className="text-gray-400 text-sm">{label}</label>

      <input
        className={`w-full px-4 py-2 mt-1 rounded bg-gray-800 border ${
          error ? "border-red-500" : "border-gray-700"
        } text-white`}
        {...props}
      />

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
};

export default Input;