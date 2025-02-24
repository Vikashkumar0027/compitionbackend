import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { LiveclassService } from '../../../services/liveclass/liveclass.service';
import { GlobalService } from '../../../services/global/global.service';

@Component({
  selector: 'app-liveclass-modal',
  templateUrl: './liveclass-modal.component.html',
  styleUrl: './liveclass-modal.component.css'
})
export class LiveclassModalComponent implements OnInit {

    submitted:boolean=false;
    form:FormGroup;
    userList:any[]=[];
     // second method of multi select
     selectedItems:any[]=[];
     dropdownSettings={};
  
    submit:boolean=false;
    @Input() public user:any;
    @Input() public patchData:any;
    @Input() public courseList:any[]=
    [
      {
          "_id": "67a45361cc998e190b660631",
          "title": "Test Batch",
         
      },
      {
          "_id": "67a1fa3299aea2decbcf5d85",
          "title": "Computer Teacher",
        
      },
      {
          "_id": "676d2c0ea57e3d791c16d6f7",
          "title": "SSc GD 2024",
        
      },
      {
          "_id": "6763e82641acbe78abb9972e",
          "title": "Spoken English",
        
      },
      {
          "_id": "675973321665fb0743c8549b",
          "title": "Node Js",
       
      },
      {
          "_id": "6751987944a4787a36afdfb2",
          "title": "test 123",
        
      },
      {
          "_id": "674d4c078151cbfd86440eab",
          "title": "Node Js",
        
      },
      {
          "_id": "673dc7706aa4bffa10b3cd87",
          "title": "Node Js",
      },
      {
          "_id": "all",
          "title": "All"
      }
  ]
    
