/**
 * Created by Murilo on 2/5/2018.
 */
/**
 * Created by Murilo on 2/28/2017.
 */
class CrudForm {
    constructor(data) {

        this.originalData = data;

        for(let field in data){
            this[field] = data[field];
        }

    }

    reset(){
        for(let field in this.originalData){
            this[field] = '';
        }
    }

    /*  Set a value to the temp , verify if has this item and update  */
    setFillItem(item , index){
        for(let field in this.originalData){

            if(field in item){
                this[field] = item[field];
            }else{
                // if is index
                if(field == 'index'){ this[field] = index; }

            }


        }

    }
    data(){

        let data = Object.assign({} , this);

        delete data.originalData;
        delete data.errors;


        return data;
    }


}

export default CrudForm;