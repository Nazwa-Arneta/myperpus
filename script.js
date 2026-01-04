// Cek halaman aktif
const page = location.pathname.split("/").pop();

// Proteksi halaman (login dulu)
if (page !== "index.html" && localStorage.getItem("isLogin") !== "true") {
  location.href = "index.html";
}

if (page === "index.html" && localStorage.getItem("isLogin") === "true") {
  location.href = "beranda.html";
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (username.value === "admin" && password.value === "123") {
      localStorage.setItem("isLogin", "true");
      location.href = "beranda.html";
    } else {
      alert("Login gagal");
    }
  });
}

// LOGOUT
function logout() {
  localStorage.removeItem("isLogin");
  location.href = "index.html";
}

// TRANSAKSI
const form = document.getElementById("formTransaksi");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = JSON.parse(localStorage.getItem("transaksi")) || [];
    data.push({
      peminjam: peminjam.value,
      nama: nama.value,
      jumlah: jumlah.value,
      kategori: kategori.value,
      status: status.value,
      tanggal: tanggal.value,
    });

    localStorage.setItem("transaksi", JSON.stringify(data));
    form.reset();
    tampilkan();
  });
}

function tampilkan() {
  const tbody = document.getElementById("tabelTransaksi");
  if (!tbody) return;

  tbody.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("transaksi")) || [];

  data.forEach((d, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${d.peminjam}</td>
        <td>${d.nama}</td>
        <td>${d.jumlah}</td>
        <td>${d.kategori}</td>
        <td>${d.status}</td>
        <td>${d.tanggal}</td>
      </tr>
    `;
  });
}

document.addEventListener("DOMContentLoaded", tampilkan);
