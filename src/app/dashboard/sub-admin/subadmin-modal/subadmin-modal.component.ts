import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { GlobalService } from '../../../services/global/global.service';
import { SubAdminService } from '../../../services/subAdmin/sub-admin.service';

@Component({
  selector: 'app-subadmin-modal',
  templateUrl: './subadmin-modal.component.html',
  styleUrl: './subadmin-modal.component.css'
})
export class SubadminModalComponent implements OnInit {
  submitted:boolean=false;
  form:FormGroup;
  userList:any[]=[];
   // second method of multi select
   selectedItems:any[]=[];
   dropdownSettings={};

   selectedAccessArray:any[] = [];
PrivilegeMenuListDataq:any[] = [
  {
    "module": "Dashboard",
    "checked": false,
  },
  {
    "module": "Sub Admin",
    "checked": false,
  
  },
  {
    "module": "User",
    "checked": false,
  },
  {
    "module": "Course",
    "checked": false,
  },
  {
    "module": "Syllabus",
    "checked": false,
  },
  {
    "module": "Previous Paper",
    "checked": false,
  },
  {
    "module": "Post",
    "checked": false,
  },
  {
    "module": "Online Test",
    "checked": false,
  }
]

  submit:boolean=true;
  @Input() public user:any;
  @Input() public patchData:any;
  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private subadminService:SubAdminService,
    private commonService:CommonService,
    private global:GlobalService
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      email:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      status:new FormControl('active',[Validators.required]),
      labDocument:new FormControl(''),
    });
  }

  ngOnInit(): void {
   
    // this.getUserList();
    this.patchDataFunction();

  }

 


  onDeSelectAll(items:any){
    // console.log(items);
  }

  patchDataFunction(){
    if(this.user == 'Edit'){
      console.log(this.user);
      // console.log('patch data Input',this.patchData.labDocument)
      // password: this.patchData.password

      this.form.get('password')?.setValidators([]); // Clear validators for password
     
      // this.PrivilegeMenuListDataq = this.patchData.previleges;
      // this.PrivilegeMenuListDataq = this.patchData.previleges;
      this.mergeAccessData(this.patchData.previleges);
 
      this.selectedItems =this.patchData.assign_to;
      const patch = {
        name: this.patchData.name,
        phone: this.patchData.phone,
        email: this.patchData.email,
        status: this.patchData.status,
      };
      this.form.patchValue(patch);
    }
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
  

  accessFn(selected:any){
    // const data = { 
    //   module :selected.target.value,
    //   checked:selected.target.checked
    //   }
      // this.selectedAccessArray.push(data);
      const index = this.PrivilegeMenuListDataq.findIndex(a => a.module === selected.target.value);
  
      if(index !== -1){
        this.PrivilegeMenuListDataq[index].checked = selected.target.checked;
        // this.selectedAccessArray = this.selectedAccessArray.filter(x=> x.module != data.module);
        // isSelected[0].checked =!isSelected[0].checked;
      }else{
        // this.selectedAccessArray.push(data);
        this.PrivilegeMenuListDataq[index].checked = selected.target.checked;
      }
      console.log(this.PrivilegeMenuListDataq);
      // console.log(this.selectedAccessArray);


      // const data = { 
      //   module :selected.target.value,
      //   checked:selected.target.checked
      //   }
      //   const index = this.selectedAccessArray.findIndex(a => a.module === selected.target.value);
    
      //   if(index !== -1){
      //     this.selectedAccessArray = this.selectedAccessArray.filter(x=> x.module != data.module);
      //   }else{
      //     this.selectedAccessArray.push(data);
      //   }
    }

  assigntoPatching(userList:any){
  userList.forEach((element:any) => {
  this.patchData.assign_to.forEach((ele:any) => {
    if(element._id != ele._id){
      return;
    }else{
      element.isChecked = true;
    }
  })
        });
setTimeout(() => {
  console.log('userlist data',userList);
  this.userList = userList;
});
  }




  get f(){
    return this.form.controls
  }

  modalClose() {
    this.activeModal.close();
  }

  private file: any;
  onFileChange(event:any) {
    this.file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
 }

 onSubmit() {
    this.submitted = true;
    this.submit = false;
    console.log(this.form.value);
    if(this.form.invalid){
      return;
    }
    console.log(this.form.value);
    if(this.user == 'Add'){
      // alert('add');
      this.addData();
      // console.log('form value',this.form.value);
    }else{
      // alert('edit');
      this.editData();

    }

  }

  addData(){    
let formData = new FormData();

this.PrivilegeMenuListDataq.forEach((item, index) => {
  formData.append(`previleges[${index}][module]`, item.module);
  formData.append(`previleges[${index}][checked]`, item.checked.toString());
});
formData.append('logo', this.file);
formData.append('name', this.form.value.name);
formData.append('email', this.form.value.email);
formData.append('phone', this.form.value.phone);
formData.append('password', this.form.value.password);
formData.append('status', this.form.value.status);

    this.subadminService.createSubAdmin(formData).subscribe(res=>{

      // console.log('data update',res)
      if(res.success ){
        this.global.showToast(res.response);
        this.activeModal.close('Add');
      }      

    },err=>{
      this.commonService.tokenOutOfValid(err);
      console.log(err);
    })

  }

  editData(){
    // const data = this.form.value;
    let formData = new FormData();

    (this.file == undefined) ? formData.append('logo', this.patchData.logo) : formData.append('logo', this.file);

    this.PrivilegeMenuListDataq.forEach((item, index) => {
      formData.append(`previleges[${index}][module]`, item.module); // Correct dynamic key construction
      formData.append(`previleges[${index}][checked]`, item.checked.toString()); // Convert boolean to string
    });

    // this.selectedAccessArray.forEach(item => {
    //   formData.append('previleges[]', item);
    // });


      formData.append('name', this.form.value.name);
      formData.append('email', this.form.value.email);
      formData.append('phone', this.form.value.phone);
      formData.append('status', this.form.value.status);
   
    const _id = this.patchData._id;
    this.subadminService.subAdminUpdate(formData,_id).subscribe(res=>{

      // console.log('data update',res)
      if(res.success){
        this.global.showToast(res.response);
        this.activeModal.close('Edit');
      }

    },err=>{
      this.commonService.tokenOutOfValid(err)
      console.log(err)
    })
  }

}
