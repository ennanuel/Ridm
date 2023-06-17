import React from 'react';

const Error = ({title}) => (
  <div className='w-full h-full min-h-[200px] flex justify-center items-center'>
    <h1 className="font-bold text-md text-gray-400 mt-2">{title}</h1>
  </div>
);

export default Error;
