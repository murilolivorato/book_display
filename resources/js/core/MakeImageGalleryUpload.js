import EventBus from '../event-bus';

class MakeImageGalleryUpload{
    constructor(urlUpload ){

        // start upload
        this.startUpload(urlUpload);

    }

    // start the upload here
    startUpload(urlUpload){


        var data = new FormData();


        // get all inputs 20 inputs
        for(var n = 0; n < 20; n++) {
            data.append('image[]', document.getElementById('image_input').files[n]);
        }


/*
        var config = {
            onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            }
        };
*/


        axios.post(urlUpload , data )

            .then(function (response) {
                EventBus.$emit('createGlImage', response.data);
            })
             .catch(error => EventBus.$emit('galleryFormError', error.response.data));






    }

}

export default MakeImageGalleryUpload;
