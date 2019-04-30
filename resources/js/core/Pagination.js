/**
 * Created by Murilo on 2/28/2017.
 */
import EventBus from '../event-bus';

class Pagination{

    constructor(data){
        this.pagination = data;

    }
    get(field){
        if(this.pagination[field]){

            return this.pagination[field];
        }

    }
    set(field , value){
        this.pagination[field] = value;
    }

    changePage(page) {
        this.set('current_page' , page);
        EventBus.$emit('updatePage', page);

    }

    prevPage(){
        this.changePage(this.get('current_page') - 1)
    }

    nextPage(){

        this.changePage(this.get('current_page') + 1);
    }

    isActived() {
        return this.get('current_page');
    }

    setPagesNumber(){

        if (!this.get('to')) {
            EventBus.$emit('setPaginationNumbers', '');
            return [];
        }


        var from = this.get('current_page') - this.get('offset');
        if (from < 1) {
            from = 1;
        }
        var to = from + (this.get('offset') * 2);
        if (to >= this.get('last_page')) {
            to = this.get('last_page');
        }
        var pagesArray = [];
        while (from <= to) {
            pagesArray.push(from);
            from++;
        }

        EventBus.$emit('setPaginationNumbers', pagesArray);

    }

    loadData(data){
        for(let field in this.pagination){
            if(field in data){

                /* this.pagination[field] = data[field]; */

                this.set(field , data[field] );

            }

        }



    }


    changePageStatus(action , number){

        let value_page = action == 'add' ? this.get('total') + number : this.get('total') - number;
        this.set('total' , value_page);
        this.changePage(1);
    }


}

export default Pagination;