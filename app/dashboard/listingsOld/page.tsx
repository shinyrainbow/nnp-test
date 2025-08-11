'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Plus, Search, Filter, MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight } from 'lucide-react'

// Generate 200 mock properties
const generateMockProperties = () => {
  const propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse', 'Studio', 'Loft']
  const statuses = ['Available', 'Rented', 'Pending', 'Maintenance']
  const locations = [
    'Downtown', 'Midtown', 'Uptown', 'Suburbs North', 'Suburbs South', 
    'Waterfront', 'Historic District', 'Business District', 'University Area', 
    'Shopping District', 'Residential Park', 'City Center'
  ]
  const streets = [
    'Main St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Maple Dr', 'Cedar Ln', 
    'Park Ave', 'First St', 'Second St', 'Broadway', 'Market St', 'Church St',
    'Washington Ave', 'Lincoln Blvd', 'Jefferson Way', 'Madison Dr', 'Adams St',
    'Wilson Ave', 'Taylor Rd', 'Brown St', 'Davis Ave', 'Miller Rd', 'Moore St',
    'Anderson Ave', 'Thomas Dr', 'Jackson Blvd', 'White St', 'Harris Ave'
  ]

  const properties = []
  
  for (let i = 1; i <= 200; i++) {
    const bedrooms = Math.floor(Math.random() * 5) + 1 // 1-5 bedrooms
    const bathrooms = Math.floor(Math.random() * 3) + 1 // 1-3 bathrooms
    const area = Math.floor(Math.random() * 2000) + 500 // 500-2500 sq ft
    const basePrice = Math.floor(Math.random() * 4000) + 1200 // $1200-$5200
    const location = locations[Math.floor(Math.random() * locations.length)]
    const street = streets[Math.floor(Math.random() * streets.length)]
    const streetNumber = Math.floor(Math.random() * 9999) + 1
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    
    properties.push({
      id: i,
      title: `${streetNumber} ${street}`,
      address: `${streetNumber} ${street}, ${location}, NY 1000${Math.floor(i/100)}`,
      price: `$${basePrice.toLocaleString()}/month`,
      numericPrice: basePrice,
      type: propertyType,
      status: status,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      area: `${area.toLocaleString()} sq ft`,
      numericArea: area,
      location: location,
      image: `/placeholder.svg?height=200&width=300&text=${propertyType}`
    })
  }
  
  return properties
}

const mockProperties = generateMockProperties()

export default function ListingsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [bedroomFilter, setBedroomFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Get unique values for filters
  const uniqueLocations = [...new Set(mockProperties.map(p => p.location))].sort()
  const uniqueTypes = [...new Set(mockProperties.map(p => p.type))].sort()

  // Filter properties based on search criteria
  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      const matchesSearch = 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesLocation = locationFilter === 'all' || property.location === locationFilter
      const matchesStatus = statusFilter === 'all' || property.status.toLowerCase() === statusFilter
      const matchesType = typeFilter === 'all' || property.type === typeFilter
      const matchesBedrooms = bedroomFilter === 'all' || property.bedrooms.toString() === bedroomFilter
      
      const matchesPrice = (() => {
        if (!minPrice && !maxPrice) return true
        const price = property.numericPrice
        const min = minPrice ? parseInt(minPrice) : 0
        const max = maxPrice ? parseInt(maxPrice) : Infinity
        return price >= min && price <= max
      })()

      return matchesSearch && matchesLocation && matchesStatus && matchesType && matchesBedrooms && matchesPrice
    })
  }, [searchTerm, locationFilter, statusFilter, typeFilter, bedroomFilter, minPrice, maxPrice])

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProperties = filteredProperties.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = (filterSetter: (value: string) => void, value: string) => {
    filterSetter(value)
    setCurrentPage(1)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'rented': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'maintenance': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setLocationFilter('all')
    setStatusFilter('all')
    setTypeFilter('all')
    setMinPrice('')
    setMaxPrice('')
    setBedroomFilter('all')
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Property Listings</h1>
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProperties.length)} of {filteredProperties.length} properties
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Listing
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, address, or location..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10"
            />
          </div>

          {/* Filter Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Select value={locationFilter} onValueChange={(value) => handleFilterChange(setLocationFilter, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueLocations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={(value) => handleFilterChange(setStatusFilter, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type">Property Type</Label>
              <Select value={typeFilter} onValueChange={(value) => handleFilterChange(setTypeFilter, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select value={bedroomFilter} onValueChange={(value) => handleFilterChange(setBedroomFilter, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4">4 Bedrooms</SelectItem>
                  <SelectItem value="5">5+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Row 2 - Price Range */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="minPrice">Min Price ($)</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="1000"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
            <div>
              <Label htmlFor="maxPrice">Max Price ($)</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="5000"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results and Pagination Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Items per page:</span>
          <Select value={itemsPerPage.toString()} onValueChange={(value) => {
            setItemsPerPage(parseInt(value))
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pagination */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className="w-10"
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{property.title}</CardTitle>
                <Badge className={getStatusColor(property.status)}>
                  {property.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {property.address}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-2xl font-bold text-primary">{property.price}</div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="flex items-center">
                    <Bed className="mr-1 h-4 w-4" />
                    {property.bedrooms} bed
                  </span>
                  <span className="flex items-center">
                    <Bath className="mr-1 h-4 w-4" />
                    {property.bathrooms} bath
                  </span>
                  <span className="flex items-center">
                    <Square className="mr-1 h-4 w-4" />
                    {property.area}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {property.type} • {property.location}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <span className="text-sm text-gray-600 px-4">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

      {/* No Results */}
      {filteredProperties.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or clearing the filters.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
