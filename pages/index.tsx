import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { ROP2E_COLLECTION_IMG_URL, ROP2E_ITEM_IMG_URL, sIndex, sJsonItem } from "@/constants";
import ReactPaginate from "react-paginate";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/Loader";
import CustomImage from "@/components/CustomImage";
import { useAtom } from "jotai";

export default function Home() {

  const [jsonItemInfo, setJsonItemInfo] = useAtom(sJsonItem);
  const [errorImage, setErrorImage] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [hasMore, setHasMore] = useState(true);
  const [itemPerpage, setItemPerPage] = useState(100)
  const [imageErrors, setImageErrors] = useState(Array(jsonItemInfo.length).fill(false));
  const [index, setIndex] = useAtom(sIndex)

  const getItemInfo = async () => {
    try {
      const res = await axios.get(
        "https://cdn.maxion.gg/landverse/web-th/iteminfo.min.json"
      );
      setJsonItemInfo([...res.data.filter((item:any)=>item.desc != "" && item.desc != "Can be identified by using a Magnifier.")]);
      console.log(jsonItemInfo)
      setPage(Math.ceil(res.data.filter((item:any)=>item.desc != "" && item.desc != "Can be identified by using a Magnifier.").length/500))
      
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
    //checkImage(((selected-1) * 100) +1, (selected) *100)
    setCurrentPage(selected)
  }

  /*const checkImage = async (first:number,last:number) => {
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
  }*/

  {/*const pushImageErrorList = async (index:number) => {
    //console.log("A")
    console.log(imageNotfound[index])
    try{
      const img = await axios.get(
        `${ROP2E_COLLECTION_IMG_URL}/${imageNotfound[index].id}.png`
      );
      //console.log(img)
    }catch (error) {
      if(imageNotfound.find(x=>x.itemid == imageNotfound[index]?.id)){

      }else{
        if(imageNotfound[index]?.id != undefined){
          //imageNotfound.push({'id': imageNotfound[index]?.id, 'name': imageNotfound[index]?.name})
          if(errorImage.find(item=>item.id == imageNotfound[index].id)){

          }else{
            errorImage.push(imageNotfound[index])
            setErrorImage([...errorImage])
            imageNotfound.splice(index,1)
          }
        }  
      }    
      //console.error("Error fetching data:", error);
    }
    if(errorImage.find(item=>item.id == imageNotfound[index].id)){

    }else{
      errorImage.push(imageNotfound[index])
      setErrorImage([...errorImage])
      imageNotfound.splice(index,1)
    }
    }*/}
    

  /*const fetchMoreData = async () => {
    //console.log(imageNotfound.length)
    await setImageNotFound([...jsonItemInfo.slice(0, imageNotfound.length + itemPerpage)])
  };*/

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
            {jsonItemInfo.length == 0 ? 
            <div className="ml-[50px]">
              No Items Without pictures
            </div>
            : 
            ""}
            {/*<InfiniteScroll
              dataLength={imageNotfound.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Loader />}
            >*/}
              <div className='container'>
                <div className="flex flex-wrap">
                {jsonItemInfo &&
                      jsonItemInfo.map((item, index) => 
                        <div key={index}>
                          <CustomImage
                              src={`${ROP2E_COLLECTION_IMG_URL}/${item.id}.png`}  // Invalid or non-existent image URL
                                alt="Example Image"
                                width={0}
                                height={0}
                                index={index}
                          />   
                        </div>        
                )}
                 </div>
              </div>
              {/*<div className='container'>
                <div className='invisible flex-wrap gap-2'>
                  {imageNotfound &&
                    imageNotfound.map((item, index) => 
                    <div key={index}>  
                        <div className={`w-[0px] h-[0px] ${imageErrors[index] ? "bg-red-400" : "bg-slate-400"} relative`}>
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
                            width={1}
                            height={1}
                            onError={() => {
                              const updatedErrors = [...imageErrors];
                              updatedErrors[index] = true;
                              setImageErrors(updatedErrors);
                              pushImageErrorList(index);
                            }}
                          />
                          :
                          ""
                          }
                          </div> 
                        </div>                       
                    </div>
                )}
                </div>
              </div>*/}
            {/*</InfiniteScroll>*/}
          </div>
        </div> 
      </div>
      
      <div className="">
       
      </div>

    </main>
  );
}
