import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { ROP2E_COLLECTION_IMG_URL, ROP2E_ITEM_IMG_URL } from "@/constants";
import ReactPaginate from "react-paginate";

export default function Home() {

  const [jsonItemInfo, setJsonItemInfo] = useState<any[]>([]);
  const [imageNotfound, setImageNotFound] = useState<any[]>([])
  const [page, setPage] = useState(0)
  //const [imageErrors, setImageErrors] = useState(Array(jsonItemInfo.length).fill(false));
  
  const getItemInfo = async () => {
    try {
      const res = await axios.get(
        "https://cdn.maxion.gg/landverse/web/iteminfo.min.json"
      );
      setJsonItemInfo(res.data);
      setPage(Math.ceil(res.data.length/500))
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getItemInfo();
  }, []);
  
  const checkImage = async (first:number,last:number) => {
    setImageNotFound([])
    for(let i = first-1; i < last; i++){
      try{
        const img = await axios.get(
          `${ROP2E_COLLECTION_IMG_URL}/${jsonItemInfo[i].id}.png`
        );
      }catch (error) {
        if(imageNotfound.find(x=>x.itemid == jsonItemInfo[i].id)){

        }else{
          imageNotfound.push({'itemid': jsonItemInfo[i].id, 'itemname': jsonItemInfo[i].name})
          setImageNotFound([...imageNotfound])
        }    
        //console.error("Error fetching data:", error);
      }
      //console.log(res.data[i])
    }  
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between pt-14`}
    >
      <div className="top-banner">
        <div className="layer-black"></div>
      </div>
      <div className="w-screen h-[150px]">
        <div className="flex ml-20 mt-[-30px]">
             <div className="title">CDN Image Check List</div>  
        </div>
        <div className="flex flex-wrap w-screen px-10 gap-2 pt-5">
        {Array.from(
            { length: page },
            (_, i) => 
          <div className="text-[14px]" key={i}>
            <button className="bg-red-400 p-2 rounded-lg" onClick={()=>checkImage((i*500)+1, (i+1) *500)}>
              {(i*500) + 1}-{(i+1) *500}
            </button>
          </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center px-10 pt-5">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {imageNotfound.map((item:any, key:number)=>(
              <tr key={key}>
                <td>{item.itemid}</td>
                <td>{item.itemname}</td>
              </tr>
              ))}
            </tbody>  
          </table>
          
        </div>        
      </div>
      
      <div className="">
       
      </div>

    </main>
  );
}
