// const domain = 'http://localhost:4500/';
const domain = 'http://43.225.53.245:4500/';

 export let login = domain+'admin/login';
 export let createSubAdmin = domain+'admin/create';
 export let subAdminList = domain+'admin/list';
 export let subAdminUpdate = domain+'admin/update';

//  change Pass
 export let changePass = domain+'admin/changepassword';

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
export let setTestView = domain+'admin/testsetlist/view';


// add Question
export let addQuestion = domain+'admin/question';
export let updateQuestion = domain+'admin/question';
export let deleteQuestion = domain+'admin/questiondelete';

// user
export let userList = domain+'admin/user/list';
export let userAdd = domain+'admin/user/create';
export let userUpdate = domain+'admin/user/update';
export let userDelete = domain+'admin/user/delete';
export let userView = domain+'admin/user/view';
// book
export let bookList = domain+'admin/book/list';
export let bookAdd = domain+'admin/book/create';
export let bookUpdate = domain+'admin/book/update';
export let bookDelete = domain+'admin/book/delete';
export let bookView = domain+'admin/book/view';

// previlage
export let previlageAdminLst = domain+'admin/privilege/list';
export let previlageLst = domain+'admin/adminprivilege';


// payment
export let paymentLst = domain+'admin/payment/list';
export let paymentView = domain+'admin/payment/view';

//dashBoard
export let dashboard = domain+'admin/dashboard';

// liveStrema
export let createLive = domain+'admin/livestream/create';
export let listLive = domain+'admin/livestream/list';
export let patchLive = domain+'admin/livestream/patch';
export let deleteLive = domain+'admin/livestream/delete';



export let selectSideBar = [
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
  },
  {
    "module": "Book",
    "checked": false,
  },
  {
    "module": "Payment",
    "checked": false,
  },
  {
    "module": "Live Class",
    "checked": false,
  }
]


export let sidebar = [
  {number:'1',name:'Dashboard',icon:'fa-solid fa-house', url: '/dashboard/home'},
  {number:'2',name:'Sub Admin',icon:'fa-solid fa-users', url: '/dashboard/subAdmin'},
  // {number:'70',name:'Privilage',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/privilage'},
  {number:'7',name:'User',icon:'fa-regular fa-user', url: '/dashboard/user'},
  {number:'3',name:'Course',icon:'fa-solid fa-folder-open', url: '/dashboard/course'},
  {number:'4',name:'Syllabus',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/syllabus'},
  {number:'5',name:'Previous Paper',icon:'fa-solid fa-business-time', url: '/dashboard/previous_paper'},
  {number:'6',name:'Post',icon:'fa-brands fa-instagram', url: '/dashboard/post'},
  {number:'8',name:'Online Test',icon:'fa-regular fa-pen-to-square', url: '/dashboard/online-test'},
  {number:'9',name:'Book',icon:'fa-solid fa-book', url: '/dashboard/book'},
  {number:'10',name:'Payment',icon:'fa-brands fa-paypal', url: '/dashboard/payment'},
  {number:'11',name:'Live Class',icon:'fa-brands fa-paypal', url: '/dashboard/live_class'},
]; 

// live_class