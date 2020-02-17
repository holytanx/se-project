<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand :to="{ name: 'Home' }">SE Project</b-navbar-brand>

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

export default {
  name: "Header",
  data(){
    return {
      isLoggined: false,
      currentUser: false
    };
  },
    created(){
      if(firebase.auth().currentUser){
        this.isLoggined = true;
        this.currentUser = firebase.auth().currentUser.email;
      }
    
  },
  methods:{
    logout: function(){
      firebase.auth().signOut().then(() => {
            this.$router.go({ path: this.$router.path });
      });
      console.log("Logout");
    }
  }
};
</script>
