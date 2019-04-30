import EventBus from '../event-bus';

class MakeUpload{
    constructor(urlUpload , typeFile , imageFormat ){

        // start upload
        this.startUpload(urlUpload  , typeFile , imageFormat );

    }

    // start the upload here
    startUpload(urlUpload , typeFile , imageFormat ){

        var output = document.getElementById('output');
        var data = new FormData();


        // get all inputs 6 inputs
        for(var n = 0; n < 6; n++) {
            data.append('file[]', document.getElementById('file').files[n]);
        }

        data.append('type_file', typeFile);
        data.append('image_format', imageFormat);



        var config = {
            onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            }
        };



        axios.post(urlUpload, data, config)

            .then(function (res) {
                EventBus.$emit('createFile', res.data);
            })
            .catch(function (err) {
                console.log('error');
            });




    }

}

export default MakeUpload;
