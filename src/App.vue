<template>
  <div id="app">
    <header class="header">
      <nav class="header__nav">
        <router-link class="header__nav__link" to="/">Home</router-link>
        <router-link class="header__nav__link" to="/cart">Cart</router-link>
      </nav>
      <button @click="switchTheme('default')">Default Theme</button>
      <button @click="switchTheme('dark')">Dark Theme</button>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    switchTheme(theme) {
      document.body.classList.remove("theme-default", "theme-dark");
      if (theme === "default") {
        document.body.classList.add("theme-default");
      } else if (theme === "dark") {
        document.body.classList.add("theme-dark");
      }
    },
  },
};
</script>

<style>
/* Header Styles */
.header {
  background-color: black;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

/* Navigation Styles */
.header__nav {
  display: flex;
  gap: 1rem;
}

.header__nav__link {
  color: white;
  text-decoration: none;
}

.header__nav__link:hover {
  text-decoration: underline;
}

/* Add margin to the content to prevent it from overlapping with the fixed header */
#app {
  margin-top: 5rem;
}

/* Apply theme styles */
.theme-default {
  background-color: #ffffff;
  color: #333333;
}

.theme-dark {
  background-color: #4caf50;;
  color: #ffffff;
}
</style>