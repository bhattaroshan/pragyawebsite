'use client'

import React, { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { geoPoly } from './geopoly'
import { travelLocations } from './travelData'
import { Card, CardContent } from "@/components/ui/card"
import { Globe, MapPin, Calendar, Play, Youtube, ArrowLeft, X, ChevronRight, ChevronLeft, CheckCircle, Info } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { 
  Dialog, 
  DialogClose, 
  DialogContent,
  DialogFooter,
  DialogTitle 
} from "@/components/ui/dialog"
import CustomImage from '@/components/CustomImage'

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

const Polygon = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polygon),
  { ssr: false }
)

interface CountryData {
  name: string;
  description?: string;
  coverPhoto?: string;  // Single cover photo
  detailPhotos?: string[];  // Array of detail photos
  videos?: { url: string; title: string }[];
  milestones?: {
    place: string;
    date?: string;
    description?: string;
    photo?: string;
  }[];
}

const MapComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [hoveredCountryIndex, setHoveredCountryIndex] = useState<number | null>(null)
  const [showCountryDetails, setShowCountryDetails] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  
  // Photo viewer state
  const [photoViewerOpen, setPhotoViewerOpen] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  
  const [clickedOnce,setClickedOnce] = useState(false);
  // Touch swipe state
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Map polygon indices to country data with all details
  const polygonToCountry: CountryData[] = [
    { 
      name: 'Nepal',
      description: 'This is my home country. Nepal is divided into 3 regions geographically -- plain, hilly and mountain. I have been to most part of plain and hilly regions. I haven\'t explored the mountain regions that much.',
      coverPhoto: '/images/travel/nepal.jpg',
      detailPhotos: [
                  ],
      videos: [
      ],
      milestones: [
        { place: 'Bhairahawa', date: '2019-07', description: 'I went with my husband for a leisure.' },
        { place: 'Birgunj', date: '2019-07', description: 'National park with diverse wildlife' },
        { place: 'Chitwan', date: '2019-07', description: 'National park with diverse wildlife' },
        { place: 'Dang', date: '2022 / 2023 ', description: 'I have visited Dang multiple times while working with Teach for Nepal in order to observe and also deliver classes to students.' },
        { place: 'Gorkha', date: '2019-07', description: 'I was born in Gorkha. I have visited Gorkha multiple times.' },
        { place: 'Giri', date: '2022-09', description: 'National park with diverse wildlife' },
        { place: 'Khaptad', date: '2019-07', description: 'National park with diverse wildlife' },
        { place: 'Khotang', date: '2022-09', description: 'I went on a drive with my husband and a few friends of mine when I was working for a company called Bottle.' },
        { place: 'Kathmandu', date: '2019-05', description: 'I have been living in Kathmandu since my childhood. I have spent majority of my childhood in Kathmandu. I completed my Engineering degree from the capital.' },
        { place: 'Palpa', date: '2019', description: 'I have visited Palpa multiple times on a bike while working with a company called Karkhana.' },
        { place: 'Pokhara', date: '2014-2024', description: 'Pokhara is my go-to city for vacation mostly during festive seasons and work breaks.' },
        { place: 'Salleri', date: '2022-09', description: 'I went on a drive with my husband and a few friends of mine when I was working for a company called Bottle.' },
        { place: 'Sailung', date: '2022-09', description: 'I went to Sailung with my collegue when I was working for a company called Karkhana.' },
      ]
    },
    { 
      name: 'Dubai, UAE',
      description: 'I visited Dubai and Abu Dhabi with my husband for leisure. We were there for a week.',
      coverPhoto: '/images/travel/dubai.webp',
      detailPhotos: [
                      'https://pragya-personalwebsite.s3.ap-south-1.amazonaws.com/dubai/dubai-1.jpg',
                      'https://pragya-personalwebsite.s3.ap-south-1.amazonaws.com/dubai/dubai-2.jpg',
                      'https://pragya-personalwebsite.s3.ap-south-1.amazonaws.com/dubai/dubai-3.jpg',
                      'https://pragya-personalwebsite.s3.ap-south-1.amazonaws.com/dubai/dubai-4.jpg',
                      'https://pragya-personalwebsite.s3.ap-south-1.amazonaws.com/dubai/dubai-5.jpg',
                      'https://pragya-personalwebsite.s3.ap-south-1.amazonaws.com/dubai/dubai-6.jpg',
                      'https://pragya-personalwebsite.s3.ap-south-1.amazonaws.com/dubai/dubai-7.jpg',
                      'https://pragya-personalwebsite.s3.ap-south-1.amazonaws.com/dubai/dubai-8.jpg',
                    ],
      milestones: [
        { place: 'Dubai Downtown', date: '2022-02', description: 'Home to Burj Khalifa and Dubai Mall' },
        { place: 'Palm Jumeirah', date: '2022-02', description: 'Man-made island with luxury resorts' },
        { place: 'Abu Dhabi', date: '2022-02', description: 'Capital city with Sheikh Zayed Grand Mosque' }
      ]
    },
    { 
      name: 'Japan',
      description: 'I went to Tokyo, Osaka and Kyoto for vacation with my husband for 14 days and experienced variety of foods and culture of the country.',
      coverPhoto: '/images/travel/japan.jpg',
      detailPhotos: [
                  ],
      milestones: [
        { place: 'Tokyo', date: '2023-04', description: 'I have been to Tokyo Metropolitan Building, Ueno Park, Meji Jingu, Shibuya Crossing and a lot of train stations within the capital.' },
        { place: 'Kyoto', date: '2023-04', description: 'I stayed in Kyoto for a day. I went on a hike to Fushimi Inari during my stay here.' },
        { place: 'Osaka', date: '2023-04', description: 'I went to a lot of local places, acquarium and a lot of train stations.' }
      ]
    },
    { 
      name: 'Washington, USA',
      description: 'I went to Washington for vacation with my husband for couple of days and experienced variety of foods and culture of the state.',
      coverPhoto: 'https://roshan-personalwebsite.s3.ap-south-1.amazonaws.com/travel/washington/washington-5.jpg',
      detailPhotos: [
      ],
      milestones: [
        { place: 'Bainbridge Island', date: '2025-03', description: 'It is a small island where you reach via ferry from Seattle downtown for a affordable price with great view' },
        { place: 'Seattle Downtown', date: '2025-03', description: 'Home to Space Needle and Pike Place Market' },
      ]
    },
    { 
      name: 'Nebraska, USA',
      description: 'Diverse nation with varied landscapes and cultural experiences.',
      coverPhoto: '/images/travel/nebraska.jpg',
      detailPhotos: ['/images/usa/nyc.jpg', '/images/usa/sf.jpg'],
      milestones: [
        { place: 'Omaha', date: '2025-02', description: 'Largest city with historic Old Market' },
        { place: 'Lincoln', date: '2025-02', description: 'State capital with university atmosphere' }
      ]
    },
    { 
      name: 'Washington DC, USA',
      description: 'I was here for a couple of days with my husband for vacation.',
      coverPhoto: '/images/travel/washington-dc.jpg',
      detailPhotos: ['/images/travel/washington-dc.jpg', '/images/usa/sf.jpg'],
      milestones: [
        { place: 'Capitol Hill', date: '2025-03', description: 'Monumental core with Smithsonian museums' },
      ]
    },
  ]

  useEffect(() => {
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
      });
    });
  }, []);

  // Add keyboard navigation for photo viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photoViewerOpen) return;
      
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prevIndex) => 
          prevIndex === 0 ? selectedPhotos.length - 1 : prevIndex - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prevIndex) => 
          prevIndex === selectedPhotos.length - 1 ? 0 : prevIndex + 1
        );
      } else if (e.key === 'Escape') {
        setPhotoViewerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photoViewerOpen, selectedPhotos.length]);

  // Handle click outside panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Get the dialog element
      const dialogElement = document.querySelector('[role="dialog"]');
      
      // Check if click is inside the panel or inside the dialog
      if (
        (panelRef.current && panelRef.current.contains(event.target as Node)) ||
        (dialogElement && dialogElement.contains(event.target as Node))
      ) {
        // Click is inside panel or dialog, do nothing
        return;
      }
      
      // Only close the panel if the click is outside both the panel and the dialog
      setIsPanelOpen(false);
    };
  
    if (isPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPanelOpen]);

  // Group locations by country
  const locationsByCountry = travelLocations.reduce((acc, location) => {
    // For USA locations, group them under 'USA' instead of individual states
    const countryKey = location.country === 'USA' ? 'USA' : location.country;
    if (!acc[countryKey]) {
      acc[countryKey] = [];
    }
    acc[countryKey].push(location);
    return acc;
  }, {} as Record<string, typeof travelLocations>);

  // Get all countries and sort them to show selected country first
  const countries = polygonToCountry
    .map(country => country.name)
    .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
    .sort((a, b) => {
      if (a === selectedCountry) return -1;
      if (b === selectedCountry) return 1;
      return polygonToCountry.findIndex(c => c.name === a) - polygonToCountry.findIndex(c => c.name === b);
    });

  // Update the country details view to use polygonToCountry data
  const selectedCountryData = selectedCountry ? polygonToCountry.find(c => c.name === selectedCountry) : null;

  // Function to open photo viewer
  const openPhotoViewer = (photos: string[], index: number) => {
    setSelectedPhotos(photos);
    setSelectedPhotoIndex(index);
    setPhotoViewerOpen(true);
  };

  // Navigate to previous photo
  const prevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent the click from bubbling up
    setSelectedPhotoIndex((prevIndex) => 
      prevIndex === 0 ? selectedPhotos.length - 1 : prevIndex - 1
    );
  };

  // Navigate to next photo
  const nextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent the click from bubbling up
    setSelectedPhotoIndex((prevIndex) => 
      prevIndex === selectedPhotos.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diffX = touchStartX.current - touchEndX.current;
    
    // If the swipe is significant enough (more than 50px)
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swiped left -> Next photo
        nextPhoto();
      } else {
        // Swiped right -> Previous photo
        prevPhoto();
      }
    }
    
    // Reset touch coordinates
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Format date for display
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    if (dateStr.length === 7) { // YYYY-MM format
      const [year, month] = dateStr.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    }
    return dateStr;
  };

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      {/* Map Section - Full Screen */}
      <div className="absolute inset-0">
        <MapContainer
          center={[27.7172, 5.3240]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          className='z-0'
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {geoPoly.map((polygon, index) => (
            <Polygon 
              key={index}
              pathOptions={{
                fillColor: hoveredCountryIndex === index ? '#4CAF50' : '#ff0000',
                color: hoveredCountryIndex === index ? '#4CAF50' : '#ff0000',
                fillOpacity: hoveredCountryIndex === index ? 0.4 : 0.2,
                weight: hoveredCountryIndex === index ? 2 : 1
              }} 
              positions={polygon}
              eventHandlers={{
                mouseover: () => setHoveredCountryIndex(index),
                mouseout: () => setHoveredCountryIndex(null),
                click: () => {
                  const country = polygonToCountry[index];
                  if (country) {
                    setSelectedCountry(country.name);
                    setIsPanelOpen(true);
                    setShowCountryDetails(true); // Show details immediately
                    setClickedOnce(true);
                  }
                }
              }}
            />
          ))}
        </MapContainer>
      </div>
      
      {/* Map Legend */}
      {
        clickedOnce===false &&
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg z-10">
        <h3 className="text-sm font-bold mb-2 flex items-center">
          <Globe className="w-4 h-4 mr-1" /> Travel Map
        </h3>
        <div className="flex items-center text-xs mb-1">
          <div className="w-4 h-4 bg-red-500 opacity-30 mr-2"></div>
          <span>Countries I've visited (click for details)</span>
        </div>
      </div>
      }

      {/* Content Panel */}
      <div 
        ref={panelRef}
        className={cn(
          "absolute right-0 top-0 h-full w-full md:w-[500px] bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out",
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Panel Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              {showCountryDetails && (
                <button 
                  onClick={() => setShowCountryDetails(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <h2 className="text-xl font-semibold">Travel Destinations</h2>
            </div>
            <button 
              onClick={() => {
                setIsPanelOpen(false);
                setShowCountryDetails(false);
                setSelectedCountry(null);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto">
            {showCountryDetails && selectedCountry && selectedCountryData ? (
              // Show selected country's details
              <div className="p-4 space-y-6">
                <div className="relative h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  {selectedCountryData.coverPhoto ? (
                    <CustomImage
                      url={selectedCountryData.coverPhoto}
                      alt={selectedCountryData.name}
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedCountryData.name}</h3>
                    <p className="text-muted-foreground text-justify">{selectedCountryData.description}</p>
                  </div>

                  {/* Milestones Section */}
                  {selectedCountryData.milestones && selectedCountryData.milestones.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-4">Places Visited</h4>
                      <div className="relative">
                        {/* Vertical timeline line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
                        
                        {/* Milestone items */}
                        <div className="space-y-6">
                          {selectedCountryData.milestones.map((milestone, idx) => (
                            <div key={idx} className="relative pl-12">
                              {/* Circle marker */}
                              <div className="absolute left-0 p-1 bg-white dark:bg-gray-900">
                                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                                  <CheckCircle className="h-4 w-4 text-white" />
                                </div>
                              </div>
                              
                              {/* Content */}
                              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-start">
                                  <h5 className="font-semibold text-lg">{milestone.place}</h5>
                                  {milestone.date && (
                                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded">
                                      {formatDate(milestone.date)}
                                    </span>
                                  )}
                                </div>
                                {milestone.description && (
                                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 text-justify">{milestone.description}</p>
                                )}
                                {milestone.photo && (
                                  <div 
                                    className="mt-3 relative h-32 rounded overflow-hidden cursor-pointer"
                                    onClick={() => milestone.photo && openPhotoViewer([milestone.photo], 0)}
                                  >
                                    <Image 
                                      src={milestone.photo} 
                                      alt={milestone.place} 
                                      fill 
                                      className="object-cover" 
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedCountryData.videos && selectedCountryData.videos.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Videos</h4>
                      <div className="grid gap-4">
                        {selectedCountryData.videos.map((video, index) => (
                          <a
                            key={index}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Youtube className="h-5 w-5 text-red-500" />
                            <span>{video.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCountryData.detailPhotos && selectedCountryData.detailPhotos.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Photos</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedCountryData.detailPhotos.map((photo, index) => (
                          <div 
                            key={index} 
                            className="relative h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer group"
                            onClick={() => openPhotoViewer(selectedCountryData.detailPhotos || [], index)}
                          >
                            <CustomImage
                              url={photo}
                              alt={`${selectedCountryData.name} photo ${index + 1}`}
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity flex items-center justify-center">
                              <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Show all countries
              <div className="p-4 space-y-4">
                {countries.map((country, index) => {
                  // Find the country data to get its destinations count
                  const countryData = polygonToCountry.find(c => c.name === country);
                  return (
                    <Card 
                      key={`${country}-${index}`}
                      className="cursor-pointer hover:shadow-lg transition-all"
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowCountryDetails(true);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{country}</h3>
                            <p className="text-sm text-muted-foreground">
                              {countryData?.milestones?.length || 0} destinations
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toggle Panel Button */}
      {!isPanelOpen && (
        <button
          onClick={() => {setIsPanelOpen(true);setSelectedCountry(null);}}
          className="absolute right-4 top-4 z-10 bg-white dark:bg-gray-900 p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <ChevronRight className="h-5 w-5 rotate-180" />
        </button>
      )}

      {/* Photo Viewer Dialog */}
      <Dialog open={photoViewerOpen} onOpenChange={setPhotoViewerOpen}>
        <DialogContent className="max-w-screen-xl p-0 w-full h-full max-h-screen flex flex-col bg-black/95 z-[1002]" >
          {/* Header */}
          <DialogTitle className="sr-only">Photo Viewer</DialogTitle>
          
          {/* Photo navigation */}
          <div 
            className="relative flex-1 flex items-center justify-center touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Previous button */}
            <button 
              onClick={(e) => prevPhoto(e)}
              className="absolute left-4 z-20 text-white hover:text-gray-300 p-2 rounded-full bg-black/30"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            
            {/* Photo */}
            <div className="relative w-full h-full flex items-center justify-center">
              {selectedPhotos[selectedPhotoIndex] && (
                <div className="relative w-full h-full">
                  <Image
                    src={selectedPhotos[selectedPhotoIndex]}
                    alt={`Photo ${selectedPhotoIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            
            {/* Next button */}
            <button 
              onClick={(e) => nextPhoto(e)}
              className="absolute right-4 z-20 text-white hover:text-gray-300 p-2 rounded-full bg-black/30"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>
          
          {/* Photo counter */}
          <div className="p-4 text-center text-white">
            {selectedPhotoIndex + 1} / {selectedPhotos.length}
          </div>

          <DialogClose asChild>
            <div className='absolute bg-white h-4 w-4 right-4 top-4 p-2 rounded'/>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MapComponent