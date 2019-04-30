/**
 * Created by Murilo on 2/28/2017.
 */
import EventBus from '../event-bus';

class PageFilter{
    constructor(data){
        this.filters = data;

    }

    get(field){
        if(this.filters[field]){

            return this.filters[field];
        }

    }


    set(field , value){
        this.filters[field] = value;
    }

    getKeys(){
        return Object.keys(this.filters);
    }

    setUrlFilerString(pagination_page){

        let all_filtes = this.getKeys();

        // PUT ALL FILTERS INTO ARRAY
        let valueFilertPage = this.pushFilters(all_filtes , this.filters );


        // CREATE ARRAY FILTERS
        let pgFilpers =  this.joinValuePageFilter(valueFilertPage.filters);



        // CREATE THE FILTER URL FROM THIS ARRAY
        let filters             =  '?' +  pgFilpers + 'page='  + pagination_page;
        let all_results         =  '?' + pgFilpers;


        return {
            filters: filters ,
            all_results : all_results
        }
    }

    reverseArray(value) {

        let newValue = [];
        for (let prop in value){
            newValue.unshift(value[prop]);
        }

        return newValue;
    }



    // add category=  and - between values
    joinValuesArrayFilters(value , nameFilter){


        let string = '';
       /* let valueReverse = this.reverseArray(value); */



        for (let prop in value){

            string = string != '' ?  value[prop] + '-' + string : value[prop] ;
        }


        let str =   string != '' && string != '0-0' && string != '0' ? nameFilter + '=' + string : '';


        return str;

    }

    // add & between page values
    joinValuePageFilter(value){


        let string = '';
        for (let prop in value){

            // add if has element
            if(value[prop]){
                string =  string != '' ?  value[prop] + '&' + string : value[prop] ;
            }
        }

        return string != '' ? string + '&' : '';
    }

    /* ---------------------------------------
        PUSH ALL FILTERS SELECTED INTO AN ARRAY
     -----------------------------------------*/
    pushFilters(all_filters , searchOption ){
        let filters            = [];

        all_filters.forEach((value, index) => {
            let filterKey   = value;
            let filterValue = [ searchOption[value] ];

            // PUSH INTO FILTERS
            filters.push(this.joinValuesArrayFilters( filterValue , filterKey));
        });

        console.log(filters);
        return {'filters': filters  };
    }

}

export default PageFilter;