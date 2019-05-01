@extends('layout.template')

@section('content')



    <div class="container-fluid display-page" id="display-post-category" >

        <!-- @create Modal--->
        <modal  v-if="modal.get('create')" @close="modal.set('create', false)" >
        <template slot="header" ><h4>Create Book</h4></template>
        <template slot="body" >
            <form method="POST" action="" @submit.prevent="storeItem()">
                <div class="modal-body">

                    <!-- CATEGORY-->
                    <div class="form-group">
                        <label for="title">Category</label>
                        <select-box-many v-model="selectedFormList['category_id']"  :selected="selectedFormList.get('category_id')"  :options="formOptions.get('category')"   :emptyheader="'Category'"   ></select-box-many>
                        <span class="error-msg" v-if="errors.has('selectedFormList.category')" v-text="errors.get('selectedFormList.category')"></span>
                    </div>


                    <!-- TITLE-->
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input class="form-control border-input" placeholder="Title" v-model="selectedFormList.title"  type="text"  >
                        <span class="error-msg" v-if="errors.has('selectedFormList.title')" v-text="errors.get('selectedFormList.title')"></span>
                    </div>

                    <!-- AUTHOR-->
                    <div class="form-group">
                        <label for="title">Author</label>
                        <input class="form-control border-input" placeholder="Author" v-model="selectedFormList.author"  type="text"  >
                        <span class="error-msg" v-if="errors.has('selectedFormList.author')" v-text="errors.get('selectedFormList.title')"></span>
                    </div>

                    <!-- ISBN-->
                    <div class="form-group">
                        <label for="title">Isbn</label>
                        <input class="form-control border-input" placeholder="Isbn" v-model="selectedFormList.isbn"  type="text"  >
                        <span class="error-msg" v-if="errors.has('selectedFormList.isbn')" v-text="errors.get('selectedFormList.title')"></span>
                    </div>

                    <!-- PRICE-->
                    <div class="form-group">
                        <label for="title">Price</label>
                        <masked-input   v-model="selectedFormList.price"  placehold="Price" mask-type="price" ></masked-input>
                        <span class="error-msg" v-if="errors.has('selectedFormList.price')" v-text="errors.get('selectedFormList.price')"></span>
                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" @click="modal.set('create', false)" >Close</button>
                    <button type="submit" class="btn btn-success">Create</button>
                </div>

            </form>
        </template>
        </modal>


        <!-- @update --->
        <modal  v-if="modal.get('edit')" @close="modal.set('edit', false)"  >
        <template slot="header" ><h4>Edit Book</h4></template>
        <template slot="body" >

            <form method="POST" action="" @submit.prevent="updateItem()">
                <div class="modal-body">

                    <!-- form Group -->
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input class="form-control border-input" placeholder="Title" v-model="selectedFormList.title"  type="text"  >
                        <span class="error-msg" v-if="errors.has('title')" v-text="errors.get('title')"></span>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" @click="modal.set('edit', false)" >Close</button>
                    <button type="submit" class="btn btn-success">Edit</button>
                </div>
            </form>
        </template>
        </modal>


        <!-- @delete --->
        <modal  v-if="modal.get('delete')" @close="modal.set('delete', false)"  >
        <template slot="header" ><h4>Delete Book</h4></template>
        <template slot="body" >

            <form method="POST" action="" @submit.prevent="destroyItem( submitSelectedItems )">
                <div class="modal-body">
                    <p>Are you Sure that you want to delete this  ?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" @click="modal.set('delete', false)" >Close</button>
                    <button type="submit" class="btn btn-success">Delete</button>
                </div>
            </form>
        </template>
        </modal>





        <div class="row" >

            <div class="col-md-7">
                <h3 class="title">Book Display</h3>
            </div>

            <div class="col-md-5">


                <ul class="list_right_menu_top">
                    <li><a href="#" type="button" class="delete-item-all-btn btn btn-primary btn pull-right "  @click="deleteManyItems()" >Delete</a></li>
                    <li> <a href="#" class="btn-primary btn pull-right "  @click="createItem()" >Create Book</a></li>
                </ul>

            </div>



            <div class="col-md-12">
                <div class="card">

                    <div class="header">
                        <p class="total_row_values"><span>Total of</span> <span class="total_row_number" id="total_row_number">  @{{ pagination.pagination.total }}  </span> <span>Records</span> </p>
                    </div>



                            <!-- content -->
                    <div class="content table-responsive table-full-width" id="display"   >
                        <table class="table  table-striped">
                            <thead>
                            <th>ID</th>
                            <th>
                                <label class="checkbox checkbox-blue" >
                                    <input name="chkSelectAll" type="checkbox" id="chkSelectAll" v-model="toggleAll" @click="selectAll" >
                                </label>
                            </th>
                            <th>Book Information</th>
                            <th class="td-actions text-right" data-field="actions" >
                                <div class="th-inner ">Action</div>

                            </th>

                            </thead>


                            <tbody class="posts">


                            <tr class="display_item post"  v-for="(item , index )  in displayItems"   >

                                <td></td>
                                <td> <label class="checkbox checkbox-blue" for="check_option">

                                        <input type="checkbox" :value="index" v-model="selectedItems">

                                    </label>
                                </td>

                                <td class="row_title" >
                                    <p>
                                        Title : @{{ item.title }} <br />
                                        Author : @{{ item.author }} <br />
                                        ISBN : @{{ item.isbn }} <br />
                                        Price: £ @{{ item.price }} <br />
                                        Categoria :  @{{ category_list(item.category) }}
                                    </p>
                                </td>


                                <td class="td-actions text-right " >

                                    <ul class="list_table_action">


                                        <!-- edit  Button -->
                                        <li class="edit">
                                            <a class="hint--top" aria-label="Edit"  href="#"  @click.prevent="editItem(item)" >
                                                <i class="fa"></i>
                                            </a>
                                        </li>

                                        <!-- edit  Button -->
                                        <li class="delete">
                                            <a class="hint--top" aria-label="Delete"  href="#"  @click.prevent="deleteItem(item)" >
                                                <i class="fa"></i>
                                            </a>
                                        </li>


                                    </ul>

                                </td>
                            </tr>



                            </tbody>

                        </table>




                        <!-- row -->
                        <div class="fixed-table-pagination">
                            <div class="text-center">
                                    <p v-if="!paginationNumbers" class="paginationRegister">Records</p>
                                    <p v-if="paginationNumbers" class="paginationRegister"><span class="sp2"> @{{ pagination.pagination.total }} </span> Records</p>

                                    <!-- pagination -->
                                    <nav class="pagination is-rounded is-centered" role="navigation" aria-label="pagination" aria-label="pagination" >

                                        <ul class="pagination">
                                            <li class="first_pg" v-if="pagination.get('current_page') > 1"  >
                                                    <a href="#" aria-label="Previous" class="pagination-previous" @click.prevent="pagination.prevPage()">
                                                        <span aria-hidden="true">«</span>
                                                    </a>
                                            </li>

                                            <li v-for="page in paginationNumbers"   v-if="pagination.pagination.total > pagination.pagination.per_page">
                                                <a href="#" @click.prevent="pagination.changePage(page)"  v-bind:class="page == pagination.isActived() ? 'pagination-link is-current' : 'pagination-link'">
                                                    @{{ page }}
                                                </a>
                                            </li>

                                            <li  v-if="pagination.get('current_page') < pagination.get('last_page')" >
                                                <a  href="#" aria-label="Next" class="pagination-next"  @click.prevent="pagination.nextPage()">
                                                    <span aria-hidden="true">»</span>
                                                </a>
                                            </li>
                                        </ul>


                                    </nav>
                                    <!-- end pagination  -->

                            </div>
                        </div>
                        <!-- end row -->







                    </div>
                    <!-- content -->



                    <!-- end row -->
                </div>
                <!-- container-fluid-->
            </div>





        </div>
    </div>



@stop
