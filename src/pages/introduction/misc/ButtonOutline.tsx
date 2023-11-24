
const ButtonOutline = ({ children }:{children: any}) => {
  return (
    <button className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-purple-500 text-purple-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-purple-500 hover:text-white-500 transition-all hover:shadow-purple ">
      {" "}
      {children}
    </button>
  );
};

export default ButtonOutline;
