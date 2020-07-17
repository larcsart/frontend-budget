<template>
  <div class="total">
    <div class="icon-container"><v-icon :name="icon"></v-icon></div>
    <div class="detail">
      <span>{{ label }}</span>
      <p>{{ valueFormated }}</p>
    </div>
  </div>
</template>

<script src="./Total.js"></script>

<style lang="sass">
  @import "./Total.scss"
</style>
