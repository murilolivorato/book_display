/**
 * Created by Murilo on 2/28/2017.
 */


class FlashMessage {

    constructor(typeMesage , contentMessage , redirect = null ) {

        let headerMessage = typeMesage == "success" ? "Success" : "Error";
        // start upload
        this.createMessage(typeMesage , contentMessage , redirect , headerMessage);

    }

    createMessage(typeMesage , contentMessage , redirect , headerMessage){


        setTimeout(() => {

            // set new data
            Vue.swal({
                title: headerMessage,
                text: contentMessage,
                type: typeMesage,
                confirmButtonText: 'OK' ,
                allowOutsideClick: true,
            })

        }, 0.800);




    }
}
export default FlashMessage;