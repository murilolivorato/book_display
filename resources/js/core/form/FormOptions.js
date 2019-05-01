/**
 * Created by Murilo on 3/3/2017.
 */

class FormOptions {
    constructor(data) {

        this.originalData = data;
        this.formOptItems = [];


        // PUSH INSIDE AN ARRAY , THEN AFTER I WILL CHECK IF THIS ITEM EXISTS
        for(let field in data){

            //this[field] =  [];
            this.formOptItems.push(field);
        }

    }


    /* -----------------------------------------------
        SET ALL VALUES FROM FORM OPTIONS
        VERIFY IF EXIST , AND UPDATE THIS VALUE
    ------------------------------------------------ */
    setFillItem(item){
        for(let prop in item)
        {

            let key = Object.keys(item[prop]);


            // if has the value in list
            if(this.formOptItems.includes(key.toString()) ){

                this.setArrayOptions(key ,item[prop][key]);

            }

        }

    }

    reset(){
        for(let field in this.originalData){


            this.formOptItems[field] = this.originalData[field];
        }
    }

    // SET
    set(data , value){
        this.setArrayOptions(data , value);
    }

    // GET
    get(value){

        return this[value];

    }

    getTitleFromId(optionName , id){


        for(let prop in this[optionName])
        {
            if(this[optionName][prop]['id'] == id){
                return this.capitalizeFirstLetter(this[optionName][prop]['title']);
            }

        }
    }

    getIdFromUrlTitle(optionName , urlTitle){


        for(let prop in this[optionName])
        {
            if(this[optionName][prop]['url_title'] == urlTitle ){
                return this[optionName][prop]['id'];
            }

        }
    }

    getIdFromInputName(optionName , urlTitle , InputName){
        for(let prop in this[optionName])
        {

            if(this[optionName][prop][InputName] == urlTitle ){
                return this[optionName][prop]['id'];
            }

        }
    }

    getNameById(optionName , optionId , InpuutName){

        // GET THE OPTION ITEM
        let optionItem = this[optionName];

        for (let prop in optionItem) {
            // IF IS THE SAME ID THAT I AM SELECTING
            if(optionItem[prop]['id'] == optionId){
                //RETURN THE TITLE
                return optionItem[prop][InpuutName];
            }
        }
    }


    // CHECK IF HAS THIS KEY, IF HAS ADD THE VALUE
    setOptionValueAndKey(item){
        
        for(let prop in item)
        {
            // if has the value in list
            if(this.formOptItems.includes(prop.toString()) ){

                this[prop] = item[prop];
            }

        }

    }



    pushObjectIntoArray(object){

        let list = [];
        for (let prop in object) {
            let key = Object.keys(object[prop]);

            // if has key
            if (key) {
                list[prop] = object[prop][key];
            }
        }

        return list;



    }

    capitalizeFirstLetter(string) {
        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

     // SET AN ARRAY FROM 2 VALUES 1- ID / 2 - TITLE
    setArrayOptions(key , value){
        let objValeu = [];
        for(let obj in value)
        {
            objValeu.push({ 'id' : obj , 'title': value[obj] });

        }
        this[key] = objValeu;

    }

    verifyIsEmpty(data){
        let prop =   this[data];

        if(prop == null){
            return false;
        }

        return prop.length > 0  ? true : false;
    }

    // GET KEYS
    getKeys(){
        return Object.keys(this.originalData);
    }

    data(){

        let data = Object.assign({} , this);

        delete data.originalData;
        delete data.errors;


        return data;
    }


}
export default FormOptions;