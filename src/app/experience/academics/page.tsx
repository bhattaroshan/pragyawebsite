'use client'
import { useState } from "react"
import { GraduationCap, MapPin, Award, Book, ChevronRight, ExternalLink, Calendar, BookOpen } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

const education = [
  {
    year: "2024-2029",
    institution: "University of Nebraska - Lincoln",
    location: "Nebraska, USA",
    url: "https://www.unl.edu/",
    skills: ["Technical Foundation",  "Academic Research"],
    milestone: "Technical Horizons",
    icon: MapPin,
    description: "Child Development / Early Childhood Education"
  },
  {
    year: "2018",
    institution: "Central Department of Home Science, Tribhuvan University",
    location: "Bag Bazar Sadak, Kathmandu",
    url: "https://cdhsc.edu.np/",
    skills: ["Technical Foundation",  "Academic Research"],
    milestone: "Technical Horizons",
    icon: MapPin,
    description: "Child Development and Gender Socialization"
  },
  {
    year: "2013",
    institution: "Kathmandu Model College",
    location: "Bag Bazar Sadak, Kathmandu",
    url: "https://ktmmodelcollege.edu.np/",
    skills: ["Secondary Education", "Critical Thinking", "Problem Solving"],
    milestone: "Building Foundations",
    icon: GraduationCap,
    description: "Social Work"
  },
  {
    year: "2011",
    institution: "Kathmandu Model College",
    location: "Bag Bazar Sadak, Kathmandu",
    url: "https://ktmmodelcollege.edu.np/",
    skills: ["Primary Education", "Communication", "Collaborative Learning"],
    milestone: "Exploring Knowledge",
    icon: Award,
    description: "High School"
  },
  {
    year: "2002",
    institution: "Prolific Higher Secondary School",
    location: "Dhumbarahi Height, Kathmandu",
    url: "https://www.facebook.com/prolific.edu.np/",
    skills: ["Basic Literacy", "Social Skills", "Foundational Learning"],
    milestone: "First Steps in Learning",
    icon: Book,
    description: "Nursery to Grade 10"
  },

]

export default function EducationTimeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Defined type-safe handlers
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Monochromatic Theme */}
        <div className="relative mb-12 overflow-hidden">
          <div className="absolute -top-20 -right-20 opacity-10">
            <GraduationCap className="h-64 w-64 text-gray-300 dark:text-gray-700" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full shadow-sm">
                <GraduationCap className="h-8 w-8 text-gray-600 dark:text-gray-400" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                Educational Journey
              </h1>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  A transformative chronicle of learning, growth, and discovery.
                </p>
              </div>
              
              <div className="hidden md:block mt-4">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>Academic Progress</span>
                  <span>2002 - 2018</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>
            
            {/* Timeline View Only */}
            <div className="mt-6 mb-6">
              <div className="relative space-y-8
                before:absolute before:inset-0 before:ml-5 before:w-0.5
                before:bg-gray-200 dark:before:bg-gray-700">
                {education.map((edu, index) => {
                  const IconComponent = edu.icon;
                  return (
                    <div 
                    key={edu.year} 
                    className="relative flex flex-col sm:flex-row items-start sm:space-x-4 space-y-4 sm:space-y-0"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                      {/* Timeline Marker */}
                      <div className="z-10 flex items-center justify-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className={`w-10 h-10 rounded-full 
                                flex items-center justify-center 
                                transition-all duration-300
                                ${hoveredIndex === index ? 
                                  'bg-gray-800 dark:bg-gray-200 shadow-lg transform scale-110' : 
                                  'bg-gray-100 dark:bg-gray-800'}`}>
                                <IconComponent className={`h-5 w-5 
                                  transition-colors duration-300
                                  ${hoveredIndex === index ? 
                                    'text-white dark:text-gray-800' : 
                                    'text-gray-600 dark:text-gray-400'}`} />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-medium">{edu.milestone}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      {/* Education Card */}
                      <Card className={`flex-1 p-6 
                        transition-all duration-300
                        border-l-0 
                        ${hoveredIndex === index ? 
                          'border-gray-800 dark:border-gray-200 shadow-lg' : 
                          'border-transparent'}`}>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 md:mb-0">
                            {edu.url ? (
                              <a 
                                href={edu.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`flex items-center 
                                  transition-colors
                                  ${hoveredIndex === index ? 
                                    'text-gray-800 dark:text-gray-200' : 
                                    'text-gray-700 dark:text-gray-300'}`}
                              >
                                <h2 className="text-xl font-semibold mr-2">
                                  {edu.institution}
                                </h2>
                                <ExternalLink className={`h-4 w-4 
                                  transition-opacity
                                  ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`} />
                              </a>
                            ) : (
                              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                {edu.institution}
                              </h2>
                            )}
                          </div>
                          <div className="flex items-center text-sm font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {edu.year}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {edu.location}
                        </p>
                        
                        <p className="mt-3 text-gray-700 dark:text-gray-300">
                          {edu.description}
                        </p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {edu.skills.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex} 
                              variant="secondary" 
                              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Progress Indicator */}
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full bg-gray-800 dark:bg-gray-200 transition-all duration-500 ease-in-out"
                              style={{ width: `${(education.length - index) / education.length * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>{edu.milestone}</span>
                            <span>{Math.round((education.length - index ) / education.length * 100)}% Complete</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}