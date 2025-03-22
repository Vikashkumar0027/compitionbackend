// const domain = 'http://localhost:4500/';
const domain = 'http://43.225.53.245:4500/';

export let login = domain + 'admin/login';
export let createSubAdmin = domain + 'admin/create';
export let subAdminList = domain + 'admin/list';
export let subAdminUpdate = domain + 'admin/update';

//  change Pass
export let changePass = domain + 'admin/changepassword';

//course crude
export let courseCreate = domain + 'admin/batch/create';
export let courseList = domain + 'admin/batch/list';
export let courseUpdate = domain + 'admin/batch/update';
export let courseDelete = domain + 'admin/batch/delete';
//Subject crude
export let subjectCreate = domain + 'admin/subject/create';
export let subjectList = domain + 'admin/subject/list';
export let subjectUpdate = domain + 'admin/subject/update';
export let subjectDelete = domain + 'admin/subject/delete';
//Chapter crude
export let chapterCreate = domain + 'admin/chapter/create';
export let chapterList = domain + 'admin/chapter/list';
export let chapterUpdate = domain + 'admin/chapter/update';
export let chapterDelete = domain + 'admin/chapter/delete';
//Chapter crude
export let topicsCreate = domain + 'admin/topic/create';
export let topicsList = domain + 'admin/topic/list';
export let topicsUpdate = domain + 'admin/topic/update';
export let topicsDelete = domain + 'admin/topic/delete';

//  syllabus crude
export let syllabusCreate = domain + 'admin/syllabus/create';
export let syllabusList = domain + 'admin/syllabus/list';
export let syllabusUpdate = domain + 'admin/syllabus/update';
export let syllabusDelete = domain + 'admin/syllabus/delete';

//  previous Paper crude
export let previousCreate = domain + 'admin/exam/create';
export let previousList = domain + 'admin/exam/list';
export let previousPdfAdd = domain + 'admin/pdfadd';
export let previousPdfUpdate = domain + 'admin/pdfupdate';
export let previousPdfDelete = domain + 'admin/pdfdelete';
export let previousUpdate = domain + 'admin/exam/update';
export let previousDelete = domain + 'admin/exam/delete';
export let previousView = domain + 'admin/exam/view';

//Post
export let postAdd = domain + 'admin/post/create';
export let postList = domain + 'admin/post/list';
export let postUpdate = domain + 'admin/post/update';
export let postDelete = domain + 'admin/post/delete';





// Online Test = Bactch crude
export let batchTestList = domain + 'admin/testbatch/list';
export let batchTestAdd = domain + 'admin/testbatch/create';
export let batchTestUpdate = domain + 'admin/testbatch/update';
export let batchTestDelete = domain + 'admin/testbatch/delete';

// Online Test = Bactch Subject
// export let subjectTestList = domain+'/user/subjectlist';
export let subjectTestList = domain + 'admin/batchsubject';
export let subjectTestAdd = domain + 'admin/testsubject/create';
export let subjectTestUpdate = domain + 'admin/testsubject/update';
export let subjectTestDelete = domain + 'admin/testsubject/delete';

// online test setlist
export let setTestList = domain + 'admin/subjectset';
export let setTestAdd = domain + 'admin/testsetlist/create';
export let setTestUpdate = domain + 'admin/testsetlist/update';
export let setTestDelete = domain + 'admin/testsetlist/delete';
export let setTestView = domain + 'admin/testsetlist/view';


// add Question
export let addQuestion = domain + 'admin/question';
export let updateQuestion = domain + 'admin/question';
export let deleteQuestion = domain + 'admin/questiondelete';

// user
export let userList = domain + 'admin/user/list';
export let userAdd = domain + 'admin/user/create';
export let userUpdate = domain + 'admin/user/update';
export let userDelete = domain + 'admin/user/delete';
export let userView = domain + 'admin/user/view';
// book
export let bookList = domain + 'admin/book/list';
export let bookAdd = domain + 'admin/book/create';
export let bookUpdate = domain + 'admin/book/update';
export let bookDelete = domain + 'admin/book/delete';
export let bookView = domain + 'admin/book/view';

// previlage
export let previlageAdminLst = domain + 'admin/privilege/list';
export let previlageLst = domain + 'admin/adminprivilege';

/* Privilege CRUD*/
export let PrivilegeList = domain + 'admin/adminprivilege/list';
export let PrivilegeListAll = domain + 'admin/adminprivilege/list/all';
// export let PrivilegeMenuList = domain+'';
export let PrivilegeAdd = domain + 'admin/privilege/create';
export let PrivilegeUpdate = domain + 'admin/privilege/update';
export let PrivilegeDelete = domain + 'admin/privilege/delete';

// payment
export let paymentLst = domain + 'admin/payment/list';
export let paymentView = domain + 'admin/payment/view';

//dashBoard
export let dashboard = domain + 'admin/dashboard';

// liveStrema
export let createLive = domain + 'admin/livestream/create';
export let listLive = domain + 'admin/livestream/list';
export let patchLive = domain + 'admin/livestream/patch';
export let deleteLive = domain + 'admin/livestream/delete';

// class api
export let classes = "http://localhost:5000/api/v1/addclass";

