<script>
import ProductService from '../../services/Product.service';
import CategoryService from '../../services/Category.service';
import BookTypeService from '../../services/BookType.service';
import AuthorService from '../../services/Author.service';
export default {
    data() {
        return {
            categoryProduct: [],
            booktypeProduct:[],
            ManageCategory: [],
            ManageBookType: [],
            ManageAuthor : [],
            nameCategory: '',
            nameBooktype: '',
        }
    },
    watch: {
        '$route': 'getDetailDataProduct'
    },
    methods: {
        async showCategory() {
            try {
                this.ManageCategory = await CategoryService.getAllCategory();
            } catch (error) {
                console.log(error)
            }
        },
        async showBookType() {
            try {
                this.ManageBookType = await BookTypeService.getAllBookType();
            } catch (error) {
                console.log(error)
            }
        },
        async showAuthor(){
            try{
                this.ManageAuthor = await AuthorService.getAllAuthor();
            }catch(error){
                console.log(error)
            }
        },
        async getDetailDataProduct() {
            try {
                this.categoryProduct = await ProductService.getcategoryProduct(JSON.parse(this.$route.params.name));
                this.nameCategory = JSON.parse(this.$route.params.name);
            } catch (error) {
                console.log(error)
            }
        },
    },
    created() {
        this.getDetailDataProduct()
    },
    mounted(){
        this.showCategory();
        this.showBookType();
        this.showAuthor();
    }
}

</script>


<template>
    <div class="container" id="category_book">
    <!-- BreadCrumb -->
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb" style="align-items: center;">
            <li class="breadcrumb-item">
                <router-link to="/" style="color:black">Trang chủ</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ nameCategory }}</li>
        </ol>
    </nav>

    <!-- Navbar and content category -->
    <div class="row">
        <!-- Left_nav -->
        <div class="col-lg-3" id="left_nav" style="height:fit-content;">
            <h4 style="margin-top: 20px;">Phân loại theo loại sách</h4>
            <ul>
                <router-link @click="navigationCategory('Tất Cả Sách')" :to="{
                    name: 'CategoryBook',
                    params: { name: JSON.stringify('Tất Cả Sách') },
                }">
                    <li>Tất cả sách</li>
                </router-link>


                <router-link @click="navigationCategory()" :to="{
                    name: 'CategoryBook',
                    params: { name: JSON.stringify(`${item1.category_name}`) },
                }" v-for="item1 in ManageCategory"> 
                    <li>{{ item1.category_name }}
                        <ul>
                            <router-link @click="navigationCategory()" :to="{
                                name: 'CategoryBook',
                                params: { name: JSON.stringify(`${item.booktype_name}`) },
                            }" v-for="item in ManageBookType">
                                <li v-if="item.category_name === item1.category_name">{{ item.booktype_name }}</li>
                            </router-link>
                        </ul>
                    </li>
                </router-link>
            </ul>

            <br>
            <h4>Phân loại theo tác giả</h4>
            <ul>
                <router-link @click="navigationCategory()" :to="{
                    name: 'CategoryBook',
                    params: { name: JSON.stringify(`${item3.author_name}`) },
                }"  v-for="item3 in ManageAuthor">
                    <li>{{item3.author_name}}</li>
                </router-link>

            </ul>
        </div>
            <!-- Right_content -->
            <!-- Danh Mục & Thể Loại-->
            <div class="col-lg right_content" id="danhmuc">
                <h3 style="color:red;margin:10px;">{{ nameCategory }}</h3>
                <div class="container row">
                    <div class="col-lg-4 mt-3 mb-3" v-for="item in categoryProduct" data-aos="fade-left">
                        <div class="card" style="width: 18rem;">
                            <img :src="item.img_url[0]" class="card-img-top" alt="..." width="190" height="190" style="object-fit: contain;">
                            <div class="card-body">
                                <span class="card-title" style="height:48px">{{ item.title }}</span>
                                <p class="card-text"><span class="fw-bold"> Giá bán:</span> <span class="text-danger fw-bold"> {{ item.price.toLocaleString() }} đ</span></p>
                                <router-link :to="{
                                    name: 'Details',
                                    params: { id: item._id },
                                }">
                                    <button type="button" class="btn" id="btn_detail">Xem chi tiết</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<style>
#category_book {
    margin-left: 170px;
    margin-top: 20px;
}

#left_nav,
.right_content {
    border: 1px solid #ccc;
    border-radius: 10px;
}

#left_nav ul li {
    list-style: none;
    margin-top: 20px;

}

#left_nav {
    margin-right: 20px;
}

.card-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

#btn_detail {
    background-color: blue;
    width: 100%;
    font-weight: bold;
    color: white;
}
</style>