<template>
    <sidebar-menu  :menu="adminmenu"  />

  
</template>

<script>

import SideBar from '../components/SideBar'
import firebase from "firebase";
import {db} from '../main' 
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

    data() {
    return {
      isLoggedin: false
      ,
      user : ''
      ,
      deptID : null,
      adminmenu: [
        {
          header: true,
          title: "Welcome, ฝ่ายแผน (แอดมิน)",
          hiddenOnCollapse: true
        },
        {
          href: "/AdminDashboard",
          title: "จัดการโครงการ (เพิ่ม/ลบ/แก้ไข)",
          icon: "fa fa-user"
        },
        {
          href: "/AdminDashboard",
          title: "ประวัติย้อนหลังโครงการ",
          icon: "fa fa-chart-area",
        },
        {
          href: "/AdminDashboard",
          title: "จัดการ ยุทธ์ศาสตร์ (เพิ่ม/ลบ/แก้ไข)",
          icon: "fa fa-user"
        },
        {
          href: "/AddMembers",
          title: "เพิ่มสมาชิก / ผู้ใช้",
          icon: "fa fa-user"
        }
      ]
      
     
    };
  },
  created(){
//     var id = this
//       if(firebase.auth().currentUser){
//         this.isLoggined = true;
//         this.currentUser = firebase.auth().currentUser.email;
//         this.user = this.currentUser
//    db.collection("users").get().then(function(querySnapshot){
//           querySnapshot.forEach(function(doc){
//         // doc.data() is never undefined for query doc snapshots
//               if(doc.data().email == firebase.auth().currentUser.email){
//                 id.deptID = doc.data().dept_id
//                 console.log(id.deptID)
//                 if(id.deptID == 10 || parseInt(id.deptID) == 10){
//                   console.log("OK, You're an admin!")
//                 }else if (id.deptID == 14 || parseInt(id.deptID )==14){
//                   console.log("OK, You're a dean")
//                 }else{
//                   console.log("OK, You're regular member")
//                 }
//               }
//           })
//         })
//             }
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
