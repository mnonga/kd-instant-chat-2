/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import Vue from 'vue'

import "@fortawesome/fontawesome-free";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";

import toastr from "toastr";
import "toastr/build/toastr.min.css"

let $ = window.$ = global.$ = window.jQuery = global.jQuery = require("jquery")

Vue.mixin({
    methods: {
        alert(text) {
            alert(text)
        },
        toastInfo(text) {
            return toastr.info(text)
        },
        toastSuccess(text) {
            return toastr.success(text)
        },
        toastDanger(text, title, options) {
            return toastr.error(text, title, options)
        },
    }
});

import router from "./js/router";

const app = new Vue({
    el: '#vue_app',
    router,
    // store,
    // delimiters: ["${", "}"],
    components: {
    }
});


$(function () {
    $(document).ajaxError(async function (event, jqxhr, settings, exception) {
        if (jqxhr.status === 0) app.toastDanger(`Echec de connexion, assurez-vous que vous êtes connectés à internet`)
    })

    $(document).ajaxComplete(function (event, xhr, settings) {
        let url = new URL(settings.url).pathname
        let responseData = null
        try {
            responseData = JSON.parse(xhr.responseText)
        } catch (e) {
        }
        let data = null
        if(settings.data instanceof FormData){
            data = {}
            for(const key of settings.data.keys()){
                // let value = settings.data.get(key)
                data[key] = settings.data.get(key)
            }
        }
        console.warn('[ajax]', url, '\n', settings.type, settings.url, '\nData : ', data || settings.data, '\nHeaders : ', JSON.stringify(settings.headers),
            '\nResponse : ', xhr.status, xhr.statusText, '\n', responseData/*xhr.responseJSON*/)
    })
})