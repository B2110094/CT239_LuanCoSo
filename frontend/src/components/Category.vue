<script>
import CategoryService from '../services/Category.service';
import ToastVue from './Toast.vue';
import toast from '../assets/js/toasts';


export default {
    components: {
        ToastVue
    },
    data() {
        return {
            ManageCategory: [],
            CategoryInput: {
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
        }
    },
    methods: {
        toast,
        async getcategoryData() {
            try {
                this.ManageCategory = await CategoryService.getAllCategory();
            } catch (error) {
                console.log(error)
            }
        },
        addCategory() {
            document.querySelector("#table_manageCategory").style.display = 'none'
            document.querySelector("#form_addCategory").style.display = 'block'
            document.querySelector("#btn_addCategory").style.display = 'none'
            document.querySelector("#pills-tabContent").style.margin = '0 auto'
            document.querySelector("#pills-tabContent").style.width = '100%'
            document.querySelector("#pills-tabContent").style.padding = '40px'
        },
        backPage() {
            setTimeout(() => {
                window.location.reload();
            }, 100)
        },
        async handleAddCategory() {
            try {
                await CategoryService.create(this.CategoryInput)
                alert('Thêm danh mục thành công !')
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                    window.location.reload();
                }, 1000)
            }
            catch (err) {
                alert('Thêm danh mục thất bại ! ')
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        },
        async deleteCategory(Id_Category) {
            let check_delete = confirm("Chắc chắn muốn xóa chứ ?");
            if (check_delete) {
                try {
                    await CategoryService.delete(Id_Category);
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
        async FindCategory(inputKeyWord) {
            if (inputKeyWord === '') {
                this.ManageCategory = await CategoryService.getAllCategory();
            } else {
                try {
                    this.ManageCategory = await CategoryService.findcategorywithName(inputKeyWord);
                    if (this.ManageCategory.length == 0) {
                        alert('Không có danh mục ứng với khóa tìm kiếm !');
                        this.ManageCategory = await CategoryService.getAllCategory();
                    }
                } catch (err) {
                    console.log(err)
                }
            }

        }
    },
    mounted() {
        this.getcategoryData();
    },

}
</script>
<template>
    <button type="button" id="btn_addCategory" class="btn btn-success" @click="addCategory()"><i class="fa-solid fa-plus"></i> Thêm Danh Mục </button>


    <form action="/" class="d-flex" style="width:500px;margin:0 auto" id="inputSearchKeyWord" @submit.prevent>
        <input type="text" class="form-control" placeholder="Nhập vào tên danh mục..." aria-label="Recipient's username" aria-describedby="basic-addon2" style="border-radius:6px;"
            v-model="inputSearch">
        <button id="btn_search" type="submit" style="width:120px;height:50px;border-radius:0 6px 6px 0" @click="FindCategory(inputSearch)">Tìm Kiếm</button>
    </form>
    <br>
    <br>
    <!-- Giao diện thêm danh mục -->
    <ToastVue></ToastVue>
    <form @submit.prevent id="form_addCategory" style="display:none;width:100%;">
        <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở về</button>

        <br>
        <h2 class="text-center" style="color:red">Thêm danh mục mới</h2>
        <!-- Title Input -->
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Tên Danh Mục: </label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào tên sách..." v-model="CategoryInput.category_name" required>
        </div>

        <button @click="handleAddCategory()" type="submit" class="btn btn-light fw-bold" style="padding: 10px;;border:1px solid #ccc">Xác Nhận</button>
    </form>


    <!-- Giao diện bảng Show Sách -->
    <table class="table" border="1px" style="width:90vw;" id="table_manageCategory">
        <thead>
            <tr class="table-info text-center">
                <th scope="col">STT</th>
                <th scope="col">Tên Danh Mục</th>
                <th scope="col">Hành Động</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in ManageCategory">
                <td>
                    {{ index + 1 }}
                </td>
                <td>{{ item.category_name }}</td>
                <td>
                    <router-link :to="{
                        name: 'EditCategory',
                        params: { id: item._id },
                    }">
                        <button type="button" class="btn btn-warning"><i class="fa-regular fa-pen-to-square"></i> Sửa</button>
                    </router-link>

                    <br>
                    <br>

                    <button @click="deleteCategory(item._id)" type="button" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> Xóa</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>