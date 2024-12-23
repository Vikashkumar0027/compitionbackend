import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnlineTestService } from '../../../services/onlineTest/online-test.service';
import { CommonService } from '../../../services/common/common.service';
// import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Editor from '../../../../../ckeditor5-custom-build/build/ckeditor';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from '../../../services/global/global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrl: './test-question.component.css'
})
export class TestQuestionComponent implements OnInit {

  // chapterId:any;
  seListInfo:any;
  questionList:any;
  // nochangePdf:any;
    formSubmitted = false;
    deleteIdi:any;
    editIdi:any;
    isedit:boolean=false;
    htmlContent = '';
    public Editor:any = Editor;
    public placeholderText = 'Start typing your content here...';
    public editorConfig = {
      toolbar: {
        items: ['heading', '|', 'bold', 'italic','MathType','|','Alignment',
        'Autoformat',
        'Autosave',
        'BlockQuote',
        'CloudServices',
        'Essentials',
        'FontColor',
        'FontFamily',
        'GeneralHtmlSupport',
        
        'Italic',
        
        'Autosave',
        'Paragraph',
        'PasteFromOffice',
        'Table',
        'TableColumnResize',
        'TableToolbar',
        'TextTransformation',
         '|', 'undo', 'redo'],
        shouldNotGroupWhenFull: true,
      },
    };

    setlistData:any;
  
    @ViewChild('f1') fillForm!: NgForm;
setList:any;
  constructor(
    private activatedRoute:ActivatedRoute,
    private questionListService:OnlineTestService,
    private onlineService:OnlineTestService,
    private commonService:CommonService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private global:GlobalService,
    private modalService: NgbModal,
  ){

  }
id:any;
  ngOnInit(): void {
    // this.setList = this.activatedRoute.snapshot.paramMap.get('id');

    const data:any = this.activatedRoute.snapshot.queryParams;
    this.id = JSON.parse(data.data);
console.log(this.id);
    // const navdata:any = this.route.snapshot.queryParams;   
    // this.seListInfo = JSON.parse(navdata.data);
    //  this. getQuestionListing();

    this.setListIngView();
   }


   setListIngView(){
    try {
      this.spinner.show();
      this.onlineService.setTestView(this.id.setId).subscribe(res=>{
      console.log(res);
      if(res.success){
        this.setlistData=res.response;
        this.questionList=res.response.questions;
      }
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.commonService.tokenOutOfValid(err);
    })
    } catch (error) {
      this.spinner.hide();
    }
   }
 
   getQuestionListing(){
     const data = {"_id":  this.seListInfo._id};
    //  this.questionListService.getList(data).subscribe(res => {
    //    console.log('result of QuestionList',res);
    //    if(res.success && res.result.result.length > 0){  
    //     this.questionList = res;
    //    }
    //  },
    //  (err)=>{
    //    console.log(err);
    //  }
    //  )
   }
 
   // private pdfAdd: File;
   // onFileChangeAddPdf(fileChangeEvent:any){
   //   this.pdfAdd = fileChangeEvent.target.files[0];
   // }
 
   questionSubmit(formds:any){
     // this.formSubmitted = true;
     console.log(formds.value);
     if(formds.invalid){
       this.formSubmitted = true;
       return;
     }
     this.formSubmitted = false;
     // console.log('reactive form',formds.value);
     const correctAnswer = formds.value.answer;
     console.log('correct answer', correctAnswer);
     const data ={ "question":formds.value.question, 
     "options": [ {"option":formds.value.option1,"correct": false}, {"option":formds.value.option2,"correct": false}, {"option":formds.value.option3,"correct": false}, {"option":formds.value.option4,"correct": false} ] };
 
       data.options[formds.value.answer].correct = true;
       const formData ={'questions': [ {...data}]}
     console.log('correct dsata answer', formData);
 
 
     if(!this.isedit){
       this.addQuestion(formData);
     }else{
       this.EditQuestionData(data);
     }
   
   }
 
   addQuestion(data:any){
     this.onlineService.addQuestion(data,this.id.setId).subscribe(res => {
       console.log('result api of adding',res);
       if(res.success){
         this.fillForm.reset();
         this.setListIngView();
       }
     },
     (err)=>{
       alert('Somthing went wrong');
       console.log('Topic List Api Error',err.error);
      //  this.commonService.tokenDelete(err.error.msg);
     })
   }
 
   EditQuestionData(data:any){
     this.onlineService.updateQuestion(data,this.id.setId,this.editIdi).subscribe(res => {
       console.log("result of edit api",res);
       if(res.success){
         this.fillForm.reset();
         this.setListIngView();
     
             }
     },
     (err)=>{
       alert('Somthing went wrong');
       console.log('Topic List Api Error',err.error);
      //  this.commonService.tokenDelete(err.error.msg);
     })
   }
 
   
   // private pdf: File;
   // onFileChangePdf(fileChangeEvent:any){
   //   this.pdf = fileChangeEvent.target.files[0];
   // }
 
 
   // scroll(el: HTMLElement) {
   //   el.scrollIntoView();
   // }
 
   addNewQuestion(el: HTMLElement){
     el.scrollIntoView();
     this.resetForm();
   }
 
   resetForm(){
     this.isedit=false;
     this.fillForm.reset();
     this.formSubmitted = false;
     this.editIdi='';
   }
 
   edit(data:any ,el: HTMLElement){
     el.scrollIntoView();
     console.log(data);
     this.isedit=true;
     this.editIdi=data.id;
     // console.log('edit data',data)
     const answerIndex = data?.options.findIndex((x:any) => x.correct == true);
     const patchData = {
       question:data.question,
       option1:data?.options[0].option,
       option2:data?.options[1].option,
       option3:data?.options[2].option,
       option4:data?.options[3].option,
       answer:answerIndex,
     }
     console.log(patchData)
 this.fillForm.form.patchValue(patchData);
   }
 
   deleteId(param:any){
     console.log('Delete data',param);
    //  this.deleteIdi = param?.id;
     const activeModal = this.modalService.open(ConfirmModalComponent, {
      size: '',
      backdrop: 'static',
      keyboard: false,
    });
    //data transfer to child
    const contentObj = {
      heading: 'Delete!',
      message: 'Are you sure want to Delete ?',
      cancel: 'Cancel',
      ok: 'Delete'
    }
    activeModal.componentInstance.modalContent = contentObj;
    activeModal.componentInstance.resetpassword = false;
    activeModal.result.then(
      (result) => {
      

        if (result === 'Ok') {
          this.delete1(param?.id);     
        }
      },
      (reason) => {}
    );
   }
 
   delete1(deletId:any){
     this.onlineService.deleteQuestion(this.id.setId,deletId).subscribe(res => {
       console.log('this.delete',res);
       if(res.success){
        this.setListIngView();
         this.resetForm();
       }
     },
     (err)=>{
       console.log('Topic List Api Error',err.error);
      //  this.commonService.tokenDelete(err.error.msg);
     })
   }

   viewData:any;
   viewQuestion(list:any){
      console.log(list);
      this.viewData=list;

   }


}
