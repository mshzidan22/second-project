
const studentList = []
var student;
var a;
var tr;
$(function () {

    $.getJSON("StudentClasses/elec1.json", function (data) {

        student = data;


    });




    $("#calc").click(function () {
        a = $('.draggable').children();
        for (var i = 3; i < a.length; i++) {
            tr = a[i].querySelectorAll('[data-x]')
            var returnedStudent = fillStudent(tr, student)
            studentList.push(JSON.parse(JSON.stringify(returnedStudent)))



        }
    });

    $("#fixedPresentageBtn").click(function () {
        var fixedPresentageValue = document.getElementById("fixedPresentagevalue").value;
        a = $('.draggable').children();
        for (var i = 3; i < a.length; i++) {
            tr = a[i].querySelectorAll('[data-x]')
            var returnedStudent = fillStudentFixedPresentage(tr, studentList[i - 3], fixedPresentageValue)
            //studentList.push(JSON.parse(JSON.stringify(returnedStudent)))



        }
    });



}



);

function fillStudent(tr, student) {
    let q = [];
    let wExam = []
    var i = 0;
    var studentTotalMarks = 0;

    student.id = tr[i].textContent;
    student.code = tr[++i].textContent;
    student.name = tr[++i].textContent;
    student.status = tr[++i].textContent;
    student.subjects.forEach(function (subject) {

        if ((subject.term == 1 && !subject.havePracticalExam) || (subject.term == 2 && !subject.havePracticalExam && !subject.isContinued)) {
            //4
            var isRasibLiha = false;
            subject.studentTermActivity = tr[++i].textContent;
            subject.studentWrittenExam = tr[++i].textContent;

            subject.studentMark = Number(subject.studentTermActivity) + Number(subject.studentWrittenExam);

            (subject.writtenExam * 0.3 <= subject.studentWrittenExam) ? tr[++i].textContent = subject.studentMark : (tr[++i].textContent = "رل", isRasibLiha = true); //,subject.studentMark="رل"
            (isRasibLiha) ? (subject.studentGrade = "رل", tr[++i].textContent = "رل") : (subject.studentGrade = calcGrade(subject.fullMark, subject.studentMark), tr[++i].textContent = subject.studentGrade)
            if (subject.isContinued && subject.term == 1) {
                q.push(subject.studentMark); wExam.push(subject.studentWrittenExam)
            };

            if (student.status != "مستجد" && !subject.isContinued && subject.studentGrade != "رل") {
                var j = i;
                if (subject.studentGrade != "ض" && subject.studentMark > subject.fullMark * 0.65 - 1) {
                    tr[j].textContent = "ل";
                    tr[--j].textContent = (subject.fullMark * 0.65 - 1);
                    subject.studentMark = (subject.fullMark * 0.65 - 1);
                }

            }

            if (!subject.isContinued && !isRasibLiha) studentTotalMarks = studentTotalMarks + subject.studentMark;
        }


        else if ((subject.term == 1 && subject.havePracticalExam)
            || (subject.term == 2 && subject.havePracticalExam && !subject.isContinued)) {
            //5
            var isRasibLiha = false;
            subject.studentTermActivity = tr[++i].textContent;
            subject.studentPracticalExam = tr[++i].textContent;
            subject.studentWrittenExam = tr[++i].textContent;
            subject.studentMark = Number(subject.studentTermActivity) + Number(subject.studentWrittenExam) + Number(subject.studentPracticalExam);
            (subject.writtenExam * 0.3 <= subject.studentWrittenExam) ? tr[++i].textContent = subject.studentMark : (tr[++i].textContent = "رل", isRasibLiha = true);//,subject.studentMark="رل"
            (isRasibLiha) ? (subject.studentGrade = "رل", tr[++i].textContent = "رل") : (subject.studentGrade = calcGrade(subject.fullMark, subject.studentMark), tr[++i].textContent = subject.studentGrade)
            if (subject.isContinued && subject.term == 1) {
                q.push(subject.studentMark); wExam.push(subject.studentWrittenExam)
            };


            if (student.status != "مستجد" && !subject.isContinued && subject.studentGrade != "رل") {
                var j = i;
                if (subject.studentGrade != "ض" && subject.studentMark > subject.fullMark * 0.65 - 1) {

                    tr[j].textContent = "ل";
                    tr[--j].textContent = (subject.fullMark * 0.65 - 1);
                    subject.studentMark = (subject.fullMark * 0.65 - 1);
                }

            }

            if (!subject.isContinued && !isRasibLiha) studentTotalMarks = studentTotalMarks + subject.studentMark;
        }




        else if (subject.term == 2 && !subject.havePracticalExam && subject.isContinued) {
            //6
            var isRasibLiha = false;
            subject.studentTermActivity = tr[++i].textContent;
            subject.studentWrittenExam = tr[++i].textContent;


            subject.studentMark = Number(subject.studentTermActivity) + Number(subject.studentWrittenExam);
            (subject.writtenExam * 0.3 <= subject.studentWrittenExam) ? tr[++i].textContent = subject.studentMark : (tr[++i].textContent = "رل", isRasibLiha = true);//,subject.studentMark="رل"
            (isRasibLiha) ? (subject.studentGrade = "رل", tr[++i].textContent = "رل") : (subject.studentGrade = calcGrade(subject.fullMark, subject.studentMark), tr[++i].textContent = subject.studentGrade)
            //////////

            if (Number(subject.studentWrittenExam) + Number(wExam.shift()) < 0.3 * 2 * subject.writtenExam) {
                subject.student2termsMark = "رل";
                tr[++i].textContent = "رل";

            }
            else {
                subject.student2termsMark = Number(subject.studentMark) + Number(q.shift());
                tr[++i].textContent = subject.student2termsMark;
            }



            if (subject.student2termsMark == "رل") {
                subject.studentTotalGrade = "رل";
                tr[++i].textContent = subject.studentTotalGrade;
            }
            else {
                subject.studentTotalGrade = calcGrade(subject.totalFullMark, subject.student2termsMark);
                tr[++i].textContent = subject.studentTotalGrade;
            }


            if (student.status != "مستجد" && subject.studentTotalGrade != "رل") {
                var j = i;
                /////subject.studentGrade
                if (subject.studentTotalGrade != "ض" && subject.student2termsMark > subject.totalFullMark * 0.65 - 1) {

                    tr[j].textContent = "ل";
                    tr[--j].textContent = (subject.totalFullMark * 0.65 - 1);
                    subject.student2termsMark = (subject.totalFullMark * 0.65 - 1);
                }

            }
            if (!isRasibLiha) studentTotalMarks = studentTotalMarks + subject.student2termsMark;
        }



        else if (subject.term == 2 && subject.havePracticalExam && subject.isContinued) {
            //7
            //////////////////
            var isRasibLiha = false;
            subject.studentTermActivity = tr[++i].textContent;
            subject.studentPracticalExam = tr[++i].textContent;


            subject.studentWrittenExam = tr[++i].textContent;
            subject.studentMark = Number(subject.studentTermActivity) + Number(subject.studentWrittenExam) + Number(subject.studentPracticalExam);
            ////////////////////////////////////////////////
            (subject.writtenExam * 0.3 <= subject.studentWrittenExam) ? tr[++i].textContent = subject.studentMark : (tr[++i].textContent = "رل", isRasibLiha = true);//,subject.studentMark="رل"
            (isRasibLiha) ? (subject.studentGrade = "رل", tr[++i].textContent = "رل") : (subject.studentGrade = calcGrade(subject.fullMark, subject.studentMark), tr[++i].textContent = subject.studentGrade)

            if (Number(subject.studentWrittenExam) + Number(wExam.shift()) < 0.3 * 2 * subject.writtenExam) {
                subject.student2termsMark = "رل";
                tr[++i].textContent = "رل";

            }
            else {
                subject.student2termsMark = Number(subject.studentMark) + Number(q.shift());
                tr[++i].textContent = subject.student2termsMark;
            }



            if (subject.student2termsMark == "رل") {
                subject.studentTotalGrade = "رل";
                tr[++i].textContent = subject.studentTotalGrade;
            }
            else {
                subject.studentTotalGrade = calcGrade(subject.totalFullMark, subject.student2termsMark);
                tr[++i].textContent = subject.studentTotalGrade;
            }


            if (student.status != "مستجد" && subject.studentTotalGrade != "رل") {
                var j = i;
                if (subject.studentTotalGrade != "ض" && subject.student2termsMark > subject.totalFullMark * 0.65 - 1) {

                    tr[j].textContent = "ل";
                    tr[--j].textContent = (subject.totalFullMark * 0.65 - 1);
                    subject.student2termsMark = (subject.totalFullMark * 0.65 - 1);
                }

            }
            if (!isRasibLiha) studentTotalMarks = studentTotalMarks + subject.student2termsMark;

        }

        else if (subject.isFromPastYear) {
            // 9

            if (tr[++i].textContent == "") {
                i = i + 8;
            } else {
                var isRasibLiha;
                subject.name = tr[i].textContent;
                subject.termActivity = tr[++i].textContent;
                subject.practicalExam = tr[++i].textContent;
                subject.writtenExam = tr[++i].textContent;
                subject.fullMark = Number(subject.termActivity) + Number(subject.practicalExam) + Number(subject.writtenExam);
                subject.studentTermActivity = tr[++i].textContent;
                subject.studentPracticalExam = tr[++i].textContent;
                subject.studentWrittenExam = tr[++i].textContent;
                subject.studentMark = Number(subject.studentTermActivity) + Number(subject.studentPracticalExam) + Number(subject.studentWrittenExam);
                //calc the marks


                if (subject.writtenExam * 0.3 > subject.studentWrittenExam) {
                    tr[++i].textContent = "رل";
                    tr[++i].textContent = "رل";
                }
                else if ((subject.writtenExam * 0.3 <= subject.studentWrittenExam) && (subject.studentMark > subject.fullMark * 0.65 - 1)) {
                    tr[++i].textContent = subject.fullMark * 0.65 - 1;
                    tr[++i].textContent = "ل";
                }

                else if ((subject.writtenExam * 0.3 <= subject.studentWrittenExam) && (subject.studentMark < subject.fullMark * 0.5)) {
                    tr[++i].textContent = subject.studentMark;
                    tr[++i].textContent = "ض";
                }
                else {
                    tr[++i].textContent = subject.studentMark;
                    tr[++i].textContent = "ل";
                }

            }


        }
        else {
            console.log(subject.name + "4")

            console.log("undefiend situation")
        }

    })
    tr[++i].textContent = studentTotalMarks;
    student.totalMarks = studentTotalMarks;
    student.totalGrade = calcGrade(student.totalYearMarks, studentTotalMarks)
    tr[++i].textContent = student.totalGrade;

    return student;
}


