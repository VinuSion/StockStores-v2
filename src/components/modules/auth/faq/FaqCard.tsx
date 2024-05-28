import { useState } from 'react';

interface CardProps {
  image: JSX.Element;
  title: string;
  description: string;
}

function FaqCard({ image, title, description }: CardProps) {
  const [hoveredMain, isHoverOn] = useState(false);

  return (
    <div
      className={`relative rounded-lg bg-primary w-50 h-64 hover:bg-secondary transition duration-300 ease-in-out flex justify-center items-center`}
      onMouseEnter={() => {
        isHoverOn(true);
      }}
      onMouseLeave={() => {
        isHoverOn(false);
      }}
    >
      <div
        className={`absolute inset-0 flex gap-2 flex-col justify-center items-center px-4 md:px-8 py-5 opacity-${hoveredMain ? '0' : '100'} transition-opacity duration-900 ease-in-out`}
      >
        {image}
        <h3 className="text-foreground text-sm text-center">{title}</h3>
      </div>
      <div
        className={`absolute inset-0 flex gap-2 flex-col justify-center items-center px-4 md:px-8 py-5 opacity-${hoveredMain ? '100' : '0'} transition-opacity duration-900 ease-in-out`}
      >
        <h3 className="text-primary text-sm text-center">{hoveredMain ? description : ''}</h3>
      </div>
    </div>
  );
}

export default FaqCard;
