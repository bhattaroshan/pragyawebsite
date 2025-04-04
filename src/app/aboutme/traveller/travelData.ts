export interface TravelLocation {
  name: string;
  country: string;
  coordinates: [number, number];
  photos: string[];
  videos?: {
    title: string;
    url: string;
    thumbnail: string;
  }[];
  description: string;
  visitDate: string;
}

export const travelLocations: TravelLocation[] = [
  {
    name: "Tokyo",
    country: "Japan",
    coordinates: [35.6762, 139.6503],
    photos: [
      "/travel/tokyo/shibuya.jpg",
      "/travel/tokyo/meiji.jpg",
      "/travel/tokyo/ueno.jpg"
    ],
    videos: [
      {
        title: "Shibuya Crossing Experience",
        url: "https://www.youtube.com/embed/your-video-id",
        thumbnail: "/travel/tokyo/shibuya-thumb.jpg"
      }
    ],
    description: "Exploring the vibrant streets of Tokyo, from the iconic Shibuya Crossing to the peaceful Meiji Shrine.",
    visitDate: "2023"
  },
  {
    name: "Dubai",
    country: "UAE",
    coordinates: [25.1972, 55.2718],
    photos: [
      "/travel/dubai/burj-khalifa.jpg",
      "/travel/dubai/dubai-mall.jpg"
    ],
    description: "Experiencing the modern marvels of Dubai, including the world's tallest building.",
    visitDate: "2023"
  },
  // Add more locations as needed
]; 