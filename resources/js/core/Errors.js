class Errors{
    constructor(){
        this.errors = {};
    }

    get(field){
        // IF IS AN ARRAY ERROR
        if(field.includes('.')){
            let splitString = field.split(".");

            // IT IS AN ARRAY FORM
            if(splitString.length > 2){
                if(this.errors[splitString[0]][splitString[1] + '.' + splitString[2]]){
                    return this.errors[splitString[0]][splitString[1] + '.' + splitString[2]][0];
                }
            }


            if(this.errors[splitString[0]][splitString[1]]) {

                return this.errors[splitString[0]][splitString[1]][0];
            }

            return false;
        }

        // IS NOT ARRAY
        if(this.errors[field]){
            return  this.errors[field][0];
        }
    }

    record(errors , list = null){

        if(list){
            this.errors = [list];
            this.errors[list] = errors;

            return;
        }

        this.errors = errors;
    }

    reset(){
        this.errors = {};
    }

    addRecord(field , errorString ){

        // HAS ARRAY ERROR
        if(field.includes('.')){

            let splitString = field.split(".");
            let listName   = splitString[0];
            let fieldName   = splitString[1];

            // ADD ARRAY LIST
            this.errors[listName] = Object.assign({}, this.errors[listName]  );

            // ADD ERROR INSIDE ARRAY LIST
            this.errors[listName][fieldName] = errorString;
            return;
        }


        // DONT HAS ARRAY ERROR
        this.errors =  Object.assign({}, this.errors );
        this.errors[field] = errorString;
        return;

    }


    any(){
        return Object.keys(this.errors).length > 0;
    }

    has(field){

        // IF IS AN ARRAY ERROR
        if(field.includes('.')){
            let splitString = field.split(".");


            if(this.errors.hasOwnProperty(splitString[0])){

                // IT IS AN ARRAY FORM
                if(splitString.length > 2){

                    return this.errors[splitString[0]].hasOwnProperty(splitString[1] + '.' + splitString[2]);
                }

                return this.errors[splitString[0]].hasOwnProperty(splitString[1]);
            }

            return false;

        }


        // IS NOT ARRAY
        return this.errors.hasOwnProperty(field);
    }

    clear(field){
        if(field) delete this.errors[field];

        this.errors = {};
    }

    verifyErrorAndClear(field){
        if(this.has(field)){
            this.clearField(field);
        }
    }

    clearField(field ){

        // HAS ARRAY ERROR
        if(field.includes('.')) {

            let splitString = field.split(".");
            let listName = splitString[0];
            let fieldName  = splitString[1];

            delete this.errors[listName][fieldName];
            return;
        }

        delete this.errors[field];

    }



}

export default Errors;