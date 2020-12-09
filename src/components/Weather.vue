<template>
  <div class="main">
    <div class="searchbox">
      <input class="searchbar" placeholder="Search" v-model="inputValue" />
      <div class="searchicon">
        <i class="fas fa-search"></i>
      </div>
      <div class="marker-icon">
        <i class="fas fa-map-marker-alt"></i>
      </div>
    </div>
    <section class="suggestions">
      <div
        class="suggestion-box"
        v-for="(item, index) in searchList"
        v-bind:key="index"
        @click="setWeather(item)"
      >
        <div>
          <span class="text-capitalize">{{ item.city }}</span>,
          <span class="text-lighter">
            {{ item.admin_name+", "+
            item.country }}
          </span>
        </div>
        <div class="d-flex justify-space-between">
          <div class="d-flex flex-column">
            <span class="font-weight-bold">{{ Math.round(item.temp) }}° C</span>
            <span class="font-weight-light">{{ item.main }}</span>
          </div>
          <div v-if="item.main == 'Clouds'">
            <img class="weatherIcon" src="/icons/cloudy.svg" v-bind:alt="item.main" />
          </div>
          <div
            v-else-if="
              item.main == 'Rain' ||
                item.main == 'Thunderstorm' ||
                item.main == 'Drizzle'
            "
          >
            <img class="weatherIcon" src="/icons/rainy.svg" v-bind:alt="item.main" />
          </div>
          <div v-else-if="item.main == 'Snow'">
            <img class="weatherIcon" src="/icons/snowing.svg" v-bind:alt="item.main" />
          </div>
          <div v-else>
            <img class="weatherIcon" src="/icons/sun.svg" v-bind:alt="item.main" />
          </div>
        </div>
      </div>
    </section>
    <DailyForecast
      v-if="Object.keys(weather).length != 0"
      v-bind:daily="weather.daily"
      @changeIndex="changeIndex($event)"
    />
    <DetailedForecast
      v-if="Object.keys(weather).length != 0"
      v-bind:hourly="weather.hourly"
      v-bind:daily="weather.daily[dailyindex]"
      v-bind:index="dailyindex"
      v-bind:timezone="weather.timezone"
    />
  </div>
</template>

<script>
import DailyForecast from "./DailyForecast.vue";
import DetailedForecast from "./DetailedForecast.vue";
import cities from "./in.json";
export default {
  name: "Weather",
  components: {
    DailyForecast,
    DetailedForecast
  },
  props: {
    msg: String
  },
  data() {
    return {
      api_key: "728d1b34e4611407324ebc00515f6a2c",
      coordinates: { lat: 0, lng: 0 },
      weather: {},
      dailyindex: 0,
      address: "",
      searchList: [],
      inputValue: "",
      events: []
    };
  },
  watch: {
    inputValue: async function(val, oldVal) {
      if (oldVal != val) {
        let value = val;
        if (value.length > 1) {
          const regex = new RegExp(`^${value}`, `i`);

          const matches = cities.filter(v => regex.test(v.city));

          for (var i = 0; i < matches.length; i++) {
            if (i < 10) {
              var temp = matches[i];
              await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${matches[i].lat}&lon=${matches[i].lng}&units=metric&appid=${this.api_key}`
              )
                .then(res => {
                  return res.json();
                })
                .then(res => {
                  temp.temp = res.current.temp;
                  temp.main = res.current.weather[0].main;
                });
              matches[i] = temp;
            } else {
              break;
            }
          }
          this.searchList = matches;
        } else {
          this.searchList = [];
        }
      } else {
        console.log("valueNot changed", this.searchList);
      }
    }
  },
  methods: {
    fetchWeather(lat, lng) {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${this.api_key}`
      )
        .then(res => {
          return res.json();
        })
        .then(this.setResults);
    },

    setResults(results) {
      this.weather = results;
      this.searchList = [];
    },
    setWeather(item) {
      this.inputValue =
        item.city + ", " + item.admin_name + ", " + item.country;
      this.fetchWeather(item.lat, item.lng);
    },
    changeIndex(index) {
      this.dailyindex = index;
    },
    addEvent({ type, target }) {
      const event = {
        type,

        target: {
          value: target.value
        }
      };
      this.events.push(event);
    },
    async handleChange(e) {
      let value = e.target.value;
      if (value.length > 0) {
        const regex = new RegExp(`^${value}`, `i`);

        const matches = cities.filter(v => regex.test(v.name));

        for (var i = 0; i < matches.length; i++) {
          if (i < 10) {
            var temp = matches[i];
            await fetch(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${matches[i].lat}&lon=${matches[i].lng}&units=metric&appid=${this.api_key}`
            )
              .then(res => {
                return res.json();
              })
              .then(res => {
                temp.temp = res.current.temp;
                temp.main = res.current.weather[0].main;
              });
            matches[i] = temp;
          } else {
            break;
          }
        }
        this.searchList = matches;
        this.inputValue = value;
      }
    }
  },
  created() {
    this.$getLocation({})
      .then(coordinates => {
        console.log(coordinates);
        this.coordinates = coordinates;
        this.fetchWeather(coordinates.lat, coordinates.lng);
      })
      .catch(error => console.log(error));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchbox {
  width: 100%;
  margin-bottom: 5px;
  position: relative;
}
.searchbar {
  display: block;
  width: 100%;
  padding: 15px 40px;

  color: #313131;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  transition: 0.4s;
}
.marker-icon {
  height: 2.25em;
  pointer-events: none;
  position: absolute;
  top: 14px;
  width: 2.25em;
  font-size: larger;

  z-index: 4;
  left: 0;
  position: absolute;
}
.searchicon {
  height: 2.25em;
  pointer-events: none;
  position: absolute;
  top: 14px;
  width: 2.25em;
  font-size: larger;

  z-index: 4;
  right: 0;
  position: absolute;
}
.suggestions {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 10px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 -8px 12px 0px rgba(0, 0, 0, 0.05),
    0 -2px 3px -2px rgba(0, 0, 0, 0.01);
  position: absolute;

  z-index: 100;
  max-width: 770px;
  width: 100%;
}
.suggestion-box {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
}
.weatherIcon {
  height: 40px;
  width: 40px;
  margin-left: 0.5rem;
}
</style>
