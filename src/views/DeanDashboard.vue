<template>
  <div class="home">
    <sidebar-menu  :menu="deanmenu"  />

  </div>
  
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
    //   user : ''
    //   ,
    //   deptID : null,
       deanmenu: [
        {
          header: true,
          title: "Welcome, ท่านคณบดีและรองคณบดี",
          hiddenOnCollapse: true
        },
        {
          href: "/DeanTotalBudget",
          title: "สรุปยอดงบประมาณรายปี",
          icon: "fa fa-user"
        },
        {
          href: "/DeanDashboard",
          title: "สรุปยอดงบประมาณแต่ละสาขารายปี",
          icon: "fa fa-chart-area"
        },
        {
          href: "/DeanDashboard",
          title: "ตรวจสอบโครงการที่กำลังดำเนินการ",
          icon: "fa fa-chart-area"
        },

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
