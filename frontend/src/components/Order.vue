<script>
import UserService from '../services/User.service';
import ToastVue from './Toast.vue';
import toast from '../assets/js/toasts';
import OrderService from '../services/Order.service'


export default {
    components: {
        ToastVue
    },
    data() {
        return {
            ManageOrder: [],
            AuthorInput: {
                author_name: ""
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
        async getorderData() {
            try {
                this.ManageOrder = await OrderService.getAllOrder();
            } catch (error) {
                console.log(error)
            }
        },
        addAuthor() {
            document.querySelector("#table_manageAuthor").style.display = 'none'
            document.querySelector("#form_addAuthor").style.display = 'block'
            document.querySelector("#btn_addAuthor").style.display = 'none'
            document.querySelector("#pills-tabContent").style.margin = '0 auto'
            document.querySelector("#pills-tabContent").style.width = '100%'
            document.querySelector("#pills-tabContent").style.padding = '40px'
        },
        async handleAddAuthor() {
            try {
                console.log(this.AuthorInput)
                await AuthorService.create(this.AuthorInput)
                alert('Thêm tác giả thành công !')
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                    window.location.reload();
                }, 1000)
            }
            catch (err) {
                alert('Thêm tác giả thất bại ! ')
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        },
        async editOrder(Id_order) {
            this.$router.push(`/editorder/${Id_order}`)
        },
        async FindOrder(inputKeyWord) {
            if (inputKeyWord === '') {
                this.ManageOrder = await OrderService.getAllOrder();
            } else {
                try {
                    this.ManageOrder = await OrderService.findorderwithID(inputKeyWord);
                    if (this.ManageOrder.length == 0) {
                        alert('Không có đơn hàng tương ứng với khóa tìm kiếm !');
                        this.ManageOrder = await OrderService.getAllOrder();
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async filterOrder(statusOrderInput) {
            try {
                this.ManageOrder = await OrderService.getorderwithstatusorder(statusOrderInput);
            } catch (err) {
                console.log(err);
            }
        }
    },
    mounted() {
        this.getorderData();
    },

}
</script>
<template>
    <!-- <button type="button" id="btn_addAuthor" class="btn btn-success" @click="addAuthor()"><i class="fa-solid fa-plus"></i> Thêm Tài Khoản </button> -->


    <form action="/" class="d-flex mt-3" style="width:500px;margin:0 auto" id="inputSearchKeyWord" @submit.prevent>
        <input type="text" class="form-control" placeholder="Nhập vào số điện thoại khách hàng... " aria-label="Recipient's username" aria-describedby="basic-addon2" style="border-radius:6px;"
            v-model="inputSearch">
        <button id="btn_search" type="submit" style="width:120px;height:50px;border-radius:0 6px 6px 0" @click="FindOrder(inputSearch)">Tìm Kiếm</button>
    </form>
    <br>
    <br>
    <!-- Giao diện thêm danh mục -->
    <ToastVue></ToastVue>
    <form @submit.prevent id="form_addAuthor" style="display:none;width:100%;">
        <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở về</button>

        <br>
        <h2 class="text-center" style="color:#62ab00">Thêm tài khoản mới</h2>
        <!-- Title Input -->
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Tên Tác Giả: </label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào tên tác giả..." v-model="AuthorInput.author_name" required>
        </div>

        <button @click="handleAddAuthor()" type="submit" class="btn btn-light fw-bold" style="padding: 10px;;border:1px solid #ccc">Xác Nhận</button>
    </form>


    <h2>Lọc theo trạng thái đơn hàng</h2>
    <button type="button" class="btn btn-secondary" @click="filterOrder('Chưa xử lý')">Chưa xử lý</button>
    &nbsp;
    <button type="button" class="btn btn-primary" @click="filterOrder('Đã xử lý')">Đã xử lý</button>
    &nbsp;
    <button type="button" class="btn btn-info text-white" @click="filterOrder('Đang vận chuyển')">Đang vận chuyển</button>
    &nbsp;
    <button type="button" class="btn btn-success" @click="filterOrder('Đã giao hàng')">Đã giao hàng</button>
    &nbsp;
    <button type="button" class="btn btn-danger" @click="filterOrder('Hủy đơn hàng')">Hủy đơn hàng</button>
    &nbsp;

    <br>
    <br>

    <!-- Giao diện bảng Show Sách -->
    <table class="table" border="1px" style="with:90vw;" id="table_manageAuthor">
        <thead>
            <tr class="table-info text-center">
                <th scope="col">STT</th>
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Tên khách hàng</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Ngày đặt hàng</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Phương thức thanh toán</th>
                <th scope="col">Trạng thái đơn hàng</th>
                <th scope="col">Quản lý trạng thái ĐH</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in ManageOrder">
                <td>
                    {{ index + 1 }}
                </td>
                <td>{{ item._id }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.phonenumber }}</td>
                <td>
                    <p>{{ item.timecreateOrder }}</p>
                </td>
                <td>{{ item.totalOrder.toLocaleString() }} đ</td>
                <td>{{ item.payment }}</td>
                <td v-if="item.statusOrder === 'Chưa xử lý'" style="color:#6c757d;font-weight:bold">{{ item.statusOrder }}</td>
                <td v-else-if="item.statusOrder === 'Đã xử lý'" style="color:#0d6efd;font-weight:bold">{{ item.statusOrder }}</td>
                <td v-else-if="item.statusOrder === 'Đang vận chuyển'" style="color:#0dcaf0;font-weight:bold">{{ item.statusOrder }}</td>
                <td v-else-if="item.statusOrder === 'Đã giao hàng'" style="color:#198754;font-weight:bold">{{ item.statusOrder }}</td>
                <td v-else-if="item.statusOrder === 'Hủy đơn hàng'" style="color:#dc3545;font-weight:bold">{{ item.statusOrder }}</td>
                <td>


                    <button @click="editOrder(item._id)" type="button" class="btn btn-danger"> <i class="fa-solid fa-file-pen"></i> Sửa</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>