import ReactLoading from 'react-loading';

const Loading: React.FC<Loading> = ({ type = 'spin', color = '#0891b2' }) => <ReactLoading type={type} color={color} height={50} width={50} />;

export default Loading;
