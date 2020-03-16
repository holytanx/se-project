<template>
  <v-sheet id="scrolling-techniques-5" class="overflow-y-auto" max-height="800">
    <v-container >
      <v-layout row justify-space-between>
        <v-flex md6>
          <v-card class="mx-auto" max-width="360">
            <v-card-text>
              <p class="headline">จำนวนโครงการที่ดำเนินการ</p>
              <div class="display-2 text-center">
                <p id="numOf_Continued"></p>
              </div>
              <div class="text-lg-right">โครงการ</div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex md6>
          <v-card max-width="360">
            <v-card-text>
              <p class="headline">จำนวนโครงการที่เสร็จสิ้น</p>
              <div class="display-2 text-center">
                <p id="numOf_Finished"></p>
              </div>
              <div class="text-lg-right">โครงการ</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <br />
      <br />
      <div class="center">
        <v-layout row wrap>
          <v-flex xs4 offset-xs2>
            <v-card class="mx-auto" max-width="300">
              <v-card-text>
                <p class="headline">งบประมาณทั้งหมดรวม</p>
                <div class="display-2 text-center">
                  <p id="totalAmount"></p>
                </div>
                <div class="text-lg-right">บาท</div>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card class="mx-auto" max-width="300">
              <v-card-text>
                <p></p>
                <p class="headline">งบประมาณคงเหลือ</p>
                <div class="display-2 text-center">
                  <p id="totalRemain"></p>
                </div>
                <div class="text-lg-right">บาท</div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-sheet>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import { counter } from "@fortawesome/fontawesome-svg-core";

