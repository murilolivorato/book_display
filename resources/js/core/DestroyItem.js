/**
 * Created by Murilo on 2/28/2017.
 */

import EventBus from '../event-bus';

class DestroyItem{
    constructor(url , item){

        // start upload
        this.startDelete(url , item);

    }

    // start the upload here
    startDelete(url , item) {


        var output = document.getElementById('output');
        var data = new FormData();

        /* data.append('value[]', JSON.stringify({id: item['id'], index: item['index']})); */

        for (var prop in item) {
            /*alert(item[prop]['id']); */
            data.append('value[]', JSON.stringify({id: item[prop]['id'], index: item[prop]['index']}));

        }



        axios.post(url, data)

            .then(function (res) {
                EventBus.$emit('deleteItem', res.data);
            })
            .catch(function (err) {
              alert('erro');
            });



    }


}
export default DestroyItem;