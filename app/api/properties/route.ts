import { NextResponse } from "next/server"

// Mock data
const projects = [
  {
    id: 1,
    projectName: "Siam Sky Tower",
    projectCode: "SST001",
    projectLocation: ["Rama 9", "Phrom Phong"],
    projectImageUrl: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&auto=format&q=80",
    ],
    projectFacilities: [
      "Swimming Pool",
      "Fitness Center",
      "Sky Garden",
      "24/7 Security",
      "Parking Garage",
      "CCTV Surveillance",
      "Key Card Access",
      "Concierge Service",
      "Children's Playground",
      "Library",
      "Co-working Space",
      "Rooftop Terrace",
    ],
    addressNumber: "999",
    addressSubDistrict: "Huai Khwang",
    addressDistrict: "Huai Khwang",
    addressProvince: "Bangkok",
    addressZipcode: "10310",
  },
  {
    id: 2,
    projectName: "Chao Phraya Residence",
    projectCode: "CPR002",
    projectLocation: ["Riverside", "Charoen Nakhon"],
    projectImageUrl: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop&auto=format&q=80",
    ],
    projectFacilities: [
      "Infinity Pool",
      "Spa & Wellness Center",
      "River View Deck",
      "24/7 Security",
      "Valet Parking",
      "Smart Home System",
      "Shuttle Boat Service",
      "Business Center",
      "BBQ Area",
      "Yoga Studio",
      "Mini Mart",
      "Laundry Service",
    ],
    addressNumber: "188",
    addressSubDistrict: "Khlong Ton Sai",
    addressDistrict: "Khlong San",
    addressProvince: "Bangkok",
    addressZipcode: "10600",
  },
  {
    id: 3,
    projectName: "Bangkok Central Condo",
    projectCode: "BCC003",
    projectLocation: ["Asoke", "Sukhumvit"],
    projectImageUrl: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&auto=format&q=80",
    ],
    projectFacilities: [
      "Rooftop Pool",
      "Modern Gym",
      "Sky Lounge",
      "24/7 Security",
      "Underground Parking",
      "High-Speed Elevators",
      "BTS Skywalk Connection",
      "Reception Lobby",
      "Game Room",
      "Meeting Rooms",
      "Convenience Store",
      "Dry Cleaning",
    ],
    addressNumber: "555",
    addressSubDistrict: "Khlong Toei Nuea",
    addressDistrict: "Watthana",
    addressProvince: "Bangkok",
    addressZipcode: "10110",
  },
  {
    id: 4,
    projectName: "Riverside Park",
    projectCode: "RSP004",
    projectLocation: ["Rama 3", "Chong Nonsi"],
    projectImageUrl: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600585154084-fb1ab39597ce?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600566752734-d1d394a5d99f?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&auto=format&q=80",
    ],
    projectFacilities: [
      "Lagoon Pool",
      "Fitness Studio",
      "Garden Terrace",
      "24/7 Security",
      "Covered Parking",
      "Fingerprint Access",
      "Shuttle Service",
      "Mail Service",
      "Kids Pool",
      "Sauna Room",
      "Cafe Corner",
      "Package Locker",
    ],
    addressNumber: "777",
    addressSubDistrict: "Chong Nonsi",
    addressDistrict: "Yan Nawa",
    addressProvince: "Bangkok",
    addressZipcode: "10120",
  },
  {
    id: 5,
    projectName: "Lumphini Suites",
    projectCode: "LPS005",
    projectLocation: ["Lumphini", "Silom"],
    projectImageUrl: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop&auto=format&q=80",
    ],
    projectFacilities: [
      "Executive Pool",
      "Premium Gym",
      "Executive Lounge",
      "24/7 Concierge",
      "Premium Parking",
      "Smart Card Access",
      "Limousine Service",
      "Business Lounge",
      "Wine Cellar",
      "Cigar Room",
      "Private Dining",
      "Housekeeping Service",
    ],
    addressNumber: "123",
    addressSubDistrict: "Lumphini",
    addressDistrict: "Pathum Wan",
    addressProvince: "Bangkok",
    addressZipcode: "10330",
  },
]

const TYPES = ["Condo", "Apartment", "Townhouse", "House"]
const STATIONS = ["ทองหล่อ", "อโศก", "สุขุมวิท", "พระโขนง", "เอกมัย", "สยาม", "ชิดลม", "ราชเทวี"]

