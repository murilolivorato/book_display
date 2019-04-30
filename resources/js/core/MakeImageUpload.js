/**
 * Created by Murilo on 3/4/2017.
 */
import EventBus from '../event-bus';

/* -------------------------------   Make Upload Class */
class MakeImageUpload{
    constructor(urlUpload  , indexImage){

        // start upload
        this.startUpload(urlUpload , indexImage);
    }

    // start the upload here
    startUpload(urlUpload, indexImage){

        var data = new FormData();

        data.append('image', document.getElementById( 'image_input').files[0]);
        data.append('type_image', indexImage );

        axios.post(urlUpload, data)

            .then(response =>  EventBus.$emit('imageCreated', response.data))
            .catch(error => EventBus.$emit('formError', error.response.data));



    }



}

export default MakeImageUpload;