<template>
  <div class="pedidos">
    <div class="title">
      <v-icon name="shopping-bag"></v-icon>
      <h1>Pedidos</h1>
    </div>
    <Table :headers="headers" :items="ordersList"/>
  </div>
</template>

<script src="./Orders.js"></script>

<style lang="sass">
  @import "./Orders.scss"
</style>
