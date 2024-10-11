import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/views/Customer/HomePage.vue"),
  },
  {
    path: "/admin",
    name: "HomePageAdmin",
    component: () => import("@/views/Admin/HomePageAdmin.vue"),
  },
  {
    path: "/storesystem",
    name: "StoreSystem",
    component: () => import("@/views/Customer/StoreSystem.vue"),
  },
  {
    path: "/introduce",
    name: "Introduce",
    component: () => import("@/views/Customer/Introduce.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/Customer/Contact.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/RegisterPage.vue"),
  },
  {
    path: "/cartStore",
    name: "Cart",
    component: () => import("@/views/Customer/CartPage.vue"),
  },
  {
    path: "/detail/:id",
    name: "Details",
    component: () => import("@/views/Customer/DetailsProduct.vue"),
  },
  {
    path: "/findProduct/:name",
    name: "FindProduct",
    component: () => import("@/views/FindProduct.vue"),
  },
  {
    path: "/categoryBook/:name",
    name: "CategoryBook",
    component: () => import("@/views/Customer/CategoryBook.vue"),
  },
  {
    path: "/editBook/:id",
    name: "EditBook",
    component: () => import("@/views/Admin/EditBook.vue"),
  },
  {
    path: "/editCategory/:id",
    name: "EditCategory",
    component: () => import("@/views/Admin/EditCategory.vue"),
  },
  {
    path: "/editAuthor/:id",
    name: "EditAuthor",
    component: () => import("@/views/Admin/EditAuthor.vue"),
  },
  {
    path: "/editBookType/:id",
    name: "EditBookType",
    component: () => import("@/views/Admin/EditBookType.vue"),
  },
  {
    path: "/order",
    name: "OrderPage",
    component: () => import("@/views/Customer/OrderPage.vue"),
  },
  {
    path: "/order_complete/:id",
    name: "OrderCompletPage",
    component: () => import("@/views/Customer/OrderComplete.vue"),
  },
  {
    path: "/infoUser/:id",
    name: "infoUser",
    component: () => import("@/views/Customer/InfoUser.vue"),
  },
  {
    path: "/editinfoUser/:id",
    name: "editInfoUser",
    component: () => import("@/views/Admin/EditUser.vue"),
  },
  {
    path: "/detailorder/:id",
    name: "DetailOrder",
    component: () => import("@/views/Customer/DetailOrder.vue"),
  },
  {
    path: "/changepassword/:id",
    name: "ChangePassword",
    component: () => import("@/views/Customer/changePassword.vue"),
  },
  {
    path: "/editorder/:id",
    name: "editOrder",
    component: () => import("@/views/Admin/EditOrder.vue"),
  },
  {
    path: "/editStore/:id",
    name: "EditStore",
    component: () => import("@/views/Admin/EditStore.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name:"PageNotFound",
    component: () => import("@/views/404page.vue"),
  }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
