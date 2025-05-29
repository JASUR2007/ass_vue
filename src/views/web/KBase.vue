<script setup>
import Overall from "../../components/web/Overall.vue";
import headerImage from '../../assets/img/carousel-bg-1.jpg'
import Footer from "../../components/web/Footer.vue";
import Head from "./head.vue";
import Card from "../../components/web/Card.vue";
</script>

<template>
  <Head title="Kbase"/>
  <Overall :image="headerImage" :text="'Kbase'" />
  <Card/>
  <Footer/>
</template>
