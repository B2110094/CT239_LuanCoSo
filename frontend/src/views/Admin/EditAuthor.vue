<script>
import AuthorService from '../../services/Author.service';
import ToastVue from '../../components/Toast.vue';
import toast from '../../assets/js/toasts';
export default {
    components: {
        ToastVue
    },
    data() {
        return {
            AuthorDataInput: {
                author_name: ""
            },
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
        async loadDataAuthor() {
            try {
                const result = await AuthorService.getauthorwithID(this.$route.params.id);
                this.AuthorDataInput.author_name = result.author_name;
            } catch (err) {
                console.log(err);
            }
        },
        backPage() {
            setTimeout(() => {
                localStorage.setItem('backPage', 'quanlitacgia')
                this.$router.push("/admin")
            }, 100)
        },
        async handleEditAuthor() {
            try {
                await AuthorService.update(this.$route.params.id, this.AuthorDataInput)
                this.toasts.title = "Success",
                    this.toasts.msg = "Cập nhật tác giả thành công !"
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
                    this.toasts.msg = "Cập nhật tác giả thất bại !"
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
        this.loadDataAuthor();
    }
}
</script>
<template>
    <div class="container" style="margin-top:90px;">
        <ToastVue></ToastVue>
        <!-- Giao diện chỉnh sửa sách  -->
        <form @submit.prevent id="form_addAuthor" style="width:100%;">
            <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở về</button>

            <br>
            <h2 class="text-center" style="color:#62ab00">Chỉnh sửa tác giả</h2>
            <!-- Title Input -->
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Tên Tác Giả: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào tên tác giả..." v-model="AuthorDataInput.author_name" required>
            </div>

            <button @click="handleEditAuthor()" type="submit" class="btn btn-light fw-bold" style="padding: 10px;;border:1px solid #ccc">Xác Nhận</button>
        </form>
    </div>
</template>