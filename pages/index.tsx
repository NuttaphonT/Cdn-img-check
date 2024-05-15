import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { ROP2E_COLLECTION_IMG_URL, ROP2E_ITEM_IMG_URL } from "@/constants";
import ReactPaginate from "react-paginate";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/Loader";

export default function Home() {

  const [jsonItemInfo, setJsonItemInfo] = useState<any[]>([]);
  const [imageNotfound, setImageNotFound] = useState<any[]>([...jsonItemInfo.slice(0,100)])
  const [page, setPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [hasMore, setHasMore] = useState(true);
  const [itemPerpage, setItemPerPage] = useState(100)
  const [imageErrors, setImageErrors] = useState(Array(jsonItemInfo.length).fill(false));
  
  const getItemInfo = async () => {
    try {
      const res = await axios.get(
        "https://cdn.maxion.gg/landverse/web/iteminfo.min.json"
      );
      setJsonItemInfo(res.data);
      setImageNotFound([...jsonItemInfo.slice(0,100)])
      setPage(Math.ceil(res.data.length/500))
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getItemInfo();
    //checkImage(0,100)
  }, [jsonItemInfo.length]);

  const onPageChange = ({selected}: { selected: number }): void => {
    //console.log(nextCursor);
    //console.log(selected)
    checkImage(((selected-1) * 100) +1, (selected) *100)
    setCurrentPage(selected)
  }

  const checkImage = async (first:number,last:number) => {
    for(let i = 0; i < jsonItemInfo.length; i++){
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
  const fetchMoreData = async () => {
    //console.log(imageNotfound.length)
    await setImageNotFound([...jsonItemInfo.slice(0, imageNotfound.length + itemPerpage)])
  };

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
            <InfiniteScroll
              dataLength={imageNotfound.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Loader />}
            >
              <div className='container'>
                <div className='flex flex-wrap gap-2'>
                  {imageNotfound &&
                    imageNotfound.map((item, index) => 
                    <>  
                        <div className={`w-[180px] h-[170px] ${imageErrors[index] ? "bg-red-400" : "bg-slate-400"} relative`}>
                          <div className={`text-[#000] p-2 `}> 
                            #{item.id}
                          </div> 
                          <div className="text-[#000] p-1">
                            {item.name}
                          </div>    
                          <div className="absolute bottom-15 left-[50px] text-[#000] w-[70px] h-[30px]  rounded-md">
                          {!imageErrors[index] ?
                          <Image
                            src={`${
                              !imageErrors[index]
                                ? `${ROP2E_COLLECTION_IMG_URL}/${item.id}.png`
                                : "/images/roverse/not-found.jpg"
                            }`}
                            alt="img"
                            width={50}
                            height={30}
                            onError={() => {
                              const updatedErrors = [...imageErrors];
                              updatedErrors[index] = true;
                              setImageErrors(updatedErrors);
                            }}
                          />
                          :
                          ""
                          }
                          </div> 
                        </div>                       
                    </>
                )}
                </div>
              </div>
            </InfiniteScroll>
          </div>
        </div> 
      </div>
      
      <div className="">
       
      </div>

    </main>
  );
}
