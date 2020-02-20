import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../components/Home.vue";
import AddMembers from "../views/AddMembers.vue";
import StrategyManagement from "../views/StrategyManagement.vue";
import DeanDashboard from "../views/DeanDashboard"
import AdminDashboard from "../views/AdminDashboard"
import RegularDashboard from "../views/RegularDashboard"
import firebase from "firebase";
import {db} from '../main';

Vue.use(VueRouter);
const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  //   meta: {
  //     requiresAuth:true
  //   }
  // },
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
  },
  {
    path: "/StrategyManagement",
    name: "StrategyManagement",
    component: StrategyManagement,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: "/AdminDashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: "/RegularDashboard",
    name: "RegularDashboard",
    component: RegularDashboard,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: "/DeanDashboard",
    name: "DeanDashboard",
    component: DeanDashboard,
    meta: {
      requiresAuth:true
    }
  }
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
      db.collection("users").get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          if(doc.data().email == firebase.auth().currentUser.email){
            var dept_ID = doc.data().dept_id
            if(dept_ID == 10 || parseInt(dept_ID) == 10){
              next({
                path:'/AdminDashboard',
                query:{
                  redirect: to.fullPath
                }
              });
            }else if (dept_ID == 14 || parseInt(dept_ID) == 14){
              next({
                path:'/DeanDashboard',
                query:{
                  redirect: to.fullPath
                }
              });
            }else{
              next({
                path:'/RegularDashboard',
                query:{
                  redirect: to.fullPath
                }
              });            }
          }
        })
      })
     
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