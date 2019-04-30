/**
 * Created by Murilo on 3/3/2017.
 */
import ClickOutSideEvent from '../mixins/ClickOutSideEvent';
const SelectBoxMany = {
    template: `<section class="dropdow_box"  v-click-outside="outside" @click="inside" >
                            <div class="wrapper-demo">
                                    <div id="dd" :class="styleWapper"  >
                                     
                                            <a href="#" id="header_drop"    @click.stop.prevent="clickHeader()" >
                                                          {{ headerMessage }}
                                             </a>
                                  

                                
                                            <ul class="dropdown_menu">
                                                        <li><a href="#" >Select an Option </a></li>
                                                        <li class="row"  v-for="option in listValues" >
                                                                <label class="checkbox"><input type="checkbox"  :value="option" v-model="selectedData"><span>{{ option.title }}</span></label>
                                                         </li>
                                                  </ul>
                                  
                            </div>
				        ​</div>
                </section>


			`,
    props: {
        options     : {type: Array},
        selected    : {type: Array},
        emptyheader : {type: String , default:null}


    },
    data() {
        return {
            selectedOption: '',
            selectedData: [],
            statusDropDown: false,
            headerMessage: 'Select' ,
            styleWapper: 'wrapper-dropdown'
        }
    },
    methods: {
        outside: function(e) {
            // IF IT IS OPEN
            if(this.get('statusDropDown') != false) {
                this.closeDropDown();
            }
        } ,
        inside: function(e) {

        } ,
        formatEmptyHeaderMessage(){
            if(this.emptyheader == null){
                this.headerMessage = "Select";
                return;
            }

            this.headerMessage = this.emptyheader;

            return;
        } ,
        formatHeaderMessage(val){
            if(val.length == 0){
                this.formatEmptyHeaderMessage();
            }


            if(val.length == 1){
                      this.headerMessage =  val[0]['title'];
                     return;
                }

                if(val.length > 1){
                    this.headerMessage =  val.length + " Selected ";
                    return;
                }



        } ,
        clickHeader(){
            this.get('statusDropDown') != true ? this.openDropDown() : this.closeDropDown();
        },
        openDropDown(){
            this.styleWapper = 'wrapper-dropdown active';
            this.set('statusDropDown', true);
        },
        closeDropDown(){
            this.styleWapper = 'wrapper-dropdown';
            this.set('statusDropDown', false);

            // SEND VALUE
            this.sendValue();
        },
        sendValue(){

            this.$emit('input', this.getAllIds());


        },
        getAllIds(data){
            let list = [];
            for(let prop in this.selectedData)
            {
                list.push(this.selectedData[prop]['id']);
            }
            return list;

        } ,
        get(value){

            return this[value];
        },
        set(data, value){

            this[data] = value;
        }


    },
    computed: {
        listValues: function () {
            return this.options;
        }
    },
    watch: {

        selectedData: function (val) {
            this.formatHeaderMessage(val);

        },

    },
    created() {
        this.formatEmptyHeaderMessage();
    } ,
    mixins: [ClickOutSideEvent]
};

export default SelectBoxMany;