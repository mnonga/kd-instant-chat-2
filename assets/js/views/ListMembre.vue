<template>
  <div>
    <div class="h-16 px-10 fixed top-0 shadow bg-white flex items-center w-full">
      <router-link :to="{name:'Home'}"><img src="/images/logo.png" alt="" class="w-12 h-12 mr-3"></router-link>
      <div class="font-bold text-lg">Ecide</div>
    </div>

    <div class="mt-16 w-full md:w-10/12 mx-auto">
      <div
            class="rounded-lg p-5 bg-white shadow-lg w-full mx-auto space-y-5">
        <h3 class="text-lg font-bold text-primary">Liste des membres
          <router-link :to="{name:'membres.new'}" class="float-right border border-primary text-sm align-middle rounded px-2 py-1"><i class="fa fa-plus"></i> Nouveau membre</router-link>
          <router-link :to="{name:'membres.stats'}" class="float-right border border-primary text-sm align-middle rounded px-2 py-1"><i class="fa fa-chart-bar"></i> Stats</router-link></h3>
        <form action="" @submit.prevent="loadMembres(searchText)" class="relative focus-within:ring ring-primary rounded-lg border pr-5">
          <input type="search" v-model.trim="searchText" class="w-full focus:outline-none px-5 py-2 appearance-none" placeholder="Nom du membre/cellule">
          <button type="submit" class="absolute right-3 top-0 py-2 cursor-pointer"><i class="fa fa-search text-gray-600"></i></button>
        </form>

        <table class="w-full">
          <thead>
          <tr class="bg-primary text-white font-semibold">
            <td class="px-5 py-2">#</td>
            <td class="px-5 py-2">Nom</td>
            <td class="px-5 py-2">Téléphone</td>
            <td class="px-5 py-2">Email</td>
            <td class="px-5 py-2">Province/District</td>
            <td class="px-5 py-2">Commune/Cellule</td>
            <td class="px-5 py-2">Date d'adhésion</td>
          </tr>
          </thead>
          <tbody>
          <tr class="even:bg-gray-100 hover:bg-gray-200 border-b border-gray-200" v-for="item in items" :key="item.id">
            <td class="px-5 py-2">{{item.id}}</td>
            <td class="px-5 py-2">{{item.firstName}} {{item.name}} {{item.lastName}}</td>
            <td class="px-5 py-2">{{item.phoneNumber}}</td>
            <td class="px-5 py-2">{{item.email}}</td>
            <td class="px-5 py-2">{{item.cellule.commune.district.province.name}}/{{item.cellule.commune.district.name}}</td>
            <td class="px-5 py-2">{{item.cellule.commune.name}}/{{item.cellule.name}}</td>
            <td class="px-5 py-2">{{getDate(item.subscriptionDate)}}</td>
          </tr>
          <tr v-if="loading" class="">
            <td colspan="7" class="text-center py-10"><i class="fa fa-spinner fa-spin text-black text-2xl"></i></td>
          </tr>
          <tr v-if="!loading && !items.length" class="">
            <td colspan="7" class="text-center py-10">Aucun membre à afficher !</td>
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
import {getCellules, getMembres, postMembres} from "../utils";

export default {
  name: "ListMembre",
  data() {
    return {
      searchText: null,
      cellules: [],
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
    loadMembres(searchText) {
      console.log('loading cellules')
      let _this = this
      this.loading = true
      this.items = []
      getMembres(searchText).then(function (data) {
        _this.items = data
        console.log('loading cellules then')
      }).catch(function (response) {
        console.log('loading cellules catch', response)
      }).finally(function () {
        _this.loading = false
      })
    },
  }
}
</script>

<style scoped>

</style>