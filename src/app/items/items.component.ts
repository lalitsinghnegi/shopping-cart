import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,FormArray,AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {IOrder} from './IOrder';
import {OrdersService} from './OrdersService';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {
ordersForm:FormGroup;
ordersData:IOrder[]=[];  

  constructor(private fb : FormBuilder,private service:OrdersService) {
      this.ordersForm= this.fb.group({
        orders:new FormArray([],this.minSelectedCheckboxes(1))
      });
      //async call
      service.getOrdersData().subscribe(data=>{
       this.ordersData = data;
        this.addCheckBoxes();
      })
      
   }

get orders(){
return this.ordersForm.controls.orders as FormArray;
}

//custom valiudator function
minSelectedCheckboxes(minRequired = 1) :ValidatorFn{
  return (control:any) : ValidationErrors | null => {
    let checked = 0;
    if(control.controls.length>0){
      control.controls.map((val:any)=> {
      if (val.value) {
        checked ++;
     }
    });
  }
    if (checked < minRequired) {
      return {
        requireCheckboxesToBeChecked: true,
      };
    }
    return null;  
  };
}

//generate checkbox with false( unchecked) state
addCheckBoxes(){
  this.ordersData.forEach(()=>this.orders.push(new FormControl(false)))
}
//submit the form and print selected checkbox items
submit() {
let selectedItem =  this.ordersForm.value.orders
    .map((v:any, i:number) => v ? this.ordersData[i].id : null);
 let sel=selectedItem.filter((p:any)=> p !== null);
  console.log(sel);
}

}