export default {
  name: "RegularDashboard",

  data() {
    return {
      sub_project_doc: "",
      enabled: null,
      sub_project: [],
      finish_projects: [],
      selected_finish_project: [],
      deposit_amount: null,
      isLoggedin: false,
      expanded: {},
      singleExpand: false,
      projects: [],
      strategicissues: [],
      strategic: [],
      tactics: []
    };
  },
  watch: {
    enabled() {
      // this.items = this.projects
      var main = this.enabled;
      function getSub(item) {
        let sub = Object.fromEntries(
          Object.entries(item).map(([key, value]) => [key, value])
        );
        console.log(sub.project_id);
        if (sub.project_id == main) {
          return sub;
        }
      }
      var list = this.sub_project.filter(getSub);
      this.items = list;
    }
  },

  methods: {},
  created() {},
  mounted() {
    var id = this;
    const continued = document.querySelector("#numOf_Continued");
    const finished = document.querySelector("#numOf_Finished");
    const totalAmount = document.querySelector("#totalAmount");
    const totalRemain = document.querySelector("#totalRemain");
    if (firebase.auth().currentUser) {
      this.isLoggined = true;
      this.currentUser = firebase.auth().currentUser.email;
      this.user = this.currentUser;
      db.collection("users")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            if (doc.data().email == firebase.auth().currentUser.email) {
              id.deptID = doc.data().dept_id;
              if (id.deptID == 0 || parseInt(id.deptID) == 0) {
                console.log("EE");
                var nums1 = 0;
                var nums2 = 0;
                var sum1 = 0;
                var sum2 = 0;
                db.collection("ee_subproject")
                  .get()
                  .then(querySnapshot => {
                    //  console.log(querySnapshot)
                    querySnapshot.forEach(docs => {
                      // this.pp.push(doc.data())
                      var budget = parseInt(docs.data().budget);
                      var budget_remain = parseInt(docs.data().budget_remain);
                      if (isNaN(budget)) {
                        budget = 0;
                        sum1 += budget;
                        totalAmount.innerHTML = sum1;
                      } else {
                        sum1 += budget;
                        totalAmount.innerHTML = sum1;
                      }
                      if (docs.data().isFinish == false) {
                        nums1 = nums1 + 1;
                        continued.innerHTML = nums1;
                      } else if (docs.data().isFinish == true) {
                        nums2 = nums2 + 1;
                        finished.innerHTML = nums2;
                      }
                      if (isNaN(budget_remain)) {
                        budget_remain = 0;
                        sum2 += budget_remain;
                        totalRemain.innerHTML = sum2;
                      } else {
                        sum2 += budget_remain;
                        totalRemain.innerHTML = sum2;
                      }
                    });
                  });
              }
            } else if (id.deptID == 1 || parseInt(id.deptID) == 1) {
              console.log("CE");
              var nums3 = 0;
              var nums4 = 0;
              var sum3 = 0;
              var sum4 = 0;
              db.collection("ce_subproject")
                .get()
                .then(querySnapshot => {
                  //  console.log(querySnapshot)
                  querySnapshot.forEach(docs => {
                    // this.pp.push(doc.data())
                    var budget = parseInt(docs.data().budget);
                    var budget_remain = parseInt(docs.data().budget_remain);
                    if (isNaN(budget)) {
                      budget = 0;
                      sum3 += budget;
                      totalAmount.innerHTML = sum3;
                    } else {
                      sum3 += budget;
                      totalAmount.innerHTML = sum3;
                    }
                    if (docs.data().isFinish == false) {
                      nums3 = nums3 + 1;
                      continued.innerHTML = nums3;
                    } else if (docs.data().isFinish == true) {
                      nums4 = nums4 + 1;
                      finished.innerHTML = nums4;
                    }
                    if (isNaN(budget_remain)) {
                      budget_remain = 0;
                      sum4 += budget_remain;
                      totalRemain.innerHTML = sum4;
                    } else {
                      sum4 += budget_remain;
                      totalRemain.innerHTML = sum4;
                    }
                  });
                });
            } else if (id.deptID == 2 || parseInt(id.deptID) == 2) {
              console.log("AE");
              var nums5 = 0;
              var nums6 = 0;
              var sum5 = 0;
              var sum6 = 0;
              db.collection("ae_subproject")
                .get()
                .then(querySnapshot => {
                  //  console.log(querySnapshot)
                  querySnapshot.forEach(docs => {
                    // this.pp.push(doc.data())
                    var budget = parseInt(docs.data().budget);
                    var budget_remain = parseInt(docs.data().budget_remain);
                    if (isNaN(budget)) {
                      budget = 0;
                      sum5 += budget;
                      totalAmount.innerHTML = sum5;
                    } else {
                      sum5 += budget;
                      totalAmount.innerHTML = sum5;
                    }
                    if (docs.data().isFinish == false) {
                      nums5 = nums5 + 1;
                      continued.innerHTML = nums1;
                    } else if (docs.data().isFinish == true) {
                      nums6 = nums6 + 1;
                      finished.innerHTML = nums2;
                    }
                    if (isNaN(budget_remain)) {
                      budget_remain = 0;
                      sum6 += budget_remain;
                      totalRemain.innerHTML = sum6;
                    } else {
                      sum6 += budget_remain;
                      totalRemain.innerHTML = sum6;
                    }
                  });
                });
            } else if (id.deptID == 3 || parseInt(id.deptID) == 3) {
              console.log("IE");
              var nums7 = 0;
              var nums8 = 0;
              var sum7 = 0;
              var sum8 = 0;
              db.collection("ie_subproject")
                .get()
                .then(querySnapshot => {
                  //  console.log(querySnapshot)
                  querySnapshot.forEach(docs => {
                    // this.pp.push(doc.data())
                    var budget = parseInt(docs.data().budget);
                    var budget_remain = parseInt(docs.data().budget_remain);
                    if (isNaN(budget)) {
                      budget = 0;
                      sum7 += budget;
                      totalAmount.innerHTML = sum7;
                    } else {
                      sum7 += budget;
                      totalAmount.innerHTML = sum7;
                    }
                    if (docs.data().isFinish == false) {
                      nums7 = nums7 + 1;
                      continued.innerHTML = nums1;
                    } else if (docs.data().isFinish == true) {
                      nums8 = nums8 + 1;
                      finished.innerHTML = nums2;
                    }
                    if (isNaN(budget_remain)) {
                      budget_remain = 0;
                      sum8 += budget_remain;
                      totalRemain.innerHTML = sum8;
                    } else {
                      sum8 += budget_remain;
                      totalRemain.innerHTML = sum8;
                    }
                  });
                });
            } else if (id.deptID == 4 || parseInt(id.deptID) == 4) {
              console.log("ME");
              var nums9 = 0;
              var nums10 = 0;
              var sum9 = 0;
              var sum10 = 0;
              db.collection("me_subproject")
                .get()
                .then(querySnapshot => {
                  //  console.log(querySnapshot)
                  querySnapshot.forEach(docs => {
                    // this.pp.push(doc.data())
                    var budget = parseInt(docs.data().budget);
                    var budget_remain = parseInt(docs.data().budget_remain);
                    if (isNaN(budget)) {
                      budget = 0;
                      sum9 += budget;
                      totalAmount.innerHTML = sum9;
                    } else {
                      sum9 += budget;
                      totalAmount.innerHTML = sum9;
                    }
                    if (docs.data().isFinish == false) {
                      nums9 = nums9 + 1;
                      continued.innerHTML = nums1;
                    } else if (docs.data().isFinish == true) {
                      nums10 = nums10 + 1;
                      finished.innerHTML = nums2;
                    }
                    if (isNaN(budget_remain)) {
                      budget_remain = 0;
                      sum10 += budget_remain;
                      totalRemain.innerHTML = sum10;
                    } else {
                      sum10 += budget_remain;
                      totalRemain.innerHTML = sum10;
                    }
                  });
                });
            } else if (id.deptID == 5 || parseInt(id.deptID) == 5) {
              console.log("ENVI");
              var nums11 = 0;
              var nums12 = 0;
              var sum11 = 0;
              var sum12 = 0;
              db.collection("env_subproject")
                .get()
                .then(querySnapshot => {
                  //  console.log(querySnapshot)
                  querySnapshot.forEach(docs => {
                    // this.pp.push(doc.data())
                    var budget = parseInt(docs.data().budget);
                    var budget_remain = parseInt(docs.data().budget_remain);
                    if (isNaN(budget)) {
                      budget = 0;
                      sum11 += budget;
                      totalAmount.innerHTML = sum11;
                    } else {
                      sum11 += budget;
                      totalAmount.innerHTML = sum11;
                    }
                    if (docs.data().isFinish == false) {
                      nums11 = nums11 + 1;
                      continued.innerHTML = nums11;
                    } else if (docs.data().isFinish == true) {
                      nums12 = nums12 + 1;
                      finished.innerHTML = nums12;
                    }
                    if (isNaN(budget_remain)) {
                      budget_remain = 0;
                      sum12 += budget_remain;
                      totalRemain.innerHTML = sum12;
                    } else {
                      sum12 += budget_remain;
                      totalRemain.innerHTML = sum12;
                    }
                  });
                });
            } else if (id.deptID == 6 || parseInt(id.deptID) == 6) {
              console.log("CHEM");
              var nums13 = 0;
              var nums14 = 0;
              var sum13 = 0;
              var sum14 = 0;
              db.collection("che_subproject")
                .get()
                .then(querySnapshot => {
                  //  console.log(querySnapshot)
                  querySnapshot.forEach(docs => {
                    // this.pp.push(doc.data())
                    var budget = parseInt(docs.data().budget);
                    var budget_remain = parseInt(docs.data().budget_remain);
                    if (isNaN(budget)) {
                      budget = 0;
                      sum13 += budget;
                      totalAmount.innerHTML = sum13;
                    } else {
                      sum13 += budget;
                      totalAmount.innerHTML = sum13;
                    }
                    if (docs.data().isFinish == false) {
                      nums13 = nums13 + 1;
                      continued.innerHTML = nums13;
                    } else if (docs.data().isFinish == true) {
                      nums14 = nums14 + 1;
                      finished.innerHTML = nums14;
                    }
                    if (isNaN(budget_remain)) {
                      budget_remain = 0;
                      sum14 += budget_remain;
                      totalRemain.innerHTML = sum14;
                    } else {
                      sum14 += budget_remain;
                      totalRemain.innerHTML = sum14;
                    }
                  });
                });
            } else if (id.deptID == 7 || parseInt(id.deptID) == 7) {
              console.log("COE");
              var nums15 = 0;
              var nums16 = 0;
              var sum15 = 0;
              var sum16 = 0;
              db.collection("coe_subproject")
                .get()
                .then(querySnapshot => {
                  //  console.log(querySnapshot)
                  querySnapshot.forEach(docs => {
                    // this.pp.push(doc.data())
                    var budget = parseInt(docs.data().budget);
                    var budget_remain = parseInt(docs.data().budget_remain);
                    if (isNaN(budget)) {
                      budget = 0;
                      sum15 += budget;
                      totalAmount.innerHTML = sum15;
                    } else {
                      sum15 += budget;
                      totalAmount.innerHTML = sum15;
                    }
                    if (docs.data().isFinish == false) {
                      nums15 = nums15 + 1;
                      continued.innerHTML = nums15;
                    } else if (docs.data().isFinish == true) {
                      nums16 = nums16 + 1;
                      finished.innerHTML = nums16;
                    }
                    if (isNaN(budget_remain)) {
                      budget_remain = 0;
                      sum16 += budget_remain;
                      totalRemain.innerHTML = sum16;
                    } else {
                      sum16 += budget_remain;
                      totalRemain.innerHTML = sum16;
                    }
                  });
                });
            }
          });
        });
    }
  }
};
</script>

<style scoped></style>
