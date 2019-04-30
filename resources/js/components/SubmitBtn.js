/**
 * Created by Murilo on 3/1/2017.
 */
const SubmitBtn = {

    template:`<button :class="classBtn" type="submit">
                            <i :class="faIconClass" aria-hidden="true" v-if="faicon" ></i>
                            <span v-text="textbutton"></span>
                    </button>` ,
    props: {
        processloading:    {type:Boolean} ,
        textbutton:        {type:String} ,
        stylebutton:       {type:String , default:'submit_btn'} ,
        faicon:            {type:String , default:null}

    } ,
    methods: {


    } ,
    computed: {
        classBtn() {
            return  this.processloading != false ? "btn-loading  button " + this.stylebutton
                                                 : "button  " + this.stylebutton;
        } ,
        faIconClass(){
            return "fa " + this.faicon;
        }


    }
};

export default SubmitBtn;
