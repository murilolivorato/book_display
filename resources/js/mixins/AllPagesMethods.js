import Errors from "../core/Errors";

const AllPagesMethods = {

    data: {
        loadingPage : true
    } ,
    methods: {

        optionSelected(idSelected, options, titleSelected = 'title') {
            for (let prop in options) {

                if (options[prop]['id'] == idSelected) {

                    return options[prop][titleSelected];
                }
            }
        }
    }


};

export default AllPagesMethods;