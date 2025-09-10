I will upload a CSV file. Please do the following and give me back <filename>-with-projectcode.json:

1. Parse the CSV (columns: post_id, title, content, user_url, post_url).
2. Enrich the data:
   - All fields must be strings.
   - Parse details from `title` + `content` (Thai + English):
     bedRoom, bathRoom, floor, roomSize (ตร.ม.), houseSize (ตร.ว. only if propertyType = Townhouse or SingleHouse),
     rentalRate, sellPrice, propertyType (Condo | Townhouse | SingleHouse | Apartment | Other),
     isPetFriendly, carPark, amenities[], addressNumber, phone, lineId, isOwner.
   - `imageUrls` = [] always.
   - `fbUser` = CSV column `user_url`.
   - `linkPost` = CSV column `post_url`.
   - `originalMessage` = CSV column `content`.
   - `messageToPost` = "" always.
3. Project matching:
   - Use `projectNameEn` and `projectNameTh` from my Project.json (or list I’ll provide).
   - If `originalMessage` contains projectNameEn or projectNameTh, set both `projectPropertyCode` and `projectCode` to that `projectCode`.
   - If no match, keep them `"P0000"`.
4. Return a single JSON array of objects, saved as `<filename>-with-projectcode.json`.