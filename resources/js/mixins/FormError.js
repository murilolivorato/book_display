/**
 * Created by Murilo on 2/5/2018.
 */


import EventBus from '../event-bus';
import Errors from "../core/Errors";


const FormError = {

    data: {
        errors: new Errors()
    } ,
    created() {

        EventBus.$on('formError', (data) => {
            console.log(data);


            this[data.form_list]['processingForm'] = false;
            console.log(data.error_list.errors);

            this.errors.record(data.error_list.errors , data.form_list);

            console.log("foiiiii");
            console.log(this.errors);

        });

    } ,
};

export default FormError;