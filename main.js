function handlecheck(checkbox) {
    if (checkbox.checked) {
        document.getElementById("submit_button").disabled = false;
    } else {
        document.getElementById("submit_button").disabled = true;
    }
}

function handleclick(e) {
    e.preventDefault();

    Sname = document.getElementById("student_name").value
    Fname = document.getElementById("father_name").value

    document.querySelector("form").reset()

    Sname = Sname.toLowerCase().trim().replace(/\s+/g, '').replace(/\./g, '')
    Fname = Fname.toLowerCase().trim().replace(/\s+/g, '').replace(/\./g, '')

    console.log(Sname, Fname)

    var xhr = new XMLHttpRequest()
    var url = "https://admitcardapi.herokuapp.com/downloads"
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-Type", "Application/json")
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
        }
    }
    var data = JSON.stringify({ "Name": Sname, "Father Name": Fname })
    xhr.send(data)
}