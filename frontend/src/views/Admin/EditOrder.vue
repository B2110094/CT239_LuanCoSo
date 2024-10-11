<script>
import OrderService from '../../services/Order.service';
import StoreService from '../../services/Store.service';

export default {
    data() {
        return {
            detailOrder: '',
            dataShow: {
                title: '',
                img_url: '',
                price: '',
            },
            dataOrderInput: {
                iduser: "",
                username: "",
                email: "",
                phonenumber: "",
                address: "",
                payment: "",
                detail_cart: [],
                statusOrder: "",
                totalOrder: ""
            },
            StoreInput: {
                id_product : "",
                sellquantity: ""
            },
            idOrder: '',
            statusOrder: '',
            statusChoose: ['Chưa xử lý','Đã xử lý','Đang vận chuyển','Đã giao hàng','Hủy đơn hàng']
        }
    },
    methods: {
        async loadDataOrderDetail() {
            const data = await OrderService.getOrderWithID(this.$route.params.id)
            this.statusOrder = data.statusOrder
            this.idOrder = this.$route.params.id;
            this.detailOrder = data.detail_cart;
        },
        backPage() {
            setTimeout(()=>{
                localStorage.setItem('backPage', 'quanlidonhang')
                this.$router.push(`/admin`)
            },100)
        },
        changeOptionTG(){
            this.dataOrderInput.statusOrder = document.querySelector("#chooseDO").value;
        },
        async editOrder(){
            try{
                let dataValue = await OrderService.getDataOrderWithIDOrder(this.$route.params.id);
                this.dataOrderInput.iduser = dataValue.iduser;
                this.dataOrderInput.username = dataValue.username;
                this.dataOrderInput.email = dataValue.email;
                this.dataOrderInput.phonenumber = dataValue.phonenumber;
                this.dataOrderInput.address = dataValue.address;
                this.dataOrderInput.payment = dataValue.payment;
                this.dataOrderInput.detail_cart = dataValue.detail_cart;
                this.dataOrderInput.totalOrder = dataValue.totalOrder;


                if(this.dataOrderInput.statusOrder === "Đã giao hàng"){
                    //Kiểm tra và cập nhật số lượng sản phẩm bán ra khi đã chọn Đã vận chuyển
                    const data = await OrderService.getOrderWithID(this.$route.params.id)
                    let cartOrder = data.detail_cart;

                    for (let i = 0; i < cartOrder.length; i++) {
                        let id_productInCartDetail = cartOrder[i].id_product;
                        let sellquantity_productInCartDetail = cartOrder[i].quantity_product;
                        let dataStoreCheck = await StoreService.getStorewithID(id_productInCartDetail);
                        console.log(dataStoreCheck)

                        if (!dataStoreCheck) {
                            this.StoreInput.id_product = id_productInCartDetail;
                            this.StoreInput.sellquantity = sellquantity_productInCartDetail;
                            await StoreService.create(this.StoreInput)
                        } else {
                            console.log('da trung ')
                            this.StoreInput.sellquantity = parseInt(dataStoreCheck.sellquantity) + parseInt(sellquantity_productInCartDetail);
                            console.log(this.StoreInput.sellquantity)
                            await StoreService.update(id_productInCartDetail, this.StoreInput);
                        }
                    }
                }

                await OrderService.updateOrder(this.$route.params.id, this.dataOrderInput);
                alert("Cập nhật đơn hàng thành công!")
                this.loadDataOrderDetail()
            }catch(err){
                console.log(err)
                alert("Cập nhật đơn hàng thất bại!")
            }

        }
    },
    created() {
        this.loadDataOrderDetail()
    }
}
</script>
<template>
    <div class="container" id="orderDetail">
        <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở về</button>
        <br>
        <br>
        <h5 style="color:#62ab00;">ĐƠN HÀNG: {{ idOrder }}</h5>
        <br>
        <h5>CHI TIẾT ĐƠN HÀNG - <span style="color:red;font-weight:bold">({{ statusOrder }})</span></h5>
        <br>
        <form @submit.prevent>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Trạng thái đơn hàng: </label>
                <select class="form-control" :required="true" @change="changeOptionTG" id="chooseDO">
                    <option v-bind:value="statusChoose[0]">Chưa xử lý</option>
                    <option v-bind:value="statusChoose[1]">Đã xử lý</option>
                    <option v-bind:value="statusChoose[2]">Đang vận chuyển</option>
                    <option v-bind:value="statusChoose[3]">Đã giao hàng</option>
                    <option v-bind:value="statusChoose[4]">Hủy đơn hàng</option>
                </select>
            </div>
            <input type="submit" value="Cập nhật" @click="editOrder()" style="border:1px solid red; padding:10px;background-color:red;color:white;border-radius:5px;margin-bottom:10px;">
        </form>
        
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tổng cộng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in detailOrder">
                    <td>{{ ++index }}</td>
                    <td>{{ item.title_product }}</td>
                    <td>
                        <img v-bind:src="item.img_product" alt="" width="100" height="100">
                    </td>
                    <td>{{ item.price_product }}</td>
                    <td>{{ item.quantity_product }}</td>
                    <td>{{ (item.price_product * item.quantity_product).toLocaleString() }} đ</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
#orderDetail {
    margin-left: 150px;
    margin-top: 100px;
}
</style>