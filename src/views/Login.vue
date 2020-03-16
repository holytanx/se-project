<template>
  <v-card class="mt-4 mx-auto" max-width="460">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="#c43926"
      elevation="6"
      max-width="calc(100% - 80%)"
      style="height: 90px;"
    >
      <v-icon class="mt-7 mx-7" large color="white">mdi-account</v-icon>
    </v-sheet>
    <div class="title font-weight-bold">User Registration</div>

    <v-container fluid>
      <v-row justify="space-around">
        <v-col cols="8">
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
              color="#c43926"
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
<style>
.v-sheet--offset {
  top: 30px;
  right: 230px;
  position: relative;
}
</style>
