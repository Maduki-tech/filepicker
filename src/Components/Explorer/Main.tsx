import React from 'react';

const MainContent = () => {
  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">Files</h2>
      <ul className="space-y-2">
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h4.586a1 1 0 01.707.293l2.414 2.414A1 1 0 0112 6.414V9h5a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 01-.293.707l-2.414 2.414A1 1 0 0112 10H4a2 2 0 00-2 2v6a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1H4z" clipRule="evenodd" />
          </svg>
          Document.txt
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2V3a1 1 0 00-1-1H7zm0 2h6v1H7V4zm0 3h6v1H7V7zm0 3h6v1H7v-1zm0 3h4v1H7v-1zm0 3h4v1H7v-1zm6-6h1v6h-1V7zm-3 6h1v-3h-1v3zm-3 0h1v-3H7v3z" clipRule="evenodd" />
          </svg>
          Image.jpg
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.707 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 9H3a1 1 0 010-2h11.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Video.mp4
        </li>
      </ul>
    </div>
  );
};

export default MainContent;

