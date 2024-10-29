import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className='grid grid-cols-2 gap-10 mb-10'>
      <Image src='/images/hero.jpg' width={1920} height={1080} alt='hero picture' className='block md:hidden col-span-2 md:col-span-1 object-cover'/>
      <div className='flex flex-col justify-center mx-4 md:ml-10 md:mr-2 gap-2 col-span-2 md:col-span-1'>
        <p className='text-3xl'>Hello my name is <span className='text-primary font-bold'>Pragya Pokharel</span></p>
        <p className='text-xl text-gray-400 font-medium'>Child development specialist</p>
        <div className='flex flex-wrap gap-2 items-center'>
          <p className='font-extrathin text-sm text-gray-400'>PhD Student in Early Childhood Education</p>
          <p className='font-extrathin text-sm text-gray-500'> (2024 - 2029)</p>
        </div>
        <p className='mt-4 text-gray-400 text-justify'>I'm an educator with over 7 years of experience in the field of education and child development. I am committed to breaking gender barriers in early childhood STEM education by promoting inclusive practices and advocating for equal opportunities for all children.</p>
          <Button className='w-10 h-10 p-0 mt-4 border-gray-500 hover:bg-gray-700 hover:text-white' variant={"outline"}>
            <Link target="__blank" href='https://www.linkedin.com/in/pragya-pokharel/' className=''>
              <Linkedin />
            </Link>
          </Button>
      </div>
      <Image src='/images/hero.jpg' width={1920} height={1080} alt='hero picture' className='hidden md:block'/>

    </div>
  )
}