// Room amenities options
const ROOM_AMENITIES_OPTIONS = [
  "Air Conditioning",
  "Built-in Wardrobe",
  "Balcony",
  "City View",
  "Fully Furnished",
  "Kitchen",
  "Refrigerator",
  "Microwave",
  "Washing Machine",
  "TV",
  "WiFi",
  "Water Heater",
  "Bathtub",
  "Shower",
  "Floor-to-Ceiling Windows",
  "Hardwood Floors",
  "Marble Bathroom",
  "Walk-in Closet",
  "Study Room",
  "Dining Area",
  "Living Room",
  "Master Bedroom",
  "Guest Bedroom",
  "Maid's Room",
  "Storage Room",
  "Pantry",
]

// When available options
const WHEN_AVAILABLE_OPTIONS = [
  "Available Now",
  "Available in 1 week",
  "Available in 2 weeks",
  "Available in 1 month",
  "Available in 2 months",
  "Available in 3 months",
  "End of lease - December 2024",
  "End of lease - January 2025",
  "End of lease - February 2025",
  "End of lease - March 2025",
  "Negotiable",
]

// Generate mock properties
const generateMockProperties = () => {
  const properties = []

  for (let i = 1; i <= 50; i++) {
    const project = projects[Math.floor(Math.random() * projects.length)]
    const roomType = TYPES[Math.floor(Math.random() * TYPES.length)]
    const bedrooms = Math.floor(Math.random() * 3) + 1
    const bathrooms = Math.floor(Math.random() * 2) + 1
    const size = Math.floor(Math.random() * 40) + 20
    const rentalRate = Math.floor(Math.random() * 42000) + 8000
    const sellPrice = Math.floor(Math.random() * 9000000) + 1000000
    const station = STATIONS[Math.floor(Math.random() * STATIONS.length)]
    const distance = Math.floor(Math.random() * 1900) + 100
    const floor = Math.floor(Math.random() * 50) + 1 // Floor 1-50
    const whenAvailable = WHEN_AVAILABLE_OPTIONS[Math.floor(Math.random() * WHEN_AVAILABLE_OPTIONS.length)]
    const isAcceptShortTerm = Math.random() > 0.6 // 40% accept short term

    // Generate random room amenities (3-8 amenities per room)
    const numAmenities = Math.floor(Math.random() * 6) + 3
    const roomAmenities = []
    const shuffledAmenities = [...ROOM_AMENITIES_OPTIONS].sort(() => 0.5 - Math.random())
    for (let j = 0; j < numAmenities; j++) {
      roomAmenities.push(shuffledAmenities[j])
    }

    // Generate multiple Unsplash images for each property
    const imageUrls = [
      `https://images.unsplash.com/photo-${1560184000000 + i * 1000}?w=400&h=300&fit=crop&auto=format&q=80`,
      `https://images.unsplash.com/photo-${1560184000000 + i * 1000 + 100}?w=400&h=300&fit=crop&auto=format&q=80`,
      `https://images.unsplash.com/photo-${1560184000000 + i * 1000 + 200}?w=400&h=300&fit=crop&auto=format&q=80`,
      `https://images.unsplash.com/photo-${1560184000000 + i * 1000 + 300}?w=400&h=300&fit=crop&auto=format&q=80`,
    ]

    // Generate note with property details
    const noteOptions = [
      `Beautiful ${roomType.toLowerCase()} with stunning city views and modern amenities. Perfect for professionals.`,
      `Spacious ${roomType.toLowerCase()} in prime location. Recently renovated with high-quality finishes.`,
      `Luxury ${roomType.toLowerCase()} with premium facilities. Great investment opportunity.`,
      `Cozy ${roomType.toLowerCase()} in convenient location. Close to shopping and dining.`,
      `Modern ${roomType.toLowerCase()} with excellent connectivity. Ideal for young professionals.`,
      `Elegant ${roomType.toLowerCase()} with river views. Peaceful and serene environment.`,
      `Contemporary ${roomType.toLowerCase()} with smart home features. Move-in ready condition.`,
    ]
    const note = noteOptions[Math.floor(Math.random() * noteOptions.length)]

    // Generate messageToPost with property details
    const messageToPost = `🏠 Beautiful ${roomType.toLowerCase()} for rent at ${project.projectName}! 
✨ ${bedrooms} bedroom${bedrooms > 1 ? "s" : ""}, ${bathrooms} bathroom${bathrooms > 1 ? "s" : ""}, ${size} sqm
🏢 Floor ${floor}
🌟 Features: ${roomAmenities.slice(0, 3).join(", ")}
📍 Only ${distance}m from ${station} station
💰 Starting from ฿${rentalRate.toLocaleString()}/month
📅 ${whenAvailable}${isAcceptShortTerm ? " | Short-term OK" : ""}
📞 Contact us for viewing appointment!
#${project.projectName.replace(/\s+/g, "")} #BangkokCondo #ForRent`

    const property = {
      id: i,
      propertyId: i,
      roomNumber: `${Math.floor(Math.random() * 30) + 1}/${Math.floor(Math.random() * 99) + 1}`,
      projectId: project.id,
      projectName: project.projectName,
      location: project.projectLocation,
      status: ["available", "rented", "sold"][Math.floor(Math.random() * 3)],
      bedRoom: bedrooms,
      bathRoom: bathrooms,
      roomSize: size,
      rentalRate: rentalRate,
      sell: sellPrice,
      roomType: roomType,
      phone: `0${Math.floor(Math.random() * 900000000) + 100000000}`,
      lineId: `line_user${i}`,
      indexFbUrl: `https://www.facebook.com/user${i}`,
      imageUrls: imageUrls,
      isPetFriendly: Math.random() > 0.5,
      isOwner: Math.random() > 0.7,
      distanceToStation: distance,
      distanceStation: station,
      note: note, // Changed from "more" to "note"
      carPark: Math.floor(Math.random() * 3),
      messageToPost: messageToPost,
      roomAmenities: roomAmenities,
      floor: floor, // New field
      whenAvailable: whenAvailable, // New field
      isAcceptShortTerm: isAcceptShortTerm, // New field
      propertyCode: `P${String(i).padStart(4, "0")}`, // New field: P0001, P0002, etc.
      projectPropertyCode: `${project.projectCode}-${String(i).padStart(3, "0")}`, // New field: SST001-001, CPR002-002, etc.
    }
    properties.push(property)
  }

  return properties
}

