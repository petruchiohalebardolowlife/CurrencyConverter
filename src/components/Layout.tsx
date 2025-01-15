import React from "react";

interface LayoutProps {
  header: string;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, header }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold text-gray-700 py-8">{header}</h1>
      {children}
    </div>
  );
};

export default Layout;
