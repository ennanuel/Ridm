import { loader } from '../../assets/images'

const Loader = ({ title }) => (
  <div className="w-full flex-justify-center items-center flex-col">
    <img src={loader} alt="loader" className='h-[100px] w-[100px] object-contain block m-auto' />
    <h1 className="font-bold text-md text-center text-gray-200 mt-2">
      {title}
    </h1>
  </div>
);

export default Loader;
