const ButtonPrimary = ({ children }:{children: any}) => {
  return (
    <button
      className={`py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg bg-purple-500 hover:shadow-purple-md transition-all outline-none`}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
