import { Component, Input } from '@angular/core';
import { PrivilageService } from '../../../services/privilage/privilage.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  PrivilegeMenuListDataq:any[] = [
    {
      "name": "Dashboard",
      "checked": false,
      "options": [
        {
          "name": "add",
          "checked": false
        },
        {
          "name": "view",
          "checked": false
        },
        {
          "name": "edit",
          "checked": false
        },
        {
          "name": "delete",
          "checked": false
        }
      ]
    },
    {
      "name": "Privilege",
      "checked": false,
      "options": [
        {
          "name": "add",
          "checked": false
        },
        {
          "name": "view",
          "checked": false
        },
        {
          "name": "edit",
          "checked": false
        },
        {
          "name": "delete",
          "checked": false
        }
      ]
    },
    {
      "name": "Role",
      "checked": false,
      "options": [
        {
          "name": "add",
          "checked": false
        },
        {
          "name": "view",
          "checked": false
        },
        {
          "name": "edit",
          "checked": false
        },
        {
          "name": "delete",
          "checked": false
        }
      ]
    },
    {
      "name": "User",
      "checked": false,
      "options": [
        {
          "name": "add",
          "checked": false
        },
        {
          "name": "view",
          "checked": false
        },
        {
          "name": "edit",
          "checked": false
        },
        {
          "name": "delete",
          "checked": false
        }
      ]
    },
    {
      "name": "Company",
      "checked": false,
      "options": [
        {
          "name": "add",
          "checked": false
        },
        {
          "name": "view",
          "checked": false
        },
        {
          "name": "edit",
          "checked": false
        },
        {
          "name": "delete",
          "checked": false
        }
      ]
    },
    {
      "name": "Subscription",
      "checked": false,
      "options": [
        {
          "name": "add",
          "checked": false
        },
        {
          "name": "view",
          "checked": false
        },
        {
          "name": "edit",
          "checked": false
        },
        {
          "name": "delete",
          "checked": false
        }
      ]
    },
    {
      "name": "Vendor",
      "checked": false,
      "options": [
        {
          "name": "add",
          "checked": false
        },
        {
          "name": "view",
          "checked": false
        },
        {
          "name": "edit",
          "checked": false
        },
        {
          "name": "delete",
          "checked": false
        }
      ]
    },
    {
      "name": "ContactUs",
      "checked": false,
      "options": [
        {
          "name": "add",
          "checked": false
        },
        {
          "name": "view",
          "checked": false
        },
        {
          "name": "edit",
          "checked": false
        },
        {
          "name": "delete",
          "checked": false
        }
      ]
    }
  ]
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
){} 



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
  const data = { 
    name :selected.target.value,
    checked:selected.target.checked,
    options:[]
    }
    // this.selectedAccessArray.push(data);
    const index = this.selectedAccessArray.findIndex(a => a.name === selected.target.value);

    if(index !== -1){
      this.selectedAccessArray[index].checked = selected.target.checked;
      // isSelected[0].checked =!isSelected[0].checked;
    }else{
      this.selectedAccessArray.push(data);
    }
    console.log(this.selectedAccessArray);
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

  // console.log(this.privilegeForm.value);
  if (this.privilegeForm.invalid) {
    return;
  }
 const formData = {
  name : this.privilegeForm.value.name,
  access : this.selectedAccessArray,
  status : (this.privilegeForm.value.status)?this.privilegeForm.value.status:"active",
  // date: this.privilegeForm.value.date
  }

  if(this.userType=='Edit'){
    this.editPrivilege(formData);
  }else{
    this.addPrivilege(formData);
  }
 
}

addPrivilege(formData:any){
  this.privilegeService.PrivilegeAdd(formData).subscribe(res => {
    // console.log(res);
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
    this.privilegeForm.patchValue({
      name: this.PatchData.name,
      access: this.PatchData.access,
      status: this.PatchData.status
    })
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
