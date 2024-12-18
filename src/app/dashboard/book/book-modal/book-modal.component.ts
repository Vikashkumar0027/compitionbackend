import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { BookService } from '../../../services/book/book.service';
import { GlobalService } from '../../../services/global/global.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.css'
})
export class BookModalComponent implements OnInit {
  submitted:boolean=false;
  form:FormGroup;
  userList:any[]=[];
   // second method of multi select
   selectedItems:any[]=[];
   dropdownSettings={};

  submit:boolean=true;
  @Input() public user:any;
  @Input() public patchData:any;
  // @Input() public subjectId:any;
  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    // private couseService:CourseService,
    private commonService:CommonService,

    private bookService:BookService,
    private global:GlobalService
  ) { 
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      pdf: ['', Validators.required],
      cover_image: ['', Validators.required],
      language:['hindi', Validators.required],
      status:['Published', Validators.required]
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

      // this.form.get('password')?.setValidators([]); // Clear validators for password image: this.patchData.status,

      const patch = {
        title: this.patchData.title,
        author: this.patchData.author,
        description: this.patchData.description,
        language: this.patchData.language,
        status: this.patchData.status,
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

  private pdf: any;
  onFileChangePdf(event:any) {
    this.pdf = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    let fileList: FileList = event.target.files;  
    let pdf: File = fileList[0];
 }

 onSubmit() {
    this.submitted = true;
    this.submit = false;
    console.log(this.form.value);
    this.todayFormateDate();
    if(this.user == 'Add'){
      // alert('add');
      this.addData();
      // console.log('form value',this.form.value);
    }else{
      // alert('edit');
      const imageControl = this.form.get('cover_image');
      const pdfControl = this.form.get('pdf');
      if (imageControl && pdfControl) {
        imageControl.setValidators([]);  // Remove all validators
        imageControl.updateValueAndValidity();  // Revalidate the control
        pdfControl.setValidators([]);
        pdfControl.updateValueAndValidity(); 
      }
      this.editData();

    }

  }


  formattedDate: any;
  todayFormateDate(){
    const currentDate = new Date();
    
    // Get the day, month, and year
    const day = ("0" + currentDate.getDate()).slice(-2);
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Month is zero-based
    const year = currentDate.getFullYear();

    // Format date as 'dd-MM-yyyy'
    this.formattedDate = `${day}-${month}-${year}`;
  }

  addData(){
      if(this.form.invalid){
      return;
    }
    // const data = this.form.value;
    console.log(this.form.value);
    let formData = new FormData();

// (this.file == undefined) ? formData.append('image', '') : formData.append('image', this.file);

formData.append('cover_image', this.file); 
formData.append('pdf', this.pdf); 
formData.append('title', this.form.value.title);
formData.append('author', this.form.value.author);
formData.append('description', this.form.value.description);
formData.append('publish_date', this.formattedDate);
formData.append('language', this.form.value.language);
formData.append('status', this.form.value.status);

    this.bookService.bookAdd(formData).subscribe(res=>{

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
    if(this.form.invalid){
      return;
    }
    // const data = this.form.value;
    console.log(this.form.value)
let formData = new FormData();
(this.file == undefined) ? formData.append('cover_image', this.patchData.cover_image) : formData.append('cover_image', this.file);

(this.pdf == undefined) ? formData.append('pdf', this.patchData.pdf) : formData.append('pdf', this.pdf);


formData.append('title', this.form.value.title);
formData.append('author', this.form.value.author);
formData.append('description', this.form.value.description);
formData.append('publish_date', this.formattedDate);
formData.append('language', this.form.value.language);
formData.append('status', this.form.value.status);
   
    const _id = this.patchData._id;
    this.bookService.bookUpdate(formData,_id).subscribe(res=>{

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
