<template>
  <v-container>
    <v-tabs
      v-model="tab"
      background-color="primary"
      >
      <v-tab
        v-for="item in items"
        :key="item.tab"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <br>
    <br>
    <v-layout row justify-space-between>
      <v-flex md6>
      <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.tab">
        <v-card class="mx-auto" max-width="360">
          <v-card-text>
            <p class="headline">จำนวนโครงการที่ดำเนินการ</p>
            <div class="display-2 text-center">
              <v-text>{{item.proj_conss}}</v-text>
            </div>
            <div class="text-lg-right">โครงการ</div>
          </v-card-text>
        </v-card>
        </v-tab-item>
      </v-tabs-items>
      </v-flex>
      <v-flex md6>
        <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.tab">
        <v-card  class="mx-auto" max-width="360">
          <v-card-text >
            <p class="headline">จำนวนโครงการที่เสร็จสิ้น</p>
            <div class="display-2 text-center">
              <v-text>{{item.pro_fh}}</v-text>
            </div>
            <div class="text-lg-right">โครงการ</div>
          </v-card-text>
        </v-card>
        </v-tab-item>
      </v-tabs-items>
      </v-flex>
    </v-layout>
    <br />
    <br />
    <div class="center">
      <v-layout row justify-space-between>
        <v-flex md6>
          <v-tabs-items v-model="tab">
        <v-tab-item
        v-for="item in items"
        :key="item.tab">
          <v-card class="mx-auto" max-width="360">
            <v-card-text>
              <p class="headline">งบประมาณทั้งหมดรวม</p>
              <div class="display-2 text-center">
                <v-text >{{item.amo}}</v-text>
              </div>
              <div class="text-lg-right">บาท</div>
            </v-card-text>
          </v-card>
          </v-tab-item>
      </v-tabs-items>
        </v-flex>
        <v-flex m6>
        <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
            <v-card class="mx-auto" max-width="360">
              <v-card-text>
                <p class="headline">งบประมาณคงเหลือ</p>
                <div class="display-2 text-center">
                  <v-text >{{item.rem}}</v-text>
                </div>
                <div class="text-lg-right">บาท</div>
              </v-card-text>
            </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template> 

