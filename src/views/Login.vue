<template>
  <v-card class="mx-auto" max-width="600">
    
    <v-container>
      <v-row justify="center">
        <v-col cols="6">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="email" label="Email" required></v-text-field>

            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="#418081"
              class="mr-4 white--text"
              v-on:click="login"
            >
              เข้าสู่ระบบ
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import firebase from "firebase";
export default {
  name: "Login",
  data: function() {
    return {
      email: "",
      password: "",
      valid: true
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
