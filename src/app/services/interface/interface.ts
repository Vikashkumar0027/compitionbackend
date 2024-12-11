// const domain = 'http://localhost:4500/';
const domain = 'http://43.225.53.245:4500/';

 export let login = domain+'admin/login';
 export let createSubAdmin = domain+'admin/create';
 export let subAdminList = domain+'admin/list';
 export let subAdminUpdate = domain+'admin/update';

//course crude
 export let courseCreate = domain+'admin/batch/create';
 export let courseList = domain+'admin/batch/list';
 export let courseUpdate = domain+'admin/batch/update';
 export let courseDelete = domain+'admin/batch/delete';
//Subject crude
 export let subjectCreate = domain+'admin/subject/create';
 export let subjectList = domain+'admin/subject/list';
 export let subjectUpdate = domain+'admin/subject/update';
 export let subjectDelete = domain+'admin/subject/delete';
//Chapter crude
 export let chapterCreate = domain+'admin/chapter/create';
 export let chapterList = domain+'admin/chapter/list';
 export let chapterUpdate = domain+'admin/chapter/update';
 export let chapterDelete = domain+'admin/chapter/delete';
 
 //  syllabus crude
 export let syllabusCreate = domain+'admin/syllabus/create';
 export let syllabusList = domain+'admin/syllabus/list';
 export let syllabusUpdate = domain+'admin/syllabus/update';
 export let syllabusDelete = domain+'admin/syllabus/delete';

  //  previous Paper crude
  export let previousCreate = domain+'admin/exam/create';
  export let previousList = domain+'admin/exam/list';
  export let previousPdfAdd = domain+'admin/pdfadd';
  export let previousPdfUpdate = domain+'admin/pdfupdate';
  export let previousPdfDelete = domain+'admin/pdfdelete';
  export let previousUpdate = domain+'admin/exam/update';
  export let previousDelete = domain+'admin/exam/delete';
  export let previousView = domain+'admin/exam/view';
  
  //Post
  export let postAdd = domain+'admin/post/create';
  export let postList = domain+'admin/post/list';
  export let postUpdate = domain+'admin/post/update';
  export let postDelete = domain+'admin/post/delete';


  /* Privilege CRUD*/
export let PrivilegeList = domain+'';
export let PrivilegeMenuList = domain+'';
export let PrivilegeAdd = domain+'';
export let PrivilegeUpdate = domain+'';
export let PrivilegeDelete = domain+'';


// Online Test = Bactch crude
export let batchTestList = domain+'admin/testbatch/list';
export let batchTestAdd = domain+'admin/testbatch/create';
export let batchTestUpdate = domain+'admin/testbatch/update';
export let batchTestDelete = domain+'admin/testbatch/delete';

// Online Test = Bactch Subject
// export let subjectTestList = domain+'/user/subjectlist';
export let subjectTestList = domain+'admin/batchsubject';
export let subjectTestAdd = domain+'admin/testsubject/create';
export let subjectTestUpdate = domain+'admin/testsubject/update';
export let subjectTestDelete = domain+'admin/testsubject/delete';

// online test setlist
export let setTestList = domain+'admin/subjectset';
export let setTestAdd = domain+'admin/testsetlist/create';
export let setTestUpdate = domain+'admin/testsetlist/update';
export let setTestDelete = domain+'admin/testsetlist/delete';