<template>
  <main>
    <div v-if="loadingState.visible" class="loading-overlay">
      <div class="spinner"></div>
      <p>{{ loadingState.message }}</p>
    </div>
    <div ref="mapContainer" id="map" class="loading"></div>
    <div
      class="vm-info column"
      :class="{ 'vm-visible': selected !== null, 'vm-full': detail === 'full' }"
    >
      <header class="vm-info-header row justify-between items-center col-auto">
        <h1>{{ selected == null ? "" : selected.Detachment }}</h1>
        <a
          id="report"
          v-if="selected && selected.Comp_Phone"
          :href="'tel:' + selected.Comp_Phone"
          ><span>Report: </span><span>{{ selected.Comp_Phone }}</span></a
        >
        <button @click="onClear" class="icon-btn">
          <i class="fas fa-times-circle icon"></i>
        </button>
      </header>
      <div class="vm-info-content col">
        <!-- Summary Display -->
        <div class="vm-info-content-data phone" v-if="detail === 'summary'">
          <div class="row justify-start">
            <div class="col-auto vm-phone-label">
              <div v-if="selected && selected.Comp_Phone">Report:</div>
            </div>
            <div class="col-auto">
              <div v-if="selected && selected.Comp_Phone">
                <a :href="'tel:' + selected.Comp_Phone">{{
                  selected.Comp_Phone
                }}</a>
              </div>
            </div>
          </div>
        </div>
        <!-- Full Display -->
        <div class="vm-info-content-data" v-if="detail === 'full'">
          <div class="row justify-start">
            <div class="col-auto vm-phone-label">
              <div v-if="selected && selected.Comp_Phone">Report:&nbsp;</div>
            </div>
            <div class="col-auto">
              <div v-if="selected && selected.Comp_Phone">
                <a :href="'tel:' + selected.Comp_Phone">{{
                  selected.Comp_Phone
                }}</a>
              </div>
            </div>
          </div>
          <h2>Contact Information</h2>
          <p>{{ address1 }}</p>
          <p>{{ address2 }}</p>

          <h2>Mailing Address</h2>
          <p>{{ mailingAddress1 }}</p>
          <p>{{ mailingAddress2 }}</p>

          <h2>Hours of Operation</h2>
          <p>
            {{ selected && selected.General_Se ? selected.General_Se : "NA" }}
          </p>

          <h2>Services Available</h2>
          <p>
            {{ selected && selected.Services_A ? selected.Services_A : "NA" }}
          </p>

          <h2>Languages</h2>
          <p>
            {{ selected && selected.Languages_ ? selected.Languages_ : "NA" }}
          </p>
        </div>
      </div>
      <footer class="vm-info-footer col-auto">
        <button id="more-info" class="pulse" @click="onMore">
          <span>{{
            detail === "full" ? "Less Information" : "More Information"
          }}</span>
          <i class="fa-solid fa-chevron-up" v-if="detail === 'summary'"></i>
          <i class="fa-solid fa-chevron-down" v-if="detail === 'full'"></i>
        </button>
      </footer>
    </div>
    <!-- diagonal stripe bg -->
    <svg
      id="diagonal-stripe-svg"
      height="10"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <defs>
        <pattern
          id="diagonal-stripe"
          patternUnits="userSpaceOnUse"
          width="10"
          height="10"
        >
          <image
            xlink:href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScvPgogIDxwYXRoIGQ9J00tMSwxIGwyLC0yCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMAogICAgICAgICAgIE05LDExIGwyLC0yJyBzdHJva2U9J2JsYWNrJyBzdHJva2Utd2lkdGg9JzInLz4KPC9zdmc+"
            x="0"
            y="0"
            width="10"
            height="10"
          ></image>
        </pattern>
      </defs>
    </svg>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from "vue";
import "leaflet/dist/leaflet.js";
import "leaflet/dist/leaflet.css";
import "leaflet-draw";
import geolocation from "../services/plugins/geolocation";
import DetachmentCoords from "../data/rcmpDetachmentCoords";
import Detachments from "../data/detachments";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";

