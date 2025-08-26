export const languages = {
  en: "English",
  th: "ไทย",
} as const;

export type Language = keyof typeof languages;

export const translations = {
  en: {
    subtitle: "Find your perfect property from {count} available listings",

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
    contractBuilder: "Contract Builder",
    contractBuilderDesc: "Generate professional rental contracts in minutes",
    propertyAnalytics: "Property Analytics",
    propertyAnalyticsDesc: "Track performance and market trends",
    clientManagement: "Client Management",
    clientManagementDesc: "Organize leads and maintain relationships",

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
    "line.step1explain": "Navigate to your Line group where the chat bot is active",
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

    "calendar.form.clientPhone.label": "Client Phone *",
    "calendar.form.clientPhone.placeholder": "+1 (555) 123-4567",

    "calendar.form.clientEmail.label": "Client Email *",
    "calendar.form.clientEmail.placeholder": "john@example.com",

    "calendar.form.appointmentType.label": "Appointment Type *",
    "calendar.form.appointmentType.placeholder": "Select type",
    "calendar.form.appointmentType.viewing": "Property Viewing",
    "calendar.form.appointmentType.consultation": "Consultation",
    "calendar.form.appointmentType.signing": "Contract Signing",
    "calendar.form.appointmentType.inspection": "Property Inspection",
    "calendar.form.appointmentType.meeting": "Client Meeting",

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

    "calendar.tabs.allAppointments": "All Appointments",
    "calendar.tabs.calendarView": "Calendar View",

    "calendar.allAppointments.title": "All Appointments",
    "calendar.allAppointments.description":
      "Complete list of your scheduled appointments",

    "calendar.calendarView.title": "Calendar View",
    "calendar.calendarView.description": "Visual calendar representation",

    "calendar.calendarView.emptyMessage1":
      "Calendar view will be implemented with a calendar component",
    "calendar.calendarView.emptyMessage2":
      "This would show appointments in a monthly/weekly grid format",

    // Dashboard Menu
    propertyListings: "Listings",
    lineChatBot: "Setup Line Chat Bot",
    contractBuilderMenu: "Contract Builder",
    clientManagementMenu: "Client Management",
    calendar: "Calendar",
    analytics: "Analytics",
    commissionTracker: "Commission Tracker",
    marketInsights: "Market Insights",
    messages: "Messages",
    settings: "Settings",
    aiAssistant: "AI Assistant",

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
    copyPhone: "Copy Phone",
    copyLineId: "Copy Line ID",
    copyFacebookUrl: "Copy FB URL",
    copyToPost: "Copy to Post",
    copyMessage: "Copy Message",
    copyPropertyCode: "Copy Property Code",
    copyProjectPropertyCode: "Copy Project Property Code",

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
  },
  th: {
    subtitle: "ค้นหาอสังหาริมทรัพย์ที่เหมาะกับคุณจาก {count} รายการที่มีอยู่",

    // Navigation
    features: "คุณสมบัติ",
    pricing: "ราคา",
    contact: "ติดต่อ",
    dashboard: "แดชบอร์ด",
    signIn: "เข้าสู่ระบบ",
    signOut: "ออกจากระบบ",
    getStarted: "เริ่มต้นใช้งาน",

    // Hero Section
    heroTitle: "เครื่องมือสำหรับ",
    heroTitleHighlight: "นายหน้าอสังหาฯ ยุคใหม่",
    heroDescription:
      "ปรับปรุงธุรกิจอสังหาริมทรัพย์ของคุณด้วยเครื่องมือที่มีประสิทธิภาพสำหรับการจัดการทรัพย์สิน ความสัมพันธ์กับลูกค้า และการสร้างสัญญา ทำงานอย่างชาญฉลาด ไม่ใช่หนัก",
    startFreeTrial: "เริ่มทดลองใช้ฟรี",
    watchDemo: "ดูการสาธิต",

    // Features
    contractBuilder: "เครื่องมือสร้างสัญญา",
    contractBuilderDesc: "สร้างสัญญาเช่าระดับมืออาชีพในไม่กี่นาที",
    propertyAnalytics: "การวิเคราะห์ทรัพย์สิน",
    propertyAnalyticsDesc: "ติดตามประสิทธิภาพและแนวโน้มตลาด",
    clientManagement: "การจัดการลูกค้า",
    clientManagementDesc: "จัดระเบียบลูกค้าเป้าหมายและรักษาความสัมพันธ์",

    // Dashboard
    "dashboard.title": "แดชบอร์ด",
    "dashboard.welcome":
      "ยินดีต้อนรับกลับ! นี่คือสิ่งที่เกิดขึ้นกับธุรกิจของคุณ",
    "dashboard.recentActivity": "กิจกรรมล่าสุด",
    "dashboard.latestUpdates": "การดำเนินการและอัปเดตล่าสุดของคุณ",
    "dashboard.upcomingTasks": "งานที่กำลังจะมาถึง",
    "dashboard.tasksToDo": "สิ่งที่คุณต้องทำ",

    "stats.changeFromLastMonth": "{{change}} จากเดือนที่แล้ว",

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
     "line.step3explain": "กดค้างในช่องพิมพ์ข้อความและเลือก \"วาง\" เพื่อใส่รหัสที่คัดลอกไว้",
     "line.step4": "ส่งข้อความ",
     "line.step4explain": "แตะปุ่มส่งเพื่อส่งรหัสของคุณไปยัง Chat Bot",
     "line.tips": "เคล็ดลับ",
     "line.tipsexplain": "ตรวจสอบให้แน่ใจว่าได้วางรหัสตรงตามที่คัดลอกมา Chat Bot จะประมวลผลรหัสของคุณโดยอัตโนมัติเมื่อส่งแล้ว",
 

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
    "calendar.addButton": "กำหนดเวลานัดหมาย",
    "calendar.dialogTitle": "กำหนดเวลานัดหมายใหม่",
    "calendar.dialogDescription": "สร้างนัดหมายใหม่กับลูกค้า",

    "calendar.form.title.label": "หัวข้อการนัดหมาย *",
    "calendar.form.title.placeholder": "ดูทรัพย์สิน - คอนโดกลางเมือง",

    "calendar.form.clientName.label": "ชื่อลูกค้า *",
    "calendar.form.clientName.placeholder": "จอห์น โด",

    "calendar.form.clientPhone.label": "เบอร์โทรลูกค้า *",
    "calendar.form.clientPhone.placeholder": "+1 (555) 123-4567",

    "calendar.form.clientEmail.label": "อีเมลลูกค้า *",
    "calendar.form.clientEmail.placeholder": "john@example.com",

    "calendar.form.appointmentType.label": "ประเภทการนัดหมาย *",
    "calendar.form.appointmentType.placeholder": "เลือกประเภท",
    "calendar.form.appointmentType.viewing": "ดูทรัพย์สิน",
    "calendar.form.appointmentType.consultation": "ปรึกษา",
    "calendar.form.appointmentType.signing": "เซ็นสัญญา",
    "calendar.form.appointmentType.inspection": "ตรวจสอบทรัพย์สิน",
    "calendar.form.appointmentType.meeting": "ประชุมลูกค้า",

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

    "calendar.tabs.allAppointments": "นัดหมายทั้งหมด",
    "calendar.tabs.calendarView": "มุมมองปฏิทิน",

    "calendar.allAppointments.title": "นัดหมายทั้งหมด",
    "calendar.allAppointments.description": "รายการนัดหมายทั้งหมดของคุณ",

    "calendar.calendarView.title": "มุมมองปฏิทิน",
    "calendar.calendarView.description": "การแสดงผลปฏิทิน",

    "calendar.calendarView.emptyMessage1":
      "มุมมองปฏิทินจะถูกสร้างด้วยคอมโพเนนต์ปฏิทิน",
    "calendar.calendarView.emptyMessage2":
      "จะแสดงนัดหมายในรูปแบบตารางรายเดือน/รายสัปดาห์",

    // Dashboard Menu
    propertyListings: "รายการทรัพย์สิน",
    lineChatBot: "ใช้งานไลน์แจ้งเตือน",
    contractBuilderMenu: "เครื่องมือสร้างสัญญา",
    clientManagementMenu: "การจัดการลูกค้า",
    calendar: "ปฏิทิน",
    analytics: "การวิเคราะห์",
    commissionTracker: "ติดตามค่าคอมมิชชั่น",
    marketInsights: "ข้อมูลเชิงลึกตลาด",
    messages: "ข้อความ",
    settings: "การตั้งค่า",
    aiAssistant: "ผู้ช่วย AI",

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
    bed: "ห้องนอน",
    bath: "ห้องน้ำ",
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
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
