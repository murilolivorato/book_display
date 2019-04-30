/**
 * Created by Murilo on 2/28/2017.
 */
import EventBus from '../../event-bus';

class PageNewFilter{
    constructor(data){
        this.filters = data;
        this.allFilterTranslatedNames = { city_location:'cidade' ,
            neighborhood_location:'bairros' ,
            distance:'distancia' ,
            type: 'tipo' ,
            period: 'periodo' ,
            price: 'valor' ,
            room: 'quartos' ,
            bath: 'banheiros' ,
            park: 'vagas-de-garagem' ,
            suite: 'suites'};
    }

    get(field){
        if(this.filters[field]){

            return this.filters[field];
        }

    }
    getFilterTranslated(field){
        if(this.allFilterTranslatedNames[field]){

            return this.allFilterTranslatedNames[field];
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



    resetBox(){


        this.filters['park']  =  [];
        this.filters['suite'] =  [];
        this.filters['bath']  =  [];


    }
    // add category=  and - between values
    joinValuesArrayFilters(value , nameFilter){



        let string = '';

        let valueReverse = this.reverseArray(value);

        for (let prop in valueReverse){

            string = string != '' ?  valueReverse[prop] + '-' + string : valueReverse[prop] ;
        }


        return  string != '' && string != '0-0' && string != '0' ? nameFilter + '=' + string : '';

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

}

export default PageNewFilter;