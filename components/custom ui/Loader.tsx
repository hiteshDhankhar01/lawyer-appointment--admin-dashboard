import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="w-4 h-4 bg-gray-100 rounded-full animate-bounce"
                        style={{
                            animationDelay: `${i * 0.2}s`,
                        }}
                    ></div>
                ))}
            </div>
        </div>

    );
};

export default Loader;
