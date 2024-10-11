<script>
import CategoryService from '../services/Category.service';
export default {
    data() {
        return {
            inputSearch: '',
            checkLogAdmin: '',
            ManageCategory: [],
            countCart: 0,
            userLoginname: '',
            userLoginID: '1'
        }
    },
    methods: {
        async showCategory() {
            try {
                this.ManageCategory = await CategoryService.getAllCategory();
                let cart_localStorage = JSON.parse(localStorage.getItem("productCart"));
                this.countCart = cart_localStorage.length;
            } catch (error) {
                console.log(error)
            }
        },
        showUserAlreadyLogin() {
            if (localStorage.getItem('adminlogin') != null) {
                this.checkLogAdmin = 'adminlogin';
                document.querySelector("#login_complete").style.display = 'block';
                this.userLoginname = 'Tài khoản Admin'
            } else {
                if (!localStorage.getItem('isloggin')) {
                    //Trường hợp chưa đăng nhập
                    document.querySelector("#not_login").style.display = 'block';
                    document.querySelector("#login_complete").style.display = 'none';
                } else {
                    //Trường hợp đã đăng nhập      
                    document.querySelector("#login_complete").style.display = 'block';
                    document.querySelector("#not_login").style.display = 'none';
                    this.userLoginname = JSON.parse(localStorage.getItem("isloggin")).username;
                    this.userLoginID = JSON.parse(localStorage.getItem("isloggin"))._id;
                }
            }
        },
        logout_Btn() {
            localStorage.removeItem("isloggin");
            localStorage.removeItem("adminlogin");
            localStorage.removeItem("productCart");
            this.$router.push('/login')
            setTimeout(() => {
                window.location.reload();
            }, 700)
        },
        loadPage() {
            setTimeout(() => {
                window.location.reload();
            }, 100)
        },
        navigationCategory() {
            setTimeout(() => {
                window.location.reload();
            }, 100)
        }
    },
    mounted() {
        this.showUserAlreadyLogin(),
            this.showCategory()
    },

}
</script>

