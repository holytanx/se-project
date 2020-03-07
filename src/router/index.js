import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import AddMembers from "../views/AddMembers.vue";
import StrategyManagement from "../views/StrategyManagement.vue";
import DeanDashboard from "../views/DeanDashboard"
import DeanTotalBudget from"../views/DeanTotalBudget"
import AdminDashboard from "../views/AdminDashboard"
import RegularDashboard from "../views/RegularDashboard"
import BudgetManaget from "../views/BudgetManaget"
import MembersManagement from "../views/MembersManagement";
import SubprojectManagement from '@/views/SubprojectManagement';
import SubprojectHistory from '@/views/SubprojectHistory';
import firebase from "firebase";
import {db} from '../main';

Vue.use(VueRouter);
const routes = [

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresGuest:true
    }
  },
  {
    path: "/membersmanagement",
    name: "MembersManagement",
    component: MembersManagement,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: "/addmembers",
    name: "AddMembers",
    component: AddMembers,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: "/strategymanagement",
    name: "StrategyManagement",
    component: StrategyManagement,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: "/admindashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: "/regulardashboard",
    name: "RegularDashboard",
    component: RegularDashboard,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: "/subprojectmanagement",
    name: "SubprojectManagement",
    component: SubprojectManagement,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: "/subprojecthistory",
    name: "SubprojectHistory",
    component: SubprojectHistory,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: "/deandashboard",
    name: "DeanDashboard",
    component: DeanDashboard,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: "/deantotalbudget",
    name: "DeanTotalBudget",
    component: DeanTotalBudget,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: "/budgetmanaget",
    name: "BudgetManaget",
    component: BudgetManaget,
    meta: {
      requiredAuth:true
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
        path:'/login',
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
                path:'/admindashboard',
                query:{
                  redirect: to.fullPath
                }
              });
            }else if (dept_ID == 14 || parseInt(dept_ID) == 14){
              next({
                path:'/deantotalbudget',
                query:{
                  redirect: to.fullPath
                }
              });
            }else{
              next({
                path:'/regulardashboard',
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