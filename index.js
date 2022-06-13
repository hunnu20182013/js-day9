// Import stylesheets
import './style.css';
import {
  Map,
  TileLayer,
  LayerGroup,
  Control,
  Marker,
  Icon,
  GeoJSON,
} from 'leaflet';

// Write Javascript code!
const map = new Map('map');

const amaplayer = new TileLayer(
  'http://wprd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
  {
    subdomains: '1234',
  }
);

const tdtImgLayer = new TileLayer(
  'https://t{s}.tianditu.gov.cn/img_w/wmts?tk=e2e24450e10e61c3d237f447cf9b7369&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}',
  {
    subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
  }
);

const tdtLabel = new TileLayer(
  'https://t{s}.tianditu.gov.cn/cia_w/wmts?tk=e2e24450e10e61c3d237f447cf9b7369&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}',
  {
    subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
    transparent: true,
    zIndex: 3,
  }
);

const tdtLayer = new LayerGroup([tdtImgLayer, tdtLabel]);

amaplayer.addTo(map);

map.setView([39.909186, 116.397411], 10);

const layerControl = new Control.Layers({
  高德: amaplayer,
  天地图: tdtLayer,
});

layerControl.addTo(map);

const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: '西北',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.25869750976562, 40.003423893179324],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: '东南',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.55670166015625, 39.87918107556866],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: '南部',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.39739990234375, 39.776880380637024],
      },
    },
  ],
};

const glayer = new GeoJSON(data, {
  pointToLayer: (GeoJsonPoint, latlng) => {
    return new Marker(latlng, {
      icon: new Icon({
        // iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svg),
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.8.0/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      }),
    });
  },
});
const check5 = document.getElementById('check5');
check5.onchange = (evt) => {
  if (evt.target.checked) {
    glayer.addTo(map);
  } else {
    glayer.removeFrom(map);
  }
};
glayer.addTo(map);
