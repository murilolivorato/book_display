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
        modal:new CrudModal({create:false , edit:false , delete:false , view:false , search:false}),
        pagination: new Pagination({total: 0, per_page: 10, from: 1,to: 0, current_page: 1 , last_page: 1, offset: 3}),
        paginationNumbers:[] ,
        selectedItems:[] ,
        submitSelectedItems:[] ,
        deletable:true,
        isLoaded:{'forms': false , 'page': false} ,
        componentIsLoaded:false ,
        toggleAllData:false
    } ,
    mounted: function () {
        // IF SHOW MESSAGE IS TRUE
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
        } ,
        'selectedItems': function (val) {
            this.toggleAllData = this.toggleAll;
        }
    } ,

    computed: {
        toggleAll() {
            return this.selectedItems.length == this.displayItems.length;
        } ,
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
       /* //VIEW
        viewItem(item ,index = this.displayItems.indexOf(item)){
            this.forms.setFillItem(item , index );
            this.modal.set('view', true);
        },*/

        // CREATE
        createItem() {
            this.selectedFormList.reset();
            this.modal.set('create', true);
        } ,

        // STORE
        storeItem() {
            let pageForm =  this.selectedFormList.data();
            return  new StoreItem(  this.pageInfo.storeItem , pageForm , 'createdItem' , 'selectedFormList' );
        } ,

        // EDIT
        editItem(item ,index = this.displayItems.indexOf(item)){
            this.selectedFormList.setFillItem(item , index );
            // SET THE INDEX
            this.selectedFormList.index = index;
            this.componentIsLoaded = true;
            this.modal.set('edit', true);
        } ,

        // UPDATE
        updateItem() {
            let pageForm  =  this.selectedFormList.data();
            return  new StoreItem(  this.pageInfo.updateItem + '/' + pageForm.id , pageForm , 'updatedItem' , 'selectedFormList' );
        } ,


        // EDIT LINK
        editLink(id , namePage = null){
            let pg = "edit";

            if(namePage !== null){
                pg = namePage;
            }

            return this.pageInfo.pageUrl + '/' + id + '/' + pg;

        } ,

        // SEARCH ITEM
        searchItem(){
            //this.selectSearch.reset();
            this.modal.set('search', true);
        } ,

        processSearch(){
            // CLOSE THE SEARCH BOX
            this.modal.set('search', false);

            // START LOADING PAGE
            this.loadingPage = true;

            console.log(this.pageInfo.loadDisplayUrl + this.selectSearch.setUrlFilerString());

            // MAKE A NEW SEARCH
            new LoadForm(this.pageInfo.loadDisplayUrl + this.selectSearch.setUrlFilerString() , 'pageLoaded');

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

           this.modal.set('delete', true);
        } ,


        // DELETE MANY
        deleteManyItems(){

            let deleteItemsInfo = [];

            for (var prop in this.selectedItems) {
                let  selectedIndex = this.selectedItems[prop];


                deleteItemsInfo.unshift({ index: selectedIndex, id:this.displayItems[selectedIndex]['id']});

            }

            this.submitSelectedItems = deleteItemsInfo;
            this.modal.set('delete', true);

        } ,

        // DESTROY
        destroyItem(itemsToDelete){
            return  new StoreItem(  this.pageInfo.destroyItem , {'delete' : itemsToDelete } , 'deletedItem' , 'selectedFormList' );
        } ,
        setNewValuesDisplay(value){

            this.displayItems.unshift(value);

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
            let selectedValue= this.toggleAll;


            if (!selectedValue) {

                this.selectedItems = [];
                for (var prop in this.displayItems) {

                    this.selectedItems.push(prop);
                }

                return;
            }



            this.selectedItems = [];

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


    created(){


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

        EventBus.$on('createdItem' ,  (item) => {

            // hide modal
            this.modal.set('create', false);

            // get all fields dinamic from request
            this.setNewValuesDisplay(item.new_record);

            // IF HAS ERROR , SHOW THE ERROR MESSAGE
            if(item.success == false){
                new FlashMessage('error', item.message);
                return;
            }

            // IF SHOW MESSAGE IS TRUE
            new FlashMessage('success', item.message  );

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


        EventBus.$on('updatedItem' , (data) => {

            const newRecord = data['new_record'];

            for (var prop in newRecord) {

                this.displayItems[newRecord.index][prop]        =     newRecord[prop];
            }
            // hide modal
            this.modal.set('edit', false);

        });


        EventBus.$on('deletedItem' , (data) => {

            // if has error
            if(data.success == false){
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