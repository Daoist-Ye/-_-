import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { CustomButton } from "./";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";
// import { register } from "../api/index.js";


const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#131417]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
      {!isActive ? (
        <img src={imgUrl} z-index="5" alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img src={imgUrl} z-index="5" alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
      )}
    </div>
  )

  const refreshPage = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    // if(address){
      setTimeout(() => {
        console.log("address", address);
      }, 5000);
    // }
  }, []);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-9  bg-slate-600 p-4  rounded-full">
      
      <div className="flex justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon 
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if(!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
          </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? 'Start a campaign' : 'Connect'}
          styles={address ? 'bg-[#000] text-blue-600' : ' bg-slate-600 text-[#fcfcfc]'}
          handleClick={() => {
            if(address) navigate('create-campaign')
            else connect()
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#fcfcfc] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#fcfcfc] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect"}
              styles={" bg-blue-500 text-white"}
              handleClick={() => {
                if (address) navigate("create-campaign");
                else {
                  connect();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
