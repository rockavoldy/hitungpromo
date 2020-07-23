<template>
  <component
    :is="'button'"
    class="bg-blue-500 hover:bg-blue-700 p-2 rounded text-white flex"
    aria-label="Tambah Item"
  >
    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
      <path
        d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
      />
    </svg>
    <span class="ml-1 font-medium text-md">Tambah Item</span>
  </component>
</template>

<script>
export default {};
</script>

<style></style>
