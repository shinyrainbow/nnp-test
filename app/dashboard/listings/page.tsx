"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Building,
  Bed,
  Bath,
  Car,
  Ruler,
  Heart,
  Loader2,
  Grid,
  List,
  Star,
  Download,
  Calendar,
  Clock,
  Edit,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PropertyTable } from "@/components/property-table";
import { Pagination } from "@/components/pagination";
import { ImageSlider } from "@/components/image-slider";
import { CopyButtons } from "@/components/copy-buttons";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";

interface Property {
  id: number;
  projectPropertyCode: string;

  status: string;
  whenAvailable: string;
  isAcceptShortTerm: boolean;

  addressNumber: string;
  bedRoom: string;
  bathRoom: string;
  roomSize: string;
  floor: number;
  building: string;
  roomType: string;
  isPetFriendly: boolean;
  carPark: string;
  imageUrls: string[];
  roomAmenities: string[];

  rentalRate: string;
  sellPrice: string;

  phone: string;
  lineId: string;
  fbUser: string;

  isOwner: boolean;
  linkPost: string;

  note: string;
  originalMessage: string;
  messageToPost: string;

  propertyCode: string;
  project: Project;
}

interface Project {
  id: number;
  projectCode: string;

  projectNameEn: string;
  projectNameTh: string;
  projectDescriptionEn: string;
  projectDescriptionTh: string;

  projectLocation: string[];
  projectImageUrl: string[];
  projectFacilities: string[];

  addressNumber: string;
  addressSubDistrict: string;
  addressDistrict: string;
  addressProvince: string;
  addressZipcode: string;
}

const propertyTypes = ["Condo", "Apartment", "Townhouse", "House"];

