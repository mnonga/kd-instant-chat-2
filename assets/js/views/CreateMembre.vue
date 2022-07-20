<template>
  <div>
    <div class="h-16 px-10 fixed top-0 shadow bg-white flex items-center w-full">
      <router-link :to="{name:'Home'}"><img src="/images/logo.png" alt="" class="w-12 h-12 mr-3"></router-link>
      <div class="font-bold text-lg">Ecide</div>
    </div>

    <div class="mt-16 w-full md:w-10/12 mx-auto">
      <form @submit.prevent="postForm" action=""
            class="rounded-lg p-5 bg-white shadow-lg w-full md:w-6/12 mx-auto space-y-5">
        <legend class="text-center font-bold text-lg text-primary">Enregistrer un membre</legend>
        <div
            class="border focus-within:ring ring-primary rounded px-5 py-2 group text-gray-600 focus-within:text-primary transition-all ease-in-out duration-500">
          <label for="firstName" class="group-focus:text-primary text-sm font-semibold">Prénom</label>
          <input type="text" id="firstName" class="w-full focus:outline-none text-black placeholder-gray-500"
                 placeholder="Prénom" v-model="firstName">
        </div>
        <div
            class="border focus-within:ring ring-primary rounded px-5 py-2 group text-gray-600 focus-within:text-primary transition-all ease-in-out duration-500">
          <label for="name" class="group-focus:text-primary text-sm font-semibold">Nom</label>
          <input type="text" id="name" class="w-full focus:outline-none text-black placeholder-gray-500"
                 placeholder="Nom" v-model="name">
        </div>

        <div
            class="border focus-within:ring ring-primary rounded px-5 py-2 group text-gray-600 focus-within:text-primary transition-all ease-in-out duration-500">
          <label for="lastName" class="group-focus:text-primary text-sm font-semibold">Postnom</label>
          <input type="text" id="lastName" class="w-full focus:outline-none text-black placeholder-gray-500"
                 placeholder="Postnom" v-model="lastName">
        </div>

        <div
            class="border focus-within:ring ring-primary rounded px-5 py-2 group text-gray-600 focus-within:text-primary transition-all ease-in-out duration-500">
          <label for="phoneNumber" class="group-focus:text-primary text-sm font-semibold">Téléphone</label>
          <input type="tel" id="phoneNumber" class="w-full focus:outline-none text-black placeholder-gray-500"
                 placeholder="Téléphone" v-model="phoneNumber">
        </div>

        <div
            class="border focus-within:ring ring-primary rounded px-5 py-2 group text-gray-600 focus-within:text-primary transition-all ease-in-out duration-500">
          <label for="email" class="group-focus:text-primary text-sm font-semibold">Email</label>
          <input type="email" id="email" class="w-full focus:outline-none text-black placeholder-gray-500"
                 placeholder="Email" v-model="email">
        </div>

        <div
            class="border focus-within:ring ring-primary rounded px-5 py-2 group text-gray-600 focus-within:text-primary transition-all ease-in-out duration-500">
          <label for="sexe" class="group-focus:text-primary text-sm font-semibold">Sexe</label>
          <select type="email" id="sexe" class="w-full focus:outline-none text-black placeholder-gray-500"
                  v-model="sexe">
            <option value="" disabled>Sexe</option>
            <option value="F">Femme</option>
            <option value="H">Homme</option>
          </select>
        </div>

        <div
            class="border focus-within:ring ring-primary rounded px-5 py-2 group text-gray-600 focus-within:text-primary transition-all ease-in-out duration-500">
          <label for="birthDate" class="group-focus:text-primary text-sm font-semibold">Date de naissance</label>
          <input type="date" id="birthDate" class="w-full focus:outline-none text-black placeholder-gray-500"
                 placeholder="Date de naissance" v-model="birthDate">
        </div>

        <div
            class="border focus-within:ring ring-primary rounded px-5 py-2 group text-gray-600 focus-within:text-primary transition-all ease-in-out duration-500">
          <label for="subscriptionDate" class="group-focus:text-primary text-sm font-semibold">Date d'adhesion</label>
          <input type="date" id="subscriptionDate" class="w-full focus:outline-none text-black placeholder-gray-500"
                 placeholder="Date d'adhesion" v-model="subscriptionDate">
        </div>

        <div
            class="border focus-within:ring ring-primary rounded px-5 py-2 group text-gray-600 focus-within:text-primary transition-all ease-in-out duration-500">
          <label for="cellule" class="group-focus:text-primary text-sm font-semibold">Cellule <i
              class="fa fa-spin fa-spinner" v-if="loading"></i></label>
          <select type="email" id="cellule" class="w-full focus:outline-none text-black placeholder-gray-500"
                  v-model="cellule">
            <option value="" disabled>Cellule</option>
            <option :value="c.id" v-for="c in cellules" :key="c.id">{{ c.name }}</option>
          </select>
        </div>

        <button type="submit" :disabled="saving"
                class="block w-full cursor-pointer font-bold px-10 py-2 rounded-lg text-white bg-primary">
          <span v-if="!saving">Enregistrer</span>
          <i class="fa fa-spinner fa-spin" v-else></i>
        </button>

      </form>
    </div>
  </div>
</template>

<script>
import {getCellules, postMembres} from "../utils";

export default {
  name: "CreateMembre",
  data() {
    return {
      firstName: null,
      name: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      birthDate: null,
      subscriptionDate: null,
      sexe: "",
      cellule: null,
      grade: null,
      cellules: [],
      saving: false,
      loading: false
    }
  },
  mounted() {
    this.loadCellules()
  },
  methods: {
    resetForm(){
      this.firstName = this.name = this.lastName = this.phoneNumber = this.email = this.birthDate = this.subscriptionDate = this.sexe = this.cellule = this.grade ;
    },
    loadCellules() {
      console.log('loading cellules')
      let _this = this
      this.loading = true
      getCellules().then(function (data) {
        _this.cellules = data
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
        _this.toastSuccess("Enregistrement reussi !");
        _this.resetForm();
      }).catch(function (response) {
        _this.toastDanger("Enregistrement échoué !");
      }).finally(function () {
        _this.saving = false
      })
    }
  }
}
</script>

<style scoped>

</style>