export let selectSideBar = [
  {
    "module": "Dashboard",
    "checked": true,
  },
  {
    "module": "Previlage",
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
  },
  {
    "module": "Class",
    "checked": false,
  },
  {
    "module": "Fee",
    "checked": false,
  },
  {
    "module": "Admission",
    "checked": false,
  },
  {
    "module": "Fee Deposit",
    "checked": false,
  },
  {
    "module": "Banner",
    "checked": false,
  },
  {
    "module": "Holiday",
    "checked": false,
  },
  {
    "module": "Staff",
    "checked": false,
  },
  {
    "module": "staffattendance",
    "checked": false,
  },
  {
    "module": "Attendance",
    "checked": false,
  },
  {
    "module": "Attendance Report",
    "checked": false,
  },
]


export let sidebar = [
  { number: '1', name: 'Dashboard', icon: 'fa-solid fa-house', url: '/dashboard/home' },
  { number: '2', name: 'Previlage', icon: 'fa-solid fa-users', url: '/dashboard/privilage' },
  { number: '20', name: 'Sub Admin', icon: 'fa-solid fa-users', url: '/dashboard/subAdmin' },
  // {number:'70',name:'Privilage',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/privilage'},
  { number: '7', name: 'User', icon: 'fa-regular fa-user', url: '/dashboard/user' },
  { number: '3', name: 'Course', icon: 'fa-solid fa-folder-open', url: '/dashboard/course' },
  { number: '16', name: 'Banner', icon: 'fa-regular fa-images', url: '/dashboard/banner' },
  { number: '4', name: 'Syllabus', icon: 'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/syllabus' },
  { number: '5', name: 'Previous Paper', icon: 'fa-solid fa-business-time', url: '/dashboard/previous_paper' },
  { number: '6', name: 'Post', icon: 'fa-brands fa-instagram', url: '/dashboard/post' },
  { number: '8', name: 'Online Test', icon: 'fa-regular fa-pen-to-square', url: '/dashboard/online-test' },
  { number: '9', name: 'Book', icon: 'fa-solid fa-book', url: '/dashboard/book' },
  { number: '10', name: 'Payment', icon: 'fa-brands fa-paypal', url: '/dashboard/payment' },
  { number: '11', name: 'Live Class', icon: 'fa-regular fa-file-video', url: '/dashboard/live_class' },

  // school Module  <i class="fa-solid fa-indian-rupee-sign"></i>

  { number: '12', name: 'Class', icon: 'fa-solid fa-layer-group', url: '/dashboard/class' },
  { number: '13', name: 'Fee', icon: 'fa-solid fa-money-bill-1-wave', url: '/dashboard/fee' },
  { number: '14', name: 'Admission', icon: 'fa-solid fa-user-tie', url: '/dashboard/admission' },
  { number: '15', name: 'Fee Deposit', icon: 'fa-solid fa-indian-rupee-sign', url: '/dashboard/fee_deposit' },
  { number: '17', name: 'Holiday', icon: 'fa-solid fa-mug-hot', url: '/dashboard/holiday' },
  { number: '18', name: 'Staff', icon: 'fa-solid fa-person-cane', url: '/dashboard/staff' },
  { number: '19', name: 'Staff Attendance', icon: 'fa-solid fa-person-cane', url: '/dashboard/staffattendance' },
  { number: '21', name: 'Attendance', icon: 'fa-solid fa-person', url: '/dashboard/attendance' },
  { number: '22', name: 'Attendance Report', icon: 'fa-solid fa-clipboard-user', url: '/dashboard/attendanceReport' },

];

// live_class
export let classesAdd = domain + 'admin/class/create';
export let classesEdit = domain + 'admin/class/update';
export let classesDelete = domain + 'admin/class/delete';
export let classesList = domain + 'admin/class/list';


// Fee 
export let feeAdd = domain + 'admin/fee/create';
export let feeEdit = domain + 'admin/fee/update';
export let feeDelete = domain + 'admin/fee/delete';
export let feeList = domain + 'admin/fee/list';

// admission
export let admissionAdd = domain + 'admin/admission/create';
export let admissionList = domain + 'admin/admission/list';
export let admissionDelete = domain + 'admin/admission/delete';
export let admissionUpdate = domain + 'admin/admission/update';

// Banner
export let bannerAdd = domain + 'admin/banner/create';
export let bannerList = domain + 'admin/banner/list';
export let bannerDelete = domain + 'admin/banner/delete';
export let bannerUpdate = domain + 'admin/banner/update';

// Holiday
export let holidayAdd = domain + 'admin/holiday/create';
export let holidayList = domain + 'admin/holiday/list';
export let holidayDelete = domain + 'admin/holiday/delete';
export let holidayUpdate = domain + 'admin/holiday/update';

// Staff
export let staffAdd = domain + 'admin/staff/create';
export let staffList = domain + 'admin/staff/list';
export let staffDelete = domain + 'admin/staff/delete';
export let staffUpdate = domain + 'admin/staff/update';


// Attendance
export let attendanceAdd = domain + 'admin/attendence/create';
export let attendanceList = domain + 'admin/attendence/list';
export let attendanceDelete = domain + 'admin/attendence/delete';
export let attendanceUpdate = domain + 'admin/attendence/update';
export let attendanceView = domain + 'admin/attendence/view';