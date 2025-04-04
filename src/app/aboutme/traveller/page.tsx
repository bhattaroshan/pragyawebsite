'use client'

import React, { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { geoPoly } from './geopoly'
import { travelLocations } from './travelData'
import { Card, CardContent } from "@/components/ui/card"
import { Globe, MapPin, Calendar, Play, ChevronRight, Youtube, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

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
  visitDate?: string;
  destinations?: number|string
}

const MapComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [hoveredCountryIndex, setHoveredCountryIndex] = useState<number | null>(null)
  const [showCountryDetails, setShowCountryDetails] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Map polygon indices to country data with all details
  const polygonToCountry: CountryData[] = [
    { 
      name: 'Nepal',
      description: 'Home country with rich cultural heritage and stunning Himalayan landscapes.',
      coverPhoto: '/images/travel/nepal.jpg',
      detailPhotos: ['/images/nepal/kathmandu.jpg', '/images/nepal/pokhara.jpg'],
      visitDate: 'Lifetime',
      destinations: 'many'
    },
    { 
      name: 'Dubai, UAE',
      description: 'I visited Dubai and Abu Dhabi with my wife for leisure. We were there for a week.',
      coverPhoto: '/images/travel/dubai.webp',
      detailPhotos: ['/images/uae/dubai-mall.jpg', '/images/uae/burj-khalifa.jpg'],
      visitDate: '2022',
      destinations: 2
    },
    { 
      name: 'Japan',
      description: 'I went to Tokyo, Osaka and Kyoto for vacation with my wife for 14 days and experienced variety of foods and culture of the country.',
      coverPhoto: '/images/travel/japan.jpg',
      detailPhotos: ['/images/japan/tokyo.jpg', '/images/japan/kyoto.jpg'],
      visitDate: '2023',
      destinations: 3
    },
    { 
      name: 'Washington, USA',
      description: 'Diverse nation with varied landscapes and cultural experiences.',
      coverPhoto: '/images/travel/washington.jpg',
      detailPhotos: ['/images/usa/nyc.jpg', '/images/usa/sf.jpg'],
      visitDate: '2025'
    },
    { 
      name: 'Nebraska, USA',
      description: 'Diverse nation with varied landscapes and cultural experiences.',
      coverPhoto: '/images/travel/nebraska.jpg',
      detailPhotos: ['/images/usa/nyc.jpg', '/images/usa/sf.jpg'],
      visitDate: '2025'
    },
    { 
      name: 'Washington DC, USA',
      description: 'Diverse nation with varied landscapes and cultural experiences.',
      coverPhoto: '/images/travel/washington-dc.jpg',
      detailPhotos: ['/images/travel/washington-dc.jpg', '/images/usa/sf.jpg'],
      visitDate: '2025'
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

  // Handle click outside panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsPanelOpen(false);
      }
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
                  }
                }
              }}
            />
          ))}
        </MapContainer>
      </div>

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
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto">
            {showCountryDetails && selectedCountry && selectedCountryData ? (
              // Show selected country's details
              <div className="p-4 space-y-6">
                <div className="relative h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  {selectedCountryData.coverPhoto ? (
                    <Image
                      src={selectedCountryData.coverPhoto}
                      alt={selectedCountryData.name}
                      fill
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
                    <p className="text-muted-foreground">{selectedCountryData.description}</p>
                  </div>

                  {selectedCountryData.visitDate && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Visited: {selectedCountryData.visitDate}</span>
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
                          <div key={index} className="relative h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                            <Image
                              src={photo}
                              alt={`${selectedCountryData.name} photo ${index + 1}`}
                              fill
                              className="object-cover"
                            />
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
                              {countryData?.destinations || 0} destinations
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
          onClick={() => setIsPanelOpen(true)}
          className="absolute right-4 top-4 z-10 bg-white dark:bg-gray-900 p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <ChevronRight className="h-5 w-5 rotate-180" />
        </button>
      )}
    </div>
  )
}

export default MapComponent