/**
 * Created by Murilo on 11/19/2017.
 */

class SelectSearchCore{

    constructor(data){
        this.selectsearch = data;
    }
    get(value){
        if(this.selectsearch[value]){
            return this.selectsearch[value];
        }
    }
    set(data , value){
        this.selectsearch[data] = value;
    }

    // verify if this the value
    verify(data , value){
        if(this.selectsearch[data] == value){
            return true;
        }
        return false;
    }

    // set empty values
    setEmpty(){
        this.selectsearch = "";

    }


}
export default SelectSearchCore;