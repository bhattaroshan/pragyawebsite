import CustomImage from "@/components/CustomImage";
import Link from "next/link";

const blogs = [
    {
        title: 'Kaleidoscope',
        image:'/blogs/kaleidoscope_cover.jpg',
        url: '/aboutme/storyteller/kaleidoscope',
        content: 'Hello my name is pragya'
    },
    {
        title: 'Stories of Dang',
        image:'/blogs/dang_cover.webp',
        url: '/aboutme/storyteller/dang',
        content: 'Hello my name is pragya'
    },
]

export default function StorytellerPage(){
    return (
        <div className="min-h-screen">
            <div className="flex flex-col md:flex-row h-screen">
                {blogs.map((blog, index) => (
                    <Link 
                        href={blog.url} 
                        key={index} 
                        className="relative flex-1 group cursor-pointer overflow-hidden"
                    >
                        <CustomImage 
                            url={blog.image} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <h2 className="text-white text-3xl md:text-4xl font-bold text-center p-4">
                                {blog.title}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}