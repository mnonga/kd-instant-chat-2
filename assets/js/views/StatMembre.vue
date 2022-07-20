<template>
  <div>
    <div class="h-16 px-10 fixed top-0 shadow bg-white flex items-center w-full">
      <router-link :to="{name:'Home'}"><img src="/images/logo.png" alt="" class="w-12 h-12 mr-3"></router-link>
      <div class="font-bold text-lg">Ecide</div>
    </div>

    <div class="mt-16 w-full md:w-10/12 mx-auto">
      <div
            class="rounded-lg p-5 bg-white shadow-lg w-full mx-auto space-y-5">
        <h3 class="text-lg font-bold text-primary">Statistiques des membres par cellules</h3>
        <table class="w-full">
          <thead>
          <tr class="bg-primary text-white font-semibold">
            <td class="px-5 py-2">#</td>
            <td class="px-5 py-2">Cellule</td>
            <td class="px-5 py-2">Effectif</td>
          </tr>
          </thead>
          <tbody>
          <tr class="even:bg-gray-100 hover:bg-gray-200 border-b border-gray-200" v-for="item in items" :key="item.id">
            <td class="px-5 py-2">{{item.id}}</td>
            <td class="px-5 py-2">{{item.name}}</td>
            <td class="px-5 py-2">{{item.count}}</td>
          </tr>
          <tr v-if="loading" class="">
            <td colspan="7" class="text-center py-10"><i class="fa fa-spinner fa-spin text-black text-2xl"></i></td>
          </tr>
          <tr v-if="!loading && !items.length" class="">
            <td colspan="7" class="text-center py-10">Aucune statistique à afficher !</td>
          </tr>
          </tbody>
        </table>

        <div class="text-center">
          <a href="" class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black" @click.prevent="loadMembres"> <i class="fa fa-redo"></i></a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {getCellules, getMembres, getStats, postMembres} from "../utils";

export default {
  name: "StatMembre",
  data() {
    return {
      firstName: null,
      name: null,
      lastName: null,
      phoneNumber: "string",
      email: "string",
      birthDate: "2022-02-26T12:27:43.927Z",
      subscriptionDate: "2022-02-26T12:27:43.927Z",
      sexe: "",
      cellule: "string",
      grade: "string",
      cellules: [],
      saving: false,
      loading: false,
      items: []
    }
  },
  mounted() {
    this.loadMembres()
  },
  methods: {
    getDate(date){
      let d = new Date(date)
      return `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`
    },
    loadMembres() {
      console.log('loading cellules')
      let _this = this
      this.loading = true
      this.items = []
      getStats().then(function (data) {
        _this.items = data
        console.log('loading cellules then')
      }).catch(function (response) {
        console.log('loading cellules catch', response)
      }).finally(function () {
        _this.loading = false
      })
    },
    postForm() {
      let _this = this
      this.saving = true
      postMembres({
        firstName: this.firstName,
        lastName: this.lastName,
        name: this.name,
        phoneNumber: this.phoneNumber,
        email: this.email,
        sexe: this.sexe,
        cellule: `/api/cellules/${this.cellule}`,
        birthDate: new Date(this.birthDate).toISOString(),
        subscriptionDate: new Date(this.subscriptionDate).toISOString()
      }).then(function (data) {

      }).catch(function (response) {

      }).finally(function () {
        _this.saving = false
      })
    }
  }
}
</script>

<style scoped>

</style>