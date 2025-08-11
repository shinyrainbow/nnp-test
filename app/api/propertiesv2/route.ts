import { faker } from '@faker-js/faker';
// version เป็นก้อนๆๆๆ
const PROJECTS = [
  { id: 1, name: 'Siam Sky Tower', location: ['Rama 9', 'Phrom Phong'] },
  { id: 2, name: 'Chao Phraya Residence', location: ['Riverside', 'Charoen Nakhon'] },
  { id: 3, name: 'Bangkok Central Condo', location: ['Asoke', 'Sukhumvit'] },
  { id: 4, name: 'Riverside Park', location: ['Rama 3', 'Chong Nonsi'] },
  { id: 5, name: 'Lumphini Suites', location: ['Lumphini', 'Silom'] },
];

const TYPES = ['studio', 'one-bedroom', 'two-bedroom', 'penthouse'];

function generateRoom(id) {
  const project = PROJECTS[Math.floor(Math.random() * PROJECTS.length)];

  return {
    id,
    propertyName: `Room ${100 + id}`,
    projectId: project.id,
    projectName: project.name,
    location: project.location,
    status: faker.helpers.arrayElement(['available', 'rented', 'sold']),
    bedRoom: faker.datatype.number({ min: 1, max: 3 }),
    bathRoom: faker.datatype.number({ min: 1, max: 2 }),
    size: faker.datatype.number({ min: 20, max: 60 }),
    rentalRate: faker.datatype.number({ min: 8000, max: 50000 }),
    sell: faker.datatype.number({ min: 1000000, max: 10000000 }),
    type: faker.helpers.arrayElement(TYPES),
    tel: faker.phone.number('0#########'),
    lineId: `line_${faker.internet.userName()}`,
    indexFbUrl: `https://www.facebook.com/${faker.internet.userName()}`,
    isPetFriendly: faker.datatype.boolean(),
    distanceToStation: faker.datatype.number({ min: 100, max: 2000 }),
    distanceStation: faker.helpers.arrayElement(['ทองหล่อ', 'อโศก', 'สุขุมวิท', 'พระโขนง', 'เอกมัย']),
    more: faker.lorem.sentence(5),
    carPark: faker.datatype.number({ min: 0, max: 2 }),
    imageUrl: "moc"
  };
}

const ROOMS = Array.from({ length: 100 }, (_, i) => generateRoom(i + 1));

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.toLowerCase() || '';
    const locationQuery = searchParams.get('locationQuery')?.toLowerCase() || '';
    const priceFromRaw = searchParams.get('priceFrom');
    const priceToRaw = searchParams.get('priceTo');
    const sizeFromRaw = searchParams.get('sizeFrom');
    const sizeToRaw = searchParams.get('sizeTo');
    const typeQuery = searchParams.get('type')?.toLowerCase() || '';
    const suggest = searchParams.get('suggest');

    const priceFrom = priceFromRaw ? Number(priceFromRaw) : null;
    const priceTo = priceToRaw ? Number(priceToRaw) : null;
    const sizeFrom = sizeFromRaw ? Number(sizeFromRaw) : null;
    const sizeTo = sizeToRaw ? Number(sizeToRaw) : null;

    function matches(room) {
      const matchesProject = !q || room.projectName.toLowerCase().includes(q);
      const matchesLocation =
        !locationQuery ||
        room.location.some((loc) => loc.toLowerCase().includes(locationQuery));

      // OR logic between project name and location
      const projectOrLocationMatch = matchesProject || matchesLocation;

      const matchesPriceFrom = priceFrom === null || room.rentalRate >= priceFrom;
      const matchesPriceTo = priceTo === null || room.rentalRate <= priceTo;
      const matchesSizeFrom = sizeFrom === null || room.size >= sizeFrom;
      const matchesSizeTo = sizeTo === null || room.size <= sizeTo;
      const matchesType = !typeQuery || room.type.toLowerCase() === typeQuery;

      return (
        projectOrLocationMatch &&
        matchesPriceFrom &&
        matchesPriceTo &&
        matchesSizeFrom &&
        matchesSizeTo &&
        matchesType
      );
    }

    if (suggest === 'projects') {
      const projectsSet = new Set();

      ROOMS.forEach((room) => {
        if (!q || room.projectName.toLowerCase().includes(q)) {
          projectsSet.add(room.projectName);
        }
      });

      const projects = Array.from(projectsSet);

      return new Response(JSON.stringify({ projects }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      const filteredRooms = ROOMS.filter(matches);

      return new Response(JSON.stringify({ results: filteredRooms }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
