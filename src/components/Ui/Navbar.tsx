import { SearchOutlined, MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../utils/auth";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Dropdown, Menu } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Drawer } from "antd";
import BookingListLoginPrompt from "./BookingListLoginPrompt";

interface Navbar {

  fullname: string;
}

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  console.log('📢📣',user)
 const [open, setOpen] = useState(false);
    

  const menu = (
  <Menu>
    <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
      Profile
    </Menu.Item>
    <Menu.Item key="settings" icon={<SettingOutlined />} onClick={() => navigate('/settings')}>
      Settings
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
      Logout
    </Menu.Item>
  </Menu>
);

const handleOpenOrders = () => {
  navigate('/movies/Booking/list');
  setOpen(false); // Close the drawer after navigating
}



  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <div className="flex items-center gap-2" onClick={()=>navigate('/')}>
          <img
            src="https://in.bmscdn.com/webin/common/icons/logo.svg"
            alt="logo"
            className="h-8"
          />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-4">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full">
            <SearchOutlined className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for Movies, Events, Plays, Sports and Activities"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-gray-700 text-sm">Chennai</span>
          {
            user ? (<Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
  <div className="flex items-center gap-2 cursor-pointer">
    <img 
      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-300 cursor-pointer transition" 
      src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXUFxQ6HZVcK1r5dnZ1Qd4KTujPUBUzu1ZDQ&s`} 
      alt="User avatar"
    />
    <p className="flex items-center">{user?.fullname || user?.fullname}</p>
  </div>
</Dropdown>) : (<button className="bg-[#f84464] text-white px-4 py-1 rounded text-sm" onClick={()=>navigate('/auth')}>Sign In</button>)
          }
         
          
          <MenuOutlined className="text-2xl cursor-pointer"  onClick={() => setOpen(true)} />
            <Drawer
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        closeIcon={false} // We'll use our own close button
        bodyStyle={{ padding: 0 }} // Remove default padding
        headerStyle={{ display: "none" }} // Remove default header
      >
        {/* Header */}
        <div className="bg-red-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-white text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <nav className="divide-y divide-gray-200">
          <p
          onClick={handleOpenOrders}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
          >
            <ShoppingCartOutlined className="text-lg text-red-500" />
            <span className="text-gray-800 font-medium">Your Orders</span>
          </p>
          <p
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
          >
            <UserOutlined className="text-lg text-red-500" />
            <span className="text-gray-800 font-medium">Profile</span>
          </p>
        </nav>
      </Drawer>
        </div>
      </div>

      {/* Bottom Menu */}
      <div className="bg-white border-t border-gray-200 text-sm px-4 py-2 flex gap-4 text-gray-600">
        <span>Movies</span>
        <span>Stream</span>
        <span>Events</span>
        <span>Plays</span>
        <span>Sports</span>
        <span>Activities</span>
      </div>
    </nav>
  );
}
