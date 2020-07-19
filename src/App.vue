<template>
  <div id="app">
    <div class="container mx-auto mt-2">
      <div id="header" class="text-center">
        <h1 class="text-lg capitalize">Hitung Promo</h1>
        <h2
          class="text-base"
        >Sebuah kalkulator sederhana untuk membagi diskon secara merata ke setiap item</h2>
      </div>

      <div>
        <BtnAddItem />
      </div>
    </div>
  </div>
</template>

<script>
import BtnAddItem from "@/components/BtnAddItem.vue";
export default {
  name: "App",
  components: {
    BtnAddItem
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
