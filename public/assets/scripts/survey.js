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

function combineAnswers(){
    return {
        "name":name.val().trim(),
        "photo":photo.val().trim(),
        "questions":{
            "one":questionOne.val(),
            "two":questionTwo.val(),
            "three":questionThree.val(),
            "four":questionFour.val(),
            "five":questionFive.val(),
            "six":questionSix.val(),
            "seven":questionSeven.val(),
            "eight":questionEight.val(),
            "nine":questionNine.val(),
            "ten":questionTen.val()
        }
    }
    
};
function addFriend(answers){
    $.post('/addFriend',answers,function(err){if(err) throw err});
}

btn.on("click", function(event){
    event.preventDefault()
    addFriend(combineAnswers());
})