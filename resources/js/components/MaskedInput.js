/**
 * Created by Murilo on 4/10/2017.
 */
/**
 * Created by Murilo on 3/1/2017.
 */


const MaskedInput = {

    template:`  <div>
      <input 
        type="text"
      	v-model="displayValue" 
        @blur="handleInputState"
        @focus="handleInputState"
        class="form-control border-input"
        :placeholder="textPlanceHolder">
    </div>` ,
    props: {
        value: { default: null  },
        maskType: { type:String },
        placehold: { type: String ,  default: null },
    },
    data: function() {
        return {
            inputFocused: false
        }
    },
    methods: {
        handleInputState (event) {
            this.inputFocused = event.type === 'focus'
        },
        unmask (value) {
            switch(this.maskType) {
                case 'price':
                case 'price_round_cent':
                case 'percentage':
                case 'square_meter':
                case 'ha':
                case 'year':
                    return this.unformatZero(value);
                    
                case 'date':
                case 'phone':
                case 'phone_no_ddd':
                case 'zip_code':
                    return this.unformatEmpty(value);

                default:
                    return '';
            }


        },
        mask (int) {

            switch(this.maskType) {
                case 'price':
                    return this.formatPrice(int);

                case 'price_round_cent':
                    return this.formatPriceRoundCent(int);
                    
                case 'date':
                    return this.formatDate(int);
                    
                case 'phone':
                    return this.formatPhone(int);

                case 'phone_no_ddd':
                    return this.formatPhonenoDDD(int);
                    
                case 'zip_code':
                    return this.formatZipCode(int);
                    
                case 'percentage':
                    return this.formatPercentage(int);
                    
                case 'square_meter':
                    return this.formatSquareMeter(int);
                    
                case 'ha':
                    return this.formatHa(int);
                    
                case 'year':
                    return this.formatYear(int);
                    



                default:
                    return '';
            }


        },
        formatZipCode(int){
            let tmp = int+'';
            tmp = tmp.replace(/\D/g,"");
            tmp = tmp.replace(/(\d{5})(\d)/,"$1-$2");
            return tmp.substring(0,9);

        } ,
        formatPhone(int){
            let tmp = int+'';
            tmp = tmp.replace(/\D/g,"");
            tmp = tmp.replace(/(\d{0})(\d)/,"$1($2");
            tmp = tmp.replace(/(\d{2})(\d)/,"$1)$2");
            tmp = tmp.replace(/(\d{5})(\d)/,"$1-$2");

            return tmp.substring(0,14);

        } ,
        formatPhonenoDDD(int){
            let tmp = int+'';
            tmp = tmp.replace(/\D/g,"");
            tmp = tmp.replace(/(\d{5})(\d)/,"$1-$2");

            return tmp.substring(0,10);
        },
        formatDate(int){
            let tmp = int+'';
            tmp = tmp.replace(/\D/g,"");
            tmp = tmp.replace(/(\d{2})(\d)/,"$1/$2");
            tmp = tmp.replace(/(\d{2})(\d)/,"$1/$2");

            return tmp.substring(0,10);

        } ,
        formatPriceRoundCent(int){
            var tmp = int+'';
            if( tmp.length > 3 )
                tmp = tmp.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");


            if(tmp == 0){
                return "";
            }

            return '£ ' + tmp + ',00';

        } ,
        formatPrice(int){

            var tmp = int+'';
            tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
            if( tmp.length > 6 )
                tmp = tmp.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");


            if(tmp == 0){
                return "";
            }

            return '£ ' + tmp;
        } ,
        formatPercentage(int){
            var tmp = int+'';
            tmp = tmp.replace(/\D/g,"");

            if(tmp == 0){
                return "";
            }

            return tmp.substring(0,3) + ' % ';
        } ,
        formatSquareMeter(int){
            var tmp = int+'';
            tmp = tmp.replace(/\D/g,"");

            if(tmp == 0){
                return "";
            }

            return tmp.substring(0,3) + ' m ²';
        } ,
        formatHa(int){
            var tmp = int+'';
            tmp = tmp.replace(/\D/g,"");

            if(tmp == 0){
                return "";
            }

            return tmp.substring(0,3) + ' Ha';
        } ,
        formatYear(int){
            var tmp = int+'';

            if(tmp == 0){
                return "";
            }

            return tmp.substr(0,4);
        } ,
        unformatZero(value){

            value = parseFloat(value.replace(/[^\d\.]/g, ""))
            return isNaN(value)
                ? 0
                : value;
        } ,
        unformatEmpty(value , num_max_space ){
            value = value.substring(0, num_max_space );
            return isNaN(value)
                ? ""
                : value;

            /*value = value.substring(0,8);
            value = parseFloat(value.replace(/[^\d\.]/g, ""))
            return isNaN(value)
                ? ""
                : value; */

        } ,



    },
    computed: {
        displayValue: {
            get: function() {
                if (this.inputFocused) {
                    return this.value.toString()
                } else {
                    return this.mask(this.value)
                }
            },
            set: function(modifiedValue) {
                this.$emit('input', this.unmask(modifiedValue))
            }
        } ,
        textPlanceHolder(){
            if(this.placehold != null){
                return this.placehold;
            }
        }
    }
};

export default MaskedInput;
