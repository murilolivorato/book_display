
import EventBus from '../event-bus';


class SaveGalleryChanges {
    constructor(urlToSave , dataToCreate , dataToDelete , pageForm) {

        // start upload
        this.saveChanges(urlToSave , dataToCreate , dataToDelete , pageForm );

    }

    // start the upload here
    saveChanges(urlToSave , dataToCreate , dataToDelete , pageForm ) {

      /*   var output = document.getElementById('output'); */

        // append inputs
        let data = this.getAllInputValues(dataToCreate , dataToDelete , pageForm );


        axios.post(urlToSave, data)
            .then(response =>  EventBus.$emit('saveGalleryChanges', response.data))
            .catch(error => EventBus.$emit('formError', error.response.data));
    }


    getAllInputValues(dataToCreate , dataToDelete , pageForm){
        let data = new FormData();


        // get all galleries items
        for(var n = 0; n < Object.keys(dataToCreate).length ; n++) {
            let obj = this.toObject(dataToCreate[n]);

            data.append('value_all_files[]', JSON.stringify(obj));
        }

        // append delete Item
        data.append('d_item_all', JSON.stringify(dataToDelete));

        // aditional items
        for(let field in pageForm){
            data.append(field, JSON.stringify(pageForm[field]));

        }

        return data;


    }

    toObject(arr) {
        return Object.assign({}, arr);
    }

}
export default SaveGalleryChanges;