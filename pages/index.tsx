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
  const [currentPage, setCurrentPage] = useState(0)
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

  const onPageChange = ({selected}: { selected: number }): void => {
    //console.log(nextCursor);
    //console.log(selected)
    checkImage(((selected-1) * 100) +1, (selected) *100)
    setCurrentPage(selected)
  }

  const checkImage = async (first:number,last:number) => {
    imageNotfound.length = 0
    setImageNotFound([...imageNotfound])
    for(let i = first-1; i < last; i++){
      try{
        const img = await axios.get(
          `${ROP2E_COLLECTION_IMG_URL}/${jsonItemInfo[i].id}.png`
        );
        //console.log(img)
      }catch (error) {
        if(imageNotfound.find(x=>x.itemid == jsonItemInfo[i]?.id)){

        }else{
          if(jsonItemInfo[i]?.id != undefined){
            imageNotfound.push({'itemid': jsonItemInfo[i]?.id, 'itemname': jsonItemInfo[i]?.name})
            setImageNotFound([...imageNotfound])
          }  
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
        <div className="ml-10 mt-10">
          <div className="flex flex-wrap gap-2">
            {imageNotfound.length == 0 ? 
            <div className="ml-[50px]">
              No Items Without pictures
            </div>
            : 
            ""}
            {imageNotfound.map((item:any, key:number)=>(
              <>
                <div className="w-[170px] h-[170px] bg-slate-100 relative">
                  <div className="text-[#000] p-2"> 
                    #{item.itemid}
                  </div> 
                  <div className="text-[#000] p-2">
                    {item.itemname}
                  </div>    
                  <div className="absolute bottom-3 left-[50px] text-[#000] w-[70px] h-[30px] bg-yellow-500 rounded-md">
                    <button className="ml-2">Upload</button>
                  </div> 
                </div>  
              </>
            ))}
          </div>
          <div className="mt-4 h-[60px]">
            <ReactPaginate
              pageCount={jsonItemInfo.length/100}
              forcePage={currentPage}
              className="flex justify-center gap-2"
              nextClassName={'paginate-button'}
              previousClassName={'paginate-button'}
              pageLinkClassName={`page-button`}
              activeClassName={`paginate-active`}
              activeLinkClassName={`paginate-active`}
              onPageChange={onPageChange}
            />
          </div>
        </div> 
      </div>
      
      <div className="">
       
      </div>

    </main>
  );
}
