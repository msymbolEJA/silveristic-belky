export const tagsData = [
  "pending",
  "awaiting",
  "in_progress",
  "ready",
  "in_transit",
  "cancelled",
  "shipped",
];

export const nonAdminTagsData = [
  "awaiting",
  "in_progress",
  "ready",
  "in_transit",
  "cancelled",
];

export const statusData = [
  "pending",
  "awaiting",
  "in_progress",
  "ready",
  "in_transit",
  "cancelled",
  "shipped",
];

export const USER_TYPE = {
  ADMIN: "admin",
  SHOP_MANAGER: "shop_manager",
  SHOP_PACKER: "shop_packer",
  WORKSHOP_MANAGER: "workshop_manager",
  WORKSHOP_PACKER: "workshop_packer",
};

export const sortingArrayAdmin = [
  "PENDING",
  "AWAITING",
  "IN PROGRESS",
  "READY",
  "IN TRANSIT",
  "SHIPPED",
  "CANCELLED",
];

export const sortingArrayUser = [
  "PENDING",
  "AWAITING",
  "IN PROGRESS",
  "READY",
  "IN TRANSIT",
  "CANCELLED",
];

export const repeatReasons = {
  MANUFACTURING_ERROR: "MANUFACTURING ERROR",
  DISCOLORATION: "DISCOLORATION",
  BREAK_OFF: "BREAK OFF",
  LOST_IN_MAIL: "LOST IN MAIL",
  SECOND: "SECOND",
};

export const STORE_BASE_URLS = {
  BELKY: "http://45.76.57.100:8080/",
  SHINY: "http://144.202.67.136:8080/",
  SILVERISTIC: "http://45.32.195.132:8080/",
  SILVERBYSWAN: "http://209.250.229.146:8080/",
  LALYN: "http://37.148.213.60:8080/",
  LILLIAN: "http://185.15.198.109:8080/",
  NEW_SHINY: "http://149.28.251.24:8080/",
  NEW_LALYN: "http://31.169.92.203:8080/",
  LINENIA: "http://155.138.255.69:8080/",
};

export const STORE_SERIES = {
  BELKY: "Kalpli Serisi",
  SHINY: "Güneş Serisi",
  SILVERISTIC: "Hilal Serisi",
  SILVERBYSWAN: "Papyon Serisi",
  LALYN: "Ankara Serisi",
  LILLIAN: "Manisa Serisi",
  LINENIA: "???? Serisi",
};

export const FONTS = {
  Shiny: {
    FONT1: "Hello Honey",
    FONT2: "Alex Brush", //OK
    FONT3: "Blackjack", //OK
    FONT4: "Dynalight", //OK
    FONT5: "",
    FONT6: "Originality Script", //OK
    FONT7: "",
    FONT8: "",
    FONT9: "Auteur Script", //OK
    FONT10: "",
    FONT11: "Fineday", //OK
    FONT12: "Above the Beyond Script", //OK
    FONT13: "Supa Mega Fantastic",
    FONT14: "Notera",
    FONT15: "Great Day",
    FONT16: "Old English Text",
  },
  Silveristic: {
    FONT1: "Alex Brush", //OK
    FONT2: "Brush Script MT", //OK
    FONT3: "Commercial Script MT", //OK
    FONT4: "Elaine Hanks Bold",
    FONT5: "Fabfelt Script Bold", //OK
    FONT6: "Harlow Solid", //OK
    FONT7: "Sofia", //OK
    FONT8: "Old English Text MT", //OK
    FONT9: "Harmonie Script",
    FONT10: "Love Hewits", //OK
  },
  SILVERBYSWAN: {
    FONT1: "Marketing Script", //OK
    FONT2: "Scriptina", //OK
    FONT3: "Pasifico", //OK
  },
};

export const NavbarOptions = [
  {
    label: "Siparisler",
    name: "orders",
    options: [
      { id: 1, order: "Bekleyen", url: "awaiting_orders" },
      { id: 2, order: "Tekrar", url: "repeat_orders" },
      { id: 3, order: "İşlemde", url: "processing_orders" },
      { id: 4, order: "Hazır", url: "ready_orders" },
      { id: 5, order: "Yolda", url: "in_transit" },
      { id: 6, order: "İptal", url: "cancelled_orders" },
      { id: 7, order: "Tamamı", url: "orders/page/1" },
    ],
  },
  {
    label: "Administration",
    name: "administration",
    options: [
      { id: 1, order: "Order Search", url: "orders_search" },
      { id: 2, order: "Order Preparation", url: "preparation" },
      { id: 3, order: "Manuel Order", url: "orders_creation" },
      { id: 4, order: "Shipped Orders", url: "shipped_orders" },
    ],
  },
  {
    label: "Takip",
    name: "follow",
    options: [
      { id: 1, order: "Gönderi Listesi", url: "shipment_list" },
      { id: 2, order: "Gönderi İçerikleri", url: "shipment_content" },
      { id: 3, order: "Üretim Takip", url: "due_dates" },
      { id: 4, order: "Gönderi Takip", url: "shipment_due_dates" },
      { id: 5, order: "Follow-up", url: "follow_up" },
    ],
  },
];

export const tableColumns = [
  { id: 1, name: "Sip.No", name2: "No", objKey: "receipt_id", objKey2: "id" },
  {
    id: 2,
    name: "Tarih",
    name2: "Adet",
    objKey: "creation_tsz",
    objKey2: "qty",
  },
  { id: 3, name: "Sitem Tarihi", objKey: "created_date" },
  { id: 4, name: "Buyer", objKey: "buyer" },
  { id: 5, name: "Supplier", objKey: "supplier" },
  { id: 6, name: "Tip", objKey: "type" },
  { id: 7, name: "Uzunluk", objKey: "length" },
  { id: 8, name: "Renk", objKey: "color" },
  { id: 9, name: "Adet", objKey: "qty" },
  { id: 10, name: "Boyut", objKey: "size" },
  { id: 11, name: "Başlangıç", objKey: "start" },
  { id: 12, name: "Boşluk", objKey: "space" },
  { id: 13, name: "Açıklama", objKey: "explanation" },
  { id: 14, name: "Internal Note", objKey: "gift_message" },
];

export const editableTableColumns = [
  { id: 1, name: "Sip.No", name2: "No", objKey: "receipt", objKey2: "id" },
  {
    id: 2,
    name: "OrderDate",
    name2: "Buyer",
    objKey: "created_date",
    objKey2: "buyer",
  },
  { id: 3, name: "Status", objKey: "status" },
  { id: 4, name: "Supplier", objKey: "supplier" },
  { id: 5, name: "Name", objKey: "type" },
  { id: 6, name: "Length", objKey: "length" },
  { id: 7, name: "Color", objKey: "color" },
  { id: 8, name: "Qty", objKey: "qty" },
  { id: 9, name: "Size", objKey: "size" },
  { id: 10, name: "Start", objKey: "start" },
  { id: 11, name: "Boşluk", objKey: "space" },
  { id: 12, name: "Ready\n?", objKey: "approved" },
  { id: 13, name: "Açıklama", objKey: "explanation" },
  { id: 14, name: "Personalization", objKey: "personalization" },
  { id: 15, name: "C.Note", objKey: "message_from_buyer" },
  { id: 16, name: "Internal Note", objKey: "note" },
];
