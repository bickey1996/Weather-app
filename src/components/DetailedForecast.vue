<template>
  <section class="detailedforecasts">
    <div class="DetailedForecast_currentTempContainer">
      <h1 class="DetailedForecast_currentTemp">{{ Math.round(daily.temp.max) }}°C</h1>
      <div v-if="daily.weather[0].main == 'Clouds'">
        <img class="dailyforecastimg" src="/icons/cloudy.svg" v-bind:alt="daily.weather[0].main" />
      </div>
      <div
        v-else-if="
          daily.weather[0].main == 'Rain' ||
            daily.weather[0].main == 'Thunderstorm' ||
            daily.weather[0].main == 'Drizzle'
        "
      >
        <img class="dailyforecastimg" src="/icons/rainy.svg" v-bind:alt="daily.weather[0].main" />
      </div>
      <div v-else-if="daily.weather[0].main == 'Snow'">
        <img class="dailyforecastimg" src="/icons/snowing.svg" v-bind:alt="daily.weather[0].main" />
      </div>
      <div v-else>
        <img class="dailyforecastimg" src="/icons/sun.svg" v-bind:alt="daily.weather[0].main" />
      </div>
    </div>
    <div class="Detailedforecast-graphContainer" id="chart">
      <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
    <div class="DetailedForecast_secondaryStatsContainer">
      <div class="DetailedForecast_secondaryStats">
        <span class="font-weight-bold">Pressure</span>
        <span>{{ daily.pressure }} hpa</span>
      </div>
      <div class="DetailedForecast_secondaryStats">
        <span class="font-weight-bold">Humidity</span>
        <span>{{ daily.humidity }} %</span>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="DetailedForecast_sunriseStats">
        <span class="font-weight-bold">Sunrise</span>
        <span class="text-lighter">
          {{
          new Date(this.daily.sunrise * 1000).toLocaleTimeString("en-US", {
          timeZone: timezone,
          timeStyle: "short",
          })
          }}
        </span>
      </div>
      <div class="DetailedForecast_sunriseStats">
        <span class="font-weight-bold">Sunset</span>
        <span class="text-lighter">
          {{
          new Date(this.daily.sunset * 1000).toLocaleTimeString("en-US", {
          timeZone: timezone,
          timeStyle: "short",
          })
          }}
        </span>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "DetailedForecast",
  props: ["hourly", "daily", "dailyindex", "timezone"],
  created() {
    this.fetchhourlydata();
  },
  watch: {
    daily: {
      immediate: true,
      handler(val, oldVal) {
        if (oldVal != val) {
          this.fetchhourlydata();
        }
      }
    }
  },
  data() {
    return {
      series: [{ name: "Temp", data: [] }],
      chartOptions: {
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        xaxis: {
          type: "datetime",
          labels: {
            format: "hTT"
          }
        },
        yaxis: {
          label: false
        }
      }
    };
  },
  methods: {
    fetchhourlydata() {
      this.series = [
        {
          name: "Temp",
          data: []
        }
      ];
      var date2 = new Date(this.daily.dt * 1000).toLocaleDateString("en-US", {
        timeZone: "UTC"
      });

      for (var i = 0; i < this.hourly.length; i++) {
        var date1 = new Date(
          this.hourly[i].dt * 1000
        ).toLocaleDateString("en-US", { timeZone: "UTC" });

        if (date1 == date2) {
          this.series[0].data.push([
            this.hourly[i].dt * 1000,
            this.hourly[i].temp
          ]);
        }
      }
    }
  }
};
</script>

<style scoped>
.detailedforecasts {
  border-radius: 8px;
  box-shadow: 0 8px 10px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 -8px 12px 0px rgba(0, 0, 0, 0.05),
    0 -2px 3px -2px rgba(0, 0, 0, 0.01);
  padding: 1.5rem 1rem;
}
.dailyforecastimg {
  height: 3em;
  margin-left: 1rem;
}
.DetailedForecast_currentTempContainer {
  display: flex;

  margin-bottom: 1.5rem;
}
.DetailedForecast_currentTemp {
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
}
.Detailedforecast_graphcontainer {
  overflow: scroll;
  margin-bottom: 2rem;
}
.DetailedForecast_secondaryStatsContainer {
  display: flex;
  margin-bottom: 3rem;
}
.DetailedForecast_secondaryStats:first-of-type {
  margin-right: 0.5rem;
}
.DetailedForecast_secondaryStats {
  background: #f3fbff;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.75rem;
}
.DetailedForecast_sunriseStats {
  display: flex;
  flex-direction: column;
}
</style>
