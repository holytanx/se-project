<template>
  <v-sheet id="scrolling-techniques-5" class="overflow-y-auto" max-height="800">
    <v-container style="height: 1500px;">
      

      <v-app id="inspire">
        <v-timeline :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item color="red lighten-1" fill-dot right>
            <v-card>
              <v-card-title class="red lighten-1">
                <v-icon dark size="42" class="mr-4">
                  mdi-alarm
                </v-icon>
                <h6 class="headline white--text font-weight-light">
                  จำนวนโครงการที่ดำเนินการ
                </h6>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" md="10">
                    <h1 class="text-lg-center" id="numOf_Continued"></h1>
                    <div class="text-lg-center">โครงการ</div>
                   
                  </v-col>
                  <v-col class="hidden-sm-and-down text-right" md="2">
                    <v-icon size="64">mdi-calendar-text</v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item color="red darken-1" fill-dot left small>
            <v-card>
              <v-card-title class="red darken-1 justify-end">
                <h2 class="headline mr-4 white--text font-weight-light">
                  จำนวนโครงการที่เสร็จสิ้น
                </h2>
                <v-icon dark size="42">mdi-checkbox-multiple-marked-circle</v-icon>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" md="10">
                    <h1 class="text-lg-center" id="numOf_Finished"></h1>
                    <div class="text-lg-center">โครงการ</div>
                   
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item color="red darken-2" fill-dot right>
            <v-card>
              <v-card-title class="red darken-2">
                <v-icon class="mr-4" dark size="42">
                  mdi-bank
                </v-icon>
                <h2 class="headline white--text font-weight-light">งบประมาณทั้งหมดรวม</h2>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" md="10">
                    <h1 class="text-lg-center" id="totalAmount"></h1>
                    <div class="text-lg-center">บาท</div>
                   
                  </v-col>
                  <v-col class="hidden-sm-and-down text-right" md="2">
                    <v-icon size="64">mdi-currency-btc</v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item color="red darken-3" fill-dot left small>
            <v-card>
              <v-card-title class="red darken-3 justify-end">
                <h2 class="headline mr-4 white--text font-weight-light">
                  งบประมาณคงเหลือ (เบิกจ่าย)
                </h2>
                <v-icon dark size="42">
                  mdi-credit-card-multiple
                </v-icon>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col class="hidden-sm-and-down" md="2">
                    <v-icon size="64">mdi-currency-btc</v-icon>
                  </v-col>
                  <v-col cols="12" md="10">
                    <h1 class="text-lg-center" id="totalRemain"></h1>
                    <div class="text-lg-center">บาท</div>
                   
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item color="red darken-4" fill-dot right>
            <v-card>
              <v-card-title class="red darken-4">
                <v-icon class="mr-4" dark size="42">
                  mdi-wallet-giftcard
                </v-icon>
                <h2 class="headline white--text font-weight-light">งบประมาณคงเหลือ (ขออนุมัติใช้)</h2>
              </v-card-title>
              <v-container>
                <v-row>
                   <v-col cols="12" md="10">
                    <h1 class="text-lg-center" id="totalRemainExpense"></h1>
                    <div class="text-lg-center">บาท</div>
                   
                  </v-col>
                  <v-col class="hidden-sm-and-down text-right" md="2">
                    <v-icon size="64">mdi-currency-btc</v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-app>
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
    const totalRemainExpense = document.querySelector("#totalRemainExpense");
    var d = new Date();
    var year = d.getFullYear() + 543;
    if (firebase.auth().currentUser) {
      this.isLoggined = true;
      this.currentUser = firebase.auth().currentUser.email;
      this.user = this.currentUser;
      db.collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            if (doc.data().email == firebase.auth().currentUser.email) {
              id.deptID = doc.data().dept_id;
              if (id.deptID == 0 || parseInt(id.deptID) == 0) {
                console.log("EE");
                var nums1 = 0;
                var nums2 = 0;
                var sum1 = 0;
                var sum2 = 0;
                var expense = 0;
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(docs => {
                      if (
                        docs.data().dept_id == "0" ||
                        parseInt(docs.data().dept_id) == 0
                      ) {
                        if (year == parseInt(docs.data().year)) {
                          sum1 += docs.data().budget_remain;
                          totalAmount.innerHTML = sum1;
                          sum2 += docs.data().disburse_remain;
                          totalRemain.innerHTML = sum2;
                          expense += docs.data().expense_remain;
                          totalRemainExpense.innerHTML = expense;
                          if (docs.data().isFinish == true) {
                            nums2 += 1;
                            finished.innerHTML = nums2;
                          } else if (docs.data().isFinish == false) {
                            nums1 += 1;
                            continued.innerHTML = nums1;
                          }
                        }
                      }
                    });
                  });
              } else if (id.deptID == 1 || parseInt(id.deptID) == 1) {
                console.log("CE");
                var nums3 = 0;
                var nums4 = 0;
                var sum3 = 0;
                var sum4 = 0;
                var expense1 = 0;
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(docs => {
                      if (
                        docs.data().dept_id == "1" ||
                        parseInt(docs.data().dept_id) == 1
                      ) {
                        if (year == parseInt(docs.data().year)) {
                          console.log(sum3);
                          sum3 += docs.data().budget_remain;
                          totalAmount.innerHTML = sum3;
                          sum4 += docs.data().disburse_remain;
                          totalRemain.innerHTML = sum4;
                          expense1 += docs.data().expense_remain;
                          totalRemainExpense.innerHTML = expense1;
                          if (docs.data().isFinish == true) {
                            nums4 += 1;
                            finished.innerHTML = nums4;
                          } else if (docs.data().isFinish == false) {
                            nums3 += 1;
                            continued.innerHTML = nums3;
                          }
                        }
                      }
                    });
                  });
              } else if (id.deptID == 2 || parseInt(id.deptID) == 2) {
                console.log("AE");
                var nums5 = 0;
                var nums6 = 0;
                var sum5 = 0;
                var sum6 = 0;
                var expense2 = 0;
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(docs => {
                      if (
                        docs.data().dept_id == "2" ||
                        parseInt(docs.data().dept_id) == 2
                      ) {
                        if (year == parseInt(docs.data().year)) {
                          sum5 += docs.data().budget_remain;
                          totalAmount.innerHTML = sum5;
                          sum6 += docs.data().disburse_remain;
                          totalRemain.innerHTML = sum6;
                          expense2 += docs.data().expense_remain;
                          totalRemainExpense.innerHTML = expense2;
                          if (docs.data().isFinish == true) {
                            nums6 += 1;
                            finished.innerHTML = nums6;
                          } else if (docs.data().isFinish == false) {
                            nums5 += 1;
                            continued.innerHTML = nums5;
                          }
                        }
                      }
                    });
                  });
              } else if (id.deptID == 3 || parseInt(id.deptID) == 3) {
                console.log("IE");
                var nums7 = 0;
                var nums8 = 0;
                var sum7 = 0;
                var sum8 = 0;
                var expense3 = 0;
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(docs => {
                      if (
                        docs.data().dept_id == "3" ||
                        parseInt(docs.data().dept_id) == 3
                      ) {
                        if (year == parseInt(docs.data().year)) {
                          sum7 += docs.data().budget_remain;
                          totalAmount.innerHTML = sum7;
                          sum8 += docs.data().disburse_remain;
                          totalRemain.innerHTML = sum8;
                          expense3 += docs.data().expense_remain;
                          totalRemainExpense.innerHTML = expense3;
                          if (docs.data().isFinish == true) {
                            nums8 += 1;
                            finished.innerHTML = nums8;
                          } else if (docs.data().isFinish == false) {
                            nums7 += 1;
                            continued.innerHTML = nums7;
                          }
                        }
                      }
                    });
                  });
              } else if (id.deptID == 4 || parseInt(id.deptID) == 4) {
                console.log("ME");
                var nums9 = 0;
                var nums10 = 0;
                var sum9 = 0;
                var sum10 = 0;
                var expense4 = 0;
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(docs => {
                      if (
                        docs.data().dept_id == "4" ||
                        parseInt(docs.data().dept_id) == 4
                      ) {
                        if (year == parseInt(docs.data().year)) {
                          sum9 += docs.data().budget_remain;
                          totalAmount.innerHTML = sum9;
                          sum10 += docs.data().disburse_remain;
                          totalRemain.innerHTML = sum10;
                          expense4 += docs.data().expense_remain;
                          totalRemainExpense.innerHTML = expense4;
                          if (docs.data().isFinish == true) {
                            nums10 += 1;
                            finished.innerHTML = nums10;
                          } else if (docs.data().isFinish == false) {
                            nums9 += 1;
                            continued.innerHTML = nums9;
                          }
                        }
                      }
                    });
                  });
              } else if (id.deptID == 5 || parseInt(id.deptID) == 5) {
                console.log("ENVI");
                var nums11 = 0;
                var nums12 = 0;
                var sum11 = 0;
                var sum12 = 0;
                var expense5 = 0;
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(docs => {
                      if (
                        docs.data().dept_id == "5" ||
                        parseInt(docs.data().dept_id) == 5
                      ) {
                        if (year == parseInt(docs.data().year)) {
                          sum11 += docs.data().budget_remain;
                          totalAmount.innerHTML = sum11;
                          sum12 += docs.data().disburse_remain;
                          totalRemain.innerHTML = sum12;
                          expense5 += docs.data().expense_remain;
                          totalRemainExpense.innerHTML = expense5;
                          if (docs.data().isFinish == true) {
                            nums12 += 1;
                            finished.innerHTML = nums12;
                          } else if (docs.data().isFinish == false) {
                            nums11 += 1;
                            continued.innerHTML = nums11;
                          }
                        }
                      }
                    });
                  });
              } else if (id.deptID == 6 || parseInt(id.deptID) == 6) {
                console.log("CHEM");
                var nums13 = 0;
                var nums14 = 0;
                var sum13 = 0;
                var sum14 = 0;
                var expense6 = 0;
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(docs => {
                      if (
                        docs.data().dept_id == "6" ||
                        parseInt(docs.data().dept_id) == 6
                      ) {
                        if (year == parseInt(docs.data().year)) {
                          sum13 += docs.data().budget_remain;
                          totalAmount.innerHTML = sum13;
                          sum14 += docs.data().disburse_remain;
                          totalRemain.innerHTML = sum14;
                          expense6 += docs.data().expense_remain;
                          totalRemainExpense.innerHTML = expense6;
                          if (docs.data().isFinish == true) {
                            nums14 += 1;
                            finished.innerHTML = nums14;
                          } else if (docs.data().isFinish == false) {
                            nums13 += 1;
                            continued.innerHTML = nums13;
                          }
                        }
                      }
                    });
                  });
              } else if (id.deptID == 7 || parseInt(id.deptID) == 7) {
                console.log("COE");
                var nums15 = 0;
                var nums16 = 0;
                var sum15 = 0;
                var sum16 = 0;
                var expense7 = 0;
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(docs => {
                      if (
                        docs.data().dept_id == "7" ||
                        parseInt(docs.data().dept_id) == 7
                      ) {
                        if (year == parseInt(docs.data().year)) {
                          sum15 += docs.data().budget_remain;
                          totalAmount.innerHTML = sum15;
                          sum16 += docs.data().disburse_remain;
                          totalRemain.innerHTML = sum16;
                          expense7 += docs.data().expense_remain;
                          totalRemainExpense.innerHTML = expense7;
                          if (docs.data().isFinish == true) {
                            nums16 += 1;
                            finished.innerHTML = nums16;
                          } else if (docs.data().isFinish == false) {
                            nums15 += 1;
                            continued.innerHTML = nums15;
                          }
                        }
                      }
                    });
                  });
              }
            }
          });
        });
    }
  }
};
</script>
