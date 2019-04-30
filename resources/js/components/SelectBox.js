/**
 * Created by Murilo on 3/3/2017.
 */
import ClickOutSideEvent from '../mixins/ClickOutSideEvent';
import EventBus from '../event-bus';

const SelectBox = {
    template: `<div class="dropdow_box" v-click-outside="outside" @click="inside" >
                          
                                    <div id="dd" :class="styleWapper" >
                                    <a href="#" id="header_drop"   v-if="selected == 0 || selected == ''" @click.stop.prevent="clickHeader" class="not-selected" >
                                                  {{ nulltext }}
                                     </a>

                                    <a href="#" id="header_drop"  v-else @click.stop.prevent="clickHeader" >
                                          {{  selectedData[optionName]}}
                                   </a>

                                    <ul class="dropdown_menu">
                                        <div>
                                                <li><a href="#" @click.stop.prevent="sendValue(0)" > {{ nulltext }} </a></li>
                                                <li  v-for="option in listValues" >
                                                        
                                                        <a href="#" @click.stop.prevent="sendValue(option.id)" :class="styleLink(option)" >  {{ option[optionName] }} </a>
                                                </li>
                                         </div>   
                                    </ul>
                            </div>
				       
                </div>


			`,
    props: {
        options: {type: Array},
        selected: {type: [Number, String]} ,
        chainselect: {type: String} ,
        nameoption:{type:String , default:"title" } ,
        idoption:{type:String} ,
        nulltext:{type:[Number, String] , default:"Selecione uma Opção" } ,


    },
    data() {
        return {
            selectedOption: '',
            selectedData: {},
            statusDropDown: false ,
            styleWapper: 'wrapper-dropdown'
        }
    },
    methods: {
        outside: function(e) {
            this.closeDropDown();
        } ,
        inside: function(e) {

        } ,
        styleLink(option){
            if(option.id == this.selectedData.id){
                return "active";
            }
            return;
        } ,
        clickHeader(){
            // SEND COMMAND TO CLOSE OTHER BOXES
            EventBus.$emit('closeallboxes', this.idoption );

            this.get('statusDropDown') != true ? this.openDropDown() : this.closeDropDown();
        },
        openDropDown(){
            this.styleWapper = 'wrapper-dropdown active';
            this.set('statusDropDown', true);
        },
        closeDropDown(){
            this.styleWapper = 'wrapper-dropdown';
            this.set('statusDropDown', false);
        },
        sendValue(id){

            if (this.chainselect) {

                this.$emit(this.chainselect, id );
            }

            this.$emit('input', id);

            this.closeDropDown();
        },
        get(value){

            return this[value];
        },
        set(data, value){

            this[data] = value;
        },
        setDataSelected(valuaSelected){


            for (let option in this.options) {
                if (this.options[option]['id'] == valuaSelected) {

                    this.selectedData = this.options[option];
                }

            }

        }

    },
    computed: {
        listValues: function () {
            return this.options;
        } ,
        optionName: function () {
            return  this.nameoption;
        } ,
    },
    watch: {

        options: function (val) {
            this.setDataSelected(this.selected);
        },
        selected: function (val) {
            this.setDataSelected(val);
            /* this.setDataSelected(); */
        }
    },
    created() {

        this.setDataSelected(this.selected);


        // LOAD FORMS BUS
        EventBus.$on('closeallboxes', (val) => {

              // if is not the menu , close it
               if(this.idoption != val){
                   this.closeDropDown();
               }
        });


    } ,
    mixins: [ClickOutSideEvent]
};

export default SelectBox;