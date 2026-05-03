export type Location = {
  id: string;
  name: string;
  province: string;
  coords: [number, number];
  mapsUrl: string;
  active: boolean;
};

export const initialLocations: Location[] = [
  {
    id: "arraijan",
    name: "Iglesia Nueva Visión La Misericordia Arraiján",
    province: "PA10",
    coords: [-79.72803129743886, 8.99268298428215],
    mapsUrl: "https://www.google.com/maps?q=8.99268298428215,-79.72803129743886",
    active: true,
  },
  {
    id: "talitacumi",
    name: "Ministerio de Amor Talita Cumi",
    province: "PA8",
    coords: [-79.62069616554106, 9.188830251741543],
    mapsUrl: "https://www.google.com/maps?q=9.188830251741543,-79.62069616554106",
    active: true,
  },
  {
    id: "cristo-vive-el-chungal",
    name: "Cristo Vive - El Chungal",
    province: "PA8",
    coords: [-79.52946710310633, 9.133556048790405],
    mapsUrl: "https://www.google.com/maps?q=9.133556048790405,-79.52946710310633",
    active: true,
  },
  {
    id: "garachine",
    name: "Iglesia Nueva Visión La Misericordia Garachine",
    province: "PA5",
    coords: [-78.36309600280936, 8.066814974288576],
    mapsUrl: "https://www.google.com/maps?q=8.066814974288576,-78.36309600280936",
    active: true,
  },
  {
    id: "calle-larga",
    name: "Iglesia Nueva Visión La Misericordia Calle Larga",
    province: "PA5",
    coords: [-78.30669794338746, 8.026199936209352],
    mapsUrl: "https://www.google.com/maps?q=8.026199936209352,-78.30669794338746",
    active: true,
  },
  {
    id: "papayal",
    name: "Iglesia Nueva Visión La Misericordia Papayal",
    province: "PA5",
    coords: [-78.3022305252051, 7.987030676873175],
    mapsUrl: "https://www.google.com/maps?q=7.987030676873175,-78.3022305252051",
    active: true,
  },
  {
    id: "rio-de-jesus",
    name: "Iglesia Nueva Visión La Misericordia Rio de Jesus",
    province: "PA5",
    coords: [-78.25764, 8.00838],
    mapsUrl: "https://www.google.com/maps?q=8.00838,-78.25764",
    active: true,
  },
  {
    id: "daipuru",
    name: "Iglesia Nueva Visión La Misericordia Daipurú",
    province: "PA5",
    coords: [-78.25353, 7.99521],
    mapsUrl: "https://www.google.com/maps?q=7.99521,-78.25353",
    active: true,
  },
  {
    id: "la-colonia",
    name: "Iglesia Nueva Visión La Misericordia La Colonia",
    province: "PA5",
    coords: [-78.22202, 7.99472],
    mapsUrl: "https://www.google.com/maps?q=7.99472,-78.22202",
    active: true,
  },
  {
    id: "sambu",
    name: "Iglesia Nueva Visión La Misericordia Sambu",
    province: "PA5",
    coords: [-78.20758, 8.02112],
    mapsUrl: "https://www.google.com/maps?q=8.02112,-78.20758",
    active: true,
  },
  {
    id: "la-chunga",
    name: "Iglesia Nueva Visión La Misericordia La Chunga",
    province: "PA5",
    coords: [-78.21028106701228, 8.084052620112802],
    mapsUrl: "https://www.google.com/maps?q=8.084052620112802,-78.21028106701228",
    active: true,
  },
  {
    id: "taimati",
    name: "Iglesia Nueva Visión La Misericordia Taimati",
    province: "PA5",
    coords: [-78.24536, 8.15423],
    mapsUrl: "https://www.google.com/maps?q=8.15423,-78.24536",
    active: true,
  },
  {
    id: "cemaco",
    name: "Iglesia Nueva Visión La Misericordia Cemaco",
    province: "PA5",
    coords: [-78.22515712668861, 8.149077328639304],
    mapsUrl: "https://www.google.com/maps?q=8.149077328639304,-78.22515712668861",
    active: true,
  },
  {
    id: "rio-tigre",
    name: "Iglesia Nueva Visión La Misericordia Rio Tigre",
    province: "PA5",
    coords: [-78.16719, 7.94292],
    mapsUrl: "https://www.google.com/maps?q=7.94292,-78.16719",
    active: true,
  },
];
