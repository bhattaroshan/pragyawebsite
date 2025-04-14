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
    title: "From Teacher to Advocate for Every Child",
    description: "",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*LsfHdylN2928BFkIcyb_lw.png",
    date: "May 10, 2023",
    readTime: "2 min read",
    tags: [],
    url: "https://medium.com/@pragyapokharel07_41704/from-teacher-to-advocate-for-every-child-d40bd471f2f8",
  },
  {
    title: "From Playful Childhood to Passionate Educator",
    description: "",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IHN5Tv6SJ-hhwxS0qzFCKQ.png",
    date: "May 10, 2023",
    readTime: "3 min read",
    tags: [],
    url: "https://medium.com/@pragyapokharel07_41704/from-playful-childhood-to-passionate-educator-2151b8d75fb4",
    imageShift: 10
  },
  {
    title: "From Introversion to Innovation: A Journey of Self-Discovery and Creation",
    description: "",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*gQYvAozSxjKpZv4kOk2xgA.png",
    date: "May 10, 2023",
    readTime: "2 min read",
    tags: [],
    url: "https://medium.com/@pragyapokharel07_41704/from-introversion-to-innovation-a-journey-of-self-discovery-and-creation-44103027d0a1",
    imageShift: 40
  },
  {
    title: "From Doubt to Discovery",
    description: "",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*c6mS6sads6Ks3pxv5k7yPw.png",
    date: "May 10, 2023",
    readTime: "2 min read",
    tags: [],
    url: "https://medium.com/@pragyapokharel07_41704/from-doubt-to-discovery-1b430587a4bb",
    imageShift: 10
  },
  {
    title: "Telescopes, Dreams and Coding Schemes",
    description: "",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Ee8fyFLUXkccAJJlTOVAHQ.png",
    date: "May 10, 2023",
    readTime: "2 min read",
    tags: [],
    url: "https://medium.com/@pragyapokharel07_41704/telescopes-dreams-and-coding-schemes-658013e424a9",
    imageShift: 10
  },
  {
    title: "From ABCs to Laser Beams",
    description: "",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*gmSFPQoOQ3Q7kjo8MmD1NA.png",
    date: "May 10, 2023",
    readTime: "2 min read",
    tags: [],
    url: "https://medium.com/@pragyapokharel07_41704/from-abcs-to-laser-beams-d45866aa48c5",
    imageShift: 0
  },
  {
    title: "Her Wings, My Dreams",
    description: "",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9eOiQlFREZsWI1KOWIIAVw.png",
    date: "May 10, 2023",
    readTime: "2 min read",
    tags: [],
    url: "https://medium.com/@pragyapokharel07_41704/her-wings-my-dreams-db04bcea693b",
    imageShift: 0
  },
  {
    title: "Guided by Stars (and Hasin Sir)",
    description: "",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Lg9Al5eY_SX1hRrGTepMhg.png",
    date: "May 10, 2023",
    readTime: "2 min read",
    tags: [],
    url: "https://medium.com/@pragyapokharel07_41704/guided-by-stars-and-hasin-sir-0ab7fd1130e0",
    imageShift: 0
  },
  {
    title: "Code, Chords, and Connection",
    description: "",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*rZbiMNr88Wc7XIHT1C1sVA.png",
    date: "May 10, 2023",
    readTime: "2 min read",
    tags: [],
    url: "https://medium.com/@pragyapokharel07_41704/code-chords-and-connection-8133027e2059",
    imageShift: 20
  },
  {
    title: "Wired for Friendship",
    description: "",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*fURZxzR-2cJwVviEyG2Sew.png",
    date: "May 10, 2023",
    readTime: "2 min read",
    tags: [],
    url: "https://medium.com/@pragyapokharel07_41704/wired-for-friendship-248eaac10deb",
    imageShift: 0
  },
  {
    title: "Through Her Own Lens",
    description: "",
    image: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*hZ70DM0DYtpcPr9I--IS2A.png",
    date: "May 10, 2023",
    readTime: "2 min read",
    tags: [],
    url: "https://medium.com/@pragyapokharel07_41704/binita-pandey-mother-of-ojaswi-pandey-student-of-karkhana-innovators-club-class-131812887fa1",
    imageShift: 0
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
          <h1 className="text-4xl font-bold">Kaleidoscope</h1>
        </div>
        <div className='p-4 rounded bg-gray-100 my-4 border'>
            <p className="text-muted-foreground text-justify text-gray-300">
            Everybody has a story to tell, waiting to be discovered. 🙂

Kaleidoscopes are covert instruments. One can never see the beautiful complex patterns and the colors that are on the inside. A couple of years ago, we (colleagues from Karkhana) borrowed this concept and came up with a series to reveal the depth and quirks of members and students of Karkhana. Kaleidoscope is a collection of such stories of wonderful people from Karkhana.
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