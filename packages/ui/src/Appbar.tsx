import React from 'react';

interface User {
  name: string | null;
  profilePicture?: string;
}

interface AppbarProps {
  user?: User;
  onSignin: () => void;
  onSignout: () => void;
}

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
  return (
    <button 
      className={`px-3 py-2 rounded-md text-sm font-medium ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export const Appbar: React.FC<AppbarProps> = ({
  user,
  onSignin,
  onSignout
}) => {
  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between   h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold">EasyPaisa</span>
            </div>
            <div className="hidden sm:ml-6 content-center sm:flex sm:space-x-8">
              <a href="#" className="text-white hover:bg-green-700 px-3 my-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="#" className="text-white hover:bg-green-700 px-3 my-3  py-2 rounded-md text-sm font-medium">
                Send Money
              </a>
              <a href="#" className="text-white hover:bg-green-700 px-3 my-3  py-2 rounded-md text-sm font-medium">
                Mobile Load
              </a>
              <a href="#" className="text-white hover:bg-green-700 px-3 my-3  py-2 rounded-md text-sm font-medium">
                Bill Payments
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="text-white hover:bg-green-700 p-1 rounded-full">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="ml-3 text-white hover:bg-green-700 p-1 rounded-full">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div className="ml-3 relative">
              {user ? (
                <div className="flex items-center">
                  {user.profilePicture && (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.profilePicture}
                      alt={user.name || "User"}
                    />
                  )}
                  <span className="ml-2 text-white text-sm font-medium">{user.name}</span>
                  <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <Button onClick={onSignout} className="ml-2 text-white hover:bg-green-700">
                    Logout
                  </Button>
                </div>
              ) : (
                <Button onClick={onSignin} className="text-white hover:bg-green-700">
                  Login
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <button className="text-white hover:bg-green-700 p-2 rounded-md">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;