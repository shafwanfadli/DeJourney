function login_auth (){
  $.ajax({
    type: "GET",
    url: "/auth_login",
    data: {},
    success: function (response) {
      if (response["result"] == "success") {
        if(response.data.level == "1"){
          let temp_navbar = `
          <ul>
            <li><a href="/" id="navhome">Home</a></li>
            <li><a href="/dashboard" id="navdashboard">Dashboard</a></li>
            <li><a href="/content" id="navcontent">Content</a></li>
            <li><a href="/media" id="navmedia">Media</a></li>
            <li><a href="/about" id="navabout">About Us</a></li>
            <li><a class="" onclick="sign_out()" style="cursor: pointer" id="navlogout">Logout</a></li>
          </ul>
  `;
  $('#navbar').append(temp_navbar);

        }else if(response.data.level == "2"){
        console.log(response.data);
        let unread = '';
        if (response.notif > 0){
          unread = `&nbsp;<i class="bi bi-circle-fill text-danger"></i>`
        }
        let temp_navbar = `
        <ul>
          <li><a href="/" id="navhome">Home</a></li>
          <li><a href="/content" id="navcontent">Content</a></li>
          <li><a href="/media" id="navmedia">Media</a></li>
          <li><a href="/about" id="navabout">About Us</a></li>
          <li><a href="/user/${response.data.username}" id="navmedia">Profil</a></li>
          <li><a href="/notifikasi" id="navnotif">Notifikasi${unread}</a></li>
          <li><a class="" onclick="sign_out()" style="cursor: pointer" id="navlogout">
Logout&nbsp;&nbsp;<img
class="rounded-circle shadow-1-strong me-3"
src="/static/${response.data.profile_icon}"
alt="avatar"
width="30"
height="30"
/></a></li>
        </ul>
`;
$('#navbar').append(temp_navbar);
        }

      } else {
        let temp_navbar = `
          <ul>
            <li><a href="/" id="navhome">Home</a></li>
            <li><a href="/content" id="navcontent">Content</a></li>
            <li><a href="/media" id="navmedia">Media</a></li>
            <li><a href="/about" id="navabout">About Us</a></li>
            <li><a href="/login" id="navlogin">Login</a></li>
          </ul>
  `;
  
  $('#navbar').append(temp_navbar);
      }
    },
  });
}

login_auth();

function sign_out() {
  Swal.fire({
    title: "Are you sure?",
    text: "Anda akan logout dari akun anda",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, logout!"
  }).then((result) => {
    if (result.isConfirmed) {
      $.removeCookie("mytoken", { path: "/" });
      Swal.fire({
          title: "Ter-logout!",
          text: "Anda sudah logout dari akun anda!",
          icon: "warning"
      });
      window.location.href = "/login";
    }
  });

}

