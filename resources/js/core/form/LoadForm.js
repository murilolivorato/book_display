/**
 * Created by Murilo on 2/12/2018.
 */
import axios from 'axios';
import Vue from 'vue';
import EventBus from '../../event-bus';


class LoadForm {

    constructor(urlToLoad , returnMethod  , extraValue = null ) {
        if(extraValue != null) {
            urlToLoad = this.changeUrlWithExtraValue(urlToLoad , extraValue);
        }

        console.log(urlToLoad);
        // start upload
        this.startLoading(urlToLoad , returnMethod);

    }

    // DOES NOT HAS A RETURN METHOD , IT IS THE METHOD THAT ISTAR ON THE PAGE
    startLoading(urlToLoad , returnMethod){

        axios.get(urlToLoad)

            .then(response =>  EventBus.$emit( returnMethod, response.data))
            .catch(error => console.log(error.response.data));


    }

    // ADD ? & .. IN URL
    changeUrlWithExtraValue(urlToLoad , extraValue){

        let string = "";

        for (let prop in extraValue ){

            let key   = Object.keys(extraValue[prop][0]);
            let value = extraValue[prop][0][key];
            let stringValue = key + '=' + value;

            string = prop == 0 ? '?' + stringValue : string + '&' + stringValue;
        }

        return urlToLoad + string;

    }



}
export default LoadForm;