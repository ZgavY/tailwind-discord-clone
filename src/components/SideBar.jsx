const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col
                  bg-black shadow-lg">
      <SideBarIcon icon="💰" text="E-Money Society" />
      <Divider />
      <SideBarIcon icon="₿" text="Crypto Trading" />
      <SideBarIcon icon="💱" text="Forex" />
      <SideBarIcon icon="📈" text="Stocks" />
      <SideBarIcon icon="🎨" text="NFTs" />
      <Divider />
      <SideBarIcon icon="➕" text="Adaugă Curs" />
    </div>
  );
};

const SideBarIcon = ({ icon, text = 'tooltip 💡' }) => (
  <div className="relative flex items-center justify-center 
                h-12 w-12 mt-2 mb-2 mx-auto  
              bg-gray-800 hover:bg-green-500 hover:text-black
                hover:rounded-xl rounded-3xl
                transition-all duration-300 ease-linear
                cursor-pointer shadow-lg group">
    <span className="text-2xl text-green-500 group-hover:text-black">{icon}</span>
    
    <span className="absolute w-auto p-2 m-2 min-w-max left-14
                   bg-gray-900 text-green-500
                   rounded-md shadow-md
                   text-xs font-bold
                   transition-all duration-100 scale-0 origin-left
                   group-hover:scale-100 border border-green-500/20 z-50">
      {text}
    </span>
  </div>
);

const Divider = () => <hr className="bg-green-500/20 border border-green-500/10 rounded-full mx-2" />;

export default SideBar;