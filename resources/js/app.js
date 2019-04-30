
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import "babel-polyfill";



import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);

/* EVENT BUS  */
import EventBus from './event-bus';

/* CORE */
import FormOptions from './core/form/FormOptions';
import PageFilter from "./core/display/PageFilter";
import FormDisplay from "./core/FormDisplay";

/* MIXINS */
import CrudDisplay from './mixins/CrudDisplay';
import BookListPage from './mixins/BookListPage';
import AllPagesMethods from './mixins/AllPagesMethods';
import FormError from './mixins/FormError';

/* COMPONENTS */
import SelectBox from './components/SelectBox';
import SelectBoxMany from './components/SelectBoxMany';
import Modal from './components/Modal';
import SubmitBtn from './components/SubmitBtn';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */




// -----------------------------------------------------------------------------------------------  BOOKES PAGE
if (document.querySelector('#books-pg')) {

    Vue.component('submit-btn', SubmitBtn);
    Vue.component('modal', Modal);
    Vue.component('select-box', SelectBox);
    Vue.component('select-box-many', SelectBoxMany);



    const app = new Vue({
        el: '#books-pg' ,
        data: {
            pageInfo: {pageUrl: '/books' , loadDisplayUrl :'/books/load-display'  , loadDisplayFormOptionUrl:'/books/display-form-options' } ,
            formOptions: new FormOptions({category:'' }) ,
            displayItems: [{  id:'' , category_id:'' , isbn:'', author:'', price:'', title:'' }] ,
            selectSearch:   new PageFilter({category:'' , isbn :'' , author:'' })  ,
            selectedFormList:new FormDisplay({id:'' , category_id:[] , isbn:'', author:'', price:'', title:''})

        },
        methods: {

        } ,
        mixins: [ CrudDisplay , BookListPage , AllPagesMethods , FormError ]

    });
}

