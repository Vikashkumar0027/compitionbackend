import { Component, Input } from '@angular/core';
import { PrivilageService } from '../../../services/privilage/privilage.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import *as featureInterface from '../../../services/interface/interface'

@Component({
  selector: 'app-privilage-modal',
  templateUrl: './privilage-modal.component.html',
  styleUrl: './privilage-modal.component.css'
})
export class PrivilageModalComponent {
  @Input() PatchData:any;
  @Input() userType:any;
  @Input() modalTitle: string = '';
  @Input() PrivilegeMenuListData: any;
  
  //  PrivilegeMenuListDataq:any[] = featureInterface.selectSideBar;
   PrivilegeMenuListDataq:any[] = [];


  
  @Input() RoleListData: any;

  // privilegeService = inject(PrivilegeService);
  options:any[] = ['create', 'edit', 'view', 'delete'];
  defaultOptions:any[] = ['edit', 'view'];
  priviledgeChecked = false;
  selectedAccessArray:any[] = [];
  optionData:any[] = [];


constructor( 
  private activeModal: NgbActiveModal,
  private formBuilder: FormBuilder,
  private privilegeService:PrivilageService
){
  this.PrivilegeMenuListDataq  = featureInterface.selectSideBar.filter(x => x.module !== 'Previlage' && x.module !== 'Sub Admin');
  // console.log(data);
} 



// access: this.formBuilder.control(' ',[Validators.required]),

privilegeForm: FormGroup = this.formBuilder.group({
  name  : ['',Validators.required],
  access: this.formBuilder.array([]),
  status: ['active',Validators.required],
});
submitted = false;


ngOnInit(): void {
  // console.log(this.PrivilegeMenuListData);
  if(this.PatchData){
    this.PatchDataForm()
  }
}

get f(): { [key: string]: AbstractControl } {
  return this.privilegeForm.controls;
} 

accessFn(selected:any){
  const index = this.PrivilegeMenuListDataq.findIndex(a => a.module === selected.target.value);
  
      if(index !== -1){
        this.PrivilegeMenuListDataq[index].checked = selected.target.checked;
        
      }else{
        // this.selectedAccessArray.push(data);
        this.PrivilegeMenuListDataq[index].checked = selected.target.checked;
      }

      console.log(this.PrivilegeMenuListDataq);
  }


  subAccessFn(access:any,option:any){
    const index = this.selectedAccessArray.findIndex(a => a.name === access);
    const optionData = { 
      name :option.target.value,
      checked:option.target.checked
    };
    if(index !== -1){
      const subIndex = this.selectedAccessArray[index].options.findIndex((x: { name: any; }) => x.name === option.target.value);
      if(subIndex!== -1){
        this.selectedAccessArray[index].options[subIndex].checked = option.target.checked;
      }else{
       
        this.selectedAccessArray[index].options.push(optionData);
      }
    }else{
      // this.selectedAccessArray.push(optionData);
      this.selectedAccessArray[index].options.push(optionData);
    }
    console.log(this.selectedAccessArray);
  }

onSubmit(): void {
  this.submitted = true;
console.log(this.PrivilegeMenuListDataq);
  console.log(this.privilegeForm.value);
  if (this.privilegeForm.invalid) {
    return;
  }

  const formData = { 
    title:this.privilegeForm.value.name, 
    privilege:this.PrivilegeMenuListDataq, 
    status:this.privilegeForm.value.status }



  if(this.userType=='Edit'){
    this.editPrivilege(formData);
  }else{
    this.addPrivilege(formData);
  }
 
}

addPrivilege(formData:any){
  this.privilegeService.PrivilegeAdd(formData).subscribe(res => {
    console.log(res);
    if(res.success){
      this.activeModal.close('Add');
      // this.PrivilegeMenuListData = res.response;
      
    }else{
      console.log('No data found!',res.message);
    }
    // this.globalService.showToast('successfully logged in');
  }, error => {
    console.log(error);
  });
}

editPrivilege(formData:any){
  this.privilegeService.PrivilegeUpdate(formData,this.PatchData._id).subscribe(res => {
    console.log('updated successfully');
    if(res.success){
      this.activeModal.close('Edit');
      // this.PrivilegeListData = res.response;
      
    }else{
      console.log('No data found!',res.message);
    }
    // this.globalService.showToast('successfully logged in');
  }, error => {
    console.log(error);
  });
}

  PatchDataForm(){
    console.log(this.PatchData , this.PrivilegeMenuListDataq);
    this.mergeAccessData(this.PatchData.privilege)
    this.privilegeForm.patchValue({
      name: this.PatchData.title,
      status: this.PatchData.status
    })
  }

  mergeAccessData(previleges:any) {
    this.PrivilegeMenuListDataq.forEach(menuItem => {
      // Find matching module in selectedAccessArray
      const selectedModule = previleges.find((item:any) => item.module === menuItem.module);
      
      // If a match is found, update the checked property, otherwise keep it as false
      if(selectedModule) {
        menuItem.checked = selectedModule.checked;
      } else {
        menuItem.checked = false;
      }
    });
    console.log(this.PrivilegeMenuListDataq)
  }

  // onReset(): void {
  //   this.submitted = false;
  //   this.privilegeForm.reset();
  // }

  modalClose() {
    this.activeModal.close('Cancel');
  }
  priviledgeToggel(){

  }
}