// import L from "leaflet";

declare const cordova: any;
declare const L: any;

const mapboxAccessToken =
  "pk.eyJ1Ijoia3lsZWFuZGVyc29uIiwiYSI6ImNrb3lqZXh0ejBtaWsyb3FvN2xqeWljem0ifQ.mOWtsRuMeHlRC-sC6kiuHQ";
let map = null as any;
const detachmentCoords = DetachmentCoords.detachments as any;
const detachmentData = Detachments.data || [];
const info = L.control();
let geojson = {} as any;
const detail = ref("summary");
const selected = ref<any>(null);
let marker = {} as any;
let userLocationMarker = {};
const popup = {};
let zoom = 0;
const tooltips = {};
const icons = {
  default: {},
  building: {},
} as any;
let _div = null as any;
const mapContainer = ref(null);
const districtColors = {
  wad: "#b2d9e8",
  cad: "#ffcc67",
  sad: "#fefec8",
  ead: "#8aca69",
  other: "transparent",
};

const address1 = computed(() => {
  if (!selected.value || !selected.value.Address) return "NA";

  return selected.value.Address;
});
const address2 = computed(() => {
  let detach = selected.value;
  if (!detach || !(detach.City && detach.Prov && detach.Postal)) return "NA";

  return `${detach.City}, ${detach.Prov}, ${detach.Postal}`;
});
const mailingAddress1 = computed(() => {
  if (!selected.value || !selected.value.Mailing_Ad) return "NA";

  // Get index of first comma
  const comma = selected.value.Mailing_Ad.indexOf(",");
  return selected.value.Mailing_Ad.substring(0, comma);
});
const mailingAddress2 = computed(() => {
  if (!selected.value || !selected.value.Mailing_Ad) return "NA";

  // Get index of first comma
  const comma = selected.value.Mailing_Ad.indexOf(",");
  let subString = selected.value.Mailing_Ad.substring(comma + 1);
  return subString.trim();
});

