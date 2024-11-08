const colorCh = document.getElementById("profileEditContainerFirstHalf")
const buttonN = document.getElementById("delete")
const letter = document.querySelector("label")
letter.style.fontSize = "25px"
const hole = document.getElementById("circle")
const neonsign = document.getElementById("neonsign")

setBg = () => {
  const random =  Math.floor(Math.random() * 16777215)
  const randomColor = random.toString(16);
  
  /* const randomColor2 = (random-000020).toString(16); */
  console.log(random);
  console.log(randomColor);
  console.log(randomColor);
  
  
  colorCh.style.backgroundColor = "#" + randomColor;
  /* colorCh.style.backdropFilter = "blur(100px)" */
  hole.style.background = colorCh.style.backgroundColor
  document.body.style.backgroundColor = "#" + randomColor;
  letter.style.color = "#" + randomColor;
  neonsign = "#" + randomColor

}

window.addEventListener("load", setBg);


const button = document.getElementById("save");
button.addEventListener("click", function (e) {
  e.preventDefault();
  const fetchSettings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "firstName": document.getElementById("inputFirstName").value,
      "surname": document.getElementById("inputLastName").value,
      "country": document.getElementById("inputCountry").value,
      "zipCode": document.getElementById("inputZip").value,
      "city": document.getElementById("inputCity").value,
      "street": document.getElementById("inputAddress").value,
      "houseNumber": document.getElementById("inputAddress2").value,
    }),
  };
  /* console.log(fetchSettings.body); */
  fetch("http://127.0.0.1:9000/uploadInfo", fetchSettings)
    .then(
      async (data) => {
       /*  const dataJson = await data.json();
       
        let confirmMessage = dataJson.details
        
        let confirmField = document.querySelector('#confirmField')
        confirmField.textContent = confirmMessage*/
      } 
    );
  const pictureFiles = document.getElementById("avatar").files
  const formData = new FormData()
  formData.append('picture', pictureFiles[0])
  
  fetch("http://127.0.0.1:9000/uploadPicture", {
    method: 'POST',
    body: formData
  })
    .then(
      async (data) => {
        let timestamp = new Date().getTime();
        document.getElementById("proPic").src = "profile.jpg?t=" + timestamp;
      }
    )
    .then(
       resp => console.log("success")    
    )
});

const delbutton = document.getElementById("delete");
delbutton.addEventListener("click", function (e) {
  e.preventDefault()

  document.getElementById("inputFirstName").value = ''
  document.getElementById("inputLastName").value = ''
  document.getElementById("inputCountry").value = ''
  document.getElementById("inputZip").value = ''
  document.getElementById("inputCity").value = ''
  document.getElementById("inputAddress").value = ''
  document.getElementById("inputAddress2").value = ''
  document.getElementById("proPic").src = 'public/placeholder.jpg'

  let fetchOptions2 = {
    method: "DELETE",
    mode: "cors",
    
  };

  fetch(`http://127.0.0.1:9000/profiledelete`,fetchOptions2)
  .then(
    resp => console.log("deleted"),
    )
  .then(
    data => console.log("deletedata")
    )
  
});
  