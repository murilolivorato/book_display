const BookListPage = {
    methods: {

        // SEARCH FILTER
        category_list(data) {
            let list = '';
            for (let index in data) {

               let category_name =  this.optionSelected(data[index]  , this.formOptions.category);

                // FIRST RECORD
                if(list == ''){
                    list = category_name;
                    continue;
                }

                // IT IS NOT FIRST RECORD
               list =  list + ' , ' +  category_name;
            }

            return list;

        }
    }
};

export default BookListPage;
