<template>
  <div >
    <div class="container">
      <div class="row">
          <div class="col">
            <h3>เพิ่มสมาชิก</h3>
            <!-- <form  class="col s12">
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
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>-- กรุณาเลือกสาขาวิชา/ฝ่าย/ตำแหน่งของสมาชิกที่ต้องการเพิ่ม --</b-form-select-option>
                </template>
              </b-form-select>
                  <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
              </div>
                <b-button @click="registerAuth()+addMember()" variant="success">เพิ่ม</b-button>
                <b-button  variant="danger"><router-link to="/">ยกเลิก</router-link></b-button>
            </form> -->
            <form>
              <v-text-field
                v-model="email"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
                <v-text-field
                v-model="password"
                label="Password"
                required
                type="password"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>
              <v-select
                v-model="selected"
                :items="departments"
                label="Item"
                required
                @change="$v.select.$touch()"
                @blur="$v.select.$touch()"
              ></v-select>

              <v-btn class="mr-4" @click="registerAuth()+addMember()">submit</v-btn>
              <v-btn @click="clear">clear</v-btn>
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
    },
        submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
  }
};
</script>