// second iteration


function fillStudentFixedPresentage(tr, student, fixedPresentageValue) {
    var i = 4;


    student.subjects.forEach(function (subject) {

        //term 1 and is contiued
        if (subject.isContinued && subject.term == 1 && !subject.havePracticalExam) i = i + 4;
        else if (subject.isContinued && subject.term == 1 && subject.havePracticalExam) i = i + 5;
        // not continued
        else if (!subject.isContinued && !subject.isFromPastYear) {
            (subject.havePracticalExam) ? i = i + 3 : i = i + 2;

            if (subject.studentMark == "رل") i = i + 2;
            else if (isNeedFixedPresentage(subject.fullMark, subject.studentMark, fixedPresentageValue)) {
                subject.studentMark = subject.fullMark * 0.5;
                subject.studentGrade = "ل";
                tr[i].textContent = subject.studentMark;
                tr[++i].textContent = subject.studentGrade;
            }
            else {
                
                i = i + 2
            };

        }

        // subject in term 2 and mekamela
        else if (subject.isContinued && subject.term == 2) {
            (subject.havePracticalExam) ? i = i + 5 : i = i + 4;
            if (subject.studentTotalGrade == "رل") i = i + 2;
            else if (isNeedFixedPresentage(subject.totalFullMark, subject.student2termsMark, fixedPresentageValue)) {
                subject.student2termsMark = subject.totalFullMark * 0.5;
                subject.studentTotalgrade = "ل";
                tr[++i].textContent = subject.student2termsMark;
                tr[++i].textContent = subject.studentTotalgrade;
            }
            else {
                
                i = i + 2
            };
        }

        // subjects form past year 
        else if (subject.isFromPastYear) {
            //فيه حوار هنا أو الحالة بتاعت خمس مواد مش شغالة  
            console.log(tr[i].textContent)
            i = i + 7;
            if (subject.studentMark == "رل") i = i + 2;
            else if (isNeedFixedPresentage(subject.fullMark, subject.studentMark, fixedPresentageValue)) {
                subject.studentMark = subject.fullMark * 0.5;
                subject.studentGrade = "ل";
                tr[i].textContent = subject.studentMark;
                tr[++i].textContent = subject.studentGrade;
            }
            else i = i + 2;

        }

    });

    return student;
}












function calcGrade(fullMark, studentMark) {

    if (studentMark > fullMark * 0.85) return "م"
    else if (studentMark >= fullMark * 0.75) return "جج"
    else if (studentMark >= fullMark * 0.65) return "ج"
    else if (studentMark >= fullMark * 0.50) return "ل"
    else return "ض"

}

function isNeedFixedPresentage(fullMark, studentMark, fixedPresentage) {
    var fixed = 0.5 - fixedPresentage * 0.01;
    if (studentMark < fullMark * 0.5 && studentMark > fullMark * fixed) return true;
    else return false;


}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(","));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;


    // CSV file
    csvFile = new Blob(["\ufeff", [csv]]);

    //csvFile = new Blob([csv], {type: "application/xlxs"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}