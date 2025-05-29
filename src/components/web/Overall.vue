<template>
  <div class="container-fluid page-header mb-5 p-0" :style="{ backgroundImage: `url('${image}')` }">
    <div class="container-fluid page-header-inner py-5">
      <div class="container text-center">
        <h1 class="display-3 text-white mb-3 animated slideInDown">{{ text }}</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb justify-content-center text-uppercase">
            <li class="breadcrumb-item"><RouterLink  to="/">Home</RouterLink></li>
            <li class="breadcrumb-item"><RouterLink :to="'/' + text">{{ text }}</RouterLink></li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overall',
  props: {
    image: {
      type: String,
      required: false,
      default: ''
    },
    text: {
      type: Object,
      required: false,
      default: () => ({ Home: '#' })
    }
  }
}
</script>

