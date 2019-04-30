/**
 * Created by Murilo on 2/28/2017.
 */


class FlashMessage {

    constructor(typeMesage , contentMessage , redirect = null ) {

        let headerMessage = typeMesage == "success" ? "Sucesso" : "Erro";
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
                confirmButtonText: 'OK'
            }).then(function () {
                // redirect if is not null
                if(redirect != null){
                    window.location = redirect
                }

            })

        }, 0.800);




    }
}
export default FlashMessage;