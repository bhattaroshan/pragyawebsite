import React from 'react';
import { books } from './data';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { BookOpen, Star } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          {/* Book Cover Container */}
          <div className="relative w-full aspect-[2/3] mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-contain p-2"
            />
          </div>
          
          {/* Book Info */}
          <div className="flex-1 flex flex-col">
            <h3 className="font-semibold line-clamp-2 mb-1">{book.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < book.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  )}
                />
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-auto">
              {book.genre.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BooksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Books</h1>
        </div>
        <p className="text-muted-foreground mb-12">
          A collection of books I've read and enjoyed
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
} 