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
      {
        title: "Finding My Voice",
        description: "",
        image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*VwkJCA1Iwx0d5ICp.jpg",
        date: "May 10, 2023",
        readTime: "1 min read",
        tags: [],
        url: "https://medium.com/@pragyapokharel07_41704/finding-my-voice-4a8aa3713fd5",
      },
      {
        title: "Walking Miles for a Future",
        description: "",
        image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*pvwOJtsjdYiMPMLg.jpg",
        date: "May 10, 2023",
        readTime: "2 min read",
        tags: [],
        url: "https://medium.com/@pragyapokharel07_41704/walking-miles-for-a-future-00506cefb654",
        imageShift: 10
      },
      {
        title: "Building Bridges with Parents",
        description: "",
        image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*vJRcspNZQkdUpn9s.jpg",
        date: "May 10, 2023",
        readTime: "3 min read",
        tags: [],
        url: "https://medium.com/@pragyapokharel07_41704/building-bridges-with-parents-f0649629b661",
        imageShift: 10
      },
      {
        title: "Unwavering Passion for Learning",
        description: "",
        image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*LTRtwZheBiHmdLRpWlkO2g.jpeg",
        date: "May 10, 2023",
        readTime: "3 min read",
        tags: [],
        url: "https://medium.com/@pragyapokharel07_41704/unwavering-passion-for-learning-73a680a3f379",
        imageShift: 10
      },
      {
        title: "Teaching with Compassion",
        description: "",
        image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*w9eHFZll3GpyQTkZQFt5Jw.png",
        date: "May 10, 2023",
        readTime: "3 min read",
        tags: [],
        url: "https://medium.com/@pragyapokharel07_41704/teaching-with-compassion-46b79eddc8c6",
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
        <div className='p-4 rounded bg-gray-100 my-4 border'>
            <p className="text-muted-foreground text-justify text-gray-300">
                I joined Changing Stories Nepal as a Storyteller in December, 2019. Changing Stories Nepal is a non-profit organization established with a vision to build a Nepal where every kid learns. As a part of my job, I had the opportunity to travel to Tulsipur, Dang and gather stories of our talented students and fellows. The stories were published on the social media page of CS Nepal and will be published in newsletters to the monthly giving community called The Classroom.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.url} post={post} />
          ))}
        </div>

      </div>
    </div>
  )
} 