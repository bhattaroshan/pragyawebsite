interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  rating: number;
  readDate: string;
  genre: string[];
  review?: string;
}

export const books: Book[] = [
  // Fiction Books
  {
    id: '5',
    title: 'Americanah',
    author: 'Chimamanda Ngozi Adichie',
    coverImage: '/images/books/americana.jpg',
    description: 'A story of love, race, and identity.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Fiction', 'Contemporary'],
  },
  {
    id: '7',
    title: 'Disgrace',
    author: 'J.M. Coetzee',
    coverImage: '/images/books/disgrace.jpg',
    description: 'A novel about redemption and downfall.',
    rating: 4,
    readDate: '2024-01-01',
    genre: ['Fiction', 'Literary'],
  },
  {
    id: '9',
    title: 'The Lovely Bones',
    author: 'Alice Sebold',
    coverImage: '/images/books/the-lovely-bones.jpg',
    description: 'A haunting novel about loss.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Fiction', 'Mystery'],
  },
  {
    id: '15',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: '/images/books/the-midnight-library.jpg',
    description: 'A library of infinite possibilities.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Fiction', 'Fantasy'],
  },
  {
    id: '6',
    title: 'The Palace of Illusions',
    author: 'Chitra Banerjee Divakaruni',
    coverImage: '/images/books/the-palace-of-illusions.jpg',
    description: 'A retelling of the Mahabharata.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Mythology', 'Historical Fiction'],
  },
  {
    id: '16',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: '/images/books/The-Great-Gatsby.jpg',
    description: 'A story of the American Dream and its corruption.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Fiction', 'Classic'],
  },

  // Psychology & Self-Help Books
  {
    id: '1',
    title: 'What Happened to You',
    author: 'Unknown',
    coverImage: '/images/books/what-happened-to-you.jpg',
    description: 'A book exploring trauma and resilience.',
    rating: 4,
    readDate: '2024-01-01',
    genre: ['Psychology', 'Self-Help'],
  },
  {
    id: '14',
    title: 'Ikigai',
    author: 'Héctor García and Francesc Miralles',
    coverImage: '/images/books/ikigai.jpg',
    description: 'The Japanese secret to a long and happy life.',
    rating: 4,
    readDate: '2024-01-01',
    genre: ['Self-Help', 'Philosophy'],
  },
  {
    id: '17',
    title: 'Troubled: A Memoir of Foster Care, Family, and Social Class',
    author: 'Rob K. Henderson',
    coverImage: '/images/books/Troubled.jpg',
    description: 'A powerful memoir about resilience and social mobility.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Memoir', 'Social Science'],
  },

  // Parenting & Education Books
  {
    id: '3',
    title: 'The Whole-Brain Child',
    author: 'Daniel J. Siegel',
    coverImage: '/images/books/the-whole-brain-child.jpeg',
    description: 'A guide to child brain development.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Parenting', 'Psychology'],
  },
  {
    id: '4',
    title: 'The Gardener and the Carpenter',
    author: 'Alison Gopnik',
    coverImage: '/images/books/the-gardener-and-the-carpenter.jpeg',
    description: 'A fresh perspective on parenting.',
    rating: 4,
    readDate: '2024-01-01',
    genre: ['Parenting', 'Psychology'],
  },
  {
    id: '8',
    title: 'Invent to Learn',
    author: 'Sylvia Libow Martinez',
    coverImage: '/images/books/invent-to-learn.jpg',
    description: 'A book on learning through making.',
    rating: 4,
    readDate: '2024-01-01',
    genre: ['Education', 'Technology'],
  },
  {
    id: '18',
    title: 'The Scientist in the Crib',
    author: 'Alison Gopnik, Andrew N. Meltzoff, Patricia K. Kuhl',
    coverImage: '/images/books/The-Scientist-in-the-Crib.jpg',
    description: 'What early learning tells us about the mind.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Parenting', 'Psychology', 'Education'],
  },

  // Philosophy & Feminism Books
  {
    id: '2',
    title: 'The Second Sex',
    author: 'Simone de Beauvoir',
    coverImage: '/images/books/the-second-sex.jpeg',
    description: 'A foundational text in feminist philosophy.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Philosophy', 'Feminism'],
  },

  // Classic Literature & Drama
  {
    id: '19',
    title: 'King Lear',
    author: 'William Shakespeare',
    coverImage: '/images/books/King-Lear.jpg',
    description: 'A tragedy of power, family, and madness.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Drama', 'Classic'],
  },
  {
    id: '20',
    title: 'Oedipus Rex',
    author: 'Sophocles',
    coverImage: '/images/books/Oedipus-Rex.jpg',
    description: 'The classic Greek tragedy of fate and self-discovery.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Drama', 'Classic'],
  },
  {
    id: '21',
    title: 'Hamlet',
    author: 'William Shakespeare',
    coverImage: '/images/books/hamlet.jpg',
    description: 'The tragedy of the Prince of Denmark.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Drama', 'Classic'],
  },

  // Harry Potter Series (at the end)
  {
    id: '10',
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    coverImage: '/images/books/sorcerers-stone.jpg',
    description: 'The beginning of a magical journey.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Fantasy', 'Adventure'],
  },
  {
    id: '11',
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    coverImage: '/images/books/chamber-of-secrets.jpg',
    description: 'Harry\'s second year at Hogwarts.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Fantasy', 'Adventure'],
  },
  {
    id: '12',
    title: 'Harry Potter and the Prisoner of Azkaban',
    author: 'J.K. Rowling',
    coverImage: '/images/books/prisoner.jpg',
    description: 'A mysterious fugitive and a hidden past.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Fantasy', 'Adventure'],
  },
  {
    id: '13',
    title: 'Harry Potter and the Goblet of Fire',
    author: 'J.K. Rowling',
    coverImage: '/images/books/goblet-of-fire.jpg',
    description: 'The Triwizard Tournament begins.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Fantasy', 'Adventure'],
  },
  {
    id: '22',
    title: 'Harry Potter and the Order of the Phoenix',
    author: 'J.K. Rowling',
    coverImage: '/images/books/Order-of-the-Phoenix.jpg',
    description: 'The fight against the Ministry begins.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Fantasy', 'Adventure'],
  },
  {
    id: '23',
    title: 'Harry Potter and the Half-Blood Prince',
    author: 'J.K. Rowling',
    coverImage: '/images/books/Half-Blood-Prince.jpg',
    description: 'The truth about Voldemort\'s past.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Fantasy', 'Adventure'],
  },
  {
    id: '24',
    title: 'Harry Potter and the Deathly Hallows',
    author: 'J.K. Rowling',
    coverImage: '/images/books/Deathly-Hallows.jpg',
    description: 'The final battle against Voldemort.',
    rating: 5,
    readDate: '2024-01-01',
    genre: ['Fantasy', 'Adventure'],
  },
  {
    id: '25',
    title: 'Harry Potter and the Cursed Child',
    author: 'J.K. Rowling, John Tiffany, Jack Thorne',
    coverImage: '/images/books/Cursed-Child.jpg',
    description: 'The next generation of Hogwarts students.',
    rating: 4,
    readDate: '2024-01-01',
    genre: ['Fantasy', 'Adventure'],
  }
];

