/**
 * Created by Murilo on 3/4/2017.
 */
class Modal{

    constructor(data){
        this.modal = data;
    }
    get(value){
        if(this.modal[value]){
            return this.modal[value];
        }
    }
    set(data , value){
        this.modal[data] = value;
    }

}
export default Modal;