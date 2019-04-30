/**
 * Created by Murilo on 2/28/2017.
 */


import CrudModal from '../core/CrudModal';

import Errors from '../core/Errors';
import FlashMessage from '../core/FlashMessage';

import EventBus from '../event-bus';

import LoadPage from '../core/LoadPage';
import LoadForm from '../core/form/LoadForm';

import Pagination from '../core/Pagination';
import StoreItem from "../core/StoreItem";

const CrudDisplay = {

    data: {
        message: 'working ...' ,
        modal:new CrudModal({create:false , edit:false , delete:false , view:false , filter:false}),
        pagination: new Pagination({total: 0, per_page: 10, from: 1,to: 0, current_page: 1 , last_page: 1, offset: 3}),
        paginationNumbers:[] ,
        formErrors:{},
        selectedItems:[] ,
        submitSelectedItems:[] ,
        deletable:true,
        errors: new Errors() ,
        isLoaded:{'forms': false , 'page': false} ,


    } ,
    mounted: function () {

        new LoadForm(this.pageInfo.loadDisplayFormOptionUrl , 'formOptionDisplayLoaded' );

        // LOAD FORMS BUS
        EventBus.$on('formOptionDisplayLoaded', (data) => {

            // CHECK IF HAS THIS KEY, IF HAS ADD THE VALUE
            this.formOptions.setOptionValueAndKey(data);
            this.isLoaded.forms = true;

        });


    } ,
    watch: {
        'isLoaded.forms': function (val) {
            if(val == true){
                this.startLoadingPages();
            }
        }
    } ,


    methods: {
        startLoadingPages(){
            new LoadForm(this.pageInfo.loadDisplayUrl , 'pageLoaded');

        } ,
        // SEARCH FILTER
        showSearchFilter(){
            this.filterList.reset();
            this.modal.set('filter', true);

        } ,
        searchDisplay(){
            let urlToSearch = this.searchUrl();


            new LoadForm(this.pageInfo.loadDisplayUrl + urlToSearch , 'pageLoaded' );
            this.modal.set('filter', false);


        } ,
        //VIEW
        viewItem(item ,index = this.displayItems.indexOf(item)){
            this.forms.setFillItem(item , index );
            this.modal.set('view', true);
        },

        // STORE
        storeItem() {
            let data =  this.forms.data();
            return  new StoreItem(  this.pageInfo.pageUrl + '/store-item' , data , 'createItem' );
        } ,
        // CREATE
        createItem() {
            this.selectedFormList.reset();
            this.modal.set('create', true);
        } ,

        // EDIT
        editItem(item ,index = this.displayItems.indexOf(item)){
            this.forms.setFillItem(item , index );
            this.modal.set('edit', true);
        } ,

        // UPDATE
        updateItem() {
            let data  =  this.forms.data();
            return  new StoreItem(  this.pageInfo.pageUrl + '/update-item' , data , 'updateItem' );
        } ,


        // EDIT LINK
        editLink(id , namePage = null){
            let pg = "edit";

            if(namePage !== null){
                pg = namePage;
            }

            return this.pageInfo.pageUrl + '/' + id + '/' + pg;

        } ,

        // VIEW LINK
        viewLink(id , namePage = null){
            let pg = "view";
            if(namePage !== null){
                pg = namePage;
            }

            return this.pageInfo.pageUrl + '/' +  pg  +'/' + id;
        } ,


        // DELETE
        deleteItem(item , index = this.displayItems.indexOf(item)){
           this.submitSelectedItems = [{index: index, id:item.id}];
            // VERIFY IF CAN DELETE
           this.setDeletable(item);

           this.modal.set('delete', true);
        } ,

        setDeletable(data){
            if ('verify_before_delete' in this.pageInfo){
                // CAN NOT DELETE
                if(data[this.pageInfo.verify_before_delete] > 0 ){
                    this.deletable = false;
                    return;
                }
            }

            // CAN  DELETE
            this.deletable = true;




        } ,

        // DELETE MANY
        deleteManyItems(){

            let deleteItemsInfo = [];
            for (var prop in this.selectedItems) {
                let  selectedIndex = this.selectedItems[prop];


                deleteItemsInfo.unshift({ index: selectedIndex, id:this.displayItems[selectedIndex]['id']});

                // VERIFY IF CAN DELETE
                this.setDeletable(this.displayItems[selectedIndex]);
            }

            this.submitSelectedItems = deleteItemsInfo;
            this.modal.set('delete', true);

        } ,

        // DESTROY
        destroyItem(item){
           // return  new DestroyItem( this.pageInfo.pageUrl + '/delete' , item );

        } ,
        setNewValuesDisplay(value){

            for (let prop in value)
            {


                this.displayItems.unshift(value[prop]);
            }


        } ,
        separetaItemsValue(value , nameField){

            let allItemsValue = '';
            for (let prop in value)
            {

                allItemsValue = allItemsValue != '' ? value[prop][nameField] + ' , ' + allItemsValue : value[prop][nameField];
            }

            return allItemsValue;

        } ,
        setNewItemDisplay(fillItem){


            for (var prop in fillItem) {

                this.displayItems[fillItem.index][prop]        =     fillItem[prop];

            }

        } ,

        selectAll(){
            var selectall = this.toggleAll;

            if (!selectall) {

                this.selectedItems = [];
                for (var prop in this.displayItems) {

                    this.selectedItems.push(prop);
                }
            }else{

                this.selectedItems = [];
            }



        } ,

        countAggregate(value){

            if(typeof value != "undefined" && value != null && value.length > 0){
                return value[0]['aggregate'];
            }

            return 0;

        } ,
        makeThumbExtension(image){
            let thumbImage = (image).split('.');
            return  thumbImage[0] + '_thumb.' + thumbImage[1];

        } ,
        toggleAll() {
            return this.selectedItems.length == this.displayItems.length
        } ,
        searchUrl(){
            let list        = this.filterList.data();
            let urlToSearch = "";
            let count = 0;

            for(let prop in  list){

                // if is not empty add in URL like this - ?email=myemail@hotmail.com&name=myname
                if(list[prop] != ""){

                    urlToSearch = count == 0 ?  '?' + prop + '=' + list[prop]
                                             :  urlToSearch + '&' + prop + '=' + list[prop];

                    count ++;
                }



            }

          return urlToSearch;

        }


    } ,
    computed: {

    } ,

    created(){
/*
        EventBus.$on('formDataLoaded' , (item) => {


            this.formOptions.setFillItem(item);
        });*/


        EventBus.$on('setPaginationNumbers' , (val) => {

            this.paginationNumbers = val;

        });

        EventBus.$on('pageLoaded',  (item) => {

            // DISPLAY ITEMS
            this.displayItems = item.data;

            // PAGINATION NUMBERS
            this.pagination.loadData(item.pagination);

            // SET PAGINATION
            this.pagination.setPagesNumber();

            // STOP LOADING
            this.isLoaded.page = false;

            // STOP LOADING PAGE
            this.loadingPage = false;


        });

        EventBus.$on('createItem' ,  (item) => {


            // hide modal
            this.modal.set('create', false);

            // get all fields dinamic from request
            this.setNewValuesDisplay(item);

            /* this.pagination.changePageStatus('add' , 1); */

            new FlashMessage('success' , 'Alteração Realizada com Sucesso');

        });


        EventBus.$on('statusModal' , (item) => {
            this[item.modal] = item.status;
        });




        EventBus.$on('updatePage' , (page) => {

            // STOP LOADING PAGE
            this.loadingPage = true;
            window.scrollTo(0, 0);

            // filters
            setTimeout(() => {
                // LOAD NEW PAGE
                let urlFilters             = this.pageInfo.loadDisplayUrl + '?page=' + page;
                new LoadPage(urlFilters);

            }, 1000);



        });


        EventBus.$on('updateItem' , (data) => {

            // set new value item
            /* this.setNewItemDisplay(data); */

            for (var prop in data) {
                this.displayItems[data.index][prop]        =     data[prop];
            }
            // hide modal
            this.modal.set('edit', false);

        });


        EventBus.$on('deleteItem' , (data) => {

            // if has error
            if(data.sucess == false){
                // hide modal
                this.modal.set('delete', false);
                new FlashMessage('error', 'Erro');
                return;
            }


            let count = 0;
            for (var prop in data.index)
            {
                this.displayItems.splice(data.index[prop], 1);
                count ++;
            }
            // set pagination
            this.pagination.changePageStatus('remove' , count);

            this.selectedItems = [];
            this.submitSelectedItems = [];
            // hide modal
            this.modal.set('delete', false);

        });



    }

};

export default CrudDisplay;