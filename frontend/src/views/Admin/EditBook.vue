<script>
import ProductService from '../../services/Product.service';
import CategoryService from '../../services/Category.service';
import BookTypeService from '../../services/BookType.service';
import AuthorService from '../../services/Author.service';
import ToastVue from '../../components/Toast.vue';
import toast from '../../assets/js/toasts';
export default {
    components: {
        ToastVue
    },
    data() {
        return {
            BookDataInput: {
                img_url: [],
                title: "",
                author: "",
                categories: "",
                description: "",
                price: "",
                bookType: "",
            },
            ManageAuthor: [],
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
        async changeOptionDM() {
            this.BookDataInput.categories = document.querySelector("#chooseDM").value;
        },
        async changeOptionTL() {
            this.BookDataInput.bookType = document.querySelector("#chooseTL").value;
        },
        async changeOptionTG() {
            this.BookDataInput.author = document.querySelector("#chooseTG").value;
        },
        async loadDataEditBook() {
            try {
                const result = await ProductService.getproductwithID(this.$route.params.id);
                this.ManageBookType = await BookTypeService.getAllBookType();
                this.ManageAuthor = await AuthorService.getAllAuthor();
                this.ManageCategory = await CategoryService.getAllCategory();
                this.BookDataInput.img_url[0] = result.img_url[0]
                this.BookDataInput.img_url[1] = result.img_url[1]
                this.BookDataInput.img_url[2] = result.img_url[2]
                this.BookDataInput.title = result.title;
                this.BookDataInput.author = result.author;
                this.BookDataInput.categories = result.categories;
                this.BookDataInput.description = result.description;
                this.BookDataInput.price = result.price;
                this.BookDataInput.bookType = result.bookType;
            } catch (err) {
                console.log(err);
            }
        },
        backPage() {
            setTimeout(() => {
                localStorage.setItem('backPage', 'quanlisach')
                this.$router.push("/admin")
            }, 100)
        },
        async handleEditBook() {
            try {
                await ProductService.update(this.$route.params.id, this.BookDataInput)
                this.toasts.title = "Success",
                    this.toasts.msg = "Cập nhật sách thành công !"
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
                console.log(this.BookDataInput)
                this.toasts.title = "Failed",
                    this.toasts.msg = "Cập nhật sách thất bại !"
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
        this.loadDataEditBook();
    }
}
</script>
<template>
    <div class="container" style="margin-top:90px;">
        <ToastVue></ToastVue>
        <!-- Giao diện chỉnh sửa sách  -->
        <form @submit.prevent id="form_addBook" style="width:100%;">

            <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở về</button>

            <br>
            <h2 class="text-center" style="color:#62ab00">Chỉnh sửa sách</h2>
            <!-- Title Input -->
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Tên Sách: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào tên sách..." v-model="BookDataInput.title" required>
            </div>

            <!-- Img Input -->
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label fw-bold">Hình Ảnh Sách:(3 ảnh)</label>
                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Đưa vào Link hình ảnh sách..." v-model="BookDataInput.img_url[0]" required>
                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Đưa vào Link hình ảnh sách..." v-model="BookDataInput.img_url[1]" required>
                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Đưa vào Link hình ảnh sách..." v-model="BookDataInput.img_url[2]" required>
            </div>

            <!-- Author Input -->
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Tác giả: </label>
                <select class="form-control" :required="true" @change="changeOptionTG" id="chooseTG">
                    <option v-for="item in ManageAuthor" v-bind:value="item.author_name">{{ item.author_name }}</option>
                </select>
            </div>


            <!-- Categories Input -->
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Tên danh mục: </label>
                <select class="form-control" :required="true" @change="changeOptionDM" id="chooseDM">
                    <option v-for="item in ManageCategory" v-bind:value="item.category_name">{{ item.category_name }}</option>
                </select>
            </div>

            <!-- BookType Input -->
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Thể loại: </label>
                <select class="form-control" :required="true" @change="changeOptionTL" id="chooseTL">
                    <option v-for="item in ManageBookType" v-bind:value="item.booktype_name">{{ item.booktype_name }}</option>
                </select>
            </div>

            <!-- Price Input -->
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Giá bán: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập vào giá cuốn sách..." v-model="BookDataInput.price" required>
            </div>


            <!-- Description Input -->
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Mô tả: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập vào mô tả sách..." v-model="BookDataInput.description" required>
            </div>


            <button @click="handleEditBook()" type="submit" class="btn btn-light fw-bold" style="padding: 10px;;border:1px solid #ccc">Xác Nhận</button>
        </form>
    </div>
</template>