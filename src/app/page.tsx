import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className='grid grid-cols-2 gap-10 mb-10'>
      <Image src='/images/hero.jpg' width={1920} height={1080} alt='hero picture' className='block md:hidden col-span-2 md:col-span-1'/>
      <div className='flex flex-col justify-center mx-10 md:mx-20 gap-2 col-span-2 md:col-span-1'>
        <p className='text-3xl'>Hello my name is <span className='text-purple-600 font-bold'>Pragya Pokharel</span></p>
        <p className='text-xl text-gray-400 font-medium'>Child development specialist</p>
        <p className='mt-4 text-gray-400'>I'm a social work professional who believes in egalitarian society and does any thing to move present society towards what I believe.</p>
        <Link target="__blank" href='https://www.linkedin.com/in/pragya-pokharel/' className='mt-10'>
          <Button className='w-14 h-14'>
            <Linkedin />
          </Button>
        </Link>
      </div>
      <Image src='/images/hero.jpg' width={1920} height={1080} alt='hero picture' className='hidden md:block'/>

    </div>
  )
}