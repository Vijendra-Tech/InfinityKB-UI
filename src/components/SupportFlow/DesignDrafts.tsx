import React from 'react';
import designImage from '../../assets/Desig-01.png';
import designIdea from '../../assets/Design02.png';  

const DesignDrafts: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Design Drafts</h3>
      <div className="overflow-auto">
      <img 
          src={designIdea} 
          alt="Design Draft 02" 
          className="w-full h-auto rounded-md shadow-sm"
        />  
        <h3 className="text-lg font-medium mb-4 mt-10">Search & Similar Issues Example</h3>
        <img 
          src={designImage} 
          alt="Design Draft 01" 
          className="w-full h-auto rounded-md shadow-sm"
        />
       
      </div>
    </div>
  );
};

export default DesignDrafts;
