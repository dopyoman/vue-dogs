<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="home-header headline text-uppercase">
        <router-link tag="div" to="/">
          <span>Awww</span>
          <span class="font-weight-light">Dogs!</span>
        </router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-layout justify-center class="container">
        <v-flex xs12
                sm8
                md4>
          <router-view/>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
  .container {
    margin-top: 2em;
  }
  .home-header {
    cursor: pointer;
  }
</style>
