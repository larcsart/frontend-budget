<template>
  <div class="table">
    <table>
      <thead>
        <th v-for="(header, headerIndex) in headers" :key="headerIndex">
          <div class="th">{{ header }}</div>
        </th>
      </thead>
      <tbody>
        <tr v-for="(item, itemIndex) in items" :key="itemIndex">
          <td v-for="(value, valueIndex) in item" :key="valueIndex">
            <div v-if="value.to !== undefined" class="td">
              <router-link
                :to="value.to"
                class="router-link"
              >
                {{ value.value }}
              </router-link>
            </div>
            <div v-else class="td" v-html="value"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script src="./Table.js"></script>

<style lang="sass">
  @import "./Table.scss"
</style>
