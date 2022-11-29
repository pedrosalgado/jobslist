<template>
  <JobsList />
</template>

<script>
import JobsList from "./positions/JobsList.vue";

export default {
  name: "App",
  components: {
    JobsList,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #eef9f9;
  min-height: 100vh;
}
body {
  margin: 0;
}
</style>
