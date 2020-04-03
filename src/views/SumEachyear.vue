<template>
  <v-sheet id="scrolling-techniques-5" class="overflow-y-auto" max-height="800">

  <v-container style="height: 1500px;">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="teal"
      slider-color="teal darken-3"
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
                db.collection("projects").get().then(querySnapshot => {
                    //  console.log(querySnapshot)
                    querySnapshot.forEach(docs => {
                      
                      var deptID = docs.data().dept_id
                      if(deptID == "0" || parseInt(deptID) == 0){
                        var budget = parseInt(docs.data().budget_remain)
                        var remain = parseInt(docs.data().disburse_remain)
                        var finish = docs.data().isFinish
                        sum1+=budget
                        sum2+=remain
                        if(finish == false){
                          nums1+=1
                        }else if(finish==true){
                          nums2+=1
                        }
                      }
                      else if(deptID == "1" || parseInt(deptID) == 1){
                        var budget1 = parseInt(docs.data().budget_remain)
                        var remain1 = parseInt(docs.data().disburse_remain)
                        var finish1 = docs.data().isFinish
                        sum3+=budget1
                        sum4+=remain1
                        if(finish1 == false){
                          nums3+=1
                        }else if(finish1==true){
                          nums4+=1
                        }
                      }                      
                       else if(deptID == "2" || parseInt(deptID) == 2){
                        var budget2 = parseInt(docs.data().budget_remain)
                        var remain2 = parseInt(docs.data().disburse_remain)
                        var finish2 = docs.data().isFinish
                        sum5+=budget2
                        sum6+=remain2
                        if(finish2 == false){
                          nums5+=1
                        }else if(finish2==true){
                          nums6+=1
                        }
                      } 
                       else if(deptID == "3" || parseInt(deptID) == 3){
                        var budget3 = parseInt(docs.data().budget_remain)
                        var remain3 = parseInt(docs.data().disburse_remain)
                        var finish3 = docs.data().isFinish
                        sum7+=budget3
                        sum8+=remain3
                        if(finish3 == false){
                          nums7+=1
                        }else if(finish2==true){
                          nums8+=1
                        }
                      }
                       else if(deptID == "4" || parseInt(deptID) == 4){
                        var budget4 = parseInt(docs.data().budget_remain)
                        var remain4 = parseInt(docs.data().disburse_remain)
                        var finish4 = docs.data().isFinish
                        sum9+=budget4
                        sum10+=remain4
                        if(finish4 == false){
                          nums9+=1
                        }else if(finish4==true){
                          nums10+=1
                        }
                      }
                       else if(deptID == "5" || parseInt(deptID) == 5){
                        var budget5 = parseInt(docs.data().budget_remain)
                        var remain5 = parseInt(docs.data().disburse_remain)
                        var finish5 = docs.data().isFinish
                        sum11+=budget5
                        sum12+=remain5
                        if(finish5 == false){
                          nums11+=1
                        }else if(finish5==true){
                          nums12+=1
                       }
                      }
                       else if(deptID == "6" || parseInt(deptID) == 6){
                        var budget6 = parseInt(docs.data().budget_remain)
                        var remain6 = parseInt(docs.data().disburse_remain)
                        var finish6 = docs.data().isFinish
                        sum13+=budget6
                        sum14+=remain6
                        if(finish6 == false){
                          nums13+=1
                        }else if(finish6==true){
                          nums14+=1
                        }
                      } 
                       else if(deptID == "7" || parseInt(deptID) == 7){
                        var budget7 = parseInt(docs.data().budget_remain)
                        var remain7 = parseInt(docs.data().disburse_remain)
                        var finish7 = docs.data().isFinish
                        sum15+=budget7
                        sum16+=remain7
                        if(finish7 == false){
                          nums15+=1
                        }else if(finish7==true){
                          nums16+=1
                        }
                      }                    
                    });
                      this.items.unshift({tab:'ee project',proj_conss: nums1,pro_fh: nums2,amo: sum1,rem: sum2 })
                      this.items.unshift({tab: 'ce project',proj_conss: nums3,pro_fh: nums4,amo: sum3,rem: sum4 })
                      this.items.unshift({tab: 'ae project',proj_conss: nums5,pro_fh: nums6,amo: sum5,rem: sum6 })
                      this.items.unshift({tab: 'ie project',proj_conss: nums7,pro_fh: nums8,amo: sum7,rem: sum8 })
                      this.items.unshift({tab: 'me project',proj_conss: nums9,pro_fh: nums10,amo: sum9,rem: sum10 })
                      this.items.unshift({tab: 'env project',proj_conss: nums11,pro_fh: nums12,amo: sum11,rem: sum12 })                  
                      this.items.unshift({tab: 'che project',proj_conss: nums13,pro_fh: nums14,amo: sum13,rem: sum14 })
                      this.items.unshift({tab: 'coe project',proj_conss: nums15,pro_fh: nums16,amo: sum15,rem: sum16 })
                      this.items.reverse();
                    
                });



           
          
       
          },
};
</script>

<style scoped>
</style>
