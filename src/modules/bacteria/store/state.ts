import { latLngBounds, divIcon, point } from 'leaflet'
import { JSON } from '@/modules/shared/utils/types'

import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'
import Coordinate from '@/modules/shared/entities/Coordinate'
import Experiment from '@/modules/shared/entities/Experiment'
import ExperimentListItem from '@/modules/shared/entities/ExperimentListItem'
import Resistome from '@/modules/shared/entities/Resistome'
import { Pageable } from '@/modules/shared/entities/Pagination'

export interface BacteriaState {
  coordinates: Coordinate[];
  experiment: Experiment;
  experiments: ExperimentListItem[];
  pageable?: Pageable;
  filter: BacteriaFilter;
  mapConfig: unknown;
  resistome: Resistome | null;
}

const bounds = latLngBounds([
  [-43.749448, -123.991780],
  [18.413955, 16.785563],
])

const state: BacteriaState = {
  coordinates: [],
  experiment: Experiment.empty(),
  experiments: [],
  pageable: undefined,
  filter: BacteriaFilter.empty(),
  resistome: null,
  mapConfig: {
    bounds,
    center: bounds.getCenter(),
    maxBounds: bounds,
    zoom: 3,
    options: {
      zoomControl: false,
      zoomSnap: 0.25,
      minZoom: 3,
    },
    tileLayer: {
      url: process.env.VUE_APP_MAPBOX_TILE_URL,
      attribution: process.env.VUE_APP_MAPBOX_ATTRIBUTION,
    },
    marker: {
      color: 'rgba(0, 11, 100, 0.6)',
      fillColor: '#000064',
      fillOpacity: 1,
      radius: 4,
    },
    cluster: {
      chunkedLoading: true,
      zoomToBoundsOnClick: false,
      spiderfyOnMaxZoom: false,
      maxClusterRadius: 20,
      iconCreateFunction(cluster: JSON) {
        const markers = cluster.getAllChildMarkers()
        const isSelected = markers.some((marker: JSON) => marker.options.selected)

        return divIcon({
          html: cluster.getChildCount(),
          iconSize: point(18, 18),
          className: `onebr-marker-cluster ${isSelected ? 'blink' : ''}`,
        })
      },
    },
  },
}

export default state
