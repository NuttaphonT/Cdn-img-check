import { Bars } from "react-loader-spinner";

export default function Loader() {

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Bars
        height='70'
        width='80'
        color='#4fa94d'
        ariaLabel='bars-loading'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    </div>
  );
}
