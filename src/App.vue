<template>
  <div id="app">
    <Weather msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Weather from "./components/Weather.vue";

export default {
  name: "App",
  components: {
    Weather,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  line-height: 1.15;
  margin: auto;
}
body {
  font-family: Roboto, sans-serif;
  color: var(--grey900);
  padding: 1rem;
  max-width: 800px;
  text-align: center !important;
  margin: auto !important;
}
.text-lighter {
  color: #919393;
}
</style>
