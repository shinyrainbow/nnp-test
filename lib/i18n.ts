export const languages = {
  en: "English",
  th: "ไทย",
} as const;

export type Language = keyof typeof languages;

export const translations = {
  en: {
    "home.banner": "Naina Hub Professional Tools for",
    "home.subBanner": "Real Estate Agent",
    "home.description":
      "Access 10,000+ Listings, Build Contracts Instantly, Send & Save Messages in One Click — Everything Agents Need to Close Deals Faster.",

    "home.viewDashboard": "View Dashboard",
    "home.more": "See more",
    "home.adTitle": "Everything You Need to Succeed",
    "home.adDescription":
      "Our comprehensive toolkit helps real estate agents work more efficiently and close more deals",

    subtitle: "Find your perfect property from {count} available listings",

    // Authenthication
    signUpTitle: "Get Started",
    signUpDescription: "Create your Naina Hub account free!",
    signInTitle: "Welcome Back",
    signInDescription: "Sign in to your Naina Hub account",

    // Navigation
    features: "Features",
    pricing: "Pricing",
    contact: "Contact",
    dashboard: "Dashboard",
    signIn: "Sign In",
    signOut: "Sign Out",
    getStarted: "Get Started",

    // Hero Section
    heroTitle: "Real Estate Tools for",
    heroTitleHighlight: "Modern Agents",
    heroDescription:
      "Streamline your real estate business with powerful tools for property management, client relationships, and contract generation. Work smarter, not harder.",
    startFreeTrial: "Start Free Trial",
    watchDemo: "Watch Demo",

    // Features
    // dashboard: "",

    listings: "Listings",
    listingsDesc:
      "Property listings with filters — easy to find, fast, and convenient.",
    lineChatBot: "Line Chat Bot",
    lineChatBotDesc:
      "LINE bot to notify tenants about rent, water, and electricity bills.",
    postBuilder: "Auto Post Builder",
    postBuilderDesc:
      "Create ready-to-post messages for social media and easily link them to your listings.",
    contractBuilder: "Contract Builder",
    contractBuilderDesc:
      "Create professional rental contracts in just minutes.",

    propertyAnalytics: "Property Analytics",
    propertyAnalyticsDesc: "Track performance and property market trends",

    clientManagement: "Client Management",
    clientManagementDesc: "Manage leads and nurture relationships",

    calendar: "Appointment Management",
    calendarDesc: "Manage leads and nurture relationships",

    // clientManagement: "Client Management",
    // clientManagementDesc: "Manage leads and nurture relationships",

    // footer
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome":
      "Welcome back! Here's what's happening with your business.",
    "dashboard.recentActivity": "Recent Activity",
    "dashboard.latestUpdates": "Your latest actions and updates",
    "dashboard.upcomingTasks": "Upcoming Tasks",
    "dashboard.tasksToDo": "Things you need to do",

    "stats.changeFromLastMonth": "{{change}} from last month",

    "activity.newListing": "New listing added: 123 Main St",
    "activity.contractSigned": "Contract signed with John Doe",
    "activity.viewingScheduled": "Property viewing scheduled",
    "activity.hoursAgo": "{{count}} hours ago",
    "activity.dayAgo": "{{count}} day ago",

    "tasks.viewing": "Property viewing at 2 PM",
    "tasks.today": "Today",
    "tasks.reviewContract": "Review contract for 456 Oak Ave",
    "tasks.tomorrow": "Tomorrow",
    "tasks.followUp": "Follow up with potential client",
    "tasks.friday": "Friday",

    "stats.commission": "Total Closed Deals",
    "stats.totalRent": "Total Rental",
    "stats.totalSell": "Total Sales",
    "stats.totalVisit": "Total visit",

    // line chat bot
    "line.title": "Access Code",
    "line.description": "Your one-time verification code",
    "line.copy": "Copy to Clipboard",
    "line.copied": "Successfully Copied!",
    "line.instruction": "Click the button above to copy your code",
    "line.warning": "⚠️ This code expires after one use",
    "line.howToUse": "How to Use in Line Chat Bot",
    "line.explain": "Follow these steps to paste the code in your Line group",
    "line.step1": "Open Line Group",
    "line.step1explain":
      "Navigate to your Line group where the chat bot is active",
    "line.step2": "Tap Message Input",
    "line.step2explain":
      "Tap on the message input field at the bottom of the screen",
    "line.step3": "Paste the Code",
    "line.step3explain":
      'Long press in the input field and select "Paste" to insert your copied code',
    "line.step4": "Send Message",
    "line.step4explain":
      "Tap the send button to submit your code to the chat bot",
    "line.tips": "Pro Tip",
    "line.tipsexplain":
      "Make sure to paste the code exactly as copied. The chat bot will process your code automatically once sent.",

    // post builder
    "post.title": "Property Post Creator",
    "post.badge": "Real Estate Tool",
    "post.formatEditor": "Message Format Editor",
    "post.formatEditorDesc":
      "Create your custom property post format. Click the field tags below to insert them into your template.",
    "post.postFormatTemplate": "Post Format Template",
    "post.fieldTags": "Available Field Tags (click to insert):",
    "post.emojiTags": "Available Emoji Tags (click to insert):",

    "post.propertyData": "Property Data",
    "post.propertyDataDesc": "Sample property data for testing your format.",
    "post.loadData": "Load Mock Data",
    "post.generatePreview": "Generated Post Preview",
    "post.review": "Review your property post and copy it to your clipboard.",
    "post.copy": "Copy to Clipboard",
    "post.copied": "Copied",
    "post.saveTemplate": "Save Template",
    "post.savedTemplate": "Saved Template",

    // commission
    "commissionTracker.title": "Commission Tracker",
    "commissionTracker.description":
      "Track your earnings and commission payments",
    "commissionTracker.addButton": "Add Commission",
    "commissionTracker.dialogTitle": "Add New Commission",
    "commissionTracker.dialogDescription":
      "Record a new commission from a completed deal.",

    "commissionTracker.labels.propertyAddress": "Property Address *",
    "commissionTracker.placeholders.propertyAddress": "123 Main Street",

    "commissionTracker.labels.clientName": "Client Name *",
    "commissionTracker.placeholders.clientName": "John Doe",

    "commissionTracker.labels.salePrice": "Sale/Rental Price *",
    "commissionTracker.placeholders.salePrice": "485000",

    "commissionTracker.labels.commissionRate": "Commission Rate (%) *",
    "commissionTracker.placeholders.commissionRate": "3.0",

    "commissionTracker.labels.dealType": "Deal Type *",
    "commissionTracker.placeholders.dealType": "Select deal type",
    "commissionTracker.dealTypes.sale": "Property Sale",
    "commissionTracker.dealTypes.rental": "Rental Agreement",
    "commissionTracker.dealTypes.lease": "Commercial Lease",

    "commissionTracker.labels.closingDate": "Closing Date *",

    "commissionTracker.labels.notes": "Notes",
    "commissionTracker.placeholders.notes":
      "Additional notes about this commission...",

    "commissionTracker.cancelButton": "Cancel",

    "commissionTracker.cards.totalEarned": "Total Earned",
    "commissionTracker.cards.thisYear": "This year",
    "commissionTracker.cards.pending": "Pending",
    "commissionTracker.cards.awaitingPayment": "Awaiting payment",
    "commissionTracker.cards.thisMonth": "This Month",
    "commissionTracker.cards.dealsClosed": "{{count}} deals closed",
    "commissionTracker.cards.averageDeal": "Average Deal",
    "commissionTracker.cards.perCommission": "Per commission",

    "commissionTracker.tabs.allCommissions": "All Commissions",
    "commissionTracker.tabs.analytics": "Analytics",

    "commissionTracker.commissionRecords.title": "Commission Records",
    "commissionTracker.commissionRecords.description":
      "All your commission transactions",

    "commissionTracker.analytics.monthlyEarnings.title": "Monthly Earnings",
    "commissionTracker.analytics.monthlyEarnings.description":
      "Commission earnings over the last 6 months",
    "commissionTracker.analytics.earned": "Earned",
    "commissionTracker.analytics.deals": "{{count}} deals",

    "commissionTracker.analytics.breakdown.title": "Commission Breakdown",
    "commissionTracker.analytics.breakdown.description":
      "Analysis of your commission sources",
    "commissionTracker.analytics.breakdown.propertySales": "Property Sales",
    "commissionTracker.analytics.breakdown.rentalAgreements":
      "Rental Agreements",
    "commissionTracker.analytics.breakdown.commercialLeases":
      "Commercial Leases",

    //calendar en
    "calendar.title": "Calendar & Appointments",
    "calendar.description": "Manage your schedule and client appointments",
    "calendar.addButton": "Schedule Appointment",
    "calendar.dialogTitle": "Schedule New Appointment",
    "calendar.dialogDescription": "Create a new appointment with a client.",

    "calendar.form.title.label": "Appointment Title *",
    "calendar.form.title.placeholder": "Property Viewing - Downtown Condo",

    "calendar.form.clientName.label": "Client Name *",
    "calendar.form.clientName.placeholder": "John Doe",

    "calendar.form.clientContact.label": "Client Contact",
    "calendar.form.clientContact.placeholder": "090-123-4567",

    "calendar.form.clientEmail.label": "Client Email *",
    "calendar.form.clientEmail.placeholder": "john@example.com",

    "calendar.form.appointmentType.label": "Appointment Type *",
    "calendar.form.appointmentType.placeholder": "Select type",
    "calendar.form.appointmentType.viewing": "Property Viewing",
    "calendar.form.appointmentType.consultation": "Consultation",
    "calendar.form.appointmentType.signing": "Contract Signing",
    "calendar.form.appointmentType.inspection": "Property Inspection",
    "calendar.form.appointmentType.transfer": "Transfer Ownership",
    "calendar.form.appointmentType.meeting": "Client Meeting",
    "calendar.form.appointmentType.others": "Others",

    "calendar.form.propertyAddress.label": "Property Address *",
    "calendar.form.propertyAddress.placeholder": "123 Main Street, City, State",

    "calendar.form.date.label": "Date *",
    "calendar.form.time.label": "Time *",
    "calendar.form.duration.label": "Duration *",
    "calendar.form.duration.placeholder": "Duration",
    "calendar.form.duration.30min": "30 minutes",
    "calendar.form.duration.1hour": "1 hour",
    "calendar.form.duration.1.5hour": "1.5 hours",
    "calendar.form.duration.2hour": "2 hours",
    "calendar.form.duration.3hour": "3 hours",

    "calendar.form.notes.label": "Notes",
    "calendar.form.notes.placeholder":
      "Additional notes about this appointment...",

    "calendar.form.submit": "Schedule Appointment",
    "calendar.form.cancel": "Cancel",

    "calendar.todaysSchedule.title": "Today's Schedule",
    "calendar.todaysSchedule.description": "February 15, 2024",

    "calendar.quickStats.title": "Quick Stats",
    "calendar.quickStats.todaysAppointments": "Today's Appointments",
    "calendar.quickStats.thisWeek": "This Week",
    "calendar.quickStats.confirmed": "Confirmed",
    "calendar.quickStats.pending": "Pending",

    "calendar.upcoming.title": "Upcoming",
    "calendar.upcoming.description": "Next appointments",

    "calendar.tabs.allAppointments": "Upcoming Appointments",
    "calendar.tabs.calendarView": "History",

    "calendar.allAppointments.title": "Upcoming Appointments",
    "calendar.allAppointments.description":
      "List of your scheduled appointments",

    "calendar.calendarView.title": "History",
    "calendar.calendarView.description": "List of Appointment History",

    "calendar.calendarView.emptyMessage1":
      "Calendar view will be implemented with a calendar component",
    "calendar.calendarView.emptyMessage2":
      "This would show appointments in a monthly/weekly grid format",
"calendar.at": "at",
    // Dashboard Menu
    "menu.dashboard": "Dashboard",
    "menu.propertyListings": "Listings",
    "menu.lineChatBot": "Setup Line Chat Bot",
    "menu.postBuilder": "Post Builder",
    "menu.contractBuilder": "Contract Builder",
    "menu.calendar": "Calendar",

    // "menu.clientManagement": "Client Management",
    // "menu.analytics": "Analytics",
    // "menu.commissionTracker": "Commission Tracker",
    // "menu.marketInsights": "Market Insights",
    // "menu.messages": "Messages",
    // "menu.settings": "Settings",
    // "menu.aiAssistant": "AI Assistant",

    // Search Form
    searchProperties: "Search Properties",
    searchByNameLocation: "Search by name or location",
    enterProjectName: "Enter project name or location...",
    filterByRoomType: "Filter by Room Type",
    selectRoomType: "Select room type",
    allRoomTypes: "All Room Types",
    filterByBedrooms: "Filter by Bedrooms",
    selectBedrooms: "Select bedrooms",
    allBedrooms: "All Bedrooms",
    bedroom: "Bedroom",
    bedrooms: "Bedrooms",
    sizeRange: "Size Range (sqm)",
    minSize: "Min (20)",
    maxSize: "Max (400)",
    sizeRangeHelper: "Range: 20 - 400 sqm",
    rentalPriceRange: "Rental Price Range (฿)",
    minPrice: "Min (0)",
    maxPrice: "Max (1B)",
    priceRangeHelper: "Range: ฿0 - ฿1,000,000,000",
    searchButton: "Search Properties",
    clearFilters: "Clear All Filters",
    activeFilters: "Active filters:",
    projectName: "Project",
    location: "Location",
    addTag: "Add as tag",

    // View Toggle
    showing: "Showing {{count}} properties",
    grid: "Grid",
    table: "Table",

    // Property Details
    room: "Room",
    bed: "bed",
    bath: "bath",
    parkingSpace: "parking space",
    parkingSpaces: "parking spaces",
    station: "Station",
    rent: "Rent",
    sale: "Sale",
    month: "/month",
    petFriendly: "Pet Friendly",
    ownerListed: "Owner Listed",
    amenities: "Amenities",
    facilities: "Facilities",
    floor: "Floor",
    note: "Note",
    availability: "Availability",
    shortTermOk: "Short-term OK",

    // Contact - Updated
    copyPhone: "Phone",
    copyLineId: "Line ID",
    copyFacebookUrl: "FB URL",
    copyToPost: "Post",
    copyMessage: "Message",
    copyPropertyCode: "Property Code",
    copyProjectPropertyCode: "Project Property Code",

    // Copy Messages
    phoneCopied: "Phone number copied!",
    lineIdCopied: "Line ID copied!",
    facebookUrlCopied: "Facebook URL copied!",
    postCopied: "Property details copied!",
    messageCopied: "Message copied!",

    // Status
    available: "Available",
    rented: "Rented",
    sold: "Sold",

    // Property Types
    condo: "Condo",
    apartment: "Apartment",
    townhouse: "Townhouse",
    house: "House",

    // Pagination
    rowsPerPage: "Rows per page",

    // No Results
    noPropertiesFound: "No properties found",
    tryAdjusting: "Try adjusting your search criteria",

    // Loading
    loadingProperties: "Loading properties...",
    loadingPostTemplate: "Loading post template...",
    loadingContract: "Loading contracts...",

    // Language
    language: "Language",
    english: "English",
    thai: "ไทย",

    // Download Functionality
    downloadImages: "Download All Images",
    downloadingImages: "Downloading...",

    // Edit Property
    editProperty: "Edit Property",
    backToProperties: "Back to Properties",
    basicInformation: "Basic Information",
    propertyDetails: "Property Details",
    contactInformation: "Contact Information",
    notesAndMessages: "Notes & Messages",
    propertyImages: "Property Images",
    propertyCode: "Property Code",
    projectPropertyCode: "Project Property Code",
    roomNumber: "Room Number",
    project: "Project",
    selectProject: "Select project",
    roomType: "Room Type",
    status: "Status",
    selectStatus: "Select status",
    bathrooms: "Bathrooms",
    roomSize: "Room Size",
    rentalRate: "Rental Rate",
    salePrice: "Sale Price",
    distanceToStation: "Distance to Station",
    nearestStation: "Nearest Station",
    selectStation: "Select station",
    selectAvailability: "Select availability",
    phoneNumber: "Phone Number",
    lineId: "Line ID",
    facebookUrl: "Facebook URL",
    selectedAmenities: "Selected amenities",
    imageUrl: "Image URL",
    remove: "Remove",
    addImageUrl: "Add Image URL",
    messageToPost: "Message to Post",
    // cancel: "Cancel",
    saveChanges: "Save Changes",
    saving: "Saving...",
    // edit: "Edit",

    // Common
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    add: "Add",
    search: "Search",

    // features page (home)
    "features.badge": "Features",
    "features.title": "Comprehensive Real Estate Tools",
    "features.subtitle":
      "Discover all the powerful features that make Naina Hub the ultimate toolkit for real estate professionals",

    "features.category.property": "Property Management",
    "features.category.contract": "Contract & Documentation",
    "features.category.client": "Client Management",
    "features.category.ai": "AI-Powered Tools",

    "features.categoryDesc.property": "Essential tools for property management",
    "features.categoryDesc.contract":
      "Essential tools for contract & documentation",
    "features.categoryDesc.client": "Essential tools for client management",
    "features.categoryDesc.ai": "Essential tools for AI-powered tools",

    "features.property.1": "Listing management with rental status tracking",
    "features.property.2": "Property photo gallery with AI enhancement",
    "features.property.3": "Automated property valuation",
    "features.property.4": "Market comparison analysis",

    "features.contract.1": "Rental contract builder with templates",
    "features.contract.2": "Digital signature integration",
    "features.contract.3": "Document storage and management",
    "features.contract.4": "Legal compliance checking",

    "features.client.1": "Client database with preferences",
    "features.client.2": "Communication history tracking",
    "features.client.3": "Automated follow-up reminders",
    "features.client.4": "Lead scoring and qualification",

    "features.ai.1": "Property description generator",
    "features.ai.2": "Market trend analysis",
    "features.ai.3": "Price prediction algorithms",
    "features.ai.4": "Chatbot for client inquiries",

    // Pricing
    pricingTitle: "Simple, Transparent Pricing",
    pricingDescription:
      "Choose the plan that fits your business needs. All plans include a 14-day free trial.",

    plans: [
      {
        name: "Starter",
        price: "ฟรี",
        period: "/month",
        description: "Perfect for new agents getting started",
        features: [
          "Up to 10 property listings",
          "Basic contract templates",
          "Client management",
          "Email support",
          "Mobile app access",
        ],
        popular: false,
      },
      {
        name: "Professional",
        price: "900.-",
        period: "/month",
        description: "For established agents who need more power",
        features: [
          "Unlimited property listings",
          "Advanced contract builder",
          "AI-powered tools",
          "Analytics dashboard",
          "Priority support",
          "Custom branding",
          "API access",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: "3,900.-",
        period: "/month",
        description: "For teams and large real estate companies",
        features: [
          "Everything in Professional",
          "Team collaboration tools",
          "Advanced analytics",
          "Custom integrations",
          "Dedicated account manager",
          "White-label solution",
          "SLA guarantee",
        ],
        popular: false,
      },
    ],

    // Contact
    contactTitle: "Get in Touch",
    contactDescription:
      "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",

    // AI Assistant
    aiAssistantTitle: "AI Assistant",
    aiAssistantDescription:
      "Get help with property descriptions, market analysis, and client communication",
    askAI: "Ask AI Assistant",
    aiPlaceholder: "Ask me anything about real estate...",

    // "app": {
    apptitle: "Facebook Groups Manager",
    "app.description": "Manage your Facebook groups and schedule posts",
    // },
    // "groups": {
    "groups.title": "Facebook Groups",
    "groups.step1": "Step 1: Add Groups",
    "groups.step1Description":
      "Add Facebook groups by name or ID to get started",
    "groups.step2": "Step 2: Select Groups",
    "groups.step2Description": "Choose which groups to use for posting",
    "groups.step3": "Step 3: Manage Selection",
    "groups.step3Description":
      "Use bulk actions to select or deselect all groups",
    "groups.addGroup": "Add Group",
    "groups.groupNameOrId": "Group name or ID",
    "groups.selectAll": "Select All",
    "groups.deselectAll": "Deselect All",
    "groups.groupName": "Group Name",
    "groups.groupId": "Group ID",
    "groups.addedOn": "Added on",
    "groups.noGroups": "No groups added yet",
    "groups.noGroupsDescription":
      "Add your first Facebook group to get started with posting.",
    "groups.groupAdded": "Group added successfully!",
    "groups.groupRemoved": "Group removed successfully!",
    "groups.allSelected": "All groups selected!",
    "groups.allDeselected": "All groups deselected!",
    "groups.selected": "selected",
    // },
    // "composer": {
    "composer.title": "Create Post",
    "composer.postContent": "Post Content",
    "composer.postContentPlaceholder": "What's on your mind?",
    "composer.uploadImages": "Upload Images",
    "composer.dragDropImages": "Drag and drop images here, or click to select",
    "composer.selectGroups": "Select Groups",
    "composer.selectGroupsDescription": "Choose which groups to post to",
    "composer.schedulePost": "Schedule Post",
    "composer.scheduleDate": "Schedule Date",
    "composer.scheduleTime": "Schedule Time",
    "composer.postNow": "Post Now",
    "composer.scheduleForLater": "Schedule for Later",
    "composer.submitPost": "Submit Post",
    "composer.noGroupsSelected": "Please select at least one group",
    "composer.noContent": "Please enter post content",
    "composer.postScheduled": "Post scheduled successfully!",
    "composer.postFailed": "Failed to schedule post",
    "composer.uploadingImages": "Uploading images...",
    "composer.schedulingPost": "Scheduling post...",
    // },
    // "scheduled": {
    "scheduled.title": "Scheduled Posts",
    "scheduled.noScheduledPosts": "No scheduled posts",
    "scheduled.noScheduledPostsDescription":
      "Your scheduled posts will appear here.",
    "scheduled.scheduledFor": "Scheduled for",
    "scheduled.groups": "Groups",
    "scheduled.images": "images",
    "scheduled.cancelPost": "Cancel Post",
    "scheduled.postCancelled": "Post cancelled successfully!",
    "scheduled.cancelFailed": "Failed to cancel post",
    "scheduled.loading": "Loading scheduled posts...",
    // },
    // "pagePost": {
    "pagePost.title": "Schedule Page Post",
    "pagePost.description":
      "Create and schedule posts directly to your Facebook page",
    "pagePost.yourPage": "Your Page",
    "pagePost.pagePost": "Page Post",
    "pagePost.placeholder": "What's on your mind?",
    "pagePost.schedulePost": "Schedule Post",
    "pagePost.date": "Date",
    "pagePost.time": "Time",
    "pagePost.addPhotos": "Add Photos",
    "pagePost.scheduling": "Scheduling...",
    "pagePost.success": "Success",
    "pagePost.error": "Error",
    "pagePost.postScheduled": "Page post scheduled successfully!",
    "pagePost.messageRequired": "Please enter a message for your post",
    "pagePost.scheduleRequired": "Please select a date and time for scheduling",
    "pagePost.unknownError": "An unknown error occurred",
    // },
    // "language": {
    //   "switchLanguage": "Switch Language",
    //   "english": "English",
    //   "thai": "ไทย"
    // }

    // contact page
    "contact.badge": "Contact",
    "contact.title": "Get in Touch",
    "contact.subtitle":
      "Have questions about Naina Hub? We're here to help you succeed in your real estate business.",

    "contact.info": "Contact Information",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.office": "Office",

    "contact.formTitle": "Send us a Message",
    "contact.formDescription":
      "Fill out the form below and we'll get back to you within 24 hours.",

    "contact.name": "Name *",
    "contact.namePlaceholder": "Your full name",
    "contact.emailLabel": "Email *",
    "contact.emailPlaceholder": "your@email.com",
    "contact.company": "Company",
    "contact.companyPlaceholder": "Your company name",
    "contact.message": "Message *",
    "contact.messagePlaceholder": "Tell us how we can help you...",

    "contact.submit": "Send Message",
    "contact.address1": "317/1 Sukhumvit 66/1 Rd, Yaek 13",
    "contact.address2": "Bang Chak Subdistrict, Phra Khanong District",
    "contact.address3": "Bangkok",

    // contract-builder
    "contracts.title": "Contract Creator",
    "contracts.title.rent": "Rental Contracts",
    "contracts.title.buySell": "Buy/Sell Contracts",
    "contracts.subtitle.rent":
      "Manage your rental agreements and tenant information",
    "contracts.subtitle.buySell": "Manage your purchase and sell agreements",
    "contract.languageTH": "Thai version",
    "contract.languageEN": "English version",

    "contracts.createNew.rental": "Create New Rental Contract",
    "contracts.createNew.rentalDesc":
      "Fill in the details below to generate a rental agreement",
    "contracts.createNew.buySell": "Create New Purchase and Sell Contract",
    "contracts.createNew.buySellDesc":
      "Fill in the details below to generate a purchase and sell agreement",

    "contracts.stats.total": "Total Contracts",
    "contracts.stats.active": "Active Contracts",
    "contracts.stats.revenue": "Monthly Revenue",

    "contracts.recent.title": "Recent Contracts",
    "contracts.recent.rent.desc":
      "A list of your rental contracts and their current status",
    "contracts.recent.buySell.desc":
      "A list of your Buy/Sell contracts and their current status",
    "contracts.status.active": "Active",
    "contracts.status.expired": "Expired",

    "contracts.download": "Download",

    // newContract
    "newContract.title": "Contract Builder",
    "newContract.subtitle":
      "Fill out tenant, property, and lease details to generate a rental contract.",

    "newContract.navigation.backToDashboard": "Back to contract list",

    "newContract.tenantInformation.title": "Tenant Information",
    "newContract.tenantInformation.subtitle": "Enter details about the tenant",
    "newContract.tenantInformation.fullName": "Full Name",
    "newContract.tenantInformation.email": "Email",
    "newContract.tenantInformation.phone": "Phone Number",
    "newContract.tenantInformation.currentAddress": "Current Address",
    "newContract.tenantInformation.passportPhoto": "Passport Photo",
    "newContract.tenantInformation.placeholders.fullName":
      "Enter tenant's full name",
    "newContract.tenantInformation.placeholders.email": "Enter tenant's email",
    "newContract.tenantInformation.placeholders.phone": "Enter phone number",
    "newContract.tenantInformation.placeholders.currentAddress":
      "Enter tenant's current address",

    "newContract.propertyInformation.title": "Property Information",
    "newContract.propertyInformation.subtitle": "Enter property details",
    "newContract.propertyInformation.propertyAddress": "Property Address",
    "newContract.propertyInformation.propertyType": "Property Type",
    "newContract.propertyInformation.selectType": "Select property type",
    "newContract.propertyInformation.types.apartment": "Apartment",
    "newContract.propertyInformation.types.house": "House",
    "newContract.propertyInformation.types.condo": "Condominium",
    "newContract.propertyInformation.types.townhouse": "Townhouse",
    "newContract.propertyInformation.placeholders.propertyAddress":
      "Enter full property address",

    "newContract.leaseTerms.title": "Lease Terms",
    "newContract.leaseTerms.subtitle": "Set the lease duration and dates",
    "newContract.leaseTerms.startDate": "Start Date",
    "newContract.leaseTerms.endDate": "End Date",
    "newContract.leaseTerms.leaseTerm": "Lease Term",
    "newContract.leaseTerms.selectLeaseTerm": "Select lease term",
    "newContract.leaseTerms.options.6months": "6 Months",
    "newContract.leaseTerms.options.1year": "1 Year",
    "newContract.leaseTerms.options.2years": "2 Years",
    "newContract.leaseTerms.options.monthToMonth": "Month-to-Month",

    "newContract.financialTerms.title": "Financial Terms",
    "newContract.financialTerms.subtitle": "Set rent and deposit amounts",
    "newContract.financialTerms.monthlyRent": "Monthly Rent",
    "newContract.financialTerms.securityDeposit": "Security Deposit",
    "newContract.financialTerms.placeholders.monthlyRent": "Enter monthly rent",
    "newContract.financialTerms.placeholders.securityDeposit":
      "Enter deposit amount",

    "newContract.additionalTerms.title": "Additional Terms & Policies",
    "newContract.additionalTerms.subtitle":
      "Set specific policies and additional terms",
    "newContract.additionalTerms.petPolicy": "Pet Policy",
    "newContract.additionalTerms.smokingPolicy": "Smoking Policy",
    "newContract.additionalTerms.additionalTerms":
      "Additional Terms & Conditions",
    "newContract.additionalTerms.placeholders.additionalTerms":
      "Enter any additional terms, conditions, or special agreements...",
    "newContract.additionalTerms.petOptions.noPets": "No Pets Allowed",
    "newContract.additionalTerms.petOptions.catsOnly": "Cats Only",
    "newContract.additionalTerms.petOptions.dogsOnly": "Dogs Only",
    "newContract.additionalTerms.petOptions.petsAllowed": "Pets Allowed",
    "newContract.additionalTerms.smokingOptions.noSmoking": "No Smoking",
    "newContract.additionalTerms.smokingOptions.outdoorOnly": "Outdoor Only",
    "newContract.additionalTerms.smokingOptions.smokingAllowed":
      "Smoking Allowed",

    "newContract.generateContract": "Generate Contract",
    "newContract.generatingContract": "Generating Contract...",
  },
  th: {
    "home.banner": "Naina Hub เครื่องมือสำหรับ",
    "home.subBanner": "นายหน้าอสังหาริมทรัพย์",
    "home.description":
      "เครื่องมือที่เอเจนต์เลือกใช้: เข้าถึง 10,000+ รายการทรัพย์ สร้างสัญญาอัตโนมัติ เก็บข้อความและรูปภาพในคลิกเดียว พร้อมโพส — เร็วกว่า ง่ายกว่า ปิดดีลได้ไวกว่า",

    "home.viewDashboard": "เข้าสู่แดชบอร์ด",
    "home.more": "เพิ่มเติม",
    "home.adTitle": "ทุกสิ่งที่คุณต้องการเพื่อความสำเร็จ",
    "home.adDescription":
      "ชุดเครื่องมือครบวงจรที่จะช่วยให้เอเจนต์อสังหาฯ ทำงานได้มีประสิทธิภาพยิ่งขึ้น และปิดดีลได้มากกว่าเดิม",

    subtitle: "ค้นหาอสังหาริมทรัพย์ที่เหมาะกับคุณจาก {count} รายการที่มีอยู่",

    // Authenthication
    signUpTitle: "สมัครสมาชิก",
    signUpDescription: "ลงทะเบียนเข้าระบบ Naina Hub ฟรี",
    signInTitle: "ยินดีต้อนรับกลับ",
    signInDescription: "เข้าสู่ระบบ Naina Hub ",

    // Navigation
    features: "บริการของเรา",
    pricing: "ราคา",
    contact: "ติดต่อ",
    dashboard: "แดชบอร์ด",
    signIn: "เข้าสู่ระบบ",
    signOut: "ออกจากระบบ",
    getStarted: "เริ่มต้นใช้งานฟรี",

    // Hero Section
    heroTitle: "เครื่องมือสำหรับ",
    heroTitleHighlight: "นายหน้าอสังหาฯ ยุคใหม่",
    heroDescription:
      "ปรับปรุงธุรกิจอสังหาริมทรัพย์ของคุณด้วยเครื่องมือที่มีประสิทธิภาพสำหรับการจัดการทรัพย์สิน ความสัมพันธ์กับลูกค้า และการสร้างสัญญา ทำงานอย่างชาญฉลาด ไม่ใช่หนัก",
    startFreeTrial: "เริ่มทดลองใช้ฟรี",
    watchDemo: "ดูการสาธิต",

    // Features
    listings: "รายการทรัพย์",
    listingsDesc: "รายการทรัพย์ พร้อมฟิลเตอร์ หาง่าย ได้ไว สะดวกรวดเร็ว",
    lineChatBot: "Line Chat Bot",
    lineChatBotDesc: "บอทไลน์แจ้งเตือนค่าเช่า ค่าน้ำ ค่าไฟ ให้ลูกค้า",
    postBuilder: "สร้าง Template โพส",
    postBuilderDesc: "สร้างข้อความไว้โพส เชื่อมกับทรัพย์ของเราได้ง่ายๆ",
    contractBuilder: "เครื่องมือสร้างสัญญา",
    contractBuilderDesc: "สร้างสัญญาเช่าระดับมืออาชีพในไม่กี่นาที",

    calendar: "นัดลูกค้า",
    calendarDesc: "ผูกทรัพย์กับเรา ไม่พลาดนัดหมายสำคัญ",
    propertyAnalytics: "กราฟวิเคราะห์ทรัพย์",
    propertyAnalyticsDesc: "ติดตามประสิทธิภาพและแนวโน้มตลาด",
    clientManagement: "การจัดการลูกค้า",
    clientManagementDesc: "จัดระเบียบลูกค้าเป้าหมายและรักษาความสัมพันธ์",

    // footer
    privacyPolicy: "นโยบายความเป็นส่วนตัว",
    termsOfService: "เงื่อนไขการให้บริการ",
    // Dashboard
    "dashboard.title": "แดชบอร์ด",
    "dashboard.welcome":
      "ยินดีต้อนรับกลับ! นี่คือสิ่งที่เกิดขึ้นกับธุรกิจของคุณ",
    "dashboard.recentActivity": "กิจกรรมล่าสุด",
    "dashboard.latestUpdates": "การดำเนินการและอัปเดตล่าสุดของคุณ",
    "dashboard.upcomingTasks": "งานที่กำลังจะมาถึง",
    "dashboard.tasksToDo": "สิ่งที่คุณต้องทำ",

    "stats.changeFromLastMonth": " จากเดือนที่แล้ว",

    "activity.newListing": "รายการใหม่เพิ่ม: 123 Main St",
    "activity.contractSigned": "เซ็นสัญญากับ John Doe",
    "activity.viewingScheduled": "กำหนดดูทรัพย์สิน",
    "activity.hoursAgo": "{{count}} ชั่วโมงที่แล้ว",
    "activity.dayAgo": "{{count}} วันที่แล้ว",

    "tasks.viewing": "กำหนดดูทรัพย์สินเวลา 14:00 น.",
    "tasks.today": "วันนี้",
    "tasks.reviewContract": "ตรวจสอบสัญญาสำหรับ 456 Oak Ave",
    "tasks.tomorrow": "พรุ่งนี้",
    "tasks.followUp": "ติดตามลูกค้าเป้าหมาย",
    "tasks.friday": "วันศุกร์",

    "stats.commission": "ปิดดีลทั้งหมด",
    "stats.totalRent": "รวมดีลเช่า",
    "stats.totalSell": "รวมดีลขาย",
    "stats.totalVisit": "จำนวนนัดหมาย",

    // line chat bot
    "line.title": "รหัสเข้าใช้งาน",
    "line.description": "รหัสยืนยันตัวตนใช้ครั้งเดียว",
    "line.copy": "คัดลอกรหัส",
    "line.copied": "คัดลองสำเร็จ!",
    "line.instruction": "คลิกปุ่มด้านบนเพื่อคัดลอกรหัสของคุณ",
    "line.warning": "⚠️ รหัสนี้หมดอายุหลังจากใช้งานครั้งเดียว",
    "line.howToUse": "วิธีใช้งานใน Line Chat Bot",
    "line.explain": "ทำตามขั้นตอนเหล่านี้เพื่อวางรหัสในกลุ่ม Line ของคุณ",
    "line.step1": "เปิดกลุ่ม Line",
    "line.step1explain": "ไปที่กลุ่ม Line ของคุณที่มี Chat Bot ทำงานอยู่",
    "line.step2": "แตะช่องพิมพ์ข้อความ",
    "line.step2explain": "แตะที่ช่องพิมพ์ข้อความด้านล่างของหน้าจอ",
    "line.step3": "วางรหัส",
    "line.step3explain":
      'กดค้างในช่องพิมพ์ข้อความและเลือก "วาง" เพื่อใส่รหัสที่คัดลอกไว้',
    "line.step4": "ส่งข้อความ",
    "line.step4explain": "แตะปุ่มส่งเพื่อส่งรหัสของคุณไปยัง Chat Bot",
    "line.tips": "เคล็ดลับ",
    "line.tipsexplain":
      "ตรวจสอบให้แน่ใจว่าได้วางรหัสตรงตามที่คัดลอกมา Chat Bot จะประมวลผลรหัสของคุณโดยอัตโนมัติเมื่อส่งแล้ว",

    // post builder
    "post.title": "ตัวสร้างโพสต์ทรัพย์",
    "post.badge": "สร้างโพสไว",
    "post.formatEditor": "แก้ไขรูปแบบข้อความ",
    "post.formatEditorDesc":
      "สร้างรูปแบบโพสต์ทรัพย์ของคุณเอง คลิกแท็กฟิลด์ หรือ พิมพ์ข้อความด้านล่างเพื่อนำไปใช้ในเทมเพลตของคุณ",
    "post.postFormatTemplate": "เทมเพลตรูปแบบโพสต์",
    "post.fieldTags": "แท็กฟิลด์ที่ใช้ได้ (คลิกเพื่อใส่):",
    "post.emojiTags": "แท็กอีโมจิที่ใช้ได้ (คลิกเพื่อใส่):",

    "post.propertyData": "ข้อมูลทรัพย์",
    "post.propertyDataDesc": "ตัวอย่างข้อมูลทรัพย์สำหรับทดสอบรูปแบบของคุณ",
    "post.loadData": "โหลดข้อมูลตัวอย่าง",
    "post.generatePreview": "ตัวอย่างโพสต์ที่สร้างแล้ว",
    "post.review": "ตรวจสอบโพสต์ทรัพย์ของคุณและคัดลอกไปยังคลิปบอร์ด",
    "post.copy": "คัดลอก",
    "post.copied": "คัดลอกแล้ว",
    "post.saveTemplate": "บันทึก",
    "post.savedTemplate": "บันทึกแล้ว",

    // commission
    "commissionTracker.title": "ตัวติดตามค่าคอมมิชชั่น",
    "commissionTracker.description":
      "ติดตามรายได้และการชำระค่าคอมมิชชั่นของคุณ",
    "commissionTracker.addButton": "เพิ่มค่าคอมมิชชั่น",
    "commissionTracker.dialogTitle": "เพิ่มค่าคอมมิชชั่นใหม่",
    "commissionTracker.dialogDescription":
      "บันทึกค่าคอมมิชชั่นจากดีลที่เสร็จสมบูรณ์",

    "commissionTracker.labels.propertyAddress": "ที่อยู่ทรัพย์สิน *",
    "commissionTracker.placeholders.propertyAddress": "123 ถนนหลัก",

    "commissionTracker.labels.clientName": "ชื่อลูกค้า *",
    "commissionTracker.placeholders.clientName": "จอห์น โด",

    "commissionTracker.labels.salePrice": "ราคาขาย/เช่า *",
    "commissionTracker.placeholders.salePrice": "485000",

    "commissionTracker.labels.commissionRate": "อัตราค่าคอมมิชชั่น (%) *",
    "commissionTracker.placeholders.commissionRate": "3.0",

    "commissionTracker.labels.dealType": "ประเภทดีล *",
    "commissionTracker.placeholders.dealType": "เลือกประเภทดีล",
    "commissionTracker.dealTypes.sale": "ขายทรัพย์สิน",
    "commissionTracker.dealTypes.rental": "สัญญาเช่า",
    "commissionTracker.dealTypes.lease": "สัญญาเช่าพาณิชย์",

    "commissionTracker.labels.closingDate": "วันที่ปิดดีล *",

    "commissionTracker.labels.notes": "บันทึกเพิ่มเติม",
    "commissionTracker.placeholders.notes":
      "บันทึกเพิ่มเติมเกี่ยวกับค่าคอมมิชชั่นนี้...",

    "commissionTracker.cancelButton": "ยกเลิก",

    "commissionTracker.cards.totalEarned": "รายได้รวม",
    "commissionTracker.cards.thisYear": "ปีนี้",
    "commissionTracker.cards.pending": "รอดำเนินการ",
    "commissionTracker.cards.awaitingPayment": "รอการชำระเงิน",
    "commissionTracker.cards.thisMonth": "เดือนนี้",
    "commissionTracker.cards.dealsClosed": "ปิดดีล {{count}} รายการ",
    "commissionTracker.cards.averageDeal": "เฉลี่ยต่อดีล",
    "commissionTracker.cards.perCommission": "ต่อค่าคอมมิชชั่น",

    "commissionTracker.tabs.allCommissions": "ค่าคอมมิชชั่นทั้งหมด",
    "commissionTracker.tabs.analytics": "วิเคราะห์",

    "commissionTracker.commissionRecords.title": "บันทึกค่าคอมมิชชั่น",
    "commissionTracker.commissionRecords.description":
      "รายการธุรกรรมค่าคอมมิชชั่นทั้งหมดของคุณ",

    "commissionTracker.analytics.monthlyEarnings.title": "รายได้รายเดือน",
    "commissionTracker.analytics.monthlyEarnings.description":
      "รายได้ค่าคอมมิชชั่นใน 6 เดือนที่ผ่านมา",
    "commissionTracker.analytics.earned": "รายได้",
    "commissionTracker.analytics.deals": "{{count}} ดีล",

    "commissionTracker.analytics.breakdown.title": "การแบ่งค่าคอมมิชชั่น",
    "commissionTracker.analytics.breakdown.description":
      "การวิเคราะห์แหล่งค่าคอมมิชชั่นของคุณ",
    "commissionTracker.analytics.breakdown.propertySales": "การขายทรัพย์สิน",
    "commissionTracker.analytics.breakdown.rentalAgreements": "สัญญาเช่า",
    "commissionTracker.analytics.breakdown.commercialLeases":
      "สัญญาเช่าพาณิชย์",

    // calendar TH
    "calendar.title": "ปฏิทินและนัดหมาย",
    "calendar.description": "จัดการตารางเวลาของคุณและการนัดหมายกับลูกค้า",
    "calendar.addButton": "สร้างนัดหมายใหม่",
    "calendar.dialogTitle": "สร้างนัดหมายใหม่",
    "calendar.dialogDescription": "สร้างนัดหมายใหม่กับลูกค้า",

    "calendar.form.title.label": "หัวข้อการนัดหมาย *",
    "calendar.form.title.placeholder": "ดูทรัพย์สิน - คอนโดกลางเมือง",

    "calendar.form.clientName.label": "ชื่อลูกค้า *",
    "calendar.form.clientName.placeholder": "จอห์น โด",

    "calendar.form.clientContact.label": "เบอร์/ไลน์ ติดต่อลูกค้า",
    "calendar.form.clientContact.placeholder": "090-123-4567",

    "calendar.form.clientEmail.label": "อีเมลลูกค้า *",
    "calendar.form.clientEmail.placeholder": "john@example.com",

    "calendar.form.appointmentType.label": "ประเภทการนัดหมาย *",
    "calendar.form.appointmentType.placeholder": "เลือกประเภท",
    "calendar.form.appointmentType.viewing": "ดูทรัพย์",
    "calendar.form.appointmentType.consultation": "ปรึกษา",
    "calendar.form.appointmentType.signing": "เซ็นสัญญา",
    "calendar.form.appointmentType.inspection": "ประเมินทรัพย์",
    "calendar.form.appointmentType.transfer": "โอนทรัพย์",
    "calendar.form.appointmentType.meeting": "ประชุมลูกค้า",
    "calendar.form.appointmentType.others": "อื่นๆ",

    "calendar.form.propertyAddress.label": "ที่อยู่ทรัพย์สิน *",
    "calendar.form.propertyAddress.placeholder": "123 ถนนหลัก, เมือง, รัฐ",

    "calendar.form.date.label": "วันที่ *",
    "calendar.form.time.label": "เวลา *",
    "calendar.form.duration.label": "ระยะเวลา *",
    "calendar.form.duration.placeholder": "ระยะเวลา",
    "calendar.form.duration.30min": "30 นาที",
    "calendar.form.duration.1hour": "1 ชั่วโมง",
    "calendar.form.duration.1.5hour": "1.5 ชั่วโมง",
    "calendar.form.duration.2hour": "2 ชั่วโมง",
    "calendar.form.duration.3hour": "3 ชั่วโมง",

    "calendar.form.notes.label": "บันทึกเพิ่มเติม",
    "calendar.form.notes.placeholder":
      "บันทึกเพิ่มเติมเกี่ยวกับการนัดหมายนี้...",

    "calendar.form.submit": "กำหนดเวลานัดหมาย",
    "calendar.form.cancel": "ยกเลิก",

    "calendar.todaysSchedule.title": "ตารางวันนี้",
    "calendar.todaysSchedule.description": "15 กุมภาพันธ์ 2024",

    "calendar.quickStats.title": "สถิติอย่างรวดเร็ว",
    "calendar.quickStats.todaysAppointments": "นัดหมายวันนี้",
    "calendar.quickStats.thisWeek": "สัปดาห์นี้",
    "calendar.quickStats.confirmed": "ยืนยันแล้ว",
    "calendar.quickStats.pending": "รอดำเนินการ",

    "calendar.upcoming.title": "นัดหมายถัดไป",
    "calendar.upcoming.description": "นัดหมายถัดไป",

    "calendar.tabs.allAppointments": "นัดหมายที่กำลังจะถึง",
    "calendar.tabs.calendarView": "ประวัติการนัดหมาย",

    "calendar.allAppointments.title": "การนัดหมาย",
    "calendar.allAppointments.description": "รายการนัดหมายที่กำลังจะมาถึง",

    "calendar.calendarView.title": "ประวัติการนัดหมาย",
    "calendar.calendarView.description": "แสดงนัดหมายที่ผ่านมา",

    "calendar.calendarView.emptyMessage1":
      "มุมมองปฏิทินจะถูกสร้างด้วยคอมโพเนนต์ปฏิทิน",
    "calendar.calendarView.emptyMessage2":
      "จะแสดงนัดหมายในรูปแบบตารางรายเดือน/รายสัปดาห์",

      "calendar.at": "เวลา",
    // Dashboard Menu
    "menu.dashboard": "แดชบอร์ด",
    "menu.propertyListings": "รายการทรัพย์สิน",
    "menu.lineChatBot": "ไลน์บอทแจ้งเตือน",
    "menu.postBuilder": "สร้างโพสอัตโนมัติ",
    "menu.contractBuilder": "สร้างสัญญา ซื้อ-ขาย/เช่า",
    "menu.calendar": "การนัดหมาย",

    // "menu.clientManagement": "Ct",
    // "menu.analytics": "Analytics",
    // "menu.commissionTracker": "Commission Tracker",
    // "menu.marketInsights": "Market Insights",
    // "menu.messages": "Messages",
    // "menu.settings": "Settings",
    // "menu.aiAssistant": "AI Assistant",

    // propertyListings: "รายการทรัพย์สิน",
    // lineChatBot: "ไลน์บอทแจ้งเตือน",
    // contractBuilderMenu: "เครื่องมือสร้างสัญญา",
    // clientManagementMenu: "การจัดการลูกค้า",
    // calendar: "ปฏิทิน",
    // analytics: "การวิเคราะห์",
    // commissionTracker: "ติดตามค่าคอมมิชชั่น",
    // marketInsights: "ข้อมูลเชิงลึกตลาด",
    // messages: "ข้อความ",
    // settings: "การตั้งค่า",
    // aiAssistant: "ผู้ช่วย AI",

    // Search Form
    searchProperties: "ค้นหาอสังหาริมทรัพย์",
    searchByNameLocation: "ค้นหาตามชื่อหรือสถานที่",
    enterProjectName: "ใส่ชื่อโครงการหรือสถานที่...",
    filterByRoomType: "กรองตามประเภทห้อง",
    selectRoomType: "เลือกประเภทห้อง",
    allRoomTypes: "ประเภทห้องทั้งหมด",
    filterByBedrooms: "กรองตามจำนวนห้องนอน",
    selectBedrooms: "เลือกจำนวนห้องนอน",
    allBedrooms: "ห้องนอนทั้งหมด",
    bedroom: "ห้องนอน",
    bedrooms: "ห้องนอน",
    sizeRange: "ช่วงขนาด (ตร.ม.)",
    minSize: "ต่ำสุด (20)",
    maxSize: "สูงสุด (400)",
    sizeRangeHelper: "ช่วง: 20 - 400 ตร.ม.",
    rentalPriceRange: "ช่วงราคาเช่า (฿)",
    minPrice: "ต่ำสุด (0)",
    maxPrice: "สูงสุด (1พันล้าน)",
    priceRangeHelper: "ช่วง: ฿0 - ฿1,000,000,000",
    searchButton: "ค้นหาอสังหาริมทรัพย์",
    clearFilters: "ล้างตัวกรองทั้งหมด",
    activeFilters: "ตัวกรองที่ใช้งาน:",
    projectName: "โครงการ",
    location: "สถานที่",
    addTag: "เพิ่มเป็นแท็ก",

    // View Toggle
    showing: "แสดง {{count}} อสังหาริมทรัพย์",
    grid: "ตาราง",
    table: "รายการ",

    // Property Details
    room: "ห้อง",
    bed: "นอน",
    bath: "น้ำ",
    parkingSpace: "ที่จอดรถ",
    parkingSpaces: "ที่จอดรถ",
    station: "สถานี",
    rent: "เช่า",
    sale: "ขาย",
    month: "/เดือน",
    petFriendly: "เลี้ยงสัตว์ได้",
    ownerListed: "เจ้าของลงขาย",
    amenities: "สิ่งอำนวยความสะดวกในห้อง",
    facilities: "สิ่งอำนวยความสะดวกในโครงการ",
    floor: "ชั้น",
    note: "หมายเหตุ",
    availability: "ความพร้อม",
    shortTermOk: "รับเช่าระยะสั้น",

    // Contact - Updated
    copyPhone: "คัดลอกเบอร์",
    copyLineId: "คัดลอก Line ID",
    copyFacebookUrl: "คัดลอก FB URL",
    copyToPost: "คัดลอกโพสต์",
    copyMessage: "คัดลอกข้อความ",
    copyPropertyCode: "คัดลอกรหัสห้อง",
    copyProjectPropertyCode: "คัดลอกรหัสโครงการ-ห้อง",

    // Copy Messages
    phoneCopied: "คัดลอกเบอร์โทรแล้ว!",
    lineIdCopied: "คัดลอก Line ID แล้ว!",
    facebookUrlCopied: "คัดลอก Facebook URL แล้ว!",
    postCopied: "คัดลอกรายละเอียดแล้ว!",
    messageCopied: "คัดลอกข้อความแล้ว!",

    // Status
    available: "ว่าง",
    rented: "ให้เช่าแล้ว",
    sold: "ขายแล้ว",

    // Property Types
    condo: "คอนโด",
    apartment: "อพาร์ตเมนต์",
    townhouse: "ทาวน์เฮาส์",
    house: "บ้าน",

    // Pagination
    rowsPerPage: "แถวต่อหน้า",

    // No Results
    noPropertiesFound: "ไม่พบอสังหาริมทรัพย์",
    tryAdjusting: "ลองปรับเกณฑ์การค้นหา",

    // Loading
    loadingProperties: "กำลังโหลดอสังหาริมทรัพย์...",
    loadingPostTemplate: "กำลังโหลดรูปแปบบโพสต์...",
    loadingContract: "กำลังโหลดสัญญา...",

    // Language
    language: "ภาษา",
    english: "English",
    thai: "ไทย",

    // Download Functionality
    downloadImages: "ดาวน์โหลดรูปทั้งหมด",
    downloadingImages: "กำลังดาวน์โหลด...",

    // Edit Property
    editProperty: "แก้ไขอสังหาริมทรัพย์",
    backToProperties: "กลับไปยังรายการ",
    basicInformation: "ข้อมูลพื้นฐาน",
    propertyDetails: "รายละเอียดห้อง",
    contactInformation: "ข้อมูลติดต่อ",
    notesAndMessages: "หมายเหตุและข้อความ",
    propertyImages: "รูปภาพห้อง",
    propertyCode: "รหัสห้อง",
    projectPropertyCode: "รหัสโครงการ-ห้อง",
    roomNumber: "หมายเลขห้อง",
    project: "โครงการ",
    selectProject: "เลือกโครงการ",
    roomType: "ประเภทห้อง",
    status: "สถานะ",
    selectStatus: "เลือกสถานะ",
    bathrooms: "ห้องน้ำ",
    roomSize: "ขนาดห้อง",
    rentalRate: "ราคาเช่า",
    salePrice: "ราคาขาย",
    distanceToStation: "ระยะทางถึงสถานี",
    nearestStation: "สถานีใกล้เคียง",
    selectStation: "เลือกสถานี",
    selectAvailability: "เลือกความพร้อม",
    phoneNumber: "เบอร์โทรศัพท์",
    lineId: "Line ID",
    facebookUrl: "Facebook URL",
    selectedAmenities: "สิ่งอำนวยความสะดวกที่เลือก",
    imageUrl: "URL รูปภาพ",
    remove: "ลบ",
    addImageUrl: "เพิ่ม URL รูปภาพ",
    messageToPost: "ข้อความสำหรับโพสต์",
    //  cancel: "ยกเลิก",
    saveChanges: "บันทึกการเปลี่ยนแปลง",
    saving: "กำลังบันทึก...",
    //  edit: "แก้ไข",

    // Common
    loading: "กำลังโหลด...",
    save: "บันทึก",
    cancel: "ยกเลิก",
    edit: "แก้ไข",
    delete: "ลบ",
    view: "ดู",
    add: "เพิ่ม",
    search: "ค้นหา",

    // Feature page (home)
    "features.badge": "คุณสมบัติ",
    "features.title": "เครื่องมืออสังหาริมทรัพย์แบบครบวงจร",
    "features.subtitle":
      "ค้นพบคุณสมบัติอันทรงพลังทั้งหมดที่ทำให้ Naina Hub เป็นเครื่องมือที่สมบูรณ์แบบสำหรับมืออาชีพด้านอสังหาริมทรัพย์",

    "features.category.property": "การจัดการทรัพย์สิน",
    "features.category.contract": "สัญญาและเอกสาร",
    "features.category.client": "การจัดการลูกค้า",
    "features.category.ai": "เครื่องมือ AI",

    "features.categoryDesc.property": "เครื่องมือสำคัญสำหรับการจัดการทรัพย์สิน",
    "features.categoryDesc.contract":
      "เครื่องมือสำคัญสำหรับการทำสัญญาและเอกสาร",
    "features.categoryDesc.client": "เครื่องมือสำคัญสำหรับการจัดการลูกค้า",
    "features.categoryDesc.ai": "เครื่องมือสำคัญที่ขับเคลื่อนด้วย AI",

    "features.property.1": "การจัดการประกาศพร้อมติดตามสถานะการเช่า",
    "features.property.2": "แกลเลอรีรูปภาพทรัพย์สินพร้อมปรับปรุงด้วย AI",
    "features.property.3": "การประเมินมูลค่าทรัพย์สินอัตโนมัติ",
    "features.property.4": "การวิเคราะห์เปรียบเทียบตลาด",

    "features.contract.1": "สร้างสัญญาเช่าด้วยแม่แบบสำเร็จรูป",
    "features.contract.2": "การผสานรวมลายเซ็นดิจิทัล",
    "features.contract.3": "การจัดเก็บและจัดการเอกสาร",
    "features.contract.4": "การตรวจสอบการปฏิบัติตามกฎหมาย",

    "features.client.1": "ฐานข้อมูลลูกค้าพร้อมข้อมูลความต้องการ",
    "features.client.2": "การติดตามประวัติการสื่อสาร",
    "features.client.3": "การแจ้งเตือนติดตามผลอัตโนมัติ",
    "features.client.4": "การจัดอันดับและคัดกรองลูกค้า",

    "features.ai.1": "ตัวช่วยสร้างคำอธิบายทรัพย์สิน",
    "features.ai.2": "การวิเคราะห์แนวโน้มตลาด",
    "features.ai.3": "อัลกอริทึมคาดการณ์ราคา",
    "features.ai.4": "แชทบอทสำหรับตอบคำถามลูกค้า",

    // Pricing
    pricingTitle: "ราคาที่เรียบง่ายและโปร่งใส",
    pricingDescription:
      "เลือกแผนที่เหมาะกับความต้องการทางธุรกิจของคุณ แผนทั้งหมดรวมการทดลองใช้ฟรี 14 วัน",

    plans: [
      {
        name: "เริ่มต้น",
        price: "ฟรี",
        period: "/เดือน",
        description: "สำหรับทดลองใช้งาน",
        features: [
          "ดูรายการทรัพย์สินได้ 10 รายการ",
          "สร้างสัญญาได้ 1 ครั้ง",
          "ใช้ Line Messenger 1 ครั้ง",
          "บริการหลังบ้าน",
          "ใช้ได้ตลอด ไม่จำกัด",
        ],
        popular: false,
      },
      {
        name: "ฟรีแลนซ์",
        price: "900.-",
        period: "/เดือน",
        description: "สำหรับฟรีแลนซ์และบริษัทเล็ก",
        features: [
          "ดูรายการทรัพย์สินได้ไม่จำกัดรายการ",
          "สร้างสัญญาได้ไม่จำกัดครั้ง",
          "ใช้ Line Messenger 10 ครั้ง",
          "บริการหลังบ้าน",
          "ใช้ได้ตลอด ไม่จำกัด",
        ],
        popular: true,
      },
      {
        name: "บริษัท",
        price: "3,900.-",
        period: "/เดือน",
        description: "สำหรับบริษัทใหญ่",
        features: [
          "ดูรายการทรัพย์สินได้ไม่จำกัดรายการ",
          "สร้างสัญญาได้ไม่จำกัดครั้ง",
          "ใช้ Line Messenger 10 ครั้ง",
          "บริการหลังบ้าน",
          "ใช้ได้ตลอด ไม่จำกัด",
          "ใช้บริการ AI Assistant ได้ไม่จำกัดครั้ง",
        ],
        popular: false,
      },
    ],

    // Contact
    contactTitle: "ติดต่อเรา",
    contactDescription:
      "มีคำถาม? เรายินดีที่จะรับฟังจากคุณ ส่งข้อความถึงเราแล้วเราจะตอบกลับโดยเร็วที่สุด",

    // AI Assistant
    aiAssistantTitle: "ผู้ช่วย AI",
    aiAssistantDescription:
      "รับความช่วยเหลือในการเขียนคำอธิบายทรัพย์สิน การวิเคราะห์ตลาด และการสื่อสารกับลูกค้า",
    askAI: "ถามผู้ช่วย AI",
    aiPlaceholder: "ถามฉันเกี่ยวกับอสังหาริมทรัพย์...",

    // "app": {
    "app.title": "ตัวจัดการกลุ่มเฟซบุ๊ก",
    "app.description": "จัดการกลุ่มเฟซบุ๊กและกำหนดการโพสต์ของคุณ",
    // },
    // "groups": {
    "groups.groups.title": "กลุ่มเฟซบุ๊ก",
    "groups.step1": "ขั้นตอนที่ 1: เพิ่มกลุ่ม",
    "groups.step1Description": "เพิ่มกลุ่มเฟซบุ๊กด้วยชื่อหรือ ID เพื่อเริ่มต้น",
    "groups.step2": "ขั้นตอนที่ 2: เลือกกลุ่ม",
    "groups.step2Description": "เลือกกลุ่มที่จะใช้สำหรับการโพสต์",
    "groups.step3": "ขั้นตอนที่ 3: จัดการการเลือก",
    "groups.step3Description":
      "ใช้การดำเนินการแบบกลุ่มเพื่อเลือกหรือยกเลิกการเลือกทั้งหมด",
    "groups.addGroup": "เพิ่มกลุ่ม",
    "groups.groupNameOrId": "ชื่อกลุ่มหรือ ID",
    "groups.selectAll": "เลือกทั้งหมด",
    "groups.deselectAll": "ยกเลิกการเลือกทั้งหมด",
    "groups.groupName": "ชื่อกลุ่ม",
    "groups.groupId": "ID กลุ่ม",
    "groups.addedOn": "เพิ่มเมื่อ",
    "groups.noGroups": "ยังไม่มีกลุ่มที่เพิ่ม",
    "groups.noGroupsDescription":
      "เพิ่มกลุ่มเฟซบุ๊กแรกของคุณเพื่อเริ่มต้นการโพสต์",
    "groups.groupAdded": "เพิ่มกลุ่มสำเร็จแล้ว!",
    "groups.groupRemoved": "ลบกลุ่มสำเร็จแล้ว!",
    "groups.allSelected": "เลือกกลุ่มทั้งหมดแล้ว!",
    "groups.allDeselected": "ยกเลิกการเลือกกลุ่มทั้งหมดแล้ว!",
    "groups.selected": "เลือกแล้ว",
    // },
    // "composer": {
    "composer.title": "สร้างโพสต์",
    "composer.postContent": "เนื้อหาโพสต์",
    "composer.postContentPlaceholder": "คุณกำลังคิดอะไรอยู่?",
    "composer.uploadImages": "อัปโหลดรูปภาพ",
    "composer.dragDropImages": "ลากและวางรูปภาพที่นี่ หรือคลิกเพื่อเลือก",
    "composer.selectGroups": "เลือกกลุ่ม",
    "composer.selectGroupsDescription": "เลือกกลุ่มที่จะโพสต์",
    "composer.schedulePost": "กำหนดการโพสต์",
    "composer.scheduleDate": "วันที่กำหนดการ",
    "composer.scheduleTime": "เวลากำหนดการ",
    "composer.postNow": "โพสต์ทันที",
    "composer.scheduleForLater": "กำหนดการสำหรับภายหลัง",
    "composer.submitPost": "ส่งโพสต์",
    "composer.noGroupsSelected": "กรุณาเลือกอย่างน้อยหนึ่งกลุ่ม",
    "composer.noContent": "กรุณาใส่เนื้อหาโพสต์",
    "composer.postScheduled": "กำหนดการโพสต์สำเร็จแล้ว!",
    "composer.postFailed": "ไม่สามารถกำหนดการโพสต์ได้",
    "composer.uploadingImages": "กำลังอัปโหลดรูปภาพ...",
    "composer.schedulingPost": "กำลังกำหนดการโพสต์...",
    // },
    // "scheduled": {
    "scheduled.title": "โพสต์ที่กำหนดการไว้",
    "scheduled.noScheduledPosts": "ไม่มีโพสต์ที่กำหนดการไว้",
    "scheduled.noScheduledPostsDescription":
      "โพสต์ที่กำหนดการไว้ของคุณจะปรากฏที่นี่",
    "scheduled.scheduledFor": "กำหนดการสำหรับ",
    "scheduled.groups": "กลุ่ม",
    "scheduled.images": "รูปภาพ",
    "scheduled.cancelPost": "ยกเลิกโพสต์",
    "scheduled.postCancelled": "ยกเลิกโพสต์สำเร็จแล้ว!",
    "scheduled.cancelFailed": "ไม่สามารถยกเลิกโพสต์ได้",
    "scheduled.loading": "กำลังโหลดโพสต์ที่กำหนดการไว้...",
    // },
    // "pagePost": {
    "pagePost.title": "กำหนดการโพสต์เพจ",
    "pagePost.description": "สร้างและกำหนดการโพสต์ไปยังเพจเฟซบุ๊กของคุณโดยตรง",
    "pagePost.yourPage": "เพจของคุณ",
    "pagePost.pagePost": "โพสต์เพจ",
    "pagePost.placeholder": "คุณกำลังคิดอะไรอยู่?",
    "pagePost.schedulePost": "กำหนดการโพสต์",
    "pagePost.date": "วันที่",
    "pagePost.time": "เวลา",
    "pagePost.addPhotos": "เพิ่มรูปภาพ",
    "pagePost.scheduling": "กำลังกำหนดการ...",
    "pagePost.success": "สำเร็จ",
    "pagePost.error": "ข้อผิดพลาด",
    "pagePost.postScheduled": "กำหนดการโพสต์เพจสำเร็จแล้ว!",
    "pagePost.messageRequired": "กรุณาใส่ข้อความสำหรับโพสต์ของคุณ",
    "pagePost.scheduleRequired": "กรุณาเลือกวันที่และเวลาสำหรับการกำหนดการ",
    "pagePost.unknownError": "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ",
    // },
    // "language": {
    //   "switchLanguage": "เปลี่ยนภาษา",
    //   "english": "English",
    //   "thai": "ไทย"
    // }

    // contact page
    "contact.badge": "ติดต่อ",
    "contact.title": "ติดต่อเรา",
    "contact.subtitle":
      "มีคำถามเกี่ยวกับ Naina Hub ใช่ไหม? เราพร้อมช่วยให้คุณประสบความสำเร็จในธุรกิจอสังหาริมทรัพย์ของคุณ",

    "contact.info": "ข้อมูลการติดต่อ",
    "contact.email": "อีเมล",
    "contact.phone": "โทรศัพท์",
    "contact.office": "สำนักงาน",

    "contact.formTitle": "ส่งข้อความถึงเรา",
    "contact.formDescription":
      "กรอกแบบฟอร์มด้านล่าง แล้วเราจะติดต่อกลับภายใน 24 ชั่วโมง",

    "contact.name": "ชื่อ *",
    "contact.namePlaceholder": "ชื่อ-นามสกุลของคุณ",
    "contact.emailLabel": "อีเมล *",
    "contact.emailPlaceholder": "your@email.com",
    "contact.company": "บริษัท",
    "contact.companyPlaceholder": "ชื่อบริษัทของคุณ",
    "contact.message": "ข้อความ *",
    "contact.messagePlaceholder": "บอกเราว่าเราจะช่วยคุณได้อย่างไร...",

    "contact.submit": "ส่งข้อความ",
    "contact.address1": "317/1 ถ.สุขุมวิท 66/1 แยก 13",
    "contact.address2": "แขวง บางจาก เขต พระโขนง",
    "contact.address3": "กรุงเทพฯ ",

    // contract-builder
    "contracts.title": "เครื่องมือสร้างสัญญา",
    "contracts.title.rent": "สัญญาเช่า",
    "contracts.title.buySell": "สัญญาจะซื้อจะขาย",
    "contracts.subtitle.rent": "จัดการสัญญาเช่าและข้อมูลผู้เช่า",
    "contracts.subtitle.buySell": "จัดการสัญญาซื้อ/ขายและข้อมูลผู้ซื้อขาย",
    "contract.languageTH": "ภาษาไทย",
    "contract.languageEN": "ภาษาอังกฤษ",

    "contracts.createNew.rental": "สร้างสัญญาเช่าใหม่",
    "contracts.createNew.rentalDesc":
      "พิมพ์รายละเอียดในช่องว่างเพื่อสร้างสัญญาเช่าใหม่",
    "contracts.createNew.buySell": "สร้างสัญญาจะซื้อจะขายใหม่",
    "contracts.createNew.buySellDesc":
      "พิมพ์รายละเอียดในช่องว่างเพื่อสร้างสัญญาจะซื้อจะขายใหม่",

    "contracts.stats.total": "จำนวนสัญญาทั้งหมด",
    "contracts.stats.active": "สัญญาที่ใช้งานอยู่",
    "contracts.stats.revenue": "รายได้ต่อเดือน",

    "contracts.recent.title": "สัญญาล่าสุด",
    "contracts.recent.rent.desc": "รายการสัญญาเช่าของคุณและสถานะปัจจุบัน",
    "contracts.recent.buySell.desc":
      "รายการสัญญาซื้อ/ขายของคุณและสถานะปัจจุบัน",
    "contracts.status.active": "ใช้งานอยู่",
    "contracts.status.expired": "หมดอายุ",

    "contracts.download": "ดาวน์โหลด",

    // newContract
    // contract thai version

    // contract english version

    "newContract.title": "สร้างสัญญาเช่า",
    "newContract.subtitle":
      "กรอกรายละเอียดผู้เช่า ทรัพย์สิน และเงื่อนไขการเช่าเพื่อสร้างสัญญาเช่า",

    "newContract.navigation.backToDashboard": "กลับไปที่รายการสัญญา",

    "newContract.tenantInformation.title": "ข้อมูลผู้เช่า",
    "newContract.tenantInformation.subtitle": "กรอกรายละเอียดของผู้เช่า",
    "newContract.tenantInformation.fullName": "ชื่อ-นามสกุล",
    "newContract.tenantInformation.email": "อีเมล",
    "newContract.tenantInformation.phone": "เบอร์โทรศัพท์",
    "newContract.tenantInformation.currentAddress": "ที่อยู่ปัจจุบัน",
    "newContract.tenantInformation.passportPhoto": "รูปถ่ายหนังสือเดินทาง",
    "newContract.tenantInformation.placeholders.fullName":
      "กรอกชื่อ-นามสกุลผู้เช่า",
    "newContract.tenantInformation.placeholders.email": "กรอกอีเมลผู้เช่า",
    "newContract.tenantInformation.placeholders.phone": "กรอกเบอร์โทรศัพท์",
    "newContract.tenantInformation.placeholders.currentAddress":
      "กรอกที่อยู่ปัจจุบันของผู้เช่า",

    "newContract.propertyInformation.title": "ข้อมูลทรัพย์สิน",
    "newContract.propertyInformation.subtitle": "กรอกรายละเอียดทรัพย์สิน",
    "newContract.propertyInformation.propertyAddress": "ที่อยู่ทรัพย์สิน",
    "newContract.propertyInformation.propertyType": "ประเภททรัพย์สิน",
    "newContract.propertyInformation.selectType": "เลือกประเภททรัพย์สิน",
    "newContract.propertyInformation.types.apartment": "อพาร์ตเมนต์",
    "newContract.propertyInformation.types.house": "บ้าน",
    "newContract.propertyInformation.types.condo": "คอนโดมิเนียม",
    "newContract.propertyInformation.types.townhouse": "ทาวน์เฮ้าส์",
    "newContract.propertyInformation.placeholders.propertyAddress":
      "กรอกที่อยู่ของทรัพย์สิน",

    "newContract.leaseTerms.title": "เงื่อนไขการเช่า",
    "newContract.leaseTerms.subtitle":
      "กำหนดระยะเวลาและวันที่เริ่ม-สิ้นสุดสัญญา",
    "newContract.leaseTerms.startDate": "วันที่เริ่มต้น",
    "newContract.leaseTerms.endDate": "วันที่สิ้นสุด",
    "newContract.leaseTerms.leaseTerm": "ระยะเวลาเช่า",
    "newContract.leaseTerms.selectLeaseTerm": "เลือกระยะเวลาเช่า",
    "newContract.leaseTerms.options.6months": "6 เดือน",
    "newContract.leaseTerms.options.1year": "1 ปี",
    "newContract.leaseTerms.options.2years": "2 ปี",
    "newContract.leaseTerms.options.monthToMonth": "รายเดือน",

    "newContract.financialTerms.title": "เงื่อนไขทางการเงิน",
    "newContract.financialTerms.subtitle": "กำหนดค่าเช่าและเงินมัดจำ",
    "newContract.financialTerms.monthlyRent": "ค่าเช่ารายเดือน",
    "newContract.financialTerms.securityDeposit": "เงินมัดจำ",
    "newContract.financialTerms.placeholders.monthlyRent":
      "กรอกจำนวนค่าเช่ารายเดือน",
    "newContract.financialTerms.placeholders.securityDeposit":
      "กรอกจำนวนเงินมัดจำ",

    "newContract.additionalTerms.title": "เงื่อนไขและนโยบายเพิ่มเติม",
    "newContract.additionalTerms.subtitle":
      "กำหนดนโยบายเฉพาะและเงื่อนไขเพิ่มเติม",
    "newContract.additionalTerms.petPolicy": "นโยบายสัตว์เลี้ยง",
    "newContract.additionalTerms.smokingPolicy": "นโยบายการสูบบุหรี่",
    "newContract.additionalTerms.additionalTerms":
      "เงื่อนไขและข้อกำหนดเพิ่มเติม",
    "newContract.additionalTerms.placeholders.additionalTerms":
      "กรอกเงื่อนไข ข้อกำหนด หรือข้อตกลงพิเศษ...",
    "newContract.additionalTerms.petOptions.noPets": "ห้ามเลี้ยงสัตว์",
    "newContract.additionalTerms.petOptions.catsOnly": "เลี้ยงแมวเท่านั้น",
    "newContract.additionalTerms.petOptions.dogsOnly": "เลี้ยงสุนัขเท่านั้น",
    "newContract.additionalTerms.petOptions.petsAllowed":
      "อนุญาตให้เลี้ยงสัตว์",
    "newContract.additionalTerms.smokingOptions.noSmoking": "ห้ามสูบบุหรี่",
    "newContract.additionalTerms.smokingOptions.outdoorOnly":
      "สูบบุหรี่ได้เฉพาะด้านนอก",
    "newContract.additionalTerms.smokingOptions.smokingAllowed":
      "อนุญาตให้สูบบุหรี่",

    "newContract.generateContract": "สร้างสัญญา",
    "newContract.generatingContract": "กำลังสร้างสัญญา...",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
