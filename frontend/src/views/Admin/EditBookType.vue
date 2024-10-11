<script>
import BookTypeService from '../../services/BookType.service';
import CategoryService from '../../services/Category.service';
import ToastVue from '../../components/Toast.vue';
import toast from '../../assets/js/toasts';
export default {
    components: {
        ToastVue
    },
    data() {
        return {
            BookTypeInput: {
                booktype_name: "",
                category_name: ""
            },
            ManageCategory: [],
            toasts: {
                title: "",
                msg: "",
                type: "",
                duration: 0
            },
        }
    },
    methods: {
        toast,
        async changeOption() {
            this.BookTypeInput.category_name = document.querySelector("#chooseDM").value;
        },
        async loadDataBookType() {
            try {
                const result = await BookTypeService.getbooktypewithID(this.$route.params.id);
                this.ManageCategory = await CategoryService.getAllCategory();
                this.BookTypeInput.booktype_name = result.booktype_name;
            } catch (err) {
                console.log(err);
            }
        },
        backPage() {
            setTimeout(() => {
                localStorage.setItem('backPage', 'quanlitheloai')
                this.$router.push("/admin")
            }, 100)
        },
        async handleEditBookType() {
            try {
                await BookTypeService.update(this.$route.params.id, this.BookTypeInput)
                this.toasts.title = "Success",
                    this.toasts.msg = "Cập nhật thể loại sách thành công !"
                this.toasts.type = "success",
                    this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast();
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                    this.$router.push("/admin")
                }, 1500)
            }
            catch (err) {
                this.toasts.title = "Failed",
                    this.toasts.msg = "Cập nhật thể loại thất bại !"
                this.toasts.type = "error",
                    this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast()
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        },
    },
    mounted() {
        this.loadDataBookType();
    }
}
</script>
<template>
    <div class="container" style="margin-top:90px;">
        <ToastVue></ToastVue>
        <!-- Giao diện chỉnh sửa sách  -->
        <form @submit.prevent id="form_addBookType" style="width:100%;">
            <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở về</button>

            <br>
            <h2 class="text-center" style="color:#62ab00">Thêm thể loại sách</h2>
            <!-- Title Input -->
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Tên thể loại: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào thể loại..." v-model="BookTypeInput.booktype_name" required>

                <br>
                <label for="exampleInputEmail1" class="form-label fw-bold">Chọn danh mục: </label>
                <br>
                <select class="form-control" :required="true" @change="changeOption" id="chooseDM">
                    <option v-for="item in ManageCategory" v-bind:value="item.category_name">{{ item.category_name }}</option>
                </select>
            </div>

            <button @click="handleEditBookType()" type="submit" class="btn btn-light fw-bold" style="padding: 10px;;border:1px solid #ccc">Xác Nhận</button>
        </form>

    </div>
</template>