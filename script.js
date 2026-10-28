// Data contoh untuk katalog sampah.
const dataSampah = [
  {
    nama: "Sisa makanan",
    kategori: "organik",
    panduan: "Masukkan ke wadah organik atau olah menjadi kompos."
  },
  {
    nama: "Kulit buah",
    kategori: "organik",
    panduan: "Pisahkan dari sampah lain dan gunakan untuk kompos."
  },
  {
    nama: "Botol plastik",
    kategori: "daur-ulang",
    panduan: "Kosongkan, bilas, lalu pisahkan untuk didaur ulang."
  },
  {
    nama: "Kardus",
    kategori: "daur-ulang",
    panduan: "Lipat dan pastikan kardus kering sebelum dikumpulkan."
  },
  {
    nama: "Kertas",
    kategori: "daur-ulang",
    panduan: "Jaga tetap kering dan pisahkan dari kertas yang terkena minyak."
  },
  {
    nama: "Kaleng",
    kategori: "daur-ulang",
    panduan: "Kosongkan, bilas, dan kumpulkan bersama bahan logam."
  },
  {
    nama: "Popok bekas",
    kategori: "residu",
    panduan: "Bungkus dengan rapat dan buang ke tempat sampah residu."
  },
  {
    nama: "Puntung rokok",
    kategori: "residu",
    panduan: "Pastikan sudah padam, lalu buang ke tempat sampah residu."
  },
  {
    nama: "Baterai bekas",
    kategori: "limbah-khusus",
    panduan: "Simpan terpisah dan serahkan ke fasilitas penerimaan limbah khusus."
  },
  {
    nama: "Lampu bekas",
    kategori: "limbah-khusus",
    panduan: "Jangan pecahkan dan serahkan ke fasilitas penerimaan yang sesuai."
  }
];

const hasilSampah = document.querySelector("#hasil-sampah");
const pesanKosong = document.querySelector("#pesan-kosong");
const inputPencarian = document.querySelector("#search-input");
const tombolFilter = document.querySelectorAll(".filter-btn");
let kategoriAktif = "semua";

// Menampilkan kartu sampah dan pesan saat hasilnya kosong.
function tampilkanSampah(daftar) {
  hasilSampah.innerHTML = "";
  pesanKosong.hidden = daftar.length > 0;

  daftar.forEach((sampah) => {
    const kartu = document.createElement("article");
    const nama = document.createElement("h3");
    const kategori = document.createElement("p");
    const panduan = document.createElement("p");

    nama.textContent = sampah.nama;
    kategori.textContent = `Kategori: ${sampah.kategori}`;
    panduan.textContent = sampah.panduan;
    kartu.append(nama, kategori, panduan);
    hasilSampah.appendChild(kartu);
  });
}

function perbaruiKatalog() {
  const kataKunci = inputPencarian.value.toLowerCase().trim();
  const hasil = dataSampah.filter((sampah) => {
    const cocokNama = sampah.nama.toLowerCase().includes(kataKunci);
    const cocokKategori =
      kategoriAktif === "semua" || sampah.kategori === kategoriAktif;
    return cocokNama && cocokKategori;
  });

  tampilkanSampah(hasil);
}

inputPencarian.addEventListener("input", perbaruiKatalog);
tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    kategoriAktif = tombol.dataset.kategori;
    tombolFilter.forEach((item) => item.classList.remove("aktif"));
    tombol.classList.add("aktif");
    perbaruiKatalog();
  });
});

document.querySelector('[data-kategori="semua"]').classList.add("aktif");
tampilkanSampah(dataSampah);

