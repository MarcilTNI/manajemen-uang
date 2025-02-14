document.addEventListener("DOMContentLoaded", tampilkanTransaksi);

function tambahTransaksi() {
    let deskripsi = document.getElementById("deskripsi").value;
    let jumlah = document.getElementById("jumlah").value;
    let tipe = document.getElementById("tipe").value;

    if (deskripsi.trim() === "" || jumlah.trim() === "") {
        alert("Harap isi semua kolom!");
        return;
    }

    let transaksi = {
        id: Date.now(),
        deskripsi,
        jumlah: parseFloat(jumlah),
        tipe
    };

    let transaksiList = JSON.parse(localStorage.getItem("transaksi")) || [];
    transaksiList.push(transaksi);
    localStorage.setItem("transaksi", JSON.stringify(transaksiList));

    tampilkanTransaksi();

    // Reset input setelah transaksi ditambahkan
    document.getElementById("deskripsi").value = "";
    document.getElementById("jumlah").value = "";
}

function tampilkanTransaksi() {
    let transaksiList = JSON.parse(localStorage.getItem("transaksi")) || [];
    let saldo = 0;
    let transaksiHTML = "";

    transaksiList.forEach(transaksi => {
        let kelas = transaksi.tipe === "pemasukan" ? "pemasukan" : "pengeluaran";

        if (transaksi.tipe === "pemasukan") {
            saldo += transaksi.jumlah;
        } else {
            saldo -= transaksi.jumlah;
        }

        transaksiHTML += `
            <li class="${kelas}">
                ${transaksi.deskripsi} - Rp ${transaksi.jumlah.toLocaleString()}
                <button onclick="hapusTransaksi(${transaksi.id})">❌</button>
            </li>
        `;
    });

    document.getElementById("saldo").innerText = `Rp ${saldo.toLocaleString()}`;
    document.getElementById("transaksi-list").innerHTML = transaksiHTML;
}

function hapusTransaksi(id) {
    let transaksiList = JSON.parse(localStorage.getItem("transaksi")) || [];
    let transaksiBaru = transaksiList.filter(transaksi => transaksi.id !== id);
    localStorage.setItem("transaksi", JSON.stringify(transaksiBaru));

    tampilkanTransaksi();
}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        const welcomeText = document.querySelector(".fade-in");
        if (welcomeText) {
            welcomeText.style.opacity = "0";
            welcomeText.style.transition = "opacity 1s ease-out";
            setTimeout(() => {
                welcomeText.style.display = "none";
            }, 3000); // Setelah opacity 0, baru dihilangkan dari layout
        }
    }, 7000); // 5 detik setelah halaman dimuat
});
