<template>
  <v-sheet id="scrolling-techniques-5" class="overflow-y-auto" max-height="800">
    <v-container style="height: 1500px;" >
      <v-container>
        <h1></h1>
        <p class="headline" align="center">สรุปยอดงบประมาณรายปี</p>
        
        <v-card align="center">
          <v-sheet
            class="v-sheet--offset--budget mx-auto"
            color="teal"
            elevation="6"
            max-width="calc(100% - 90%)"
            style="height: 90px;"
          >
            <v-icon class="mt-4 large mx-5" large color="white">mdi-file-document</v-icon>
          </v-sheet>
          <v-card-title md="5" class="ml-md-auto headline font-weight-bold"
                >จำนวนโครงการของแต่ละสาขาวิชา</v-card-title
              >
          <v-row>
            <v-col md="5"
          class="ml-md-auto tablee">
              <v-data-table
                :headers="headers"
                :items="desserts"
                hide-default-header
                hide-default-footer
                class="elevation-0"
                outlined
              ></v-data-table>
            </v-col>

            <v-col>
              <v-img
                src="https://s3-ap-southeast-1.amazonaws.com/img-in-th/8dea67bee3a82bdac40c5222e63fc16a.png"
                height="480"
                max-width="600"
              ></v-img>
            </v-col>
          </v-row>
        </v-card>
       <v-app id="inspire">
        <v-timeline :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item color="teal darken-3" fill-dot right>
            <v-card>
              <v-card-title class="teal darken-3">
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
                    <h1 class="text-lg-center" id="num_inprogress"></h1>
                    <div class="text-lg-center">โครงการ</div>
                   
                  </v-col>
                  <v-col class="hidden-sm-and-down text-right" md="2">
                    <v-icon size="64">mdi-calendar-text</v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item color="teal darken-2" fill-dot left small>
            <v-card>
              <v-card-title class="teal darken-2 justify-end">
                <h2 class="headline mr-4 white--text font-weight-light">
                  จำนวนโครงการที่เสร็จสิ้น
                </h2>
                <v-icon dark size="42">mdi-checkbox-multiple-marked-circle</v-icon>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" md="10">
                    <h1 class="text-lg-center" id="num_finished"></h1>
                    <div class="text-lg-center">โครงการ</div>
                   
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item color="teal darken-1" fill-dot right>
            <v-card>
              <v-card-title class="teal darken-1">
                <v-icon class="mr-4" dark size="42">
                  mdi-bank
                </v-icon>
                <h2 class="headline white--text font-weight-light">งบประมาณทั้งหมดรวม</h2>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" md="10">
                    <h1 class="text-lg-center" id="total_budget"></h1>
                    <div class="text-lg-center">บาท</div>
                   
                  </v-col>
                  <v-col class="hidden-sm-and-down text-right" md="2">
                    <v-icon size="64">mdi-currency-btc</v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item color="teal lighten-1" fill-dot left small>
            <v-card>
              <v-card-title class="teal lighten-1 justify-end">
                <h2 class="headline mr-4 white--text font-weight-light">
                  งบประมาณคงเหลือ
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
                    <h1 class="text-lg-center" id="total_remainbudget"></h1>
                    <div class="text-lg-center">บาท</div>
                   
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          
        </v-timeline>
      </v-app>
        
<!-- 
        <v-layout row justify-space-between>
          <v-flex md6>
            <v-card class="mx-auto" max-width="300">
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
            <v-card max-width="300">
              <v-card-text>
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
            <v-flex>
              <v-card class="mx-auto" max-width="300">
                <v-card-text>
                  <p class="headline text-center">
                    จำนวนโครงการของแต่ละสาขาวิชา
                  </p>
                  <div class="body-2">
                    วิศวกรรมไฟฟ้า
                    <p id="num_ee"></p>
                  </div>
                  <div class="body-2">
                    วิศวกรรมโยธา
                    <p id="num_ce"></p>
                  </div>
                  <div class="body-2">
                    วิศวกรรมเกษตร
                    <p id="num_ae"></p>
                  </div>
                  <div class="body-2">
                    วิศวกรรมอุตสาหการ
                    <p id="num_ie"></p>
                  </div>
                  <div class="body-2">
                    วิศวกรรมเครื่องกล
                    <p id="num_me"></p>
                  </div>
                  <div class="body-2">
                    วิศวกรรมสิ่งแวดล้อม
                    <p id="num_env"></p>
                  </div>
                  <div class="body-2">
                    วิศวกรรมเคมี
                    <p id="num_che"></p>
                  </div>
                  <div class="body-2">
                    วิศวกรรมคอมพิวเตอร์
                    <p id="num_coe"></p>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex md6>
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
            <v-flex md4>
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
        </div> -->
      </v-container>
    </v-container>
  </v-sheet>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
export default {
  name: "DeanTotalBudget",
  
  created() {},
  mounted() {
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

    db.collection("projects")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(docs => {
          var budget = parseInt(docs.data().budget_remain);
          var budget_remain = parseInt(docs.data().expense_remain);
          if (docs.data().dept_id == 0) {
            sum_eeProject = sum_eeProject + 1;
            num_ee.innerHTML = sum_eeProject;
          } else if (docs.data().dept_id == 1) {
            sum_ceProject = sum_ceProject + 1;
            num_ce.innerHTML = sum_ceProject;
          } else if (docs.data().dept_id == 2) {
            sum_aeProject = sum_aeProject + 1;
            num_ae.innerHTML = sum_aeProject;
          } else if (docs.data().dept_id == 3) {
            sum_ieProject = sum_ieProject + 1;
            num_ie.innerHTML = sum_ieProject;
          } else if (docs.data().dept_id == 4) {
            sum_meProject = sum_meProject + 1;
            num_me.innerHTML = sum_meProject;
          } else if (docs.data().dept_id == 5) {
            sum_envProject = sum_envProject + 1;
            num_env.innerHTML = sum_envProject;
          } else if (docs.data().dept_id == 6) {
            sum_cheProject = sum_cheProject + 1;
            num_che.innerHTML = sum_cheProject;
          } else if (docs.data().dept_id == 7) {
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
  },
  data() {
    return {
      
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          value: "name"
        },
        { text: "Projects", value: "projects" }
      ],
      desserts: [
        {
          name: "วิศวกรรมไฟฟ้า",
          projects: 2
        },
        {
          name: "วิศวกรรมโยธา",
          projects: 3
        },
        {
          name: "วิศวกรรมเกษตร",
          projects: 2
        },
        {
          name: "วิศวกรรมอุตสาหการ",
          projects: 2
        },
        {
          name: "วิศวกรรมเครื่องกล",
          projects: 2
        },
        {
          name: "วิศวกรรมสิ่งแวดล้อม",
          projects: 2
        },
        {
          name: "วิศวกรรมเคมี",
          projects: 3
        },
        {
          name: "วิศวกรรมคอมพิวเตอร์",
          projects: 2
        }
      ]
    };
  },
  method: {}
};
</script>

<style>
.tablee{
   top: 40px;
  right: -100px;
}
.v-sheet--offset--budget {
  top: -22px;
  right: 400px;
  position: relative;
}
</style>
