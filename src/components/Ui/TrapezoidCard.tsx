import React from "react";

const TrapezoidCard: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-[400px] h-10 bg-blue-100 relative"
        style={{
          clipPath: "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)",
          border: "1px solid #dbeafe", 
        }}
      ></div>

  
      <p className="text-gray-500 text-sm mt-2">All eyes this way please</p>
    </div>
  );
};

export default TrapezoidCard;
