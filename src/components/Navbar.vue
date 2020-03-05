<template>
<div>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon v-if="isLoggined" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">

       <span class="mr-2 display-1 font-weight light">
         SE-Project
       </span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href=""
        target="_blank"
        text
      >
        <span class="mr-2" v-if="!isLoggined"><router-link to="/Login">เข้าสู่ระบบ</router-link></span>
        <span class="mr-2" v-if="isLoggined" v-on:click="logout">ออกจากระบบ</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      
    </v-app-bar>
     <v-navigation-drawer
        v-model="drawer"
        :color="color"
        width="300"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        absolute

        dark
      >
        <v-list
          dense
          nav
          class="py-0"
        >
        <v-list-item two-line :class="miniVariant && 'px-0'">

          </v-list-item>
          <v-divider>
          </v-divider>
          <div v-if="this.deptID===10 || 10 === parseInt(this.deptID)">
          <v-list-item 
            v-for="item in admin_items" :key="item.title" :to="item.link" >
            <v-list-item-icon> 
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title >{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          </div>
          <div v-if="this.deptID===14 || 14 === parseInt(this.deptID)">
          <v-list-item 
            v-for="item in dean_items" :key="item.title" :to="item.link" >
            <v-list-item-icon> 
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title >{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          </div>
          <div v-if="this.deptID!=14 && 14 != parseInt(this.deptID) && this.deptID!=10 && 10 != parseInt(this.deptID)  ">
          <v-list-item 
            v-for="item in regular_items" :key="item.title" :to="item.link" >
            <v-list-item-icon> 
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title >{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          </div>
                  <v-list-item two-line :class="miniVariant && 'px-0'">
         <v-list-item-content>
              <v-list-item-title justify="center" v-if="this.deptID==10">ยินดีต้อนรับแอดมิน (ฝ่ายแผน)</v-list-item-title>
              <v-list-item-title justify="center" v-if="this.deptID==14">ยินดีต้อนรับคณบดี/รอง</v-list-item-title>
              <v-list-item-title justify="center" v-if="this.deptID!=10 && this.deptID!=14 ">ยินดีต้อนรับสมาชิกทั่วไป</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      
          </v-list>

      </v-navigation-drawer>
      
    </div>
    
</template>


<script>
import firebase from "firebase";
import {db} from '../main'

export default {
  name: "Navbar",
  data(){
    return {
 
      isLoggined: false,
      currentUser: false,
      user : '',
      deptID : null,
      link : '',
       drawer: false,
             group: null,

        admin_items: [
          { title: 'จัดการโครงการ (เพิ่ม/ลบ/แก้ไข)', icon: 'mdi-view-dashboard',link:"/AdminDashboard" },
          { title: 'ประวัติย้อนหลังโครงการ', icon: 'mdi-history', link:"/" },
          {title: 'จัดการ ยุทธ์ศาสตร์ (เพิ่ม/ลบ/แก้ไข)', icon: 'mdi-strategy', link:"/StrategyManagement"},
          {title: "เพิ่มสมาชิก / ผู้ใช้", icon:'mdi-account-plus-outline', link:"/AddMembers"}
        ],
        dean_items: [
         { title: 'สรุปยอดงบประมาณรายปี', icon: 'mdi-view-dashboard', link:"/DeanTotalBudget" },
          { title: 'สรุปยอดงบประมาณแต่ละสาขารายปี', icon: 'mdi-account', link:"/" },
          {title: 'ตรวจสอบโครงการที่กำลังดำเนินการ', icon: 'mdi-timer-sand' , link:"/"},

        ],
        regular_items: [
          { title: 'จัดการโครงการ (เพิ่ม/ลบ/แก้ไข)', icon: 'mdi-view-dashboard' ,link:"/RegularDashboard"},
          { title: 'ประวัติย้อนหลังโครงการ', icon: 'mdi-history',link:"/" },
        ],
        color: 'indigo',
        right: false,
        miniVariant: false,
        expandOnHover: true,
        background: false,
    };
  },
    created(){
    
       var id = this
      if(firebase.auth().currentUser){
        this.isLoggined = true;
        this.currentUser = firebase.auth().currentUser.email;
        this.user = this.currentUser
   db.collection("users").get().then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
        // doc.data() is never undefined for query doc snapshots
              if(doc.data().email == firebase.auth().currentUser.email){
                id.deptID = doc.data().dept_id
                console.log(id.deptID)
                if(id.deptID == 10 || parseInt(id.deptID) == 10){
                  console.log("OK, You're an admin!")
                  id.link= "/AdminDashboard"
                }else if (id.deptID == 14 || parseInt(id.deptID )==14){
                  console.log("OK, You're a dean")
                  id.link= "/DeanDashboard"

                }else{
                  console.log("OK, You're regular member")
                  id.link= "/RegularDashboard"
  
                }
              }
          })
        })
      }  
  },
  methods:{
    logout: function(){
      firebase.auth().signOut().then(() => {
            this.$router.go({ path: this.$router.path });
      });
      console.log("Logout");
    },

  },
     watch: {
      group () {
        this.drawer = false
      },
     }
};
</script>
