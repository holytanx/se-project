<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand>
                  <router-link :to="this.link">Home</router-link>

        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <span class="email black-text" v-if="isLoggined">{{currentUser}}</span>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" v-if="!isLoggined"><router-link to="/Login">เข้าสู่ระบบ</router-link></b-button>
            <b-button size="sm" class="my-2 my-sm-0" v-on:click="logout"  v-if="isLoggined">ออกจากระบบ</b-button>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>


<script>
import firebase from "firebase";
import {db} from '../main'

export default {
  name: "Header",
  data(){
    return {
      isLoggined: false,
      currentUser: false,
      user : ''
      ,
      deptID : null,
      link : ''
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

  }
};
</script>
