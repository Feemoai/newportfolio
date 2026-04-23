import { CV } from "@/types/cv";

export const cv: CV = {
  personal: {
    full_name: "Ahmad Fajril Falah",
    first_name: "Fajril",
    headline: "Computer Engineering Student & Aspiring Web Developer",
    location: "Semarang, Jawa Tengah, Indonesia",
    status: "Available",
    contacts: {
      phone: "+62 895411605548",
      email: "feryahmadfajrilfalah21@gmail.com",
      linkedin: "https://linkedin.com/in/ahmad-fajril-falah-a85850299/",
      website: "https://instagram.com/feemoai",
    },
  },

  summary:
    "Mahasiswa Teknologi Rekayasa Komputer di Politeknik Negeri Semarang dengan minat kuat pada pengembangan website, problem solving, dan teknologi. Memiliki pengalaman organisasi, kepemimpinan, serta kemampuan bekerja dalam tim.",

  education: [
    {
      institution: "Politeknik Negeri Semarang",
      degree: "Sarjana Terapan Teknologi Rekayasa Komputer",
      start_date: "2025-08",
      end_date: null,
      status: "Ongoing",
      focus: [],
      score: null,
      achievements: [],
    },
    {
      institution: "SMA Negeri 1 Pati",
      degree: "High School Diploma",
      focus: [
        "Matematika Lanjutan",
        "Bahasa Inggris Lanjutan",
        "Informatika",
        "Biologi",
      ],
      score: { value: 91, scale: 100 },
      achievements: ["Eligible SNBP"],
      start_date: "2022-07",
      end_date: "2025-05",
      status: "Completed",
    },
  ],

  experience: [
    {
      organization: "Novo Club – ParagonCorp",
      role: "Active Member",
      start_date: "2026-04",
      end_date: null,
      description: "Berpartisipasi aktif dalam komunitas Novo Club.",
      highlights: [],
      category: "community",
    },
    {
      organization: "Google Developer Group on Campus Udinus",
      role: "Active Member",
      start_date: "2026-01",
      end_date: null,
      description: "Anggota komunitas developer Google di kampus.",
      highlights: [],
      category: "community",
    },
    {
      organization: "Polines Robotic Evolution",
      role: "Active Member",
      start_date: "2026-01",
      end_date: null,
      description: "Anggota UKM robotik di Politeknik Negeri Semarang.",
      highlights: [],
      category: "organization",
    },
    {
      organization: "Polytechnic Computer Club (PCC)",
      role: "Active Member",
      start_date: "2025-11",
      end_date: null,
      description: "Aktif dalam kegiatan pengembangan teknologi dan komunitas IT.",
      highlights: [],
      category: "organization",
    },
    {
      organization: "OSBIT SMA N 1 Pati",
      role: "Head of Web Programming Department",
      start_date: "2023-08",
      end_date: "2024-06",
      description: "Memimpin divisi pemrograman web organisasi IT sekolah.",
      highlights: [
        "Memimpin tim lebih dari 20 anggota",
        "Mengajar dasar pemrograman website",
        "Menjadi evaluator proyek kaderisasi",
      ],
      category: "leadership",
    },
    {
      organization: "OSIS SMA N 1 Pati",
      role: "Division Coordinator",
      start_date: "2023-10",
      end_date: "2024-09",
      description: "Koordinator divisi aspirasi dan dokumentasi.",
      highlights: [
        "Mengelola aspirasi siswa",
        "Mengorganisir program 'Stan Aspirasi'",
        "Panitia dokumentasi event sekolah",
      ],
      category: "leadership",
    },
    {
      organization: "ROHIS Al Izzah",
      role: "Secretary & Documentation Team",
      start_date: "2023-08",
      end_date: "2024-09",
      description: "Mengelola administrasi dan dokumentasi kegiatan.",
      highlights: [
        "Mengelola komunikasi dan administrasi",
        "Mengatur dokumentasi kegiatan",
        "Menyusun proposal dan laporan",
      ],
      category: "organization",
    },
    {
      organization: "DIASTRA",
      role: "Member",
      start_date: "2023-09",
      end_date: "2024-09",
      description: "Berpartisipasi dalam kegiatan lingkungan dan kewirausahaan.",
      highlights: [],
      category: "organization",
    },
    {
      organization: "BTA SMA N 1 Pati",
      role: "Treasurer",
      start_date: "2023-08",
      end_date: "2024-09",
      description: "Mengelola keuangan organisasi.",
      highlights: [],
      category: "organization",
    },
    {
      organization: "LAZISMU",
      role: "Volunteer",
      start_date: "2023-10",
      end_date: "2023-10",
      description: "Mengikuti pelatihan kepemimpinan dan sosial.",
      highlights: [],
      category: "volunteer",
    },
  ],

  achievements: [
    {
      title: "Semifinalist",
      event: "Business Plan Competition (MANIFEST ITS)",
      year: 2024,
      details: "Peringkat 11 nasional dengan ide bisnis 'Jalan Tani'.",
      icon: "🏆",
    },
    {
      title: "Scholarship Awardee",
      event: "Perintis Learning Camp",
      year: 2025,
      details: "Awarded merit-based scholarship for academic excellence.",
      icon: "🎓",
    },
  ],

  skills: {
    languages: [
      { name: "PHP", level: 80 },
      { name: "JavaScript", level: 85 },
      { name: "Python", level: 65 },
    ],
    frameworks: [
      { name: "ReactJS", level: 80 },
      { name: "Laravel", level: 75 },
    ],
    web_development: [
      { name: "Frontend Development", level: 85 },
      { name: "Backend Development", level: 70 },
      { name: "Responsive Design", level: 88 },
    ],
    tools: [
      { name: "VS Code", level: 95 },
      { name: "Git", level: 75 },
    ],
    design: [
      { name: "Canva", level: 90 },
      { name: "Adobe Photoshop", level: 70 },
      { name: "CorelDRAW", level: 65 },
    ],
  },

  languages: [
    { name: "Indonesian", level: "Native", flag: "🇮🇩" },
    { name: "Javanese", level: "Native", flag: "🌾" },
    { name: "English", level: "Intermediate", flag: "🇬🇧" },
  ],

  projects: [
    {
      title: "Jalan Tani",
      description:
        "Platform bisnis agri-tech yang menghubungkan petani dengan pasar digital. Semifinalist MANIFEST ITS Business Plan Competition — ranked #11 nationally.",
      longDescription: "Jalan Tani adalah sebuah platform inovatif yang dirancang untuk memodernisasi sektor pertanian di Indonesia. Platform ini memungkinkan petani untuk menjual hasil panen mereka secara langsung ke konsumen atau supermarket/mall melalui sistem digital, mengurangi ketergantungan pada rantai distribusi yang panjang. Fitur utama mencakup pelacakan harga pasar real-time, sistem logistik, dan edukasi teknik pertanian modern.",
      keyFeatures: [
        "Sistem Penjualan Digital Real-time",
        "Integrasi Logistik Pengiriman",
        "Manajemen Stok Petani",
        "Edukasi Teknik Pertanian Modern"
      ],
      stack: ["UI/UX Design", "Canva"],
      image: "/projects/jalantani.jpg",
      link: "#",
      featured: false,
      year: 2024,
    },
    {
      "title": "Website Resmi OSBIT",
      "description": "Website resmi OSBIT (Organisasi Siswa Intra Sekolah Berbasis Informasi Teknologi) SMA Negeri 1 Pati yang berfungsi sebagai pusat informasi dan aktivitas organisasi secara digital.",
      "longDescription": "Website ini dikembangkan sebagai pusat digital utama untuk mendukung kegiatan dan manajemen organisasi OSBIT di SMA Negeri 1 Pati. Platform ini mempermudah pengelolaan anggota melalui sistem seleksi dan profil, serta menyediakan media terpusat untuk publikasi informasi seperti pengumuman kegiatan dan dokumentasi proyek. Dengan tampilan yang modern dan responsif, website ini mampu memberikan pengalaman pengguna yang optimal di berbagai perangkat sekaligus menjadi sarana profesional untuk menampilkan karya dan aktivitas organisasi.",
      "keyFeatures": [
        "Sistem seleksi anggota dan manajemen profil",
        "Kalender kegiatan dan pengumuman terintegrasi",
        "Galeri showcase proyek organisasi",
        "Desain responsif untuk berbagai perangkat"
        ],
      "stack": ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Bootstrap"],
      image: "/projects/osbit.jpg",
      link: "https://osbitofficial.netlify.app/announcement/announcement",
      featured: true,
      year: 2024,
    },
    {
      title: "Personal Portfolio v2",
      description:
        "Portfolio website yang dibangun dengan sederhana, menampilkan proyek dan pengalaman secara interaktif.",
      longDescription: "Website portfolio ini dibangun dengan fokus layout yang simple dan interaktif. Menggunakan teknologi yang sederhana dan Framer Motion untuk animasi yang memukau.",
      keyFeatures: [
        "Integrasi Chatbot FeemoAI",
        "Animasi Interaktif Framer Motion",
        "Desain Dark Mode Minimalis",
        "Performa Optimal dengan Next.js"
      ],
      stack: [ "HTML5", "Tailwind CSS", "Framer Motion"],
      image: "/projects/webv2.jpg",
      link: "https://feemoai.my.id",
      featured: true,
      year: 2025,
    },
    {
      "title": "Website Parang Garudo",
      "description": "Website informatif yang menampilkan profil dan potensi wisata Situs Parang Garudo di Kabupaten Pati dalam bentuk platform digital yang menarik dan mudah diakses.",
      "longDescription": "Proyek ini berawal dari sebuah dokumen penelitian yang kemudian dikembangkan menjadi sebuah website interaktif. Website Parang Garudo dirancang untuk memperkenalkan situs bersejarah yang terletak di Desa Gado, Kecamatan Winong, Kabupaten Pati. Melalui pendekatan desain yang sederhana namun elegan, website ini menyajikan informasi lokasi, latar belakang, serta daya tarik wisata secara lebih visual dan engaging. Pengembangan dilakukan dengan fokus pada kemudahan akses, kejelasan informasi, serta pengalaman pengguna yang nyaman di berbagai perangkat.",
      "keyFeatures": [
        "Website statis yang ringan dan cepat diakses",
        "Showcase informasi situs wisata",
        "Desain responsif dan modern"
        ],
      "stack": ["HTML", "CSS", "JavaScript", "TailwindCSS"],
      image: "/projects/garuda.jpg",
      link: "#",
      featured: false,
      year: 2024,
    },
  ],

  gallery: [ 
    // ukurannye : large, tall, medium, wide
    {
      title: "MANIFEST ITS Competition",
      description: "Semifinalist Business Plan Competition — ranked #11 nationally",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
      year: 2024,
      size: "large", // spans 2x2
    },
    {
      title: "OSBIT Leadership",
      description: "Leading the Web Programming Department with 20+ members",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop",
      year: 2024,
      size: "tall", // spans 1x2
    },
    {
      title: "Google Developer Group",
      description: "Active participation in GDG on Campus Udinus",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
      year: 2026,
      size: "medium", // spans 1x1
    },
    {
      title: "Perintis Learning Camp",
      description: "Scholarship program — academic and leadership development",
      image: "https://images.unsplash.com/photo-1523240715630-974bb7ad1582?q=80&w=1000&auto=format&fit=crop",
      year: 2025,
      size: "medium",
    },
    {
      title: "Robotic Evolution",
      description: "Building the future with Polines Robotic Team",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
      year: 2026,
      size: "wide", // spans 2x1
    },
    {
      title: "Design Exploration",
      description: "Visual experiments with UI and Graphics",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop",
      year: 2025,
      size: "medium",
    },
  ],
} as const;