const getColor = (name: string) => {
  let district = detachmentData.find(
    (x) => x.Detachment.indexOf(name) !== -1
  )?.District;
  // let district = this.detachmentData.find(function(x, index) {
  //   return x.Detachment.indexOf(name) !== -1;
  // }).District;

  return district === "WAD"
    ? districtColors.wad
    : district === "CAD"
    ? districtColors.cad
    : district === "SAD"
    ? districtColors.sad
    : district === "EAD"
    ? districtColors.ead
    : districtColors.other;
};
const getStyle = (feature: any) => {
  let bgcolor = getColor(feature.properties.name);
  //fillColor: 'repeating-linear-gradient(135deg, gray 0px, gray 5px, transparent 5px, transparent 10px, gray 10px)',
  let styles = {
    fillColor: bgcolor,
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.5,
  };
  if (bgcolor === "transparent") {
    styles.fillColor = "url(#diagonal-stripe)";
    styles.fillOpacity = 0.2;
  }
  return styles;
};
const highlightFeature = (e: any) => {
  var layer = e.target;

  layer.setStyle({
    weight: 4,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
};
const resetHighlight = (e: any) => {
  geojson.resetStyle(e.target);
};
const zoomToFeature = (e: any, location: any) => {
  var layer = {} as any;
  if (!location) {
    layer = e.target;
    map.fitBounds(e.target.getBounds());
  } else {
    layer = location;
    if (typeof layer.getBounds === "function") {
      map.fitBounds(layer.getBounds());
    }
  }
  if (!layer || !layer.feature || !layer.feature.properties) {
    return;
  }
  selected.value = detachmentData.find(
    (x) => x.Detachment.indexOf(layer.feature.properties.name) !== -1
  );
  marker.setLatLng([selected.value.Lat, selected.value.Long]);

  const ele = document.getElementById("more-info");
  if (ele) {
    if (selected.value.District === "other") {
      ele.style.visibility = "hidden";
    } else {
      ele.style.visibility = "visible";
    }
  }
};
const onEachFeature = (feature: any, layer: any) => {
  let area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
  let area_mapped = map_range(area, 40000000, 51000000000, 1, 10);
  let labelSize = "" as any;
  if (area_mapped < 1.2) {
    labelSize = 1;
  } else if (area_mapped < 2.5) {
    labelSize = 2;
  } else if (area_mapped < 3) {
    labelSize = 3;
  } else if (area_mapped < 3.5) {
    labelSize = 4;
  } else if (area_mapped < 5.5) {
    labelSize = 5;
  } else {
    labelSize = 6;
  }
  let className = "layer-title size-" + labelSize;
  if (layer.feature.properties.name === "Stettler") {
    className = "layer-title size-3 stettler";
  } else if (layer.feature.properties.name === "Pincher Creek") {
    className = "layer-title size-3 pinchercreek";
  } else if (layer.feature.properties.name === "Cardston") {
    className = "layer-title size-3 cardston";
  } else if (layer.feature.properties.name === "Leduc") {
    className = "layer-title size-3 leduc";
  } else if (layer.feature.properties.name === "Slave Lake Municipal") {
    className = "layer-title size-3 slavelakemunicipal";
  } else if (layer.feature.properties.name === "Lakeshore Regional") {
    className = "layer-title size-3 lakeshoreregional";
  }
  layer
    .bindTooltip(layer.feature.properties.name, {
      className: className,
      permanent: true,
      direction: "center",
    })
    .addTo(map);

  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });
};
const onMore = () => {
  detail.value = detail.value === "summary" ? "full" : "summary";
};
const onClear = () => {
  selected.value = null;
  localStorage.removeItem("jurisdiction");
  setTimeout(() => {
    // Leave enough time for animation to run
    detail.value = "summary";
  }, 300);
};
const getLayer = (location: string) => {
  let foundLayer = {};
  map.eachLayer(function (layer: any) {
    if (
      layer &&
      layer.feature &&
      layer.feature.properties &&
      layer.feature.properties.name
    ) {
      if (layer.feature.properties.name === location) {
        foundLayer = layer;
      }
    }
  });
  return foundLayer;
};
const map_range = (
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number
) => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};
const add = () => {
  _div = L.DomUtil.create("div", "info");
  _div.innerHTML = `<h4>"K" Division RCMP</h4>
          <div id="rcmp-crest"></div>
          <div id="legend">
            <div id="wad" style="background-color: ${districtColors.wad}"></div><span>WAD</span>
            <div id="cad" style="background-color: ${districtColors.cad}"></div><span>CAD</span>
            <div id="sad" style="background-color: ${districtColors.sad}"></div><span>SAD</span>
            <div id="ead" style="background-color: ${districtColors.ead}"></div><span>EAD</span>
            <div id="other" class="other-district"></div><span>Other</span>
          </div>
          `;
  // this.update();
  return _div;
};

const loadingState = reactive({
  visible: false,
  message: "Loading...",
});

const hideLoading = () => {
  loadingState.visible = false;
};

const showLoading = (message: string = "Loading...") => {
  loadingState.visible = true;
  loadingState.message = message;
};

