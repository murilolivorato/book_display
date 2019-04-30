import EventBus from "../event-bus";

/**
 * Created by Murilo on 3/3/2017.
 */
class UpdateItem{
    constructor(url , fillItem ){

        // start upload
        this.startUpload(url , fillItem );

    }

    // start the upload here
    startUpload(url , fillItem) {


        var output = document.getElementById('output');
        var data = new FormData();


        for(let field in fillItem){

            data.append(field, JSON.stringify(fillItem[field]));

        }



        axios.post(url, data)

            .then(response =>  EventBus.$emit('updateItem', response.data))
            .catch(error => EventBus.$emit('formError', error.response.data));


    }




}
export default UpdateItem;