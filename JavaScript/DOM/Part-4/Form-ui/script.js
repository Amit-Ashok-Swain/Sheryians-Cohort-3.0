let usersData = [
  {
    id: 1,
    name: "Amit Sharma",
    email: "amit.sharma@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    dob: "1998-06-07",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya.verma@example.com",
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    dob: "1999-11-15",
  },
  {
    id: 3,
    name: "Rahul Singh",
    email: "rahul.singh@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    dob: "1997-03-22",
  },
  {
    id: 4,
    name: "Sneha Patil",
    email: "sneha.patil@example.com",
    imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    dob: "2000-08-10",
  },
  {
    id: 5,
    name: "Arjun Nair",
    email: "arjun.nair@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    dob: "1996-12-30",
  },
  {
    id: 6,
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
    dob: "2001-01-19",
  },
  {
    id: 7,
    name: "Vikram Joshi",
    email: "vikram.joshi@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
    dob: "1995-09-04",
  },
  {
    id: 8,
    name: "Ananya Das",
    email: "ananya.das@example.com",
    imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
    dob: "2002-05-12",
  },
  {
    id: 9,
    name: "Karan Mehta",
    email: "karan.mehta@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
    dob: "1994-07-25",
  },
  {
    id: 10,
    name: "Pooja Kulkarni",
    email: "pooja.kulkarni@example.com",
    imageUrl: "https://randomuser.me/api/portraits/women/10.jpg",
    dob: "1998-10-08",
  },
  {
    id: 11,
    name: "Rohit Yadav",
    email: "rohit.yadav@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
    dob: "1997-02-14",
  },
  {
    id: 12,
    name: "Meera Iyer",
    email: "meera.iyer@example.com",
    imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    dob: "2000-11-28",
  },
  {
    id: 13,
    name: "Aditya Rao",
    email: "aditya.rao@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/13.jpg",
    dob: "1996-04-17",
  },
  {
    id: 14,
    name: "Kavya Reddy",
    email: "kavya.reddy@example.com",
    imageUrl: "https://randomuser.me/api/portraits/women/14.jpg",
    dob: "1999-08-03",
  },
  {
    id: 15,
    name: "Siddharth Jain",
    email: "siddharth.jain@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/15.jpg",
    dob: "1995-06-20",
  },
  {
    id: 16,
    name: "Riya Kapoor",
    email: "riya.kapoor@example.com",
    imageUrl: "https://randomuser.me/api/portraits/women/16.jpg",
    dob: "2001-12-05",
  },
  {
    id: 17,
    name: "Manish Choudhary",
    email: "manish.choudhary@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/21.jpg",
    dob: "1998-01-30",
  },
  {
    id: 18,
    name: "Ishita Roy",
    email: "ishita.roy@example.com",
    imageUrl: "https://randomuser.me/api/portraits/women/18.jpg",
    dob: "2002-03-09",
  },
  {
    id: 19,
    name: "Harsh Agarwal",
    email: "harsh.agarwal@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/19.jpg",
    dob: "1997-07-11",
  },
  {
    id: 20,
    name: "Nisha Mishra",
    email: "nisha.mishra@example.com",
    imageUrl: "https://randomuser.me/api/portraits/women/20.jpg",
    dob: "1999-09-23",
  },
];

const main = document.querySelector("main");
const form = document.querySelector("form");
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const users = document.querySelector(".users");
const inputImageUrl = document.querySelector("#image-url");

/*
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log("Form Submitted");

    let name = event.target[0].value;
    let email = event.target[1].value;

    if(name.trim() === "" && email() === "") return "";

    users.innerHTML += `                
                <div class="user-card">
                    <div class="image-box">
                        <img src="https://plus.unsplash.com/premium_photo-1689607809841-cbbc3595f3fd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="image here">
                    </div>
                    <div class="text">
                        <h3 id="text-name">Name: ${name}</h3>
                        <h3>E-mail: ${email} </h3>
                    </div>
                </div>`
    form.reset();
})
*/

/*
usersData.forEach(user => {
    users.innerHTML += `                
                <div class="user-card">
                    <div class="image-box">
                        <img src="${user.imageUrl}" 
                        alt="image here">
                    </div>
                    <div class="text">
                        <h3 id="text-name">Name: ${user.name}</h3>
                        <h3>E-mail: ${user.email} </h3>
                    </div>
                </div>
                `
});
*/

const uiOfUserCard = () => {
  users.innerHTML = "";
  usersData.forEach((user, userIndex) => {
    users.innerHTML += `                
                <div class="user-card">
                    <div class="image-box">
                        <img src="${user.imageUrl}" 
                        alt="image here">
                    </div>
                    <div class="text">
                        <h3 id="text-name">Name: ${user.name}</h3>
                        <h3>E-mail: ${user.email} </h3>
                    </div>
                    <div class="action-buttons">
                        <button type="button" id="edit" onclick="editCard(${userIndex})"> 
                            <i class="ri-edit-2-fill"></i> 
                        </button>
                        <button type="button" id="delete" onclick="deleteCard(${userIndex})">
                            <i class="ri-delete-bin-2-fill"></i>
                        </button>
                    </div>
                </div>
                `;
  });
};

// const deleteCard = (userIndex) => {
//   usersData.splice(userIndex, 1);
//   uiOfUserCard();
// };

// const editCard = (userIndex) => {
//   editIndex = userIndex;
//   inputName.value = usersData[userIndex].name;
//   inputEmail.value = usersData[userIndex].email;
//   inputImageUrl.value = usersData[userIndex].imageUrl;

//   form.querySelector("button").textContent = "Update";
// };

// uiOfUserCard();

// let editIndex = null; // editIndex is set to 0.

// form.addEventListener("submit", (event) => {
//   event.preventDefault(); // set to default so it logs the details
//   console.log("Form Submitted"); // prints Form Submitted
//   let name = event.target[0].value; // stores 0th index of the value which is name
//   let email = event.target[1].value; // stores 1st index of the value which is email
//   let imageUrl = event.target[2].value; // stores 2nd index of the value which is image url

//   if (name.trim() === "" || email.trim() === "" || imageUrl.trim() === "")
//     return;

//   if (editIndex !== null) {
//     usersData[editIndex].name = name;
//     usersData[editIndex].email = email;
//     usersData[editIndex].imageUrl = imageUrl;

//     editIndex = null;
//     form.querySelector("button").textContent = "Create";
//   } else {
//     usersData.push({ name, email, imageUrl });
//   }
//   uiOfUserCard();
//   form.reset();
// });



const editCard = (userIndex)=>{
  editIndex = userIndex;
  inputName.value = usersData[userIndex].name;
  inputEmail.value = usersData[userIndex].email;
  inputImageUrl.value = usersData[userIndex].imageUrl;

  form.querySelector("button").textContent = "Update";
}

const deleteCard = (userIndex)=>{
  usersData.splice(userIndex,1);
  uiOfUserCard();
}
uiOfUserCard();

let editIndex = null;

form.addEventListener("submit",(event)=>{

  event.preventDefault();

  let name = inputName.value;
  let email = inputEmail.value;
  let imageUrl = inputImageUrl.value;

  if(name.trim() === "" || email.trim() === "" || imageUrl.trim() === "") return

  if(editIndex!==null){
    usersData[editIndex].name = name;
    usersData[editIndex].email = email;
    usersData[editIndex].imageUrl = imageUrl;
    editIndex = null;
    form.querySelector("button"),textContent = "Create";
  }else{
  usersData.push({name,email,imageUrl});
  }

  uiOfUserCard();
  form.reset();

})