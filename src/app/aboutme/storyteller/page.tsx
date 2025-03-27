import CustomImage from "@/components/CustomImage";

const blogs = [
    {
        title: 'Keleidoscope',
        image:'/blogs/kaleidoscope_cover.jpg',
        url: '/',
        content: 'Hello my name is pragya'
    },
    {
        title: 'Stories of Dang',
        image:'/blogs/dang_cover.webp',
        url: '/',
        content: 'Hello my name is pragya'
    },
]

export default function StorytellerPage(){
    return <div className='grid grid-cols-12 gap-6 md:gap-2 m-2 w-[90vw] sm:w-[80vw] md:w-[60vw] mx-auto my-20 md:my-2 justify-center'>
            {
                blogs.map((blog,index)=>{
                    return <div key={index} className="col-span-12 md:col-span-4 cursor-pointer">
                        <div>
                            <CustomImage url={blog.image} className='h-44 md:h-40 object-cover'/>
                            <p>{blog.title}</p>
                        </div>
                        </div>
                })
            }
    </div>
}