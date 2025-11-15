const RAW = "https://raw.githubusercontent.com/USERNAME/REPO/main/subscription.json";
const FILE = "subscription.json";
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

// ---------------------- LOGIN ----------------------
function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;
  
  if (u === ADMIN_USER && p === ADMIN_PASS) {
    localStorage.setItem("admin", "1");
    location.href = "admin.html";
  } else {
    alert("Wrong login");
  }
}

// ------------------- LOAD JSON ---------------------
async function getJSON() {
  let r = await fetch(RAW + "?t=" + Date.now());
  return await r.json();
}

// ------------------- AUTO KEY GEN -------------------
function autoGenerateKey() {
  let key = [...Array(16)].map(() => Math.random().toString(36)[2].toUpperCase()).join('');
  document.getElementById("generatedKey").innerHTML = key;
  document.getElementById("key").value = key;
}

// ------------------- CREATE KEY ----------------------
async function createKey() {
  let json = await getJSON();
  
  let key = document.getElementById("key").value;
  let expiry = new Date(document.getElementById("expiry").value).getTime();
  let credit = document.getElementById("credit").value;
  let deviceLimit = parseInt(document.getElementById("deviceLimit").value);
  
  json.users[key] = {
    expiry: expiry,
    status: "active",
    credit: credit,
    device_limit: deviceLimit,
    devices: {}
  };
  
  await uploadToGitHub(json);
  alert("Key Created!");
  loadUsers();
}

// ------------------- USER LIST -----------------------
async function loadUsers() {
  let json = await getJSON();
  let list = document.getElementById("list");
  list.innerHTML = "";
  
  let keys = Object.keys(json.users);
  document.getElementById("totalUsers").innerText = keys.length;
  
  keys.forEach(k => {
    let u = json.users[k];
    list.innerHTML += `
        <div class='user-item'>
            <b>Key:</b> ${k}<br>
            <b>Credit:</b> ${u.credit}<br>
            <b>Expiry:</b> ${new Date(u.expiry).toLocaleDateString()}<br>
            <b>Status:</b> ${u.status}<br>
            <b>Device Limit:</b> ${u.device_limit}<br>
            <b>Devices:</b>
            <pre>${JSON.stringify(u.devices, null, 2)}</pre>
        </div>
        `;
  });
}

// ------------------- GITHUB UPLOAD -------------------
async function uploadToGitHub(json) {
  let token = "YOUR_GITHUB_TOKEN";
  
  await fetch(`https://api.github.com/repos/USERNAME/REPO/contents/${FILE}`, {
    method: "PUT",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Update subscription DB",
      content: btoa(unescape(encodeURIComponent(JSON.stringify(json, null, 2)))),
      sha: await getSHA()
    })
  });
}

async function getSHA() {
  let r = await fetch(`https://api.github.com/repos/USERNAME/REPO/contents/${FILE}`);
  let d = await r.json();
  return d.sha;
}