<template>
  <!-- <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel grey lighten-4 black-text center">
            <h3>Login</h3>
            <form action="index.html">
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input type="email" id="email" v-model="email" />
              </div>
              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input type="password" id="password" v-model="password" />
              </div>
              <button
                v-on:click="login"
                class="btn btn-large btn-extended grey lighten-4 black-text"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <v-container>
  <v-row 
  justify="center"
  >
    <v-col cols="6">
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      type="password"
      label="Password"
      required
    ></v-text-field>

 

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      v-on:click="login"
    >
      เข้าสู่ระบบ
    </v-btn>

  </v-form>
    </v-col>
  </v-row>
  </v-container>
</template>


<script>
import firebase from "firebase";
export default {
  name: "Login",
  data: function() {
    return {
      email: "",
      password: "",
      valid: true,

    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert("You are logged in as " + this.email);
             this.$router.go({ path: this.$router.path });

          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>

<style lang="scss" scoped></style>