// Cache the generated properties to ensure consistency across requests
let cachedProperties: any[] | null = null

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const type = searchParams.get("type")
    const bedRoom = searchParams.get("bedRoom")
    const minSize = searchParams.get("minSize")
    const maxSize = searchParams.get("maxSize")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const page = searchParams.get("page") || "1"
    const limit = searchParams.get("limit") || "12"
    const pageNumber = Number.parseInt(page)
    const limitNumber = Number.parseInt(limit)

    // Generate properties only once and cache them
    if (!cachedProperties) {
      cachedProperties = generateMockProperties()
    }

    let filteredProperties = [...cachedProperties]

    // Apply server-side filtering with OR operator for comma-separated search terms
    if (search) {
      // Parse comma-separated search terms
      const searchTerms = search
        .split(",")
        .map((term) => term.trim().toLowerCase())
        .filter(Boolean)

      if (searchTerms.length > 0) {
        filteredProperties = filteredProperties.filter((property) => {
          // Check if ANY of the search terms match project name OR location
          return searchTerms.some((term) => {
            const matchesProjectName = property.projectName.toLowerCase().includes(term)
            const matchesLocation = property.location.some((loc: string) => loc.toLowerCase().includes(term))
            return matchesProjectName || matchesLocation
          })
        })
      }
    }

    if (type && type !== "all") {
      filteredProperties = filteredProperties.filter((property) => property.roomType === type)
    }

    if (bedRoom && bedRoom !== "all") {
      filteredProperties = filteredProperties.filter((property) => property.bedRoom === Number.parseInt(bedRoom))
    }

    if (minSize) {
      filteredProperties = filteredProperties.filter((property) => property.roomSize >= Number.parseInt(minSize))
    }

    if (maxSize) {
      filteredProperties = filteredProperties.filter((property) => property.roomSize <= Number.parseInt(maxSize))
    }

    if (minPrice) {
      filteredProperties = filteredProperties.filter((property) => property.rentalRate >= Number.parseInt(minPrice))
    }

    if (maxPrice) {
      filteredProperties = filteredProperties.filter((property) => property.rentalRate <= Number.parseInt(maxPrice))
    }

    // Apply pagination
    const startIndex = (pageNumber - 1) * limitNumber
    const endIndex = startIndex + limitNumber
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedProperties,
      total: filteredProperties.length,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(filteredProperties.length / limitNumber),
      projects: projects,
      propertyTypes: TYPES,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch properties" }, { status: 500 })
  }
}
