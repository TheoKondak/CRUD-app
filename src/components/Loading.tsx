import ReactLoading from 'react-loading';

const Loading: React.FC<Loading> = ({ type = 'spin', color = '#0891b2' }) => (
  <div className="w-full h-full flex items-center justify-center">
    <ReactLoading type={type} color={color} height={50} width={50} />
  </div>
);

export default Loading;
