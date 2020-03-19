<template>
  <v-container>
    <h1></h1>
      <p class="headline" align="center">สรุปยอดงบประมาณรายปี</p>
    <v-layout row justify-space-between>
      <v-flex md6>
        <v-card class="mx-auto" max-width="360">
          <v-card-text>
            <p class="headline text-center">จำนวนโครงการที่ดำเนินการ</p>
            <div class="display-2 text-center">
              <p id="num_inprogress"></p>
            </div>
            <div class="text-lg-right">โครงการ</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md6>
        <v-card max-width="360">
          <v-card-text >
            <p class="headline text-center">จำนวนโครงการที่เสร็จสิ้น</p>
            <div class="display-2 text-center">
              <p id="num_finished"></p>
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
        <v-flex >
          <v-card class="mx-auto" max-width="300">
            <v-card-text>
              <p class="headline text-center">จำนวนโครงการของแต่ละสาขาวิชา</p>
              <div class="body-2">วิศวกรรมไฟฟ้า <p id="num_ee"></p></div>
              <div class="body-2">วิศวกรรมโยธา <p id="num_ce"></p></div>
              <div class="body-2">วิศวกรรมเกษตร <p id="num_ae"></p></div>
              <div class="body-2">วิศวกรรมอุตสาหการ <p id="num_ie"></p></div>
              <div class="body-2">วิศวกรรมเครื่องกล <p id="num_me"></p></div>
              <div class="body-2">วิศวกรรมสิ่งแวดล้อม <p id="num_env"></p></div>
              <div class="body-2">วิศวกรรมเคมี <p id="num_che"></p></div>
              <div class="body-2">วิศวกรรมคอมพิวเตอร์ <p id="num_coe"></p></div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4 >
          <v-card class="mx-auto" max-width="300">
            <v-card-text>
              <p class="headline text-center">งบประมาณทั้งหมดรวม</p>
              <div class="display-2 text-center">
                <p id="total_budget"></p>
              </div>
              <div class="text-lg-right">บาท</div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card class="mx-auto" max-width="300">
            <v-card-text>
              <p class="headline text-center">งบประมาณคงเหลือ</p>
              <div class="display-2 text-center">
                <p id="total_remainbudget"></p>
              </div>
              <div class="text-lg-right">บาท</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import firebase from "firebase";
