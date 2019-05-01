/**
 * Created by Murilo on 2/28/2017.
 */
import EventBus from '../../event-bus';

class PageFilter{
    constructor(data){

        this.originalData = data;

        for(let field in data){

            this[field] = data[field];
        }

    }

    reset(){
        for(let field in this.originalData){

            this[field] = this.originalData[field];
        }
    }


    get(field){
        return this[value];

    }

    set(field , value){
        this[data] = value;
    }



    setUrlFilerString(){

        // GET ALL KEYS
        let all_filtes = Object.keys(this.data());

        // PUT ALL FILTERS INTO ARRAY
        let valueFilertPage = this.pushFilters(all_filtes , this.data() );

        // CREATE ARRAY FILTERS
        let pgFilpers =  this.joinValuePageFilter(valueFilertPage.filters);

        return '?' + pgFilpers;

       /* let paginateProp = pagination_page ? 'page='  + pagination_page : '';


        // CREATE THE FILTER URL FROM THIS ARRAY
        let filters             =  '?' +  pgFilpers + paginateProp;
        let all_results         =  '?' + pgFilpers;
        

        return {
            filters: filters ,
            all_results : all_results
        }*/
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

        // IS ARRAY
        if(Array.isArray(value)){
            let string = '';

            let valueReverse = this.reverseArray(value);

            for (let prop in valueReverse){

                string = string != '' ?  valueReverse[prop] + '-' + string : valueReverse[prop] ;
            }


            return  string != '' && string != '0-0' && string != '0' ? nameFilter + '=' + string : '';
        }


        // IS STRING // NUMBER
        return value ? nameFilter + '=' + value : '';

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
            let filterValue = searchOption[value];

            // PUSH INTO FILTERS
            filters.push(this.joinValuesArrayFilters( filterValue , filterKey));
        });



        return {'filters': filters  };
    }

    data(){
        let data = Object.assign({} , this);
        delete data.originalData;

        return data;
    }

}

export default PageFilter;