<template>
  <div class="home">
    <div id="header">
      <h1 id="headerName">โครงการย่อย
        <b-button v-b-modal.modal-prevent-closing variant="primary" id="addSubProject">เพิ่มโครงการ</b-button>
        <b-button variant="danger">ลบโครงการ</b-button>
      </h1>
      
    </div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Project"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="P_nameState"
          label="ชื่อโครงการ"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input id="name-input" v-model="Pname" :state="P_nameState" required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="M_nameState"
          label="ชื่อผู้รับผิดชอบ"
          label-for="M_name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input id="M_name-input" v-model="Mname" :state="M_nameState" required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="budgetState"
          label="งบประมาณ"
          label-for="budget-input"
          invalid-feedback="Budget is required"
        >
          <b-form-input id="budget-input" v-model="budget" :state="budgetState" required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="indicatorState"
          label="ตัวชี้วัด"
          label-for="indicator-input"
          invalid-feedback="Indicator is required"
        >
          <b-form-input id="indicator-input" v-model="indicator" :state="indicatorState" required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="valueState"
          label="ค่าเป้าหมาย(ของตัวชี้วัด)"
          label-for="value-input"
          invalid-feedback="Value is required"
        >
          <b-form-input id="value-input" v-model="value" :state="valueState" required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="planState"
          label="ยุทธศาสตร์"
          label-for="plan-input"
          invalid-feedback="Plan is required"
        >
          <b-form-input id="plan-input" v-model="plan" :state="planState" required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="pointerState"
          label="ประเด็นยุทธศาสตร์"
          label-for="pointer-input"
          invalid-feedback="Pointer is required"
        >
          <b-form-input id="pointer-input" v-model="pointer" :state="pointerState" required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="methodState"
          label="กลยุทธ์"
          label-for="method-input"
          invalid-feedback="Method is required"
        >
          <b-form-input id="method-input" v-model="method" :state="methodState" required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="methodState"
          label="ปี"
          label-for="year-input"
          invalid-feedback="Year is required"
        >
          <b-form-input id="year-input" v-model="year" :state="yearState" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
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

import firebase from "firebase";
import {db} from '../main' 
import { counter } from '@fortawesome/fontawesome-svg-core';
var pn;
var pm;
var b;
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

    data() {
    return {
      isLoggedin: false
      ,
      Pname: "",
      P_nameState: null,
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
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.P_nameState = valid;
      this.M_nameState = valid;
      this.budgetState = valid;
      this.indicatorState = valid;
      this.valueState = valid;
      this.pointerState = valid;
      this.planState = valid;
      this.methodState = valid;
      this.yearState = valid;
      return valid;
    },
    resetModal() {
      this.Pname = "";
      this.P_nameState = null;
      this.Mname = "";
      this.M_nameState = null;
      this.budget = "";
      this.budgetState = null;
      this.indicator = "";
      this.indicatorState = null;
      this.value = "";
      this.valueState = null;
      this.pointer = "";
      this.pointerState = null;
      this.Pname = "";
      this.planState = null;
      this.method = "";
      this.methodState = null;
      this.year = "";
      this.yearState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger push
      this.handlePush()
    },
    handlePush() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        let data = {
        sub_name: this.Pname,
        person_in_charge: this.Mname,
        budget: this.budget,
        ค่าเป้าหมาย: this.value,
        ตัวชี้วัด: this.indicator,
        ยุทธศาสตร์: this.planState,
        ประเด็นยุทธศาสตร์: this.pointer,
        กลยุทธ์: this.method,
        year: this.year,
        };
        let setDoc = db.collection('subprojects').doc(this.Pname).set(data);
      }
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
  margin-left: 65%;
  margin-right: 10px;
}
#header{
  margin-block: 20px
}
</style>
