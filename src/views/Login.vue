<template>
  <v-sheet id="scrolling-techniques-6" class="overflow-y-auto" max-height="600">
    <v-container style="height: 1200px;">
      <v-card class="mx-auto" max-width="600">
        <v-container fluid>
          <v-row justify="space-around">
            <v-col cols="8">
              <v-form ref="form" v-model="valid" lazy-validation>
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
    </v-container>
  </v-sheet>
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
