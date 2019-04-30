import Errors from './Errors';

class Form{
    constructor(data){
        this.originalData = data;

        for(let field in data){
            this[field] = data[field];
        }

        this.errors = new Errors();
    }

    reset(){
        for(let field in this.originalData){
            this[field] = '';
        }
    }
    data(){

        let data = Object.assign({} , this);

        delete data.originalData;
        delete data.errors;

        return data;
    }
    submit(requestType , url ){

        axios[requestType](url, this.data())
            .then(this.onSuccess.bind(this))
            .catch(this.onFail.bind(this))


        /*axios.post('/vueform/store', this.$data)
         .then(this.onSuccess)
         .catch(error => this.form.errors.record(error.response.data));*/
    }

    onSuccess(response){
        alert(response.data.message);
        this.errors.clear();
        this.reset();

    }

    onFail(error){
        this.errors.record(error.response.data);
    }


}

export default Form;

