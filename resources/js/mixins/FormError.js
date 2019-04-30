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

            this.errors.record(data.error_list.errors , data.form_list);


        });

    } ,
};

export default FormError;