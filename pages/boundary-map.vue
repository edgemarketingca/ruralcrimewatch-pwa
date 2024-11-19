<template>
  <q-page>
    <div id="map" class="loading"></div>
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
        <q-btn
          class="vm-close"
          flat
          icon="highlight_off"
          size="lg"
          @click="onClear"
        ></q-btn>
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
        <q-btn
          id="more-info"
          class="pulse"
          icon="info"
          text-color="primary"
          size="md"
          @click="onMore"
          >{{ detail === "full" ? "Less Information" : "More Information" }}
          <q-chip
            v-if="this.detail === 'summary'"
            color="primary"
            text-color="white"
            icon="expand_less"
          ></q-chip>
          <q-chip
            v-if="this.detail === 'full'"
            color="primary"
            text-color="white"
            icon="highlight_off"
          ></q-chip>
        </q-btn>
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
  </q-page>
</template>

<script>
import "leaflet/dist/leaflet.js";
import "leaflet/dist/leaflet.css";
import 'leaflet-draw';
import geolocation from "../services/plugins/geolocation";
import DetachmentCoords from "../data/rcmpDetachmentCoords";
import Detachments from "../data/detachments";

export default {
  data: () => ({
    mapboxAccessToken:
      "pk.eyJ1Ijoia3lsZWFuZGVyc29uIiwiYSI6ImNrb3lqZXh0ejBtaWsyb3FvN2xqeWljem0ifQ.mOWtsRuMeHlRC-sC6kiuHQ",
    map: {},
    detachmentCoords: DetachmentCoords.detachments,
    detachmentData: Detachments.data,
    info: L.control(), // infobox with legend
    geojson: {},
    detail: "summary",
    selected: null,
    marker: {},
    userLocationMarker: {},
    popup: {},
    zoom: 0,
    tooltips: {},
    icons: {
      default: {},
      building: {},
    },
    districtColors: {
      wad: "#b2d9e8",
      cad: "#ffcc67",
      sad: "#fefec8",
      ead: "#8aca69",
      other: "transparent",
    },
  }),
  computed: {
    address1() {
      if (!this.selected || !this.selected.Address) return "NA";

      return this.selected.Address;
    },
    address2() {
      let detach = this.selected;
      if (!detach || !(detach.City && detach.Prov && detach.Postal))
        return "NA";

      return `${detach.City}, ${detach.Prov}, ${detach.Postal}`;
    },
    mailingAddress1() {
      if (!this.selected || !this.selected.Mailing_Ad) return "NA";

      // Get index of first comma
      const comma = this.selected.Mailing_Ad.indexOf(",");
      return this.selected.Mailing_Ad.substring(0, comma);
    },
    mailingAddress2() {
      if (!this.selected || !this.selected.Mailing_Ad) return "NA";

      // Get index of first comma
      const comma = this.selected.Mailing_Ad.indexOf(",");
      let subString = this.selected.Mailing_Ad.substring(comma + 1);
      return subString.trim();
    },
  },
  methods: {
    getColor(name) {
      let district = this.detachmentData.find(
        (x) => x.Detachment.indexOf(name) !== -1
      ).District;
      // let district = this.detachmentData.find(function(x, index) {
      //   return x.Detachment.indexOf(name) !== -1;
      // }).District;

      return district === "WAD"
        ? this.districtColors.wad
        : district === "CAD"
        ? this.districtColors.cad
        : district === "SAD"
        ? this.districtColors.sad
        : district === "EAD"
        ? this.districtColors.ead
        : this.districtColors.other;
    },
    getStyle(feature) {
      let bgcolor = this.getColor(feature.properties.name);
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
    },
    highlightFeature(e) {
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
    },
    resetHighlight(e) {
      this.geojson.resetStyle(e.target);
    },
    zoomToFeature(e, location) {
      var layer = {};
      if (!location) {
        layer = e.target;
        this.map.fitBounds(e.target.getBounds());
      } else {
        layer = location;
        if (typeof layer.getBounds === "function") {
          this.map.fitBounds(layer.getBounds());
        }
      }
      if (!layer || !layer.feature || !layer.feature.properties) {
        return;
      }
      this.selected = this.detachmentData.find(
        (x) => x.Detachment.indexOf(layer.feature.properties.name) !== -1
      );
      this.marker.setLatLng([this.selected.Lat, this.selected.Long]);
      if (this.selected.District === "other") {
        document.getElementById("more-info").style.visibility = "hidden";
      } else {
        document.getElementById("more-info").style.visibility = "visible";
      }
    },
    onEachFeature(feature, layer) {
      console.log("----------", L);
      let area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
      let area_mapped = this.map_range(area, 40000000, 51000000000, 1, 10);
      let labelSize = "";
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
        .addTo(this.map);

      layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
        click: this.zoomToFeature,
      });
    },
    onMore() {
      this.detail = this.detail === "summary" ? "full" : "summary";
    },
    onClear() {
      this.selected = null;
      localStorage.removeItem("jurisdiction");
      setTimeout(() => {
        // Leave enough time for animation to run
        this.detail = "summary";
      }, 300);
    },
    getLayer(location) {
      let foundLayer = {};
      this.map.eachLayer(function (layer) {
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
    },
    map_range(value, low1, high1, low2, high2) {
      return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
    },
    add() {
      this._div = L.DomUtil.create("div", "info");
      this._div.innerHTML = `<h4>"K" Division RCMP</h4>
          <div id="rcmp-crest"></div>
          <div id="legend">
            <div id="wad" style="background-color: ${this.districtColors.wad}"></div><span>WAD</span>
            <div id="cad" style="background-color: ${this.districtColors.cad}"></div><span>CAD</span>
            <div id="sad" style="background-color: ${this.districtColors.sad}"></div><span>SAD</span>
            <div id="ead" style="background-color: ${this.districtColors.ead}"></div><span>EAD</span>
            <div id="other" class="other-district"></div><span>Other</span>
          </div>
          `;
      // this.update();
      return this._div;
    },
  },
  mounted() {
    this.info.onAdd = this.add;

    this.info.update = function (props) {
      this._div.innerHTML = "";
    };

    this.map = L.map("map").setView([55, -113], 6);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
        this.mapboxAccessToken,
      {
        id: "mapbox/streets-v11",
        attribution: "",
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 12,
        minZoom: 5,
      }
    ).addTo(this.map);

    this.map.on("zoomend", () => {
      this.zoom = this.map.getZoom();
      if (this.zoom < 7) {
        this.marker.setLatLng([1, -1]);
      }
      // set zoom body class
      let bodyClasses = document.body.classList;
      for (var i = 0; i < bodyClasses.length; i++) {
        if (bodyClasses[i].indexOf("zoom") != -1) {
          document.body.classList.remove(bodyClasses[i]);
        }
      }
      document.body.classList.add("zoom" + this.zoom);
    });

    this.info.addTo(this.map);

    this.geojson = L.geoJson(this.detachmentCoords, {
      style: this.getStyle,
      onEachFeature: this.onEachFeature,
    }).addTo(this.map);

    this.icons.default = new L.icon({
      iconUrl: require("../../node_modules/leaflet/dist/images/marker-icon.png"),
      iconSize: [25, 41],
      iconAnchor: [2, 2],
      popupAnchor: [0, -2],
    });

    this.icons.building = L.divIcon({
      className: "location-icon",
      html: "<div style='background-color:#4838cc;' class='marker-pin'></div><i class='fa fa-building awesome'>",
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });

    // Retrieve users location
    if (navigator.geolocation) {
      this.$q.loading.show({ message: "Retrieving your location" });
      setTimeout(() => {
        if (typeof cordova !== "undefined") {
          geolocation
            .getLocation()
            .then(async (result) => {
              // Find nearest detachment
              this.$q.loading.show({ message: "Finding nearest detachment" });
              const nearest = await Detachments.findNearest({
                lat: result.latitude,
                long: result.longitude,
              });
              if (nearest != null) {
                this.selected = nearest;
                let currentLocation = this.getLayer(this.selected.Detachment);
                this.zoomToFeature(false, currentLocation);
                this.userLocationMarker = L.marker(
                  [result.latitude, result.longitude],
                  {
                    icon: this.icons.default,
                  }
                ).addTo(this.map);
              } else {
                this.selected = null;
              }

              this.$q.loading.hide();
            })
            .catch((error) => {
              console.error("The Promise is rejected!", error);
            });
        } else {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              this.$q.loading.hide();
              // Find nearest detachment
              this.$q.loading.show({ message: "Finding nearest detachment" });
              const nearest = await Detachments.findNearest({
                lat: position.coords.latitude,
                long: position.coords.longitude,
              });
              if (nearest != null) {
                this.selected = nearest;
                let currentLocation = this.getLayer(this.selected.Detachment);
                this.zoomToFeature(false, currentLocation);
                this.userLocationMarker = L.marker(
                  [position.coords.latitude, position.coords.longitude],
                  { icon: this.icons.default }
                ).addTo(this.map);
              } else {
                this.selected = null;
              }

              this.$q.loading.hide();
            },
            (error) => {
              this.$q.loading.hide();
              this.$q.notify({
                message: `We were unable to retrieve your location. If you didn't allow the app access to your location previously, please remove the restriction in your devices web browser settings.`,
                type: "info",
                icon: "warning",
                position: "top",
                timeout: 10000,
              });

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
    let bounds = this.map.getBounds();
    let paddedBounds = bounds;
    paddedBounds._southWest.lat = 48;
    paddedBounds._northEast.lat = 62;
    this.map.setMaxBounds(paddedBounds);

    this.marker = L.marker([1, -1], { icon: this.icons.building }).addTo(
      this.map
    );
    //this.popup = L.popup({className: 'location-popup'});
    // this.marker.bindPopup(this.popup);
    // this.marker.on('click', function(e, i){
    //   this.openPopup('');
    // });
  },
};
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
    color: var(--q-color-primary);

    @media (min-width: 1024px) {
      font-size: larger;
      padding: 10px 12px;
    }

    a {
      color: var(--q-color-primary);
      font-weight: bold;
    }

    &:hover {
      background-color: var(--q-color-secondary);
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
  background-color: var(--q-color-primary);
  color: #fff;

  .q-chip,
  .q-chip:hover {
    background: transparent !important;
  }

  .q-icon[role="img"] {
    border-radius: 80%;
    margin-right: 0.6rem;
    animation: pulse 1.2s infinite;
    background: var(--q-color-primary) !important;
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
</style>
