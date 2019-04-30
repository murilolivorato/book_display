/**
 * Created by Murilo on 2/28/2017.
 */
import axios from 'axios';
import Vue from 'vue';
import EventBus from '../event-bus';

class LoadPage {

    constructor(urlToLoad) {
        // start upload
        this.startLoading(urlToLoad);
    }

    startLoading(urlToLoad){
        
        axios.get(urlToLoad)
            .then(function (res) {
                EventBus.$emit('pageLoaded', res.data);


            })
            .catch(function (res) {
                console.log('erro');
            });

    }
}

export default LoadPage;