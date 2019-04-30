/**
 * Created by Murilo on 3/3/2017.
 */
class FormSet {
    constructor(data) {

        this.originalData     = data;
        this.index            = '';
        this.processingForm   = true;

        for(let field in data){
            this[field] =  data[field];
        }

    }



    reset(){
        for(let field in this.originalData){
            this[field] = '';
        }
    }


    get(field){
        return this[field];
    }
    setAll(item , index = null){

        for(let field in this.originalData){

            if(field in item){
              
                this[field] = item[field];
            }

            if(field == 'index' && index != null){
                     this[field] = index;

            }

        }
    }

    setIndex(index){

        for(let field in this.originalData){
            this[field] = field == 'index' ?  index : '';

        }
    }
    set(field , value){

        this[field] = value;
    }

    data(){

        let data = Object.assign({} , this);

        delete data.originalData;
        delete data.processingForm;


        return data;
    }


}
export default FormSet;