onMounted(async () => {
  await nextTick();
  info.onAdd = add;

  info.update = function (props: any) {
    this._div.innerHTML = "";
  };

  map = L.map("map").setView([55, -113], 6);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
      mapboxAccessToken,
    {
      id: "mapbox/streets-v11",
      attribution: "",
      tileSize: 512,
      zoomOffset: -1,
      maxZoom: 12,
      minZoom: 5,
    }
  ).addTo(map);

  map.on("zoomend", () => {
    zoom = map.getZoom();
    if (zoom < 7) {
      marker.setLatLng([1, -1]);
    }
    // set zoom body class
    let bodyClasses = document.body.classList;
    for (var i = 0; i < bodyClasses.length; i++) {
      if (bodyClasses[i].indexOf("zoom") != -1) {
        document.body.classList.remove(bodyClasses[i]);
      }
    }
    document.body.classList.add("zoom" + zoom);
  });

  info.addTo(map);

  geojson = L.geoJson(detachmentCoords, {
    style: getStyle,
    onEachFeature: onEachFeature,
  }).addTo(map);

  icons.default = L.icon({
    iconUrl: markerIconUrl,
    iconSize: [25, 41],
    iconAnchor: [2, 2],
    popupAnchor: [0, -2],
  });

  icons.building = L.divIcon({
    className: "location-icon",
    html: "<div style='background-color:#4838cc;' class='marker-pin'></div><i class='fa fa-building awesome'>",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });

  // Retrieve users location
  if (navigator.geolocation) {
    showLoading("Retrieving your location");
    setTimeout(() => {
      if (typeof cordova !== "undefined") {
        geolocation
          .getLocation()
          .then(async (result) => {
            hideLoading();
            showLoading("Finding nearest detachment");
            const nearest = await Detachments.findNearest({
              lat: result.latitude,
              long: result.longitude,
            });
            if (nearest != null) {
              selected.value = nearest;
              let currentLocation = getLayer(selected.value.Detachment);
              zoomToFeature(false, currentLocation);
              userLocationMarker = L.marker(
                [result.latitude, result.longitude],
                {
                  icon: icons.default,
                }
              ).addTo(map);
            } else {
              selected.value = null;
            }
            hideLoading();
          })
          .catch((error) => {
            console.error("The Promise is rejected!", error);
          });
      } else {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            hideLoading();
            showLoading("Finding nearest detachment");
            const nearest = await Detachments.findNearest({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
            if (nearest != null) {
              selected.value = nearest;
              let currentLocation = getLayer(selected.value.Detachment);
              zoomToFeature(false, currentLocation);
              userLocationMarker = L.marker(
                [position.coords.latitude, position.coords.longitude],
                { icon: icons.default }
              ).addTo(map);
            } else {
              selected.value = null;
            }
            hideLoading();
            // this.$q.loading.hide();
          },
          (error) => {
            hideLoading();
            alert(
              `We were unable to retrieve your location. If you didn't allow the app access to your location previously, please remove the restriction in your devices web browser settings.`
            );
            console.log("Location error: ", error);
          },
          {
            enableHighAccuracy: false,
            timeout: 30000,
          }
        );
      }
    }, 5000);
  }

  // prevent scrolling away from Alberta
  let bounds = map.getBounds();
  let paddedBounds = bounds;
  paddedBounds._southWest.lat = 48;
  paddedBounds._northEast.lat = 62;
  map.setMaxBounds(paddedBounds);

  marker = L.marker([1, -1], { icon: icons.building }).addTo(map);
  //this.popup = L.popup({className: 'location-popup'});
  // this.marker.bindPopup(this.popup);
  // this.marker.on('click', function(e, i){
  //   this.openPopup('');
  // });
});
</script>

<style lang="scss">
/* fixes firefox warning */
.leaflet-fade-anim .leaflet-tile,
.leaflet-zoom-anim .leaflet-zoom-animated {
  will-change: auto !important;
}

body.desktop .q-focusable:focus .q-focus-helper,
body.desktop .q-hoverable:hover .q-focus-helper {
  background: inherit;
  opacity: 0;
}

body.ios .q-hoverable:active .q-focus-helper {
  background: inherit;
  opacity: 0;
}

.q-focus-helper {
  opacity: 0;
  transition: unset;
}

.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: white;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  h4 {
    margin: 0 0 5px;
    color: #777;
    font-size: 2.125rem;
    font-weight: 400;
    line-height: 2.5rem;
    letter-spacing: 0.00735em;
  }
}

.vm-info {
  position: fixed;
  left: 0;
  right: 0;
  bottom: -100%;
  z-index: 1000;
  background-color: #eee;
  /* border-top: 2px solid #aaa; */
  transition: bottom 250ms ease;
  /* box-shadow: 0px 5px 5px 7px rgba(0, 0, 0, 0.49); */

  &.vm-visible {
    bottom: 0;
  }

  &.vm-visible.vm-full {
    @media (max-width: 400px) {
      top: 50px; // Height of header
    }
  }
}

