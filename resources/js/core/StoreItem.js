/**
 * Created by Murilo on 3/3/2017.
 */

import EventBus from '../event-bus';

class StoreItem{

    constructor(url , data , returnMethod = "createdItem" , formList = "form" ){


        /*
         url  = post url
         data = form data
         return mathod = name of the succes method return
         form list = name of return array form
         */
        // start upload
        this.startUpload(url , data , returnMethod , formList );
    }

    // START UPLOAD END SEND THE DATA HERE
    startUpload(url , data , returnMethod , formList ) {

        // SEND VALUE TO VUE
        axios.post(url, data)

            .then(response =>  EventBus.$emit(returnMethod , response.data))
            .catch(error => EventBus.$emit('formError', { 'form_list' :  formList  , 'error_list' : error.response.data }  ));

    }





}
export default StoreItem;