<template>
  <div>
    <div class="container">
      <div class="row">
          <div class="login card-panel grey lighten-4 black-text center">
            <h3>เพิ่มสมาชิก</h3>
            <form  class="col s12">
                <div class="row">
              <div class="input-field col s12">
                <label>Email</label>
                <input type="email" id="email" v-model="email" required />
              </div>
              </div>
                <div class="row">
              <div class="input-field col s12">
                <label>Password</label>
                <input type="password" id="password" v-model="password" required />
              </div>
              </div>
              <div>
              <b>สาขาวิชา/ฝ่าย/ตำแหน่ง</b>
               <b-form-select v-model="selected" :options="departments" class="mb-3">
                <!-- This slot appears above the options from 'options' prop -->
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>-- กรุณาเลือกสาขาวิชา/ฝ่าย/ตำแหน่งของสมาชิกที่ต้องการเพิ่ม --</b-form-select-option>
                </template>
              </b-form-select>
                  <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
              </div>
                <b-button @click="registerAuth()+addMember()" variant="success">เพิ่ม</b-button>
                <b-button  variant="danger"><router-link to="/">ยกเลิก</router-link></b-button>

            </form>
          </div>
         
        </div>
      </div>
    </div>
</template>

<script>
import firebase from "firebase";
import { db } from '../main';
export default {
  name: "AddMembers",
  data: function() {
    return {
      selected: null,
        departments:[]
        ,
      email: "",
      password: ""
    };
  },
  firestore(){
    return {

}
  },
  created(){
    db.collection('departments').get().then(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          const data ={
            'value' : doc.id,
            'text' : doc.data().deptname
          }
          this.departments.push(data)
        })
      }
    )
  }
  ,
  methods: {
  
    
    registerAuth(){
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert("Account created for " + this.email);
            // this.$router.go({ path: this.$router.path });
          },
          err => {
            alert(err.message);
          }
        );
    },
    addMember(){
      db.collection('users').add({
        email : this.email,
        dept_id: this.selected
      })
      console.log("Added successfully")
    }
  }
};
</script>

