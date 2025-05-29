<script setup>
import Overall from "../../components/web/Overall.vue";
import BookService from "../../components/web/BookService.vue";
import headerImage from '../../assets/img/carousel-bg-2.jpg'
import Footer from "../../components/web/Footer.vue";
import Page from "../../components/web/Page.vue";
import '@/assets/style.css'
import '@/assets/bootstrap.min.css'
import Head from "./head.vue";
</script>

<template>
  <Head title="service"/>
  <Overall :image="headerImage" :text="'Service'" />
  <Page/>
  <BookService/>
  <Footer/>
</template>