// Data soal kuis.
const soalKuis = [
  {
    pertanyaan: "Ke mana sisa makanan sebaiknya dipilah?",
    pilihan: ["Organik", "Residu", "Limbah khusus"],
    jawabanBenar: 0,
    penjelasan: "Sisa makanan termasuk sampah organik yang dapat diolah menjadi kompos."
  },
  {
    pertanyaan: "Apa yang dilakukan pada botol plastik sebelum didaur ulang?",
    pilihan: ["Dibakar", "Dikosongkan dan dibilas", "Dicampur dengan sisa makanan"],
    jawabanBenar: 1,
    penjelasan: "Botol plastik perlu dikosongkan dan dibilas agar lebih mudah didaur ulang."
  },
  {
    pertanyaan: "Popok bekas termasuk kategori apa?",
    pilihan: ["Organik", "Daur ulang", "Residu"],
    jawabanBenar: 2,
    penjelasan: "Popok bekas termasuk residu dan perlu dibungkus sebelum dibuang."
  },
  {
    pertanyaan: "Di mana baterai bekas sebaiknya diserahkan?",
    pilihan: ["Fasilitas penerimaan limbah khusus", "Tempat kompos", "Tempat sampah organik"],
    jawabanBenar: 0,
    penjelasan: "Baterai bekas adalah limbah khusus yang perlu diserahkan ke fasilitas yang sesuai."
  },
  {
    pertanyaan: "Bagaimana menangani kardus agar dapat didaur ulang?",
    pilihan: ["Dibuat basah", "Dilipat dan dijaga tetap kering", "Dibakar"],
    jawabanBenar: 1,
    penjelasan: "Kardus yang dilipat dan tetap kering lebih mudah dikumpulkan untuk didaur ulang."
  }
];

const kuisContainer = document.querySelector("#kuis-container");
const tombolBerikutnya = document.querySelector("#btn-berikutnya");
const skorKuis = document.querySelector("#skor-kuis");
let nomorSoal = 0;
let skor = 0;
let sudahMenjawab = false;

function tampilkanSoal() {
  const soal = soalKuis[nomorSoal];
  kuisContainer.innerHTML = "";
  sudahMenjawab = false;
  tombolBerikutnya.disabled = true;
  tombolBerikutnya.textContent =
    nomorSoal === soalKuis.length - 1 ? "Lihat skor" : "Berikutnya";

  const pertanyaan = document.createElement("h3");
  pertanyaan.textContent = soal.pertanyaan;
  kuisContainer.appendChild(pertanyaan);

  soal.pilihan.forEach((teksPilihan, indeks) => {
    const pilihan = document.createElement("button");
    pilihan.type = "button";
    pilihan.className = "opsi";
    pilihan.textContent = teksPilihan;
    pilihan.addEventListener("click", () => pilihJawaban(pilihan, indeks));
    kuisContainer.appendChild(pilihan);
  });
}

function pilihJawaban(pilihanTerpilih, indeksPilihan) {
  if (sudahMenjawab) {
    return;
  }

  sudahMenjawab = true;
  const soal = soalKuis[nomorSoal];
  const semuaPilihan = kuisContainer.querySelectorAll(".opsi");
  semuaPilihan.forEach((pilihan) => {
    pilihan.disabled = true;
  });

  const penjelasan = document.createElement("p");
  penjelasan.textContent = soal.penjelasan;
  if (indeksPilihan === soal.jawabanBenar) {
    skor += 1;
    pilihanTerpilih.classList.add("benar");
    penjelasan.classList.add("benar");
  } else {
    pilihanTerpilih.classList.add("salah");
    semuaPilihan[soal.jawabanBenar].classList.add("benar");
    penjelasan.classList.add("salah");
  }
  kuisContainer.appendChild(penjelasan);
  tombolBerikutnya.disabled = false;
}

tombolBerikutnya.addEventListener("click", () => {
  if (!sudahMenjawab) {
    return;
  }

  if (nomorSoal === soalKuis.length - 1) {
    kuisContainer.innerHTML = "";
    tombolBerikutnya.disabled = true;
    skorKuis.textContent = `Skor: ${skor} / ${soalKuis.length}`;
    return;
  }

  nomorSoal += 1;
  tampilkanSoal();
});

skorKuis.textContent = `Skor: 0 / ${soalKuis.length}`;
tampilkanSoal();