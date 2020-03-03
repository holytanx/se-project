<template>
  <div>
    <div class="Container">
     <h2 align="center">สรุปยอดงบประมาณรายปี</h2>
      <table class="table table-bordered" id="tbdeantotalbudget">
       <tr>
         <th>โครงการ/กิจกรรมย่อย</th>
         <th>งบประมาณ</th>
         <th>เบิกจ่ายแล้ว</th>
         <th>ยอดคงเหลือ</th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import SideBar from '../components/SideBar'
import firebase from "firebase";
import { db } from '../main';
export default {
  name: "DeanTotalBudget",
  
  created(){
    const table=document.querySelector('#tbdeantotalbudget')
    db.collection('projects').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          showTotalBudget (doc)
        });
      });

  
  function showTotalBudget(doc){
      const table=document.querySelector('#tbdeantotalbudget')
      const disbursed = doc.data().budget - doc.data().budget_remain
      var row=table.insertRow(-1);
      var cell1=row.insertCell(0);
      var cell2=row.insertCell(1);
      var cell3=row.insertCell(2);
      var cell4=row.insertCell(3);
  
      
      cell1.innerHTML=doc.data().project_name;
      cell2.innerHTML=doc.data().budget;
      cell3.innerHTML=disbursed;
      cell4.innerHTML=doc.data().budget_remain;
    }
  }
};
</script>

