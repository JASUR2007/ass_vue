<script setup>
import Navbar from "../components/web/Navbar.vue";
import Header from "../components/web/Header.vue";
</script>

<template>
  <div>
      <Navbar/>
     <Header/>
    <router-view />
  </div>
</template>
