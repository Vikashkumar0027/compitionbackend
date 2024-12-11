import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnlineTestService } from '../../../services/onlineTest/online-test.service';
import { CommonService } from '../../../services/common/common.service';
// import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Editor from '../../../../../ckeditor5-custom-build/build/ckeditor';
import { NgForm } from '@angular/forms';
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
  
    @ViewChild('f1') fillForm!: NgForm;
setList:any;
  constructor(
    private activatedRoute:ActivatedRoute,
    private questionListService:OnlineTestService,
    private commonService:CommonService,
    private route: ActivatedRoute,
  ){

  }

  ngOnInit(): void {
    this.setList = this.activatedRoute.snapshot.paramMap.get('id');
    const navdata:any = this.route.snapshot.queryParams;   
    this.seListInfo = JSON.parse(navdata.data);
     this. getQuestionListing();
   }

      
   setListIng(){

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
     const data ={ "set_id":this.seListInfo._id, "question":formds.value.question, 
     "options": [ {"option":formds.value.option1,"correct": false}, {"option":formds.value.option2,"correct": false}, {"option":formds.value.option3,"correct": false}, {"option":formds.value.option4,"correct": false} ] };
 
       data.options[formds.value.answer].correct = true;
     console.log('correct dsata answer', data);
 
 
     if(!this.isedit){
       this.addQuestion(data);
     }else{
       this.EditQuestionData(data);
     }
   
   }
 
   addQuestion(data:any){
    //  this.questionListService.addList(data).subscribe(res => {
    //    console.log('result api of adding',res);
    //    if(res.success){
    //      this.fillForm.reset();
    //      this. getQuestionListing();
    //    }
    //  },
    //  (err)=>{
    //    alert('Somthing went wrong');
    //    console.log('Topic List Api Error',err.error);
    //    this.commonService.tokenDelete(err.error.msg);
    //  })
   }
 
   EditQuestionData(data:any){
    //  this.questionListService.updateApi(this.editIdi,data).subscribe(res => {
    //    console.log("result of edit api",res);
    //    if(res.success){
    //      this.fillForm.reset();
    //      this. getQuestionListing();
     
    //          }
    //  },
    //  (err)=>{
    //    alert('Somthing went wrong');
    //    console.log('Topic List Api Error',err.error);
    //    this.commonService.tokenDelete(err.error.msg);
    //  })
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
    //  this.isedit=false;
    //  this.fillForm.reset();
    //  this.formSubmitted = false;
    //  this.editIdi='';
   }
 
   edit(data:any ,el: HTMLElement){
     el.scrollIntoView();
     console.log(data);
     this.isedit=true;
     this.editIdi=data._id;
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
     this.deleteIdi = param?._id;
   }
 
   delete1(){
    //  this.questionListService.deleteApi(this.deleteIdi).subscribe(res => {
    //    console.log('this.delete',res);
    //    if(res.success){
    //      this. getQuestionListing();
    //      this.resetForm();
    //    }
    //  },
    //  (err)=>{
    //    console.log('Topic List Api Error',err.error);
    //    this.commonService.tokenDelete(err.error.msg);
    //  })
   }


}
