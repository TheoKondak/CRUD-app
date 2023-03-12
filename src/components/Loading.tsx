import ReactLoading from 'react-loading';

export interface Loading {
  type?: string;
  color?: string;
  loadingData?: [
    {
      text: string;
      data: Object | null | undefined;
    }
  ];
}

const Loading: React.FC<Loading> = ({ type = 'spin', color = '#0891b2', loadingData }) => (
  <div id="loading" className="w-full h-full flex flex-col items-center justify-center gap-2 backdrop-blur-md">
    <ReactLoading type={type} color={color} height={50} width={50} className="" />

    {loadingData.map((data) => {
      return (
        <div key={data.text.toString()} className="text-center text-primary-800">
          {!data.data && <span>{`Loading ${data.text}`}</span>}
        </div>
      );
    })}
  </div>
);

export default Loading;
