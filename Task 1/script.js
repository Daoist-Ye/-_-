function calculateAge() {
  var dobInput = document.getElementById("dob").value;

  // Check if date of birth is provided
  if (dobInput === "") {
    document.getElementById("result").innerHTML =
      "Error: Date of Birth not provided";
    return;
  }

  var dob = new Date(dobInput);
  var today = new Date();

  var years = today.getFullYear() - dob.getFullYear();
  var months = today.getMonth() - dob.getMonth();
  var days = today.getDate() - dob.getDate();

  // Adjust the months and years if the current date is earlier than the birth date
  if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) {
    years--;
    months += 12;
  }
  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  var ageString = "Your age is: ";
  if (years > 0) {
    ageString += years + " year" + (years !== 1 ? "s" : "") + " ";
  }
  if (months > 0) {
    ageString += months + " month" + (months !== 1 ? "s" : "") + " ";
  }
  if (days > 0) {
    ageString += days + " day" + (days !== 1 ? "s" : "");
  }

  document.getElementById("result").innerHTML = ageString;
}
