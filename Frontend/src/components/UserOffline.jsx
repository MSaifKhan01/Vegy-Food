



import React from 'react';



const UserOffline = () => {
    return (
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-white font-bold text-4xl mb-8">YOU ARE OFFLINE 🔴</h1>
                <h4 className="text-gray-300 text-lg mb-8">Please check your internet connection</h4>
               
                <a href="/" className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg">RETRY</a>
            </div>
        </div>
    );
}

export default UserOffline;
