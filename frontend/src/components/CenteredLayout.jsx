'use client';

const CenteredLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-4xl p-6">{children}</div>
    </div>
  );
};

export default CenteredLayout;
