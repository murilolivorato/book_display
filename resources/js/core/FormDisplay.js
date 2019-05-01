/**
 * Created by Murilo on 3/1/2017.
 */
class FormDisplay {
    constructor(data) {

        this.originalData = data;

        for(let field in data){

            this[field] = data[field];
        }

        this["index"] = "";

        this.processingForm = false;

    }

    reset(){
        for(let field in this.originalData){

            this[field] = this.originalData[field];
        }
    }



    setAll(item){

        for(let field in this.originalData){

            if(field in item){

                this[field] = item[field];
            }

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

    get(value){
        return this[value];
    }

    set(data , value){
        this[data] = value;
    }

    // add Index
    addIndex(value , index){
        return Object.assign({'index': index }, value );
    }

   

    // Set Video Display
    setOptionDisplay(value){

        let display = [];
        let count = 0;


        for(let field in value){

            if(value[field]){
                let valueDisplay = this.addIndex(value[field] , count);
                display.push(valueDisplay);

            }

            count ++;
        }

        this.listOption = display;



    }





    setDisplay(value , nameDisplay){

        let display = [];
        let count = 0;


        for(let field in value){

            if(value[field]){
                let valueDisplay = this.addIndex(value[field] , count);
                display.push(valueDisplay);

            }


            count ++;
        }


        this[nameDisplay] = display;

    }

    // DATA
    data(){
        let data = Object.assign({} , this);
        delete data.originalData;
        delete data.processingForm;

        return data;
    }


}

export default FormDisplay;