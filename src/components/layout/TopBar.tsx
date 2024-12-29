import React from 'react';
import { Bell, Search } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center flex-1">
        <div className="max-w-lg w-full lg:max-w-xs relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#6A6A4B] focus:border-[#6A6A4B] sm:text-sm"
            placeholder="Search"
            type="search"
          />
        </div>
      </div>
      
      <div className="ml-4 flex items-center md:ml-6">
        <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
          <Bell className="h-6 w-6" />
        </button>
        
        <div className="ml-3 relative">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}