export default function PropertySearch() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [downloadingStates, setDownloadingStates] = useState<
    Record<number, boolean>
  >({});

  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("all");
  const [selectedBedRoom, setSelectedBedRoom] = useState("all");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalSearchResults, setTotalSearchResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchData(query: string) {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/listings?${query}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      const response = await res.json();
      const { data, limit, total, page } = response;
      setProperties(data);
      setTotalSearchResults(total);
      const totalPageButton = Math.ceil(parseInt(total) / parseInt(limit));
      setTotalPages(totalPageButton);
      setTotalItems(limit);
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // load default on mount
    fetchData(`page=${currentPage}&limit=${pageSize}&
      projectName=${searchTerm}&
      minPrice=${minPrice}&maxPrice=${maxPrice}&
      roomType=${selectedRoomType}&bedRoom=${selectedBedRoom}&
      minSize=${minSize}&maxSize=${maxSize}`);
  }, []);

  // Download all images function
  const downloadAllImages = async (property: Property) => {
    try {
      setDownloadingStates((prev) => ({ ...prev, [property.id]: true }));

      for (let i = 0; i < property.imageUrls.length; i++) {
        const imageUrl = property.imageUrls[i];
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${property.propertyCode.replace(/\s+/g, "_")}_Image_${
          i + 1
        }.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        if (i < property.imageUrls.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    } catch (error) {
      console.error("Error downloading images:", error);
    } finally {
      setDownloadingStates((prev) => ({ ...prev, [property.id]: false }));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === "th" ? "th-TH" : "en-US").format(
      price
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "rented":
        return "bg-yellow-100 text-yellow-800";
      case "sold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLocalizedPropertyType = (type: string) => {
    const typeMap: Record<string, string> = {
      Condo: t("condo"),
      Apartment: t("apartment"),
      Townhouse: t("townhouse"),
      House: t("house"),
    };
    return typeMap[type] || type;
  };

  const getLocalizedStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      available: t("available"),
      rented: t("rented"),
      sold: t("sold"),
    };
    return statusMap[status] || status;
  };

  // const getCurrentProject = (projectId: number) => {
  //   return projects.find((project) => project.id === projectId)
  // }
  const parsePrice = (value: string) => {
    if (!value) return 0;
    return Number(value.replace(/,/g, ""));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const newSearchParams = {
      projectName: searchTerm,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      roomType: selectedRoomType,
      bedRoom: selectedBedRoom,
      page,
      limit: pageSize,
    };

    const searchParams = new URLSearchParams(
      Object.entries(newSearchParams).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    );
    fetchData(searchParams.toString());
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);

    const newSearchParams = {
      projectName: searchTerm,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      roomType: selectedRoomType,
      bedRoom: selectedBedRoom,
      page: 1,
      limit: newPageSize,
    };

    const searchParams = new URLSearchParams(
      Object.entries(newSearchParams).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    );
    fetchData(searchParams.toString());
  };

  const handleSearch = () => {
    const newSearchParams = {
      projectName: searchTerm,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      roomType: selectedRoomType,
      bedRoom: selectedBedRoom,
      page: 1,
    };

    const searchParams = new URLSearchParams(
      Object.entries(newSearchParams).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    );
    fetchData(searchParams.toString());
  };

  const handleClearFilters = () => {
    setSearchTerm((prev) => "");
    setMinPrice((prev) => "");
    setMaxPrice((prev) => "");
    setMinSize((prev) => "");
    setMaxSize((prev) => "");
    setSelectedRoomType((prev) => "all");
    setSelectedBedRoom((prev) => "all");
    setCurrentPage(1);

    const newSearchParams = {
      projectName: "",
      minPrice: "",
      maxPrice: "",
      minSize: "",
      maxSize: "",
      roomType: "all",
      bedRoom: "all",
    };

    const searchParams = new URLSearchParams(
      Object.entries(newSearchParams).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    );
    fetchData(searchParams.toString());
  };

  const handleEditProperty = (propertyId: number) => {
    router.push(`/dashboard/listings/${propertyId}`);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  // if (loading && properties.length === 0) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
  //         <p className="text-gray-600">{t("loadingProperties")}</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    // <div className="min-h-screen bg-gray-50">
    <div className="">
      {/* <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("title")}</h1>
            <p className="text-gray-600">{t("subtitle", { count: totalItems.toString() })}</p>
          </div>
        </div> */}

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            {t("searchProperties")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("searchByNameLocation")}
                </label>
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter project name or location"
                  className="w-full"
                />
                {/* <CommaSeparatedSearch
                    projects={projects}
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder={t("enterProjectName")}
                    locale={language}
                  /> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("filterByRoomType")}
                </label>
                <Select
                  value={selectedRoomType}
                  onValueChange={setSelectedRoomType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectRoomType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("allRoomTypes")}</SelectItem>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {getLocalizedPropertyType(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("filterByBedrooms")}
                </label>
                <Select
                  value={selectedBedRoom}
                  onValueChange={setSelectedBedRoom}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectBedrooms")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("allBedrooms")}</SelectItem>
                    {[1, 2, 3].map((bedCount) => (
                      <SelectItem key={bedCount} value={bedCount.toString()}>
                        {bedCount} {bedCount > 1 ? t("bedrooms") : t("bedroom")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("sizeRange")}
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder={t("minSize")}
                    type="number"
                    min="20"
                    max="400"
                    step="1"
                    value={minSize}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        value === "" ||
                        (!isNaN(Number(value)) && Number(value) >= 0)
                      ) {
                        setMinSize(value);
                      }
                    }}
                    className="w-full"
                  />
                  <Input
                    placeholder={t("maxSize")}
                    type="number"
                    min="20"
                    max="400"
                    step="1"
                    value={maxSize}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        value === "" ||
                        (!isNaN(Number(value)) && Number(value) >= 0)
                      ) {
                        setMaxSize(value);
                      }
                    }}
                    className="w-full"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t("sizeRangeHelper")}
                </p>
              </div>

              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("rentalPriceRange")}
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder={t("minPrice")}
                    type="number"
                    min="0"
                    step="1"
                    value={minPrice}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        value === "" ||
                        (!isNaN(Number(value)) && Number(value) >= 0)
                      ) {
                        setMinPrice(value);
                      }
                    }}
                    className="w-full"
                  />
                  <Input
                    placeholder={t("maxPrice")}
                    type="number"
                    min="0"
                    step="1"
                    value={maxPrice}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        value === "" ||
                        (!isNaN(Number(value)) && Number(value) >= 0)
                      ) {
                        setMaxPrice(value);
                      }
                    }}
                    className="w-full"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t("priceRangeHelper")}
                </p>
              </div>

              <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
                <div className="flex gap-2 pt-6">
                  <Button
                    type="submit"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <Search className="w-4 h-4" />
                    {t("searchButton")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClearFilters}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    {t("clearFilters")}
                  </Button>
                  {/* <div className="flex items-center text-sm text-gray-600">
                    {t("activeFilters")}{" "}
                    {
                      [
                        searchTerm && "Search",
                        selectedRoomType !== "all" && "Room Type",
                        selectedBedRoom !== "all" && "Bedrooms",
                        minSize && "Min Size",
                        maxSize && "Max Size",
                        minPrice && "Min Price",
                        maxPrice && "Max Price",
                      ].filter(Boolean).length
                    }
                  </div> */}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {!loading && properties.length === 0 ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-4 animate-spin mx-auto mb-4 text-blue-600 mt-[-200px]" />
            <p className="text-gray-600">{t("loadingProperties")}</p>
          </div>
        </div>
      ) : (
        <>
          {/* View Toggle and Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {totalSearchResults} properties
              {/* {t("showing", { count: properties.length.toString() })} */}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex items-center gap-2"
              >
                <Grid className="w-4 h-4" />
                {t("grid")}
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="flex items-center gap-2"
              >
                <List className="w-4 h-4" />
                {t("table")}
              </Button>
            </div>
          </div>

          {/* Pagination - Top */}
          <div className="mb-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalSearchResults={totalSearchResults}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              locale={language}
            />
          </div>
          {/* )} */}

          {/* Property Display */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {properties.map((property) => {
                const priceRentalNumber = parsePrice(property.rentalRate);
                const formattedRentalPrice = formatPrice(priceRentalNumber);

                const priceSellNumber = parsePrice(property.sellPrice);
                const formattedSellPrice = formatPrice(priceSellNumber);
                // const currentProject = getCurrentProject(property.projectId)
                return (
                  <Card
                    key={property.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {property.project.projectNameEn}
                          </CardTitle>
                          {/* <p className="text-sm text-gray-600 mt-1">
                        {t("room")} {property.roomNumber} • 
                        {t("floor")}{" "} {property.floor}
                      </p> */}
                          {/* {currentProject && (
                          <p className="text-xs text-blue-600 font-mono">{currentProject.projectCode}</p>
                        )} */}
                          {/* <div className="flex gap-2 text-xs font-mono">
                        <span className="text-green-600">
                          {property.projectCode}-{property.projectPropertyCode}
                        </span>
                        <span className="text-purple-600"></span>
                      </div> */}
                        </div>

                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditProperty(property.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {property.location.join(", ")}
                    </div> */}

                      <div className="text-sm text-gray-600">
                        <span className="font-medium">
                          {property.distanceToStation}m
                        </span>{" "}
                        {language === "th" ? "ถึง" : "to"}{" "}
                        {property.distanceStation} {t("station")}
                      </div>

                      {/* <Badge className={getStatusColor(property.status)}>
                    {getLocalizedStatus(property.status)}
                  </Badge> */}
                    </CardHeader>

                    <div className="px-6 pb-2">
                      <ImageSlider
                        images={property.imageUrls}
                        alt={`${property.projectName} - ${t("room")} ${
                          property.roomNumber
                        }`}
                        className="w-full h-48"
                      />
                    </div>

                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-4 gap-1 text-sm text-[10px]">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span>
                            Fl. {property.floor}
                            {/* {getLocalizedPropertyType(property.roomType)} */}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Ruler className="w-4 h-4 text-gray-500" />
                          <span>
                            {property.roomSize}{" "}
                            {language === "th" ? "ตร.ม." : "sqm"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4 text-gray-500" />
                          <span>
                            {property.bedRoom} {t("bed")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4 text-gray-500" />
                          <span>
                            {property.bathRoom} {t("bath")}
                          </span>
                        </div>
                      </div>

                      {/* <div className="flex items-center gap-2 text-sm">
                    <Car className="w-4 h-4 text-gray-500" />
                    <span>
                      {property.carPark}{" "}
                      {property.carPark !== 1
                        ? t("parkingSpaces")
                        : t("parkingSpace")}
                    </span>
                  </div> */}

                      {/* <div className="text-sm text-gray-600">
                    <span className="font-medium">
                      {property.distanceToStation}m
                    </span>{" "}
                    {language === "th" ? "ถึง" : "to"}{" "}
                    {property.distanceStation} {t("station")}
                  </div> */}

                      {/* Availability */}
                      <div className="text-sm">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-gray-700">
                            {t("availability")}:
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {property.whenAvailable}
                        </p>
                        {/* {property.isAcceptShortTerm && (
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-green-500" />
                        <span className="text-green-600 text-xs">
                          {t("shortTermOk")}
                        </span>
                      </div>
                    )} */}
                      </div>

                      {/* Room Amenities */}
                      <div className="text-sm">
                        {/* <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-gray-700">
                        {t("amenities")}:
                      </span>
                    </div> */}
                        {/* <div className="flex flex-wrap gap-1">
                      {property.roomAmenities
                        .slice(0, 4)
                        .map((amenity, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {amenity}
                          </Badge>
                        ))}
                      {property.roomAmenities.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{property.roomAmenities.length - 4} more
                        </Badge>
                      )}
                    </div> */}
                      </div>

                      {/* Note */}
                      {/* <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <span className="font-medium">{t("note")}:</span>{" "}
                    {property.note}
                  </div> */}

                      {property.isPetFriendly && (
                        <Badge variant="outline" className="text-xs">
                          {t("petFriendly")}
                        </Badge>
                      )}

                      {property.isOwner && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700"
                        >
                          {t("ownerListed")}
                        </Badge>
                      )}

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-1">
                          <div>
                            <p className="text-sm text-gray-600">{t("rent")}</p>
                            <p className="text-lg font-bold text-blue-600">
                              ฿{formattedRentalPrice}
                              {t("month")}
                            </p>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="text-sm text-gray-600">{t("sale")}</p>
                          <p className="text-lg font-bold text-green-600">
                            ฿{formattedSellPrice}
                          </p>
                        </div>

                        <CopyButtons property={property} locale={language} />

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 bg-transparent"
                          onClick={() => downloadAllImages(property)}
                          disabled={downloadingStates[property.id]}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {downloadingStates[property.id]
                            ? t("downloadingImages")
                            : t("downloadImages")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="mb-8">
              <PropertyTable
                properties={properties}
                locale={language}
                onEdit={handleEditProperty}
              />
            </div>
          )}

          {/* Pagination - Bottom */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={totalItems}
                totalSearchResults={totalSearchResults}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                locale={language}
              />
            </div>
          )}
        </>
      )}

      {/* {properties.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">{t("noPropertiesFound")}</h3>
            <p>{t("tryAdjusting")}</p>
          </div>
        </div>
      )} */}
    </div>
    // </div>
  );
}
