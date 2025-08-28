import React from 'react'

type GridCardProps = {
    children?: React.ReactNode;
    className?: string;
};

const GridCard: React.FC<GridCardProps> = ({
    children,
    className = "row-span-1 col-span-1",
}) => {
    return (
        <div
            className={`bg-gray rounded-xl p-5 shadow-sm hover:shadow-md cursor-default hover:scale-101 transition-all duration-300 ease-in-out ${className}`}
        >
            {children}
        </div>
    );
};

export default GridCard