    // @Input() public subjectId:any;
    constructor(
      private fb: FormBuilder,
      private activeModal: NgbActiveModal,
      // private couseService:CourseService,
      private commonService:CommonService,
  
      private liveClassService:LiveclassService,
      private global:GlobalService
    ) { 
      this.form = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        meetingTime: ['', Validators.required],
        meetingType: ['youtube', Validators.required],
        videoId: ['', Validators.required],
        MeetingId: [''],
        passCode: [''],
        thumbnail: ['', Validators.required],
        order: ['', Validators.required],
        // courses: [[], Validators.required],
        courses: this.fb.array([], Validators.required),
        status:['active', Validators.required]
      });
    }
  
    ngOnInit(): void {
     
      // this.getUserList();
      this.patchDataFunction();
      setTimeout(() => {
        if(this.patchData._id){
          this.patchaData();
        }
      });
    }
    // courseList = [
    //   { _id: '67a45361cc998e190b660631', title: 'Math' },
    //   { _id: '67a1fa3299aea2decbcf5d85', title: 'Science' },
    //   { _id: '6763e82641acbe78abb9972e', title: 'History' },
    //   { _id: '6789abc123def456ghi789jk', title: 'English' }
    // ];
    // selectedCourses = [
    //   '67a45361cc998e190b660631',
    //   '67a1fa3299aea2decbcf5d85',
    //   '6763e82641acbe78abb9972e'
    // ];
    patchaData(){
      console.log(this.patchData,this.patchData.batchId);
   
      this.patchData.batchId.forEach((courseId:any, index:any) => {

        const courses: FormArray = this.form.get('courses') as FormArray;
        console.log(this.form.value)
            // if (event.target.checked) {
              courses.push(this.fb.control(courseId));

      });

      console.log(this.form.value);
     
    }
  
    // Custom validator to restrict to two decimal places
    maxTwoDigitsValidator(control: any) {
      const value = control.value;
      if (value) {
        // Regular expression to check the value
        const regex = /^(\d{1,2}(\.\d{0,2})?)?$/;
        
        if (!regex.test(value.toString())) {
          return { invalidDecimal: true };
        }
      }
      return null;
    }

    isYoutube:boolean=false;
    onSelectionChange(event: any) {
      console.log(event.target.value)
  if(event.target.value == 'youtube'){
    this.isYoutube=false;
    const videoId:any = this.form.get('videoId');
    const meetingId:any = this.form.get('MeetingId');
    const passCode:any = this.form.get('passCode');
    videoId.setValidators([Validators.required]);  
    videoId.updateValueAndValidity();
    meetingId.setValidators([]);  
    meetingId.updateValueAndValidity();
    passCode.setValidators([]);  
    passCode.updateValueAndValidity();
  }else{
    const videoId:any = this.form.get('videoId');
    const meetingId:any = this.form.get('MeetingId');
    const passCode:any = this.form.get('passCode');
    videoId.setValidators([]);  
    videoId.updateValueAndValidity();
    meetingId.setValidators([Validators.required]);  
    meetingId.updateValueAndValidity();
    passCode.setValidators([Validators.required]);  
    passCode.updateValueAndValidity();
    this.isYoutube=true;
  }
  
    }
   
    onCheckboxChange(event: any) {

      const courses: FormArray = this.form.get('courses') as FormArray;

      // console.log(this.form.value);
      const index = courses.controls.findIndex(x => x.value === 'all');
      if(index>=0){
        courses.removeAt(index);
        return;
      }

      if(event.target.value == 'all' && event.target.checked){
        courses.clear();
   
        courses.push(this.fb.control(event.target.value));
        // console.log(this.form.value);
        return;
      }

      
  // console.log(this.form.value)
      if (event.target.checked) {
        courses.push(this.fb.control(event.target.value));
      } else {
        const index = courses.controls.findIndex(x => x.value === event.target.value);
        courses.removeAt(index);
      }
    }

  
  
  
    onDeSelectAll(items:any){
      // console.log(items);
    }
  
    patchDataFunction(){
      if(this.user == 'Edit'){
        console.log(this.user);
        console.log(this.form.value);
        // this.form.get('password')?.setValidators([]); // Clear validators for password image: this.patchData.status,
        if(this.patchData.mettingType != 'youtube'){
          this.isYoutube=true;
          const videoId:any = this.form.get('videoId');
          videoId.setValidators([]);  
          videoId.updateValueAndValidity();
        }
        const patch = {
          title: this.patchData?.title,
          status: this.patchData.status,
          description: this.patchData.description,
          videoId: this.patchData?.videoId,
          order: this.patchData?.order,
          meetingTime: this.patchData.meetingTime 
          ? new Date(this.patchData.meetingTime).toISOString().slice(0, 16) // Format for datetime-local
          : '',
          MeetingId: this.patchData.meetingId,
          meetingType: this.patchData.mettingType,
          passCode: this.patchData.passCode,
        };
        this.form.patchValue(patch);
      
      }
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
      this.submit = true;
      console.log(this.form.value);
      if(this.user == 'Add'){
        this.addData();
      }else{
        const imageControl = this.form.get('thumbnail');
        if(imageControl) {
          imageControl.setValidators([]);  // Remove all validators
          imageControl.updateValueAndValidity();  // Revalidate the control
        }
        this.editData();
      }
    }
  
    addData(){
        if(this.form.invalid){
          this.submit = false;
        return;
      }

      // const data = this.form.value;
      console.log(this.form.value);
      let formData = new FormData();  

      this.form.value.courses.forEach((courseId:any, index:any) => {
        formData.append(`batchId[${index}]`, courseId); 
      });

  formData.append('thumbnail', this.file); 
  formData.append('title', this.form.value.title);
  formData.append('videoId', this.form.value.videoId);
  formData.append('description', this.form.value.description);
  formData.append('order', this.form.value.order);
  formData.append('mettingType', this.form.value.meetingType);
  formData.append('meetingId', this.form.value.MeetingId);
  formData.append('passCode', this.form.value.passCode);
  formData.append('meetingTime', this.form.value.meetingTime);
  // formData.append('batchId', this.form.value.courses);
  formData.append('status', this.form.value.status);
  
      this.liveClassService.createLiveClass(formData).subscribe(res=>{
        this.submit = false;
        // console.log('data update',res)
        if(res.success ){
          this.global.showToast(res.response);
          this.activeModal.close('Add');
        }      
  
      },err=>{
        this.submit = false;
        this.commonService.tokenOutOfValid(err);
        console.log(err);
      })
  
    }
  
    editData(){
      if(this.form.invalid){
        this.submit = false;
        return;
      }
      // const data = this.form.value;
      console.log(this.form.value)
    let formData = new FormData();
  (this.file == undefined) ? formData.append('thumbnail', this.patchData.thumbnail) : formData.append('thumbnail', this.file);
  
  formData.append('title', this.form.value.title);
  formData.append('videoId', this.form.value.videoId);
  formData.append('description', this.form.value.description);
  formData.append('order', this.form.value.order);
  formData.append('mettingType', this.form.value.meetingType);
  formData.append('meetingId', this.form.value.MeetingId);
  formData.append('passCode', this.form.value.passCode);
  formData.append('meetingTime', this.form.value.meetingTime);
  formData.append('batchId', this.form.value.courses);
  formData.append('status', this.form.value.status);

  
      const _id = this.patchData._id;
      this.liveClassService.liveclassUpdate(formData,_id).subscribe(res=>{
        this.submit = false;
        // console.log('data update',res)
        if(res.success){
          this.global.showToast(res.response);
          this.activeModal.close('Edit');
        }
      },err=>{
        this.submit = false;
        this.commonService.tokenOutOfValid(err)
        console.log(err)
      })
    }
}
