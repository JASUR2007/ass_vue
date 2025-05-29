<script setup>
import Navbar from "../../components/web/Navbar.vue";
import Carousel from "../../components/web/Carousel.vue";
import Footer from "../../components/web/Footer.vue";
import QualServices from "../../components/web/QualServices.vue";
import BookService from "../../components/web/BookService.vue";
import Workers from "../../components/web/Workers.vue";
import Head from "./head.vue";

</script>

<template>
    <Head title="Main"/>
    <Carousel/>
    <QualServices/>
    <BookService/>
    <Workers/>
    <Footer/>
</template>
