<template>
  <div id="app">
    <header class="header" :class="themeColor">
     
      <nav class="header__nav">
        <RouterLink class="header__nav__link" to="/"> Home </RouterLink>
        <RouterLink class="header__nav__link" to="/cart"> Cart </RouterLink>
       
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script>
// import { ref } from "vue";
export default {
  name: "App",
  // setup() {
  //   const themeColor = ref("black"); // Initial theme color is black

  //   const toggleThemeColor = () => {
  //     themeColor.value = themeColor.value === "black" ? "green" : "black";
  //   };

  //   return {
  //     themeColor,
  //     toggleThemeColor,
  //   };
  // },
  components: {},
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
