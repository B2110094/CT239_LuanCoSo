<script>
import BookTypeService from '../services/BookType.service';
import CategoryService from '../services/Category.service';
import ToastVue from './Toast.vue';
import toast from '../assets/js/toasts';


export default {
    components: {
        ToastVue
    },
    data() {
        return {
            ManageBookType: [],
            ManageCategory: [],
            BookTypeInput: {
                booktype_name: "",
                category_name: ""
            },
            toasts: {
                title: "",
                msg: "",
                type: "",
                duration: 0
            },
            id_book: '',
            data_edit: '',
            inputSearch: "",
            selected: "Choose Province"
        }
    },
    methods: {
        toast,
        async changeOption(){
            this.BookTypeInput.category_name = document.querySelector("#chooseDM").value;
        },
        async getbooktypeData() {
            try {
                this.ManageBookType = await BookTypeService.getAllBookType();
                this.ManageCategory = await CategoryService.getAllCategory();
            } catch (error) {
                console.log(error)
            }
        },
        addBookType() {
            document.querySelector("#table_manageBookType").style.display = 'none'
            document.querySelector("#form_addBookType").style.display = 'block'
            document.querySelector("#btn_addBookType").style.display = 'none'
            document.querySelector("#pills-tabContent").style.margin = '0 auto'
            document.querySelector("#pills-tabContent").style.width = '100%'
            document.querySelector("#pills-tabContent").style.padding = '40px'
        },
        backPage() {
            setTimeout(() => {
                window.location.reload();
            }, 100)
        },
        async handleAddBookType() {
            try {
                await BookTypeService.create(this.BookTypeInput)
                alert('Thêm thể loại thành công !')
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                    window.location.reload();
                }, 1000)
            }
            catch (err) {
                console.log(err)
                alert('Thêm thể loại thất bại ! ')
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        },
        async deleteBookType(Id_BookType) {
            let check_delete = confirm("Chắc chắn muốn xóa chứ ?");
            if (check_delete) {
                try {
                    await BookTypeService.delete(Id_BookType);
                    alert('Xóa thành công !');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                } catch (err) {
                    alert('Xóa thất bại!')
                }
            } else {
                return
            }
        },
        async FindAuthor(inputKeyWord) {
            if (inputKeyWord === '') {
                this.ManageBookType = await BookTypeService.getAllBookType();
            } else {
                try {
                    this.ManageBookType = await BookTypeService.findbooktypewithName(inputKeyWord);
                    if (this.ManageBookType.length == 0) {
                        alert('Không có thể loại ứng với khóa tìm kiếm !');
                        this.ManageBookType = await  BookTypeService.getAllBookType();
                    }
                } catch (err) {
                    console.log(err)
                }
            }

        }
    },
    mounted() {
        this.getbooktypeData();
    },

}
</script>
<template>
    <button type="button" id="btn_addAuthor" class="btn btn-success" @click="addBookType()"><i class="fa-solid fa-plus"></i> Thêm Thể Loại </button>


    <form action="/" class="d-flex" style="width:500px;margin:0 auto" id="inputSearchKeyWord" @submit.prevent>
        <input type="text" class="form-control" placeholder="Nhập vào tên thể loại..." aria-label="Recipient's username" aria-describedby="basic-addon2" style="border-radius:6px;" v-model="inputSearch">
        <button id="btn_search" type="submit" style="width:120px;height:50px;border-radius:0 6px 6px 0" @click="FindAuthor(inputSearch)">Tìm Kiếm</button>
    </form>
    <br>
    <br>
    <!-- Giao diện thêm danh mục -->
    <ToastVue></ToastVue>
    <form @submit.prevent id="form_addBookType" style="display:none;width:100%;">
        <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở về</button>

        <br>
        <h2 class="text-center" style="color:red">Thêm thể loại sách</h2>
        <!-- Title Input -->
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Tên thể loại: </label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào thể loại..." v-model="BookTypeInput.booktype_name" required>

            <br>
            <label for="exampleInputEmail1" class="form-label fw-bold">Chọn danh mục: </label>
            <br>
            <select class="form-control" :required="true" @change="changeOption" id="chooseDM">
                <option :selected="true">Chưa chọn danh mục</option>
                <option v-for="item in ManageCategory" v-bind:value="item.category_name">{{ item.category_name }}</option>
            </select>
        </div>

        <button @click="handleAddBookType()" type="submit" class="btn btn-light fw-bold" style="padding: 10px;;border:1px solid #ccc">Xác Nhận</button>
    </form>


    <!-- Giao diện bảng Show Sách -->
    <table class="table" border="1px" style="width:90vw;" id="table_manageBookType">
        <thead>
            <tr class="table-info text-center">
                <th scope="col">STT</th>
                <th scope="col">Thể Loại</th>
                <th scope="col">Thuộc Danh Mục</th>
                <th scope="col">Hành Động</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in ManageBookType">
                <td>
                    {{ index + 1 }}
                </td>
                <td>{{ item.booktype_name }}</td>
                <td>{{ item.category_name }}</td>
                <td>
                    <router-link :to="{
                        name: 'EditBookType',
                        params: { id: item._id },
                    }">
                        <button type="button" class="btn btn-warning"><i class="fa-regular fa-pen-to-square"></i> Sửa</button>
                    </router-link>

                    <br>
                    <br>

                    <button @click="deleteBookType(item._id)" type="button" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> Xóa</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>