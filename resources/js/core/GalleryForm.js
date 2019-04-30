/**
 * Created by Murilo on 3/1/2017.
 */
class GalleryForm {
    constructor(data) {

        this.originalData = data;
        this.processingForm = false;

        for(let field in data){

            this[field] = data[field];

        }



    }

    reset(){
        for(let field in this.originalData){
            this[field] = '';
        }
    }

    set(data , value){
        this[data] = value;
    }

    get(value){

        return this[value];

    }


    /*  Set a value to the temp , verify if has this item and update  */
    setFillItem(item , index){
        for(let field in this.originalData) {

            if (field in item) {

                // if is index
                if (field == 'index') {
                    this[field] = index;
                }
                else {
                    this[field] = item[field];
                }

            }
            else{
                // if is index
                if (field == 'index') {
                    this[field] = index;
                }

            }
        }

    }
    data(){

        let data = Object.assign({} , this);

        delete data.originalData;
        delete data.errors;
        delete data.processingForm;


        return data;
    }


}
export default GalleryForm;