<template>
    <!-- Header1 -->
    <nav class="navbar navbar-expand-lg navbar-light" id="top_nav">
        <div class="container" style="height: 82px;">
            <a class="navbar-brand" href="/" style="margin-right:150px;margin-bottom:10px;">
                <img src="../assets/img/fahasa-logo.webp" class="img-fluid" alt="..." width="200" height="200">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="input-group mb-3" v-if="checkLogAdmin !== 'adminlogin'">
                    <form action="/" class="d-flex" style="width:500px;margin-top: 18px;" @submit.prevent>
                        <input type="text" class="form-control" placeholder="Nhập vào tên sách" aria-label="Recipient's username" aria-describedby="basic-addon2" style="border-radius:6px;"
                            v-model="inputSearch">
                        <router-link v-if="inputSearch !== ''" :to="{
                            name: 'FindProduct',
                            params: { name: JSON.stringify(inputSearch) },
                        }">
                            <button id="btn_search" type="submit" style="width:120px;height:50px;border-radius:0 6px 6px 0" @click="loadPage()">Tìm Kiếm</button>
                        </router-link>
                    </form>
                </div>

                <div class="dropdown" style="margin-right: 20px;">
                    <button class="btn dropdown-toggle text-light fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                        style="border:2px solid black;background-color: black; padding:10px;z-index:10">
                        TÀI KHOẢN
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="list-style:none;color:black;font-size:15px">
                        <div class="container d-flex flex-column">
                            <!-- Đã đăng nhập -->
                            <div id="login_complete" style="display:none;z-index:100">
                                <div class="d-flex flex-column" style="width:120px;z-index:10;">
                                    <span class="fw-bold mb-1">
                                        <router-link :to="{
                                            name: 'infoUser',
                                            params: { id: userLoginID }
                                        }">
                                            <p style="margin-bottom:0;">{{ userLoginname }}</p>
                                        </router-link>
                                    </span>
                                    <span>
                                        <button @click="logout_Btn()" class="btn btn-danger text-white text-decoration-none text-dark" style="width:fit-content; height:35px; display:flex; align-items:center; margin-top: 3px; justify-content: center;">Đăng xuất</button>
                                    </span>
                                </div>
                            </div>
                            <!-- Chưa đăng nhập -->
                            <div id="not_login" style="display:none;z-index:100;">
                                <div class="d-flex flex-column" style="width:120px;z-index:10">
                                    <span class="fw-bold mb-1">
                                        <a href="#" class="text-decoration-none text-dark">
                                            <router-link to="/login" class="text-decoration-none text-dark"> Đăng Nhập</router-link>
                                        </a>
                                    </span>

                                    <span>
                                        <a href="#" class="text-decoration-none text-dark">
                                            <router-link to="/register" class="text-decoration-none text-dark"> Đăng Ký</router-link>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
                
            <!-- cart_icon -->
            <div id="icon_cart" style="margin-right:10px" v-if="checkLogAdmin !== 'adminlogin'">
                <router-link to="/cartStore">
                    <i class="fa-solid fa-cart-shopping" style="color:red;position:relative">
                        <span style="position: absolute;
                                    border-radius: 50%;
                                    background-color: black;
                                    color: white;
                                    top: -8px;
                                    right: -6px;
                                    border-radius: 50%;
                                    padding: 2px;
                                    font-size: 15px;
                                    width: 20px;
                                    height: 20px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;">{{ countCart }}
                        </span>
                    </i>

                </router-link>
            </div>
        </div>
        </div>
    </nav>

    <!-- Header 2 -->
    <nav class="navbar navbar-expand-lg navbar-light" id="nav_bottom" v-if="checkLogAdmin !== 'adminlogin'">
        <div class="container" style="height: 82px;">
            <div class="navbar-brand" href="#" style="margin-right: 50px;margin-left: 61px;">
                <div class="dropdown">
                    <button class="btn dropdown-toggle text-light fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                        style="border:2px solid white;padding:10px;z-index:10">
                        <i class="fa-solid fa-bars"></i>
                        &nbsp;
                        DANH MỤC SẢN PHẨM
                    </button>

                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="list-style:none;color:black;font-size:15px">
                        <div class="container d-flex flex-column">
                            <router-link @click="navigationCategory()" :to="{
                                name: 'CategoryBook',
                                params: { name: JSON.stringify('Tất Cả Sách') },
                            }">
                                <li>Tất cả sách</li>
                            </router-link>

                            <router-link @click="navigationCategory()" :to="{
                                name: 'CategoryBook',
                                params: { name: JSON.stringify(`${item.category_name}`) },
                            }" v-for="item in ManageCategory">
                                <li>{{ item.category_name }}</li>
                            </router-link>
                        </div>

                    </ul>
                </div>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="input-group mb-3 text-light" style="align-items: center;margin-bottom: 0 !important;">
                    <div class="col-lg-1" style="font-size:35px ;margin-right: -23px;">
                        <i class="fa-solid fa-headphones-simple"></i>
                    </div>
                    <div class="col-lg-5">
                        <div>
                            Hỗ trợ miễn phí 24/7
                        </div>
                    </div>
                </div>

                <div style="margin-left: -400px;z-index:10">
                    <ul class="nav d-flex">
                        <!-- <li class="nav-item" style="margin-right:15px;">
                            <router-link to="/" class="text-decoration-none text-white">
                                TRANG CHỦ
                            </router-link>
                        </li> -->
                        <li class="nav-item" style="margin-right:15px;">
                            <router-link to="/storesystem" class="text-decoration-none text-white">
                                HỆ THỐNG NHÀ SÁCH
                            </router-link>
                        </li>
                        <li class="nav-item" style="margin-right:15px;">
                            <router-link to="/introduce" class="text-decoration-none text-white">
                                THÔNG BÁO
                            </router-link>
                        </li>
                        <li class="nav-item" style="margin-right:15px;">
                            <router-link to="/contact" class="text-decoration-none text-white">
                                LIÊN HỆ
                            </router-link>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </nav>
</template>

<style>
ul {
    text-decoration: none;
    width: 100%;
}

a {
    text-decoration: none !important;
    line-height: 2.5rem;
    color: black;
}

.dropdown-menu li {
    text-decoration: none !important;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    margin: 1px;
}

.dropdown-menu li:hover {
    color: red;
}


#btn_search {
    background-color: red;
    color: white;
    font-weight: bold;
    border: none;
}


#icon_cart {
    color: red;
    font-size: 35px;
}


#top_nav {
    height: 83px;
}

#nav_bottom {
    background-color: red;
    height: 76px;
}

#myBtn {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
    font-size: 18px;
    border: none;
    outline: none;
    background-color: red;
    color: white;
    cursor: pointer;
    padding: 15px;
    border-radius: 4px;
}

#myBtn:hover {
    background-color: #555;
}

.nav-item a:hover {
    color: black !important;
}
</style>

