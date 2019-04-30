
const Modal = {

    template: `   <transition name="modal" >
                                <div class="modal-mask"   >
                                <!-- @click="$emit('close')"  -->
                                  <div class="modal-wrapper"  @click="$emit('close')"  >
                                  
                                <!--  @click.stop -->
                                    <div :class="modalStyle"  @click.stop  >
                                            <!-- @click.prevent="addContClick()" -->
                                            
                                    <a class="close-modal" @click="$emit('close')" v-if="btnclose == true"></a>
                                    
                                      <div class="modal-header" v-if="hasHeaderSlot">
                                           <slot name="header" class="modal-card-title "></slot>
                                      </div>
                                        <slot name="body"></slot>
                                        
                                        
                                        <slot name="footer"  @click.stop ></slot>
       
       
                                    </div>
                                  </div>
                                </div>
                              </transition>` ,
    props: {
        modalstyle: {type: String} ,
        btnclose: {type: Boolean , default:true } ,
    } ,
    methods: {
        addContClick(){

            this.$emit('countclickinsinsidemodal' );
        }
    } ,
    computed: {

        modalStyle() {
            return this.modalstyle == null ? 'modal-container' : this.modalstyle + ' modal-container';
        } ,

        hasHeaderSlot () {
            return !!this.$slots['header']
        }


    }
};

export default Modal;
