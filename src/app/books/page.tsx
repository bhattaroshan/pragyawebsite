import CustomImage from "@/components/CustomImage"


const MyBooks = [
    {
        name: 'What Happened to You',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'The Second Sex',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'The Whole Brain Child',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'The Gardener and the Carpenter',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'Americanah',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'The Palace of the Illusions ',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'Disgrace ',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'Invent to Learn',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'The Lovely Bones',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'Harry Potter and the Sorcerer\s Stone',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'Harry Potter and the Chamber of Secrets',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'Harry Potter and the Prisoner of Azkaban',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'Harry Potter and the Goblet of Fire',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'Harry Potter and the Order of the Phoenix',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'Harry Potter and the Half Blood Prince',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'Harry Potter and the Deathly Hallows',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'I heart New York',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'The Great Gatsby',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'King Lear',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'The Norwegian Wood',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'Ikigai',
        img: '',
        rating: '',
        review: '',
    },
    {
        name: 'The Midnight Library',
        img: '',
        rating: '',
        review: '',
    },

]

export default function BooksPage(){

    return <div className='flex justify-center mt-20 md:mt-2'>
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-[80vw] md:w-[50vw] gap-4'>
            {
                MyBooks.map((book,index)=>{
                    return <div key={index} className='flex flex-col items-center'>
                            <CustomImage url='/books/what happend to you.jpg' className='w-32 md:w-40' />
                            <p className='text-sm font-thin px-4'>{book.name}</p>
                        </div>
                })
            }
        </div>
    </div>

}