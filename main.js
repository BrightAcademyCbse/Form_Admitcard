function handlecheck(checkbox) {
    if (checkbox.checked) {
        document.getElementById("submit_button").disabled = false;
    } else {
        document.getElementById("submit_button").disabled = true;
    }
}


function handleclick(e) {
    e.preventDefault();
    document.getElementById("submit_button").disabled = true;
    Sname = document.getElementById("student_name").value
    Fname = document.getElementById("father_name").value
    Dob = document.getElementById("datepicker").value
    Phone = document.getElementById("phone_number").value

    document.querySelector("form").reset()
    form = document.getElementById("container")
    spinkit = document.querySelector(".sk-circle")


    Sname = Sname.toLowerCase().trim().replace(/\s+/g, '').replace(/\./g, '')
    Fname = Fname.toLowerCase().trim().replace(/\s+/g, '').replace(/\./g, '')
    Phone = Phone.trim()

    if (Sname == "" || Fname == "" || Dob == "" || Phone == "") {
        alert(`Enter valid ${Sname == "" ? "Student name, " : ""}${Fname == "" ? "Father name, " : ""}${Dob == "" ? "Date of Birth, " : ""}${Phone == "" ? "Phone number." : ""}`)
        return
    }

    if (/\d+/g.test(Sname) || /\d+/g.test(Fname)) {
        alert("Name cannot contain numbers")
        return
    }

    if (/[a-zA-Z]/g.test(Phone)) {
        alert("Phone number cannot contain letters")
        return
    }

    form.style.display = "none"
    spinkit.style.display = "block"

    console.log(Sname, Fname, Dob, Phone);
    var xhr = new XMLHttpRequest()
    var url = "https://admitcardapi.herokuapp.com/downloads"
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-Type", "Application/json")
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var id = JSON.parse(xhr.responseText).id.toString()
            spinkit.style.display = "none"
            if (id != "-1") {
                window.location.href = `https://admitcardapi.herokuapp.com/admit?id=${id}`
                form.style.display = "block"
            } else {
                document.querySelector(".error").style.display = "flex"
                console.log("fail")
            }
            //console.log(xhr.responseText);
        }
    }
    var data = JSON.stringify({ "Name": Sname, "Father Name": Fname, "DOB": Dob, "Phone Number": Phone })
    xhr.send(data)
}

$(function () {
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        constrainInput: true,
        yearRange: "-21:+0",
        dateFormat: "dd/mm/yy"
    });
});

$(() => {
    $("#datepicker").focus(() => {
        document.getElementById("ui-datepicker-div").scrollIntoView()
    })
})



