<template>
  <div class="home">
    <sidebar-menu  :menu="regularmenu"/>
    <div id="header">
      <h1 id="headerName">โครงการย่อย
        <b-button variant="primary" id="addSubProject">เพิ่มโครงการ</b-button>
      </h1>
      
    </div>
    <div>
      <b-table striped hover :items="pp" :fields="fields" id="project_table">
        <template v-slot:cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template v-slot:cell(จัดการ)>
          <router-link to="/budget-managet">รายละเอียดโครงการ</router-link>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>

import SideBar from '../components/SideBar'
import firebase from "firebase";
import {db} from '../main' 
import { counter } from '@fortawesome/fontawesome-svg-core';
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
      fields: [
        {
          key: 'index',
          label: 'ลำดับ',
          sortable: true
        },
        {
          key: 'sub_name',
          label: 'ชื่อโครงการ',
          sortable: true
        },
        {
          key: 'person_in_charge',
          label: 'ผู้รับผิดชอบ',
          sortable: true
        },
        {
          key: 'budget',
          label: 'งบประมาณ',
          sortable: true
        },
        'จัดการ'
        ],
      regularmenu: [
        {
          header: true,
          title: "Welcome, สมาชิกทั่วไป",
          hiddenOnCollapse: true
        },
        {
          href: "/RegularDashboard",
          title: "จัดการโครงการ (เพิ่ม/ลบ/แก้ไข)",
          icon: "fa fa-user"
        },
        {
          href: "/RegularDashboard",
          title: "ประวัติย้อนหลังโครงการ",
          icon: "fa fa-chart-area"

        },
      ], 
      pp: []
    };
  },
  mounted() {
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
    console.log('ok')
    db.collection('subprojects').get().then(
     querySnapshot => {
      //  console.log(querySnapshot)
       querySnapshot.forEach(doc => {
         this.pp.push(doc.data())
         const data ={
           'project_name' : doc.id
         }
         console.log(this.pp);
         
       })
     }
   )
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
#project_table{
  text-align: left 
}
#addSubProject{
  margin-left: 75%
}
#header{
  margin-block: 20px
}
</style>
