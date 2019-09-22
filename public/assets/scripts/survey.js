const form = $("#surveyForm");
const name = $("#name");
const photo = $("#photo");
const questionOne = $("#questionOne");
const questionTwo = $("#questionTwo");
const questionThree = $("#questionThree");
const questionFour = $("#questionFour");
const questionFive = $("#questionFive");
const questionSix = $("#questionSix");
const questionSeven = $("#questionSeven");
const questionEight = $("#questionEight");
const questionNine = $("#questionNine");
const questionTen = $("#questionTen");
const btn = $("#formSubmit");
let allquestions =[]
function combineAnswers(answers){
    return {
        "name":name.val().trim(),
        "photo":photo.val().trim(),
        "questions":answers.trim()
    }
    
};
function addFriend(answers){
    $.post('/addFriend',answers,function(err,res){
        if(err) throw err;
        console.log(res)
    });
}
// function getFriend(){
//     $.get('/getFriend',function(err,res){
//         if(err) throw err;
//         console.log(res.body);
//     })
// }

btn.on("click", function(event){
    event.preventDefault()
    allquestions = `${questionOne.val()},${questionTwo.val()},${questionThree.val()},${questionFour.val()},${questionFive.val()},${questionSix.val()},${questionSeven.val()},${questionEight.val()},${questionNine.val()},${questionTen.val()}`
    let test=combineAnswers(allquestions)
    addFriend(test)
})