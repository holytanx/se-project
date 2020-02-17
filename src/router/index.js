import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../components/Home.vue";
// import Admin from "../views/Admin.vue";
import AddMembers from "../views/AddMembers.vue";

// import Dean from "../views/Dean/Dean.vue";
// import Departments from "../views/Departments/Departments.vue";
import firebase from "firebase";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: {
      requiresGuest:true
    }
  },
  {
    path: "/AddMembers",
    name: "AddMembers",
    component: AddMembers,
    meta: {
      requiresAuth:true
    }
  }

//   {
//     path: "/Admin",
//     name: "Admin",
//     component: Admin,
//     meta: {
//       requiresAuth:true
//     }
//   },

//   {
//     path: "/Dean",
//     name: "Dean",
//     component: Dean,
//     meta: {
//       requiresAuth:true
//     }
//   },

//   {
//     path: "/Departments",
//     name: "Departments",
//     component: Departments,
//     meta: {
//       requiresAuth:true
//     }
//   },
//   {
//     path: "/AddMem",
//     name: "AddMember",
//     component: AddMember,
//     meta: {
//       requiresAuth:true
//     }
//   }
];

const router = new VueRouter({
  routes
});

//Nav guards
router.beforeEach(
(to, from, next) => {
  //Check for requiredAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)){
    //Check if not logged in
    if(!firebase.auth().currentUser){
      //Go to login page
      next({
        path:'/Login',
        query:{
          redirect: to.fullPath
        }
      });
    }else{
      //Proceed to route
      next();
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)){
       //Check if logged in
    if(firebase.auth().currentUser){
      //Go to login page
      next({
        path:'/',
        query:{
          redirect: to.fullPath
        }
      });
    }else{
      //Proceed to route
      next();
    }
  }else{
       //Proceed to route
       next();
  }
}
)

export default router;