'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Clock, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { title } from "process"

const blogPosts = [
    {
        title: "Dreams Beyond the Fields",
        description: "",
        image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*SKUBZ1kxRr6eBcxW.jpg",
        date: "May 10, 2023",
        readTime: "2 min read",
        tags: [],
        url: "https://medium.com/@pragyapokharel07_41704/dreams-beyond-the-fields-63e1c1db8868",
        imageShift: 0 // No shift
      },
]

function BlogCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-video -mt-6 -mx-6 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          style={{
            objectPosition: `center ${post.imageShift}%`
          }}
        />
      </div>
      <CardHeader className="flex-none">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {post.date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </div>
        </div>
        <CardTitle className="text-xl hover:text-primary transition-colors">
          <Link 
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground mb-4 text-justify">{post.description}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <div className="p-4 pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link 
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </Link>
        </Button>
      </div>
    </Card>
  )
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Stories of Dang</h1>
        </div>
        <p className="text-muted-foreground mb-12">
        A shifting mosaic of stories, colors, and moments
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.url} post={post} />
          ))}
        </div>

      </div>
    </div>
  )
} 