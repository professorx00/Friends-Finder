let invaildform = false;
$("document").ready(function () {
    $(".dropdown-trigger").dropdown();
    $('select').formSelect();
    $('.modal').modal();

    const modalContent = $('#modalContent');
    const form = $("#surveyForm");
    const error = $('#error');
    const name = $("#name");
    const photo = $("#photo");
    const questionOne = $("#qOne");
    const questionTwo = $("#qTwo");
    const questionThree = $("#qThree");
    const questionFour = $("#qFour");
    const questionFive = $("#qFive");
    const questionSix = $("#qSix");
    const questionSeven = $("#qSeven");
    const questionEight = $("#qEight");
    const questionNine = $("#qNine");
    const questionTen = $("#qTen");
    const btn = $("#formSubmit");


    function validateForm() {
        
        $('.selections').each(function () {
            _this = $(this);
            if (_this.val() === "100") {
                invaildform = true;
            }
        });
        if (!name.val()){
            invaildform = true;
        };
        const regExpress = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
        let realURL = regExpress.test(photo.val());
        if(!realURL){
            console.log("no URL");
            invaildform = true;
        }
        return invaildform;
    };


    function combineAnswers(answers) {
        return {
            "name": name.val(),
            "photo": photo.val(),
            "questions": answers
        };
    };

    function addFriend(answers) {
        $.post('/api/addFriend', answers, function (res) {
            let char = $('<div>');
            let charName = $('<h1>').text(res.name);
            let photo = $('<img>').attr("src", res.photo).attr("id", "photoImg").attr("onerror", "./app/public/assets/images/person.jpg");
            char.append(charName, photo);
            modalContent.append(char)
            $('.modal').modal('open');
        });
    };

    btn.on("click", function (event) {
        event.preventDefault();
        console.log("click")
        invaildform=false;
        if (!validateForm()) {
            allquestions = `${questionOne.val()},${questionTwo.val()},${questionThree.val()},${questionFour.val()},${questionFive.val()},${questionSix.val()},${questionSeven.val()},${questionEight.val()},${questionNine.val()},${questionTen.val()}`
            let test = combineAnswers(allquestions);
            addFriend(test);
        }
        else{
            error.text("Please check your answers because something went wrong")
        }
    });
});