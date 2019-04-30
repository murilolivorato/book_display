/**
 * Created by Murilo on 11/19/2017.
 */
/**
 * Created by Murilo on 3/4/2017.
 */
class ComboBoxCore{

    constructor(data){
        this.combobox = data;
    }
    get(value){
        if(this.combobox[value]){
            return this.combobox[value];
        }
    }
    set(data , value){
        this.combobox[data] = value;
    }

    // combobox type and combobox ID
    setActive( idCombobox , activeComboBox , valueCombobox ){


                // if has the value, empty it
                if(this.verify('activeComboBox' , activeComboBox )){

                    this.combobox['activeComboBox']   = activeComboBox;
                    this.combobox['idCombobox']       = "";
                    this.combobox['valueCombobox']    = [];
                    return;
                }



                // otherwise , if is empty or is not this value , so add this new value
                this.combobox['activeComboBox']   = activeComboBox;
                this.combobox['idCombobox']       = idCombobox;
                this.combobox['valueCombobox']    = valueCombobox;






    }

    // combobox type and combobox ID
    setActiveId( idCombobox){

        // set empty
        this.setEmpty();

        // set net ID
        this.combobox['activeComboBox']       = idCombobox;
    }

    verifyActiveMany(value){

        if(this.combobox['activeComboBox']){



                for(let prop in value) {
                    if (this.combobox['activeComboBox'] == value[prop]) {
                        return true;
                    }
                }


        }
        return false;

    }
    verifyActiveOne(value){
        if(this.combobox['activeComboBox']){

                if(this.combobox['activeComboBox'] == value){
                    return true;
                }

        }
        return false;
    }
    // verify if is active
    verifyActive(value){
        // if is an Array
        if (value instanceof Array) {
            return this.verifyActiveMany(value);
        }else{
            return this.verifyActiveOne(value);
        }
    }

    // verify if this the value
    verify(data , value){
        // if is an Array
        if (value instanceof Array) {
            return this.verifyMany(data , value);
        }else{
            return this.verifyOne(data , value);
        }


    }

    verifyOne(data , value){

        if(this.combobox[data] == value){
            return true;
        }

        return false;

    }

    verifyMany(data , value){

        for(let prop in value) {
            if (this.combobox[data] == value[prop]) {
                return true;
            }
        }
        return false;
    }


    // set empty values
    setEmpty(){
            this.combobox['activeComboBox']   = "";
            this.combobox['idCombobox']       = "";
            this.combobox['valueCombobox']    = "";

    }


}
export default ComboBoxCore;