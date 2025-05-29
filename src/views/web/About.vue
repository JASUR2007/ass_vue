<script setup>
import QualServices from "../../components/web/QualServices.vue";
import CarService from "../../components/web/CarService.vue";
import Page from "../../components/web/Page.vue";
import Workers from "../../components/web/Workers.vue";
import Overall from "../../components/web/Overall.vue";
import headerImage from '../../assets/img/carousel-bg-1.jpg'
import FactStart from "../../components/web/FactStart.vue";
import Footer from "../../components/web/Footer.vue";
import Head from "./head.vue";
</script>

<template>
  <Head title="About"/>
  <Overall :image="headerImage" :text="'About'" />
  <QualServices />
  <CarService />
  <FactStart/>
  <Page />
  <Workers />
  <Footer/>
</template>
