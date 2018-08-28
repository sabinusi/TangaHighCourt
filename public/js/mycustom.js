$('#judge').hide()
$('#rm').hide()
function showJudge(params) {
    if (params.value == 'judge') {
        $('#judge').show()
        $('#choice').val('judge')
        $('#rm').hide()
        console.log($('#choice'))


    } else if (params.value == 'rm') {
        $('#judge').hide()
        $('#choice').val('rm')
        $('#rm').show()

    }
}

function validateEmailStandard(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateEmail() {
    var $emailBlock = $('#emailBlock')
    var email = $('#cemail').val()
    if (!validateEmailStandard(email)) {
        $emailBlock.text("is not valid email")
        $('#emailFormGroup').addClass('has-error')
        $('#submitJudgeInfo').attr("disabled", "disabled")
    } else {
        $emailBlock.text("")
        $('#emailFormGroup').addClass('has-success')
        $('#emailFormGroup').removeClass('has-error')
        $('#submitJudgeInfo').removeAttr("disabled")
    }

}
$('#resetJudgeInfo').click(() => {
    // judge
    $('#emailFormGroup').removeClass('has-error')
    $('#emailFormGroup').removeClass('has-success')
    $('#emailBlock').text('')
    // rma
    $('#phoneBlock').text('')
    $('#phoneFormGroup').removeClass('has-error')
    $('#phoneFormGroup').removeClass('has-success')
})
function validatePhoneNumber(params) {
    var phoneRegex = /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/
    if (phoneRegex.test(params.value)) {
        $('#phoneBlock').text("")
        $('#phoneFormGroup').addClass('has-success')
        $('#phoneFormGroup').removeClass('has-error')
        $('#submitRmaInfo').removeAttr("disabled")
    } else {
        $('#phoneBlock').text(params.value + " is not valid email")
        $('#phoneFormGroup').addClass('has-error')
        $('#submitRmaInfo').attr("disabled", "disabled")
    }

}


