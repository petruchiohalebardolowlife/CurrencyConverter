import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  loading: boolean;
  error?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, loading, error }) => {
  const defaultStyles = "flex flex-col justify-center items-center h-screen";
  const headerStyles = "text-4xl font-bold text-gray-700 py-8";

  if (loading) {
    return (
      <div className={defaultStyles}>
        <h1 className={headerStyles}>Загрузка...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className={defaultStyles}>
        <h1 className={headerStyles}>Ошибка</h1>
      </div>
    );
  }

  return (
    <div className={defaultStyles}>
      <h1 className={headerStyles}>Конвертер валют</h1>
      {children}
    </div>
  );
};

export default Layout;