import { db } from '../main';
export default {
  name: "DeanTotalBudget",
  
  created(){},
  mounted(){
    var num_inprogress = document.querySelector("#num_inprogress");
    var num_finished = document.querySelector("#num_finished");
    var totalBudget = document.querySelector("#total_budget");
    var totalRemainbudget = document.querySelector("#total_remainbudget");
    var num_ee = document.querySelector("#num_ee");
    var num_ce = document.querySelector("#num_ce");
    var num_ae = document.querySelector("#num_ae");
    var num_ie = document.querySelector("#num_ie");
    var num_me = document.querySelector("#num_me");
    var num_env = document.querySelector("#num_env");
    var num_che = document.querySelector("#num_che");
    var num_coe = document.querySelector("#num_coe");
    var nums1 = 0;
    var nums2 = 0;
    var sum1 = 0;
    var sum2 = 0;
    var sum_eeProject = 0;
    var sum_ceProject = 0;
    var sum_aeProject = 0;
    var sum_ieProject = 0;
    var sum_meProject = 0;
    var sum_envProject = 0;
    var sum_cheProject = 0;
    var sum_coeProject = 0;

    db.collection("projects").get().then(querySnapshot => {
      querySnapshot.forEach(docs => {
        var budget = parseInt(docs.data().budget_remain);
        var budget_remain = parseInt(docs.data().expense_remain);
        if (docs.data().dept_id == 0) {
          sum_eeProject = sum_eeProject + 1;
          num_ee.innerHTML = sum_eeProject;
        } else if (docs.data().dept_id == 1) {
          sum_ceProject = sum_ceProject + 1;
          num_ce.innerHTML = sum_ceProject;
        }
        else if (docs.data().dept_id == 2) {
          sum_aeProject = sum_aeProject + 1;
          num_ae.innerHTML = sum_aeProject;
        }
        else if (docs.data().dept_id == 3) {
          sum_ieProject = sum_ieProject + 1;
          num_ie.innerHTML = sum_ieProject;
        }
        else if (docs.data().dept_id == 4) {
          sum_meProject = sum_meProject + 1;
          num_me.innerHTML = sum_meProject;
        }
        else if (docs.data().dept_id == 5) {
          sum_envProject = sum_envProject + 1;
          num_env.innerHTML = sum_envProject;
        }
        else if (docs.data().dept_id == 6) {
          sum_cheProject = sum_cheProject + 1;
          num_che.innerHTML = sum_cheProject;
        }
        else if (docs.data().dept_id == 7) {
          sum_coeProject = sum_coeProject + 1;
          num_coe.innerHTML = sum_coeProject;
        }

        if (docs.data().isFinish == false) {
          nums1 = nums1 + 1;
          num_inprogress.innerHTML = nums1;
        } else if (docs.data().isFinish == true) {
          nums2 = nums2 + 1;
          num_finished.innerHTML = nums2;
        }
        if (isNaN(budget)) {
          budget = 0;
          sum1 += budget;
          totalBudget.innerHTML = sum1;         
        } else {
          sum1 += budget;
          totalBudget.innerHTML = sum1;
        }
        if (isNaN(budget_remain)) {
          budget_remain = 0;
          sum2 += budget_remain;
          totalRemainbudget.innerHTML = sum2;
        } else {
          sum2 += budget_remain;
          totalRemainbudget.innerHTML = sum2;
        }
      });
    });

    // db.collection("ee_subproject").get().then(querySnapshot => {
    //   querySnapshot.forEach(docs => {
    //     var budget = parseInt(docs.data().budget);
    //     var budget_remain = parseInt(docs.data().budget_remain);
    //     if (docs.data().isFinish == false) {
    //       nums1 = nums1 + 1;
    //       sum_eeProject = sum_eeProject + 1;
    //       num_inprogress.innerHTML = nums1;
    //       num_ee.innerHTML = sum_eeProject;
    //     } else if (docs.data().isFinish == true) {
    //       nums2 = nums2 + 1;
    //       sum_eeProject = sum_eeProject + 1;
    //       num_finished.innerHTML = nums2;
    //       num_ee.innerHTML = sum_eeProject;
    //     }
    //     if (isNaN(budget)) {
    //       budget = 0;
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;         
    //     } else {
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;
    //     }
    //     if (isNaN(budget_remain)) {
    //       budget_remain = 0;
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     } else {
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     }
    //   });
    // });
    
    // db.collection("ce_subproject").get().then(querySnapshot => {
    //   querySnapshot.forEach(docs => {
    //     var budget = parseInt(docs.data().budget);
    //     var budget_remain = parseInt(docs.data().budget_remain);
    //     if (docs.data().isFinish == false) {
    //       nums1 = nums1 + 1;
    //       sum_ceProject = sum_ceProject + 1;
    //       num_inprogress.innerHTML = nums1;
    //       num_ce.innerHTML = sum_ceProject;
    //     } else if (docs.data().isFinish == true) {
    //       nums2 = nums2 + 1;
    //       sum_ceProject = sum_ceProject + 1;
    //       num_finished.innerHTML = nums2;
    //       num_ce.innerHTML = sum_ceProject;
    //     }
    //     if (isNaN(budget)) {
    //       budget = 0;
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;         
    //     } else {
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;
    //     }
    //     if (isNaN(budget_remain)) {
    //       budget_remain = 0;
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     } else {
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     }
    //   });
    // });
    
    // db.collection("ae_subproject").get().then(querySnapshot => {
    //   querySnapshot.forEach(docs => {
    //     var budget = parseInt(docs.data().budget);
    //     var budget_remain = parseInt(docs.data().budget_remain);
    //     if (docs.data().isFinish == false) {
    //       nums1 = nums1 + 1;
    //       sum_aeProject = sum_aeProject + 1;
    //       num_inprogress.innerHTML = nums1;
    //       num_ae.innerHTML = sum_aeProject;
    //     } else if (docs.data().isFinish == true) {
    //       nums2 = nums2 + 1;
    //       sum_aeProject = sum_aeProject + 1;
    //       num_finished.innerHTML = nums2;
    //       num_ae.innerHTML = sum_aeProject;
    //     }
    //     if (isNaN(budget)) {
    //       budget = 0;
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;         
    //     } else {
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;
    //     }
    //     if (isNaN(budget_remain)) {
    //       budget_remain = 0;
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     } else {
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     }
    //   });
    // });

    // db.collection("ie_subproject").get().then(querySnapshot => {
    //   querySnapshot.forEach(docs => {
    //     var budget = parseInt(docs.data().budget);
    //     var budget_remain = parseInt(docs.data().budget_remain);
    //     if (docs.data().isFinish == false) {
    //       nums1 = nums1 + 1;
    //       sum_ieProject = sum_ieProject + 1;
    //       num_inprogress.innerHTML = nums1;
    //       num_ie.innerHTML = sum_ieProject;
    //     } else if (docs.data().isFinish == true) {
    //       nums2 = nums2 + 1;
    //       sum_ieProject = sum_ieProject + 1;
    //       num_finished.innerHTML = nums2;
    //       num_ie.innerHTML = sum_ieProject;
    //     }
    //     if (isNaN(budget)) {
    //       budget = 0;
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;         
    //     } else {
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;
    //     }
    //     if (isNaN(budget_remain)) {
    //       budget_remain = 0;
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     } else {
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     }
    //   });
    // });

    // db.collection("me_subproject").get().then(querySnapshot => {
    //   querySnapshot.forEach(docs => {
    //     var budget = parseInt(docs.data().budget);
    //     var budget_remain = parseInt(docs.data().budget_remain);
    //     if (docs.data().isFinish == false) {
    //       nums1 = nums1 + 1;
    //       sum_meProject = sum_meProject + 1;
    //       num_inprogress.innerHTML = nums1;
    //       num_me.innerHTML = sum_meProject;
    //     } else if (docs.data().isFinish == true) {
    //       nums2 = nums2 + 1;
    //       sum_meProject = sum_meProject + 1;
    //       num_finished.innerHTML = nums2;
    //       num_me.innerHTML = sum_meProject;
    //     }
    //     if (isNaN(budget)) {
    //       budget = 0;
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;         
    //     } else {
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;
    //     }
    //     if (isNaN(budget_remain)) {
    //       budget_remain = 0;
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     } else {
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     }
    //   });
    // });

    // db.collection("env_subproject").get().then(querySnapshot => {
    //   querySnapshot.forEach(docs => {
    //     var budget = parseInt(docs.data().budget);
    //     var budget_remain = parseInt(docs.data().budget_remain);
    //     if (docs.data().isFinish == false) {
    //       nums1 = nums1 + 1;
    //       sum_envProject = sum_envProject + 1;
    //       num_inprogress.innerHTML = nums1;
    //       num_env.innerHTML = sum_envProject;
    //     } else if (docs.data().isFinish == true) {
    //       nums2 = nums2 + 1;
    //       sum_envProject = sum_envProject + 1;
    //       num_finished.innerHTML = nums2;
    //       num_env.innerHTML = sum_envProject;
    //     }
    //     if (isNaN(budget)) {
    //       budget = 0;
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;         
    //     } else {
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;
    //     }
    //     if (isNaN(budget_remain)) {
    //       budget_remain = 0;
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     } else {
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     }
    //   });
    // });

    // db.collection("che_subproject").get().then(querySnapshot => {
    //   querySnapshot.forEach(docs => {
    //     var budget = parseInt(docs.data().budget);
    //     var budget_remain = parseInt(docs.data().budget_remain);
    //     if (docs.data().isFinish == false) {
    //       nums1 = nums1 + 1;
    //       sum_cheProject = sum_cheProject + 1;
    //       num_inprogress.innerHTML = nums1;
    //       num_che.innerHTML = sum_cheProject;
    //     } else if (docs.data().isFinish == true) {
    //       nums2 = nums2 + 1;
    //       sum_cheProject = sum_cheProject + 1;
    //       num_finished.innerHTML = nums2;
    //       num_che.innerHTML = sum_cheProject;
    //     }
    //     if (isNaN(budget)) {
    //       budget = 0;
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;         
    //     } else {
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;
    //     }
    //     if (isNaN(budget_remain)) {
    //       budget_remain = 0;
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     } else {
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     }
    //   });
    // });

    // db.collection("coe_subproject").get().then(querySnapshot => {
    //   querySnapshot.forEach(docs => {
    //     var budget = parseInt(docs.data().budget);
    //     var budget_remain = parseInt(docs.data().budget_remain);
    //     if (docs.data().isFinish == false) {
    //       nums1 = nums1 + 1;
    //       sum_coeProject = sum_coeProject + 1;
    //       num_inprogress.innerHTML = nums1;
    //       num_coe.innerHTML = sum_coeProject;
    //     } else if (docs.data().isFinish == true) {
    //       nums2 = nums2 + 1;
    //       sum_coeProject = sum_coeProject + 1;
    //       num_finished.innerHTML = nums2;
    //       num_coe.innerHTML = sum_coeProject;
    //     }
    //     if (isNaN(budget)) {
    //       budget = 0;
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;         
    //     } else {
    //       sum1 += budget;
    //       totalBudget.innerHTML = sum1;
    //     }
    //     if (isNaN(budget_remain)) {
    //       budget_remain = 0;
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     } else {
    //       sum2 += budget_remain;
    //       totalRemainbudget.innerHTML = sum2;
    //     }
    //   });
      
    // });
    
  
  },
    method:{}
};

</script>