<script>
import firebase from "firebase";
import { db } from "../main";
import { counter } from "@fortawesome/fontawesome-svg-core";
export default {
  name: "RegularDashboard",
  data() {
    return {
    tab: null,
        items: [
        ],
    }
  },
  created() {},
  mounted() {
    var nums1 = 0;
    var nums2 = 0;
    var sum1 = 0;
    var sum2 = 0;
    var nums3 = 0;
    var nums4 = 0;
    var sum3 = 0;
    var sum4 = 0;
    var nums5 = 0;
    var nums6 = 0;
    var sum5 = 0;
    var sum6 = 0;
    var nums7 = 0;
    var nums8 = 0;
    var sum7 = 0;
    var sum8 = 0;
    var nums9 = 0;
    var nums10 = 0;
    var sum9 = 0;
    var sum10 = 0;
    var nums11 = 0;
    var nums12 = 0;
    var sum11 = 0;
    var sum12 = 0;
    var nums13 = 0;
    var nums14 = 0;
    var sum13 = 0;
    var sum14 = 0;
    var nums15 = 0;
    var nums16 = 0;
    var sum15 = 0;
    var sum16 = 0;
                db.collection("ee_subproject").get().then(querySnapshot => {
                    //  console.log(querySnapshot)
                    querySnapshot.forEach(docs => {
                      // this.pp.push(doc.data())
                      var budget = parseInt(docs.data().budget);
                      var budget_remain = parseInt(docs.data().budget_remain);
                      if (isNaN(budget)) {
                        budget = 0;
                        sum1 += budget;
                      } else {
                        sum1 += budget;
                  
                      }
                      if (docs.data().isFinish == false) {
                        nums1 = nums1 + 1;
                      } else if (docs.data().isFinish == true) {
                        nums2 = nums2 + 1;
                      }
                      if (isNaN(budget_remain)) {
                        budget_remain = 0;
                        sum2 += budget_remain;
                      } else {
                        sum2 += budget_remain;
                      }
                      
                    });
                      this.items.unshift({tab:'ee project',proj_conss: nums1,pro_fh: nums2,amo: sum1,rem: sum2 })
                      
                      
                });
           db.collection("ce_subproject")
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(docs => {
                    var budget = parseInt(docs.data().budget);
                    var budget_remain = parseInt(docs.data().budget_remain);
                    if (isNaN(budget)) {
                      budget = 0;
                      sum3 += budget;
                    } else {
                      sum3 += budget;
                    }
                    if (docs.data().isFinish == false) {
                      nums3 = nums3 + 1;
                    } else if (docs.data().isFinish == true) {
                      nums4 = nums4 + 1;
                    }
                    if (isNaN(budget_remain)) {
                      budget_remain = 0;
                      sum4 += budget_remain;
                    } else {
                      sum4 += budget_remain;
                    }
                  });
                      this.items.unshift({tab: 'ce project',proj_conss: nums3,pro_fh: nums4,amo: sum3,rem: sum4 })
                });
            db.collection("ae_subproject")
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(docs => {
                    var budget = parseInt(docs.data().budget);
                    var budget_remain = parseInt(docs.data().budget_remain);
                    if (isNaN(budget)) {
                      budget = 0;
                      sum5 += budget;
                    } else {
                      sum5 += budget;
                    }
                    if (docs.data().isFinish == false) {
                      nums5 = nums5 + 1;
                    } else if (docs.data().isFinish == true) {
                      nums6 = nums6 + 1;
                    }
                    if (isNaN(budget_remain)) {
                      budget_remain = 0;
                      sum6 += budget_remain;
                    } else {
                      sum6 += budget_remain;
                    }
                  });
                  this.items.unshift({tab: 'ae project',proj_conss: nums5,pro_fh: nums6,amo: sum5,rem: sum6 })
                });
          db.collection("ie_subproject")
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(docs => {
                    var budget = parseInt(docs.data().budget);
                    var budget_remain = parseInt(docs.data().budget_remain);
                    if (isNaN(budget)) {
                      budget = 0;
                      sum7 += budget;
                    } else {
                      sum7 += budget;
                    }
                    if (docs.data().isFinish == false) {
                      nums7 = nums7 + 1;
                    } else if (docs.data().isFinish == true) {
                      nums8 = nums8 + 1;
                    }
                    if (isNaN(budget_remain)) {
                      budget_remain = 0;
                      sum8 += budget_remain;
                    } else {
                      sum8 += budget_remain;
                    }
                  });
                 this.items.unshift({tab: 'ie project',proj_conss: nums7,pro_fh: nums8,amo: sum7,rem: sum8 })
                });
              db.collection("me_subproject")
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(docs => {
                    var budget = parseInt(docs.data().budget);
                    var budget_remain = parseInt(docs.data().budget_remain);
                    if (isNaN(budget)) {
                      budget = 0;
                      sum9 += budget;
                    } else {
                      sum9 += budget;
                    }
                    if (docs.data().isFinish == false) {
                      nums9 = nums9 + 1;
                    } else if (docs.data().isFinish == true) {
                      nums10 = nums10 + 1;
                    }
                    if (isNaN(budget_remain)) {
                      budget_remain = 0;
                      sum10 += budget_remain;
                    } else {
                      sum10 += budget_remain;
                    }
                  });
                  this.items.unshift({tab: 'me project',proj_conss: nums9,pro_fh: nums10,amo: sum9,rem: sum10 })
                });
             db.collection("env_subproject")
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(docs => {
                    var budget = parseInt(docs.data().budget);
                    var budget_remain = parseInt(docs.data().budget_remain);
                    if (isNaN(budget)) {
                      budget = 0;
                      sum11 += budget;
                    } else {
                      sum11 += budget;
                    }
                    if (docs.data().isFinish == false) {
                      nums11 = nums11 + 1;
                    } else if (docs.data().isFinish == true) {
                      nums12 = nums12 + 1;
                    }
                    if (isNaN(budget_remain)) {
                      budget_remain = 0;
                      sum12 += budget_remain;
                    } else {
                      sum12 += budget_remain;
                    }
                  });this.items.unshift({tab: 'env project',proj_conss: nums11,pro_fh: nums12,amo: sum11,rem: sum12 })
                });
            db.collection("che_subproject")
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(docs => {
                    var budget = parseInt(docs.data().budget);
                    var budget_remain = parseInt(docs.data().budget_remain);
                    if (isNaN(budget)) {
                      budget = 0;
                      sum13 += budget;
                    } else {
                      sum13 += budget;
                    }
                    if (docs.data().isFinish == false) {
                      nums13 = nums13 + 1;
                    } else if (docs.data().isFinish == true) {
                      nums14 = nums14 + 1;
                    }
                    if (isNaN(budget_remain)) {
                      budget_remain = 0;
                      sum14 += budget_remain;
                    } else {
                      sum14 += budget_remain;
                    }
                  });
                  this.items.unshift({tab: 'che project',proj_conss: nums13,pro_fh: nums14,amo: sum13,rem: sum14 })
                });
             db.collection("coe_subproject")
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(docs => {
                    var budget = parseInt(docs.data().budget);
                    var budget_remain = parseInt(docs.data().budget_remain);
                    if (isNaN(budget)) {
                      budget = 0;
                      sum15 += budget;
                    } else {
                      sum15 += budget;
                    }
                    if (docs.data().isFinish == false) {
                      nums15 = nums15 + 1;
                    } else if (docs.data().isFinish == true) {
                      nums16 = nums16 + 1;
                    }
                    if (isNaN(budget_remain)) {
                      budget_remain = 0;
                      sum16 += budget_remain;
                    } else {
                      sum16 += budget_remain;
                    }
                  });
                  this.items.unshift({tab: 'coe project',proj_conss: nums15,pro_fh: nums16,amo: sum15,rem: sum16 })
                   this.items.reverse();
                });
          
       
          },
  methods: {}            
};
</script>

<style scoped>
</style>
