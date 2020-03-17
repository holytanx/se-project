<template>
  <div >
    <div class="container">
      <div class="row">
          <div class="col">
            <h3>เพิ่มสมาชิก</h3>
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

