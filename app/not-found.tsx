import Link from 'next/link';

const Custom404 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-6xl font-extrabold mb-4">404</h1>
            <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
            <Link href="/">
                <div className="px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-400 transition-colors">
                    Go Back Home
                </div>
            </Link>
        </div>
    );
};

export default Custom404;
