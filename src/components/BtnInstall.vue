<template>
  <component
    :is="'button'"
    class="bg-blue-500 hover:bg-blue-700 p-2 rounded text-white flex"
    aria-label="Install App"
  >
    <span class="mx-1 font-medium text-md">Install</span>
    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
      <path
        d="M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,7V9H9V11H11V13H13V11H15V9H13V7H11Z"
      />
    </svg>
  </component>
</template>

<script>
export default {};
</script>

<style></style>