.vm-info-header {
  padding: 5px 5px 5px 10px;
  background-color: lighten(#17314b, 12%);
  color: #fff;

  @media (min-width: 670px) {
    padding: 1.2rem 12%;
  }

  h1 {
    margin: 0;
    color: #fff;
    line-height: 1.8rem;

    @media (min-width: 670px) {
      font-size: 1.8rem;
    }
  }

  #report {
    background-color: #fff;
    padding: 6px 8px;
    border-radius: 12px;
    color: #17314b;

    @media (min-width: 1024px) {
      font-size: larger;
      padding: 10px 12px;
    }

    a {
      color: #17314b;
      font-weight: bold;
    }

    &:hover {
      background-color: #ffcb02;
    }
  }

  button {
    padding: 0;
    width: 32px;
    min-height: auto;
  }
}

.vm-info-content {
  background-color: white;
  overflow-y: auto;
}

.vm-info-content-data {
  padding: 10px;

  @media (min-width: 670px) {
    padding: 0.8rem 12%;
  }

  font-size: 0.9rem;

  &.phone {
    display: none;
  }

  h2 {
    margin: 12px 0 6px 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 2;
  }

  p {
    margin: 0 0 0 10px;
  }
}

.vm-info-footer {
  background-color: #17314b;
  color: #fff;

  .q-chip,
  .q-chip:hover {
    background: transparent !important;
  }

  .q-icon[role="img"] {
    border-radius: 80%;
    margin-right: 0.6rem;
    animation: pulse 1.2s infinite;
    background: #17314b !important;
  }

  span {
    color: #fff;
    font-size: 18px;
    padding: 0.2rem 0;
  }

  button {
    width: 100%;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    color: #fff;
  }
}

body {
  &.q-body--prevent-scroll .layer-title {
    display: none;
  }

  &.zoom12 {
    .layer-title {
      font-size: 5.4rem;
      top: -2em;

      &.size-1 {
        font-size: 2.8em;
        top: -1.3em;
      }
      &.size-2 {
        font-size: 3.5em;
      }
      &.size-3 {
        font-size: 4em;
      }
      &.size-4 {
        font-size: 4.5em;
      }
      &.size-5 {
        font-size: 5em;
      }
      &.size-6 {
        font-size: 5.5em;
      }
    }
  }

  &.zoom11 {
    .layer-title {
      font-size: 4.4rem;
      top: -2em;

      &.size-1 {
        font-size: 2em;
        top: 0;
      }
      &.size-2 {
        font-size: 3em;
        top: -2em;
      }
      &.size-3 {
        font-size: 3.6em;
      }
      &.size-4 {
        font-size: 4em;
      }
      &.size-5 {
        font-size: 4.4em;
      }
      &.size-6 {
        font-size: 4.8em;
      }
    }
  }

  &.zoom10 {
    .layer-title {
      font-size: 3.4rem;
      top: -2em;

      &.size-1 {
        font-size: 1.2em;
        top: 0;
      }
      &.size-2 {
        font-size: 1.7em;
        top: -2em;
      }
      &.size-3 {
        font-size: 2.3em;
      }
      &.size-4 {
        font-size: 2.7em;
      }
      &.size-5 {
        font-size: 3em;
      }
      &.size-6 {
        font-size: 3.4em;
      }
    }
  }

  &.zoom9 {
    .layer-title {
      font-size: 2.3rem;
      top: -2em;

      &.size-1 {
        font-size: 0.8em;
        top: 0;
      }
      &.size-2 {
        font-size: 1.3em;
        top: -2em;
      }
      &.size-3 {
        font-size: 1.5em;
      }
      &.size-4 {
        font-size: 1.7em;
      }
      &.size-5 {
        font-size: 2.2em;
      }
      &.size-6 {
        font-size: 2.6em;
      }
    }
  }

  &.zoom8 {
    .layer-title {
      font-size: 2rem;
      top: -1em;

      &.size-1 {
        font-size: 0.6em;
        top: 1em;
      }
      &.size-2 {
        font-size: 0.85em;
        top: -1em;
      }
      &.size-3 {
        font-size: 1em;
      }
      &.size-4 {
        font-size: 1.2em;
      }
      &.size-5 {
        font-size: 1.4em;
      }
      &.size-6 {
        font-size: 1.6em;
      }
    }
  }

  &.zoom7 {
    .layer-title {
      font-size: 1.7rem;
      top: -0.5em;

      &.size-1 {
        font-size: 0.4em;
        top: 1em;
      }

      &.size-2 {
        font-size: 0.65em;
        top: -1em;
      }

      &.size-3 {
        font-size: 0.8em;
      }

      &.size-4 {
        font-size: 1em;
      }

      &.size-5 {
        font-size: 1.2em;
      }

      &.size-6 {
        font-size: 1.4em;
      }
    }
  }

  &.zoom6 {
    .layer-title {
      display: none;
    }
  }

  &.zoom5 {
    .layer-title {
      display: none;
    }
  }
}
/* fix misalignment ??? */
.stettler {
  margin-left: -30px;
  top: 3em !important;
}

