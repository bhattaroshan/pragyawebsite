// 'use client'
// import { cn } from "@/lib/utils";
// import { ComponentProps, useEffect, useState } from "react";
// import Image from "next/image";


// interface ICustomImageProps extends ComponentProps<"img">{
//     url: string|null|undefined
//     className?: string
//     absolute?: boolean
// }

// export default function CustomImage({url,className, absolute=false}:ICustomImageProps){
//     const [imgSrc, setImgSrc] = useState(url);

//     useEffect(()=>{
//         setImgSrc(url);
//     },[url])

//     if(!imgSrc || imgSrc.length<=0) return  <Image alt={url?url:''} src={'/assets/logo.png'} width={1920} height={1080} className={cn('object-contain rounded border', className)}/>

//     function handleError(){
//         setImgSrc('/assets/logo.png');
//     }

//     return (
//         // <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`} className={cn('object-contain rounded border', className)}/>
//         <Image alt={url?url:''} width={1920} height={1080} src={imgSrc} className={cn('object-contain', className)}
//             onError={handleError}
//             priority
//         />
//     )
// }

'use client'

import { cn } from "@/lib/utils";
import { ComponentProps, useEffect, useState } from "react";
import Image from "next/image";
import FramerMotionLoader from "../animations/Loader";

interface ICustomImageProps extends ComponentProps<"img"> {
  url: string | null | undefined;
  className?: string;
  absolute?: boolean;
}

export default function CustomImage({ url, className }: ICustomImageProps) {
  const [imgSrc, setImgSrc] = useState(url);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgSrc(url);
    setIsLoading(true);
  }, [url]);

  function handleError() {
    setImgSrc('/assets/logo.png');
  }

  function handleLoadingComplete() {
    setIsLoading(false);
  }

  return (
    <div className={cn('relative', className)}>
      {isLoading && (
        <FramerMotionLoader />
        // <div className="absolute inset-0 bg-gray-200 animate-pulse rounded"></div>
      )}
      {(!imgSrc || imgSrc.length <= 0) ? (
        <Image 
          alt={url ? url : ''}
          src={'/assets/logo.png'}
          width={1920}
          height={1080}
          className={cn('object-contain rounded border', className)}
          onLoad={handleLoadingComplete}
        />
      ) : (
        <Image
          alt={url ? url : ''}
          width={1920}
          height={1080}
          src={imgSrc}
          className={cn('object-contain', className, isLoading ? 'opacity-0' : 'opacity-100')}
          onError={handleError}
          onLoad={handleLoadingComplete}
          priority
        />
      )}
    </div>
  );
}