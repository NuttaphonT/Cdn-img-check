import { sIndex, sJsonItem, sLoading } from "@/constants";
import { useAtom } from "jotai";
import Image from "next/image";
import { useState } from "react";

interface CustomImageProps {
    src: string;
    alt: string;
    fallbackSrc?: string; // Optional fallback image
    width: number;
    height: number;
    index: number;
    [key: string]: any; // Allow additional props
  }
  
  const CustomImage: React.FC<CustomImageProps> = ({ src, alt, fallbackSrc, width, height, index, ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);
    //const [index, setIndex] = useAtom(sIndex)
    const [hasError, setHasError] = useState(false);
    const [jsonItemInfo, setJsonItemInfo] = useAtom(sJsonItem);
    const [loading, setLoading] = useAtom(sLoading)

    const handleError = () => {
        if (fallbackSrc) {
          setImgSrc(fallbackSrc);
         
        } else {
          setHasError(true);
        }
      };
    
      if (hasError) {
        setLoading(true)
        return <div className="mr-2 mb-2 w-[180px] h-[180px] bg-red-400 p-4">
                    <div className={`text-[#000] p-2 `}> 
                        # {jsonItemInfo[index].id}
                    </div> 
                    <div className="text-[#000] p-1">
                    {jsonItemInfo[index].name}
                    </div>    
               </div>;
      }
    return (
    <div>
        <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            onError={handleError}
            {...props}
        />
    </div>
    
    );
  };
  
  export default CustomImage;