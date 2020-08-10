 if(subject.havePracticalExam && !subject.isContinued){
    i = i + 3;
    if(subject.studentMark == "رل") i = i + 2 ;
    else if(isNeedFixedPresentage(subject.fullMark , subject.studentMark , fixedPresentageValue)){
        subject.studentMark = subject.fullMark * 0.5 ;
        subject.studentGrade = "ل" ;
        tr[++i].textContent = subject.studentMark ;
        tr[++i].textContent = subject.studentGrade;
    }
    else i = i + 2 ;
    
} 

else if(!subject.havePracticalExam && !subject.isContinued){
   i = i+2;
   if(subject.studentMark == "رل") i = i + 2 ;
   else if(isNeedFixedPresentage(subject.fullMark , subject.studentMark , fixedPresentageValue)){
      subject.studentMark = subject.fullMark * 0.5 ;
      subject.studentGrade = "ل" ;
      tr[++i].textContent = subject.studentMark ;
      tr[++i].textContent = subject.studentGrade;
  }
  else i = i + 2 ;


}



function fillStudentFixedPresentage(tr, student,fixedPresentageValue){
    var i = 4 ; 
    

    student.subjects.forEach(function (subject) {
          //term 1 and is contiued
          if(subject.isContinued && subject.term == 1 && !subject.havePracticalExam) i = i + 4; 
          else if(subject.isContinued && subject.term == 1 && subject.havePracticalExam) i = i + 5;
          // not continued
          else if(!subject.isContinued){
             (subject.havePracticalExam) ? i = i + 3 : i = i+2;

              if(subject.studentMark == "رل") i = i + 2 ;
              else if(isNeedFixedPresentage(subject.fullMark , subject.studentMark , fixedPresentageValue)){
                  subject.studentMark = subject.fullMark * 0.5 ;
                  subject.studentGrade = "ل" ;
                  tr[i].textContent = subject.studentMark ;
                  tr[++i].textContent = subject.studentGrade;

              }
              else i = i + 2 ;
              
          } 

          // subject in term 2 and mekamela
          else if(subject.isContinued && subject.term == 2){
            (subject.havePracticalExam) ? i = i + 5 : i = i + 4;
            if(subject.studentTotalGrade == "رل") i = i + 2 ;
            else if(isNeedFixedPresentage(subject.totalFullMark , subject.student2termsMark , fixedPresentageValue)){
                subject.student2termsMark = subject.totalFullMark * 0.5 ;
                subject.studentTotalgrade = "ل" ;
                tr[++i].textContent = subject.student2termsMark ;
                tr[++i].textContent = subject.studentTotalgrade;
            }
          }

          // subjects form past year 
          else if (subject.isFromPastYear){
              console.log("i work")
              i = i + 7 ;
              if(subject.studentMark == "رل") i = i + 2 ;
              else if(isNeedFixedPresentage(subject.fullMark , subject.studentMark , fixedPresentageValue)){
                  subject.studentMark = subject.fullMark * 0.5 ;
                  subject.studentGrade = "ل" ;
                  tr[++i].textContent = subject.studentMark ;
                  tr[++i].textContent = subject.studentGrade;
              }
              else i = i + 2 ;

          }
       
    });

return student;
}