.pinchercreek {
  margin-left: -30px;
  top: 5em !important;
}

.cardston {
  margin-left: 0;
  top: 1em !important;
}

.leduc {
  margin-left: 0;
  top: 1em !important;
}

.slavelakemunicipal {
  top: 1.2em !important;
}

.lakeshoreregional {
  top: -3em !important;
  left: -3em;
}

#map {
  height: 680px;
  height: 94vh;

  @media (min-width: 670px) {
    height: 88vh;
    margin: 0 8%;
  }

  .other-district {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScvPgogIDxwYXRoIGQ9J00tMSwxIGwyLC0yCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMAogICAgICAgICAgIE05LDExIGwyLC0yJyBzdHJva2U9J2JsYWNrJyBzdHJva2Utd2lkdGg9JzInLz4KPC9zdmc+");
  }

  #diagonal-stripe-svg {
    position: absolute;
    left: -5000px;
  }

  .location-popup .leaflet-popup-content-wrapper {
    text-align: center;
  }

  .location-icon {
    pointer-events: none;

    i.awesome {
      // background: #FFF;
      // border-radius: 80%;
      // padding: 5px;
      color: #555;
      margin: 40px auto;
      font-size: 17px;
    }
  }

  .layer-title {
    background: transparent;
    border: 0; //2px solid #666;
    // border-radius: 5px;
    font-weight: bold;
    color: #555;
    pointer-events: none;
    box-shadow: none;

    &:before {
      display: none;
    }
  }

  .tooltip-hidden {
    display: none;
  }

  #rcmp-crest {
    background-image: url("/rcmp-crest.png");
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    height: 200px;
  }

  @media (max-width: 1024px) {
    .leaflet-control {
      max-width: 160px;

      h4 {
        font-size: 12px;
        line-height: 1;
        text-align: center;
      }

      #rcmp-crest {
        height: 70px;
      }

      #legend {
        font-size: 10px;
        margin: 8px auto 4px;
        grid-template-columns: 14% 36% 14% 34%;

        div {
          height: 12px;
        }

        span {
          padding-left: 3px;
        }
      }
    }
  }

  #legend {
    display: grid;
    grid-template-columns: 20% 22%;
    margin: 12px auto;
    padding: 0 9%;
    align-items: center;
    justify-content: center;

    div {
      height: 22px;
      border: 1px solid #555;
    }

    span {
      padding-left: 10px;
    }

    * {
      margin-top: 4px;
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.98);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }

  100% {
    transform: scale(0.98);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  p {
    color: white;
  }
}
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
// p {
//   margin-top: 10px;
//   color: white;
//   font-size: 18px;
// }

.row {
  display: flex;
}

.icon-btn {
  font-size: 30px;
}

.pulse {
  padding-top: 10px;
  padding-bottom: 10px;
}
.pulse span {
  font-size: 20px;
  text-transform: uppercase;
}

.pulse i {
  font-size: 20px;
  margin-left: 20px;
}

//  a {
//  color: #877200;
//  }

</style>
