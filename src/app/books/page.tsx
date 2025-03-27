import React from 'react';
import { books } from './data';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${
            index < rating
              ? 'text-yellow-400'
              : 'text-muted'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-2 text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

function BookCard({ book }: { book: typeof books[0] }) {
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative h-64">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <StarRating rating={book.rating} />
        <ScrollArea className="h-24">
          <p className="text-muted-foreground">{book.description}</p>
        </ScrollArea>
        <div className="flex flex-wrap gap-2">
          {book.genre.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Read on {new Date(book.readDate).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 py-20 md:py-8">
      <h1 className="text-4xl font-bold">My Reading List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
} 