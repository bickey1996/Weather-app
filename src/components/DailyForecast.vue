<template>
  <section class="dailyforecasts">
    <div
      class="dailyforecastContainer"
      v-for="(item, index) in daily"
      v-bind:key="index"
    >
      <input
        class="activeForecastSelector"
        type="radio"
        name="active_day"
        :value="index"
        @click="changeIndex(index)"
      />
      <div class="dailyforecast">
        <p class="font-weight-bold">
          {{ datebuilder(item.dt).substring(0, 3) }}
        </p>
        <p>
          <span class="font-weight-bold">{{ Math.round(item.temp.max) }}°</span>
          <span class="text-lighter">{{ Math.round(item.temp.min) }}°</span>
        </p>

        <div v-if="item.weather[0].main == 'Clouds'">
          <img
            class="dailyforecastimg"
            src="/icons/cloudy.svg"
            v-bind:alt="item.weather[0].main"
          />
        </div>
        <div
          v-else-if="
            item.weather[0].main == 'Rain' ||
              item.weather[0].main == 'Thunderstorm' ||
              item.weather[0].main == 'Drizzle'
          "
        >
          <img
            class="dailyforecastimg"
            src="/icons/rainy.svg"
            v-bind:alt="item.weather[0].main"
          />
        </div>
        <div v-else-if="item.weather[0].main == 'Snow'">
          <img
            class="dailyforecastimg"
            src="/icons/snowing.svg"
            v-bind:alt="item.weather[0].main"
          />
        </div>
        <div v-else>
          <img
            class="dailyforecastimg"
            src="/icons/sun.svg"
            v-bind:alt="item.weather[0].main"
          />
        </div>
        <p class="text-lighter">{{ item.weather[0].main }}</p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "DailyForecast",
  props: ["daily"],
  methods: {
    datebuilder(string) {
      const unixTimestamp = string;

      const milliseconds = unixTimestamp * 1000;

      const d = new Date(milliseconds);
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    },
    changeIndex(index) {
      this.$emit("changeIndex", index);
    },
  },
};
</script>

<style scoped>
.dailyforecasts {
  display: flex;
  font-size: 0.95rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  white-space: nowrap;
  width: 100%;
}
.dailyforecast {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
}
.dailyforecastimg {
  margin: 0.5rem;
  width: 27px;
}
.text-lighter {
  color: #919393;
}
.dailyforecastContainer {
  position: relative;
  margin: 0.25rem;
}
.activeForecastSelector {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  margin-left: -45px;
}
.activeForecastSelector:checked ~ .dailyforecast {
  background: #fffdf7;
  box-shadow: 0 0 1px 3px #00a6fa;
  transition: box-shadow 0.3s ease-in;
}
</style>
