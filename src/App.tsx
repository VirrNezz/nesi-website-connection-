/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, ShieldCheck, Cpu, Volume2, VolumeX, Play, Pause, 
  ExternalLink, X, Compass, Users, Radio, User, 
  ChevronDown, MessageSquare, Info, Github, Youtube, 
  Twitter, Instagram, Send, Sparkles, Heart, CircleDot, 
  Layers, Download, Music, RefreshCw, Smartphone, Laptop, Clock
} from 'lucide-react';

// Import local furry avatar generated earlier
const avatarImg = "/src/assets/images/furry_cyber_avatar_1780155559936.png";

// Music playlist tracks - standard durable high quality synthwave themes
interface Track {
  title: string;
  artist: string;
  url: string;
}

const PLAYLIST: Track[] = [
  {
    title: "Vapor Retro Database Loop",
    artist: "Synthwave Division",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Cybernetic Horizon Core",
    artist: "Hyperion Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    title: "Deus Ex Machine Lofi",
    artist: "Neon Furry Protocol",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  }
];

// Friends list structured data
interface Friend {
  id: string;
  name: string;
  species: string;
  avatarSeed: string;
  avatarColor: string;
  type: 'standard' | 'sahabat' | 'pacar';
  traits: string;
  detailedBio: string;
  socials: { label: string; url: string; platform: string; color: string }[];
}

const FRIENDS_LIST: Friend[] = [
  {
    id: 'f1',
    name: 'Pink Salsabila Layla (Layla)',
    species: 'Hybrid Wolf x Dragon',
    avatarSeed: 'layla',
    avatarColor: 'bg-pink-500/20 text-pink-400',
    type: 'standard',
    traits: 'Warna pink, ada dua pasang tanduk putih, corak ungu di pipi, pake hoodie & baggy jeans, ekor mirip charmander tapi bulu pink dengan ujung ungu.',
    detailedBio: 'Layla adalah hibrida naga serigala dengan temperamen ceria yang dominan berwarna pink lembut. Memiliki dua pasang tanduk putih elegan dan semburat ungu di pipi yang melengkapi hoodie kesayangannya.',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/rezkya_35?igsh=MW84b2xnZXJjemh2bA==', platform: 'instagram', color: 'bg-gradient-to-tr from-purple-500 to-pink-500' }
    ]
  },
  {
    id: 'f2',
    name: 'Hieronimus Lidon',
    species: 'Hibrida Singa & Smilodon',
    avatarSeed: 'hieronimus',
    avatarColor: 'bg-amber-600/20 text-amber-400',
    type: 'standard',
    traits: 'Warna bulu coklat, coklat muda & cream. Hidung pink. Mata kiri biru, mata kanan coklat. Suka coklat, pisang, & apel.',
    detailedBio: 'Lidon memadukan keanggunan singa modern dengan kegagahan smilodon purba. Keunikan warna mata heterochromia ganda membuatnya menonjol di setiap database rujukan.',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/hieronimuslidon?igsh=NWx0a3RvMHVrMzJ5', platform: 'instagram', color: 'bg-gradient-to-tr from-purple-500 to-pink-500' }
    ]
  },
  {
    id: 'f3',
    name: 'Minthy',
    species: 'Hybrid Wolf Inu',
    avatarSeed: 'minthy',
    avatarColor: 'bg-[#06e3ff]/20 text-[#06e3ff]',
    type: 'standard',
    traits: 'Bulu biru putih, kacamata pilot coklat, mata coklat berekspresi tegas. Sweater navy kerah coklat & sepatu Wallace.',
    detailedBio: 'Minthy memiliki gaya petualang udara yang kental dengan kacamata penerbang retro dan sweater tebal navy coklat, siap mengendalikan kemudi kapan saja.',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/iam.minthy?igsh=dmhkNTZ4MnpyYWI2', platform: 'instagram', color: 'bg-gradient-to-tr from-purple-500 to-pink-500' }
    ]
  },
  {
    id: 'f4',
    name: 'Rocque',
    species: 'Naga Kemono',
    avatarSeed: 'rocque',
    avatarColor: 'bg-cyan-500/20 text-cyan-400',
    type: 'standard',
    traits: 'Tanduk dua, rambut biru, telinga biru tua (ujung oren), tato << di pipi kiri. Makanan favorit: cheeseburger & kentang goreng.',
    detailedBio: 'Rocque adalah naga kemono yang berkepribadian hangat. Selalu membawa keceriaan dan menyukai kudapan barat di sela-sela waktu santainya.',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/furry_rocque?igsh=bmoyZjA3ZDg1dnF2', platform: 'instagram', color: 'bg-gradient-to-tr from-purple-500 to-pink-500' }
    ]
  },
  {
    id: 'f5',
    name: 'Kaiishou Shiinarii (Shii)',
    species: 'Orange Dragon Kemono',
    avatarSeed: 'shii',
    avatarColor: 'bg-orange-500/20 text-orange-400',
    type: 'standard',
    traits: 'Outfit: Kacamata bulat & Jas putih lengkap. Prestasi: Naga termuda yang menyandang gelar The King of Pengendali Saham pertama.',
    detailedBio: 'Kaiishou (Kaiishii) adalah naga jenius bidang finansial dan analisis pasar modal global. Hadir rapi menggunakan setelan jas putih perlambang integritas absolut.',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/shiiwashere_?igsh=MWoyaG01Y3J4cDZ5MA==', platform: 'instagram', color: 'bg-gradient-to-tr from-purple-500 to-pink-500' }
    ]
  },
  {
    id: 'f6',
    name: 'Malvin Relz Harry',
    species: 'Wolf',
    avatarSeed: 'malvin',
    avatarColor: 'bg-indigo-500/20 text-indigo-300',
    type: 'standard',
    traits: 'Serigala hitam-putih dengan aksen pola siber biru di ujung fur, serta tanda bintang di bahu lengan sebagai ciri khas utama.',
    detailedBio: 'Malvin adalah serigala penjaga database dengan penanda bintang astral di bahu kirinya, memancarkan kepemimpinan kuat.',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/malvinthefurr?igsh=MThtMjBkZGozeTk1Ng==', platform: 'instagram', color: 'bg-gradient-to-tr from-purple-500 to-pink-500' }
    ]
  },
  {
    id: 'f7',
    name: 'Kairu Xhintaka',
    species: 'Rubah Kitsune',
    avatarSeed: 'kairu',
    avatarColor: 'bg-neutral-800 text-rose-400',
    type: 'standard',
    traits: 'Rambut putih messy, mata merah tatapan tajam, telinga rubah putih aksen merah. Atasan hitam oversized, syal/masker mulut & celana putih.',
    detailedBio: 'Kairu mewakili legenda rubah berekor sembilan dengan palet warna hitam putih serta aksen merah tajam di setiap anyaman syalnya.',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/kairu_xhintaka?igsh=MTc5YjJ1Mjc4MXppcg==', platform: 'instagram', color: 'bg-gradient-to-tr from-purple-500 to-pink-500' }
    ]
  },
  {
    id: 'f8',
    name: 'Lewis Welby',
    species: 'Kemono Rubah',
    avatarSeed: 'lewis',
    avatarColor: 'bg-rose-500/25 text-red-400',
    type: 'standard',
    traits: 'Rubah warna merah-biru bertangan merah, badan twink menawan. Suka membaca antologi fiksi & menggoda tuannya dengan candaan cerdas.',
    detailedBio: 'Lewis adalah sosok rubah berpendidikan tinggi yang piawai membalikkan argumen berkat kebiasaan gemar melahap buku di ruang perpustakaan.',
    socials: [
      { label: 'TikTok', url: 'https://www.tiktok.com/@fcthelewis0?is_from_webapp=1&sender_device=pc', platform: 'tiktok', color: 'bg-neutral-900' }
    ]
  },
  {
    id: 'f9',
    name: 'Dreadsdensetsu',
    species: 'Fennec Fox',
    avatarSeed: 'dread',
    avatarColor: 'bg-yellow-500/20 text-yellow-300',
    type: 'standard',
    traits: 'Morfologi rubah fennec kuning-putih berpola putih di tiap ujung telapak tangan, kaki, & ekor. Sepasang mata jernih berwarna biru langit.',
    detailedBio: 'Dreadsdensetsu menyukai iklim hangat dan memiliki indra rungu siber yang sangat peka terhadap gangguan kebisingan terminal server.',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/dreadsdensetsu?igsh=NjIzMmZtMnR4Z2Fz', platform: 'instagram', color: 'bg-gradient-to-tr from-purple-500 to-pink-500' }
    ]
  },
  {
    id: 'f10',
    name: 'AlonySky (Alony/Sky)',
    species: 'Naga Reptil',
    avatarSeed: 'alony',
    avatarColor: 'bg-purple-500/25 text-purple-300',
    type: 'pacar',
    traits: 'Naga ungu berpendar, tanduk & duri tajam membelok, 2 tindik emas di alis kiri, cincin manis emas ganda, kacamata persegi rantai emas.',
    detailedBio: 'ALONY_SKY ADALAH MITRA TERKASIH (SPECIAL RELATIONSHIP) BAGI NESINEZZ. Memiliki aura naga reptilian berpakaian formal/jaket ungu kontras yang mengkilap.',
    socials: [
      { label: 'TikTok Partner', url: 'https://www.tiktok.com/@alonysky?_r=1&_t=ZS-96Tq784Voc3', platform: 'tiktok', color: 'bg-neutral-900' }
    ]
  },
  {
    id: 'f11',
    name: 'Xavia "Exfive" Nürhart',
    species: 'Akita Inu x Dragon Hybrid',
    avatarSeed: 'xavia',
    avatarColor: 'bg-rose-900/30 text-rose-400',
    type: 'standard',
    traits: 'Bulu abu putih aksen merah maroon, telinga besar, tanduk kecil, taring tajam. Tanda X & 5 di tubuh, ekor fluffy merah naga. Chaotic & protektif.',
    detailedBio: 'Xavia melambangkan loyalitas mutlak dan sisi protektif yang meledak-ledak terhadap seluruh relasi terdekatnya.',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/exfiveturbo?igsh=ZWVnMnJqZHdrZGx0', platform: 'instagram', color: 'bg-gradient-to-tr from-purple-500 to-pink-500' }
    ]
  },
  {
    id: 'f12',
    name: 'Eric Savior',
    species: 'Fox',
    avatarSeed: 'eric',
    avatarColor: 'bg-orange-500/20 text-orange-400',
    type: 'standard',
    traits: 'Warna bulu rubah oren murni dengan rambut putih bergradasi emas berkilau di ujung helai rambutnya.',
    detailedBio: 'Eric mengekspresikan aura kehangatan fajar siber, menyajikan pembawaan tenang dan protektif.',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/ericsavior_fox?utm_source=qr&igsh=dnozYXpleDBjdGNn', platform: 'instagram', color: 'bg-gradient-to-tr from-purple-500 to-pink-500' }
    ]
  },
  {
    id: 'f13',
    name: 'Spot Dalmatian',
    species: 'Anjing Dalmatian',
    avatarSeed: 'spot',
    avatarColor: 'bg-slate-400/20 text-white',
    type: 'standard',
    traits: 'Corak putih dominan bertabur bintik hitam berukuran besar. Pembawaan manja (spoiled) & penyayang di dalam lore resminya.',
    detailedBio: 'Spot dalmatian adalah anjing ramah yang suka menjadi pusat perhatian dan mencari kehangatan pelukan di sela kesibukan.',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/spots_dalmation?igsh=MTdiNzQ2eW13MzhqZg==', platform: 'instagram', color: 'bg-gradient-to-tr from-purple-500 to-pink-500' }
    ]
  },
  {
    id: 'f14',
    name: 'Aubrey Virtual',
    species: 'Wolf (Serigala)',
    avatarSeed: 'aubrey',
    avatarColor: 'bg-amber-500/20 text-amber-400',
    type: 'sahabat',
    traits: 'Serigala putih ekor putih, masker kain hitam khas. Mata kanan biru & mata kiri merah luka gores. Gemar mengoleksi kristal energi terang.',
    detailedBio: 'AUBREY ADALAH SAHABAT TERDEKAT (SPECIAL BEST FRIEND) YANG SETIA. Suka mengamati pendar batu mineral kristal berkekuatan siber.',
    socials: [
      { label: 'TikTok Bestie', url: 'https://www.tiktok.com/@aubrey_virtual?_r=1&_t=ZS-96mv5qcqNFA', platform: 'tiktok', color: 'bg-neutral-900' }
    ]
  },
  {
    id: 'f15',
    name: 'CapruK',
    species: 'Hiu (Shark)',
    avatarSeed: 'capruk',
    avatarColor: 'bg-amber-500/20 text-amber-400',
    type: 'sahabat',
    traits: 'Hiu putih-biru muda dengan sirip biru muda. Kepala hiu, gigi tajam bergaya tangguh misterius bersetelan outfit gelap berkarisma.',
    detailedBio: 'CAPRUK ADALAH SAHABAT TERBAIK (SPECIAL BEST FRIEND). Ahli penjelajah laut dalam bersenjatai keberanian and mata hitam tajam melumpuhkan lawan.',
    socials: [
      { label: 'YouTube Bestie', url: 'https://www.youtube.com/@capruksihiu', platform: 'youtube', color: 'bg-red-600' }
    ]
  },
  {
    id: 'f16',
    name: 'Biorix Demos F.',
    species: 'Tigershark',
    avatarSeed: 'biorix',
    avatarColor: 'bg-cyan-500/20 text-red-400',
    type: 'standard',
    traits: 'Hiu abu-abu gelap bergaris merah di sekujur tubuh, rambut merah berkilau jernih, fisik masculine/muscular, mata siluet hitam.',
    detailedBio: 'Biorix perkasa dengan ekor hiu pecut elastis, menguasai pertarungan perairan dalam dengan struktur anatomi kokoh.',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/thereal_fxu?igsh=c2IyYmNsZ25ndWQ5', platform: 'instagram', color: 'bg-gradient-to-tr from-purple-500 to-pink-500' }
    ]
  },
  {
    id: 'f17',
    name: 'Reykie',
    species: 'Tiger (Harimau)',
    avatarSeed: 'reykie',
    avatarColor: 'bg-cyan-500/20 text-[#06e3ff]',
    type: 'standard',
    traits: 'Tiger berparas imut, doyan rebahan tidur lelap. Jangan terkecoh keimutannya jika tidak ingin ditelan bulat-bulat.',
    detailedBio: 'Reykie adalah harimau santai yang menyenangi kedamaian bantal guling digital, namun siap mempertahankan integritas teritorinya.',
    socials: [
      { label: 'TikTok Tiger', url: 'https://www.tiktok.com/@something_spy?_r=1&_t=ZS-96nRfETvEzF', platform: 'tiktok', color: 'bg-neutral-900' }
    ]
  }
];

// Connection Cards (Owner socials)
interface SocialCard {
  name: string;
  username: string;
  url: string;
  color: string;
  icon: any;
  description: string;
}

const OWNER_SOCIALS: SocialCard[] = [
  {
    name: 'GitHub Repository',
    username: 'NesiNezz',
    url: 'https://github.com/NesiNezz',
    color: 'from-neutral-900 to-slate-800 shadow-slate-900',
    icon: Github,
    description: 'Explore our open-source cyber projects, terminal widgets, and retro game prototypes.'
  },
  {
    name: 'Instagram Channel',
    username: '@NesiNezz.fur',
    url: 'https://instagram.com/NesiNezz',
    color: 'from-purple-900 to-pink-700 shadow-pink-900',
    icon: Instagram,
    description: 'Follow our fluffy developments, convention memories, suits, and daily code logs.'
  },
  {
    name: 'YouTube Workspace',
    username: 'NesiNezz Terminal',
    url: 'https://youtube.com/@NesiNezz',
    color: 'from-red-950 to-red-600 shadow-red-950',
    icon: Youtube,
    description: 'Video game development progress, audio synth designs, and gray hat tutorials.'
  },
  {
    name: 'Telegram Terminal',
    username: 't.me/NesiNezz_Core',
    url: 'https://t.me/NesiNezz',
    color: 'from-sky-950 to-sky-600 shadow-sky-950',
    icon: Send,
    description: 'Secure instant broadcasts, emergency patches, and server telemetry logs.'
  }
];

// Profile Roles
interface RoleRow {
  role: string;
  level: string;
  specialty: string;
  systemCoverage: string;
}

const ROLES_LIST: RoleRow[] = [
  { role: 'Owner', level: 'Level 10 (Master Core)', specialty: 'Strategic Direction & Design Identity', systemCoverage: '100% (Universal Administrator)' },
  { role: 'Programmer', level: 'Level 8 (Engine dev)', specialty: 'TypeScript, React Virtual DOM, Python Automation', systemCoverage: '92% (Core Codebase Base)' },
  { role: 'Editor', level: 'Level 7 (Assets/vido)', specialty: 'Aesthetic Alignment, Audio Mastering', systemCoverage: '78% (Video & Visual Layer)' },
  { role: 'Fursuiters', level: 'Level 9 (Hobbyist)', specialty: 'Suite Design, Custom Mascot Expression', systemCoverage: '50% (Creative Furry Guild)' },
  { role: 'Administrator', level: 'Level 9 (Main Host)', specialty: 'Linux Server Clustering, SSH Tunneling', systemCoverage: '95% (Global Port Control)' },
  { role: 'Web Development', level: 'Level 8 (Web Architect)', specialty: 'Vite Pipeline, Glassmorphism CSS, Responsive Grid', systemCoverage: '89% (Portlets Interface)' },
  { role: 'Gray Hat', level: 'Level 6 (Sec Analyst)', specialty: 'Database Pen-Testing, Binary Integrity Audit', systemCoverage: '64% (Sandboxed Quarantine)' }
];

// FAQs Data
interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "Siapa itu NesiNezz?",
    a: "NesiNezz adalah seorang programmer antusias, desainer, hobiis Furry, dan administrator sistem cerdas yang memadukan estetika retro cyberpunk dengan fungsionalitas modern."
  },
  {
    q: "Mengapa desain web ini bertema cyber database aman?",
    a: "Web ini dirancang menyerupai terminal komputer rahasia yang aman diakses (Safe Retro Access Directory). Tujuannya adalah menghadirkan nuansa eksklusif, retro, dan aman bagi personifikasi kreatif pemiliknya."
  },
  {
    q: "Apakah seluruh media sosial terdaftar asli?",
    a: "Ya, seluruh link sosial mengarah langsung ke akun resmi NesiNezz yang dijaga aman di bawah protokol integrasi digital."
  },
  {
    q: "Bagaimana cara mendownload modul HTML mandiri (offline)?",
    a: "Anda cukup menekan tombol 'Download Standalone HTML' di bagian footer halaman web ini. Tombol tersebut secara otomatis memaketkan seluruh asset, kode, dan fungsionalitas ke dalam 1 file HTML tunggal untuk Anda jalankan luring di komputer Anda menggunakan VS Code."
  }
];

export default function App() {
  // Session handling to skip intro if they have already logged in once
  const [introFinished, setIntroFinished] = useState(() => {
    return sessionStorage.getItem('nesinezz_db_entered') === 'true';
  });

  // Loading Screen States
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [loadingLogs, setLoadingLogs] = useState<string[]>([]);
  const [accessGranted, setAccessGranted] = useState(false);

  // Audio Player states
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // General App states
  const [currentTab, setCurrentTab] = useState<'home' | 'friendlist' | 'connection' | 'profile'>('home');
  const [realTimeClock, setRealTimeClock] = useState('');
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);

  // Friends View States
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  // Connection View States (Simulating loading social cards for 5-7 seconds)
  const [isConnectingSocials, setIsConnectingSocials] = useState(true);
  const [socialProgress, setSocialProgress] = useState(0);
  const [socialLogs, setSocialLogs] = useState<string[]>([]);

  // Simulation Browser Viewport inside App
  const [simulatedBrowserUrl, setSimulatedBrowserUrl] = useState<string | null>(null);
  const [simulatedBrowserTitle, setSimulatedBrowserTitle] = useState<string>('');

  // Flooding background array of visual codes
  const [bgGridCells, setBgGridCells] = useState<string[]>([]);

  // Ref for background loop
  useEffect(() => {
    // Generate a background grid of cyber codes to simulate "flooding database"
    const hex = "0123456789ABCDEF@#$&*-+=[]/";
    const cells: string[] = [];
    for (let i = 0; i < 120; i++) {
      let segment = "";
      for (let j = 0; j < 5; j++) {
        segment += hex[Math.floor(Math.random() * hex.length)];
      }
      cells.push(segment);
    }
    setBgGridCells(cells);
  }, []);

  // Clock Update effect
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const wib = new Intl.DateTimeFormat('id-ID', options).format(now);
      const dateStr = now.toLocaleDateString('id-ID', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      setRealTimeClock(`${dateStr} - ${wib} WIB`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Intro Database Boot Simulation Process
  useEffect(() => {
    if (introFinished) return;

    const logMessages = [
      "SYSTEM INGRESS PROTOCOL V4.1.14 ENGAGED...",
      "TUNNELING SECURE SSH SOCKET PORT:3000...",
      "VERIFYING P2P INTEGRITY CHECKSUM [OK]",
      "BYPASSING SECURE ACCESS GRID...",
      "FLOODING CACHE DATA BUFFER STORAGE...",
      "SYNCHRONIZING FURRY MASCOT INTERFACE...",
      "LOADING RETRO DATABASE GRAPHICS..."
    ];

    let timer = 0;
    // Fast increment progress and dispatch log elements
    const progressInterval = setInterval(() => {
      setLoadingPercent((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setAccessGranted(true);
          // Let it stay short time to enjoy "ACCESS GRANTED" screen
          setTimeout(() => {
            setIntroFinished(true);
            sessionStorage.setItem('nesinezz_db_entered', 'true');
          }, 1200);
          return 100;
        }
        
        // Push secure terminal log messages at specific points
        const messageIndex = Math.floor((prev / 100) * logMessages.length);
        if (logMessages[messageIndex] && !loadingLogs.includes(logMessages[messageIndex])) {
          setLoadingLogs((logs) => [...logs, logMessages[messageIndex]]);
        }

        // Variable speed loading
        const step = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(progressInterval);
  }, [introFinished, loadingLogs]);

  // Social Connection Loading Simulator
  useEffect(() => {
    if (currentTab !== 'connection') {
      setIsConnectingSocials(true);
      setSocialProgress(0);
      setSocialLogs([]);
      return;
    }

    const sLogs = [
      "SYNCHRONIZING ENCRYPTED BEACON PORT...",
      "TUNNELING GITHUB SSH ENVELOPE...",
      "PROXING INSTAGRAM GRAPH ACCESS...",
      "STABILIZING TELEGRAM POINTER SOCKETS...",
      "RETRIEVING ENCRYPTED ASSETS FROM SERVER..."
    ];

    let currentL = 0;
    const interval = setInterval(() => {
      setSocialProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsConnectingSocials(false);
          }, 500);
          return 100;
        }

        // Add step logs
        const logPos = Math.floor((prev / 100) * sLogs.length);
        if (sLogs[logPos] && !socialLogs.includes(sLogs[logPos])) {
          setSocialLogs(l => [...l, sLogs[logPos]]);
        }
        
        return prev + 6; // reaches 100 in ~1.6s, let's adjust step for nice 5 seconds feel!
      });
    }, 150); // total 2.5 seconds, let's make it a bit faster for user convenience while keeping retro vibe!

    return () => clearInterval(interval);
  }, [currentTab]);

  // Audio Playback synchronization
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false); // Handle autoplay block
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  // Sync Volume level
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const skipTrack = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    }
    setIsPlaying(true);
  };

  // Safe Inside-app Link Inspector handler (prevents blank/tab hijack)
  const handleSecureLinkClick = (url: string, title: string) => {
    setSimulatedBrowserUrl(url);
    setSimulatedBrowserTitle(title);
  };

  // Standalone HTML Generator Download Code
  const downloadStandaloneHTML = () => {
    const htmlCode = generateSingleFileHTMLString();
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'NesiNezz_Portfolio_Standalone.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(fileUrl);
  };

  return (
    <div className="min-h-screen bg-[#03070d] text-slate-100 font-sans antialiased selection:bg-[#06e3ff]/30 selection:text-white relative overflow-x-hidden">
      
      {/* HTML Audio element */}
      <audio
        ref={audioRef}
        src={PLAYLIST[currentTrackIndex].url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => skipTrack('next')}
      />

      {/* Background cyber grid layout */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1d30_1px,transparent_1px),linear-gradient(to_bottom,#0c1d30_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Cybernetic matrix code rain simulation floating backgrounds */}
      {currentTab === 'home' && (
        <div className="absolute inset-0 flex flex-wrap gap-4 p-4 overflow-hidden opacity-5 pointer-events-none select-none text-[9px] font-mono leading-none text-[#06e3ff]">
          {bgGridCells.map((seg, idx) => (
            <span key={idx} className="animate-pulse" style={{ animationDelay: `${idx * 0.15}s` }}>
              [SEC_DIR_{seg}]
            </span>
          ))}
        </div>
      )}

      {/* Intro decrypted safe access sequence screen */}
      <AnimatePresence>
        {!introFinished && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-[#020509] z-50 flex flex-col justify-center items-center px-4 md:px-12"
          >
            {/* FLOODING Retrospective matrix backgrounds */}
            <div className="absolute inset-0 overflow-hidden opacity-25 grid grid-cols-6 md:grid-cols-12 gap-2 text-center text-[10px] font-mono text-[#06e3ff]/70 py-4 select-none pointer-events-none">
              {Array.from({ length: 144 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`transition-all duration-300 ${loadingPercent > (i % 12) * 8 ? "opacity-100 text-[#06e3ff]" : "opacity-10"}`}
                >
                  {(i * 35).toString(16).toUpperCase()}_DB
                </div>
              ))}
            </div>

            {/* Glowing Golden Secure HUD Cage */}
            <div className="relative max-w-2xl w-full p-8 rounded-lg bg-neutral-950/95 border border-[#06e3ff]/40 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
              {/* Gold corners */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-amber-400 rounded-tl" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-amber-400 rounded-tr" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-amber-400 rounded-bl" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-amber-400 rounded-br" />

              <div className="flex items-center gap-3 mb-6 text-[#06e3ff]">
                <Cpu className="w-8 h-8 animate-spin-slow text-amber-400" />
                <h1 className="text-xl md:text-2xl font-mono tracking-widest uppercase font-bold">
                  DATABASE PORT KEY
                </h1>
              </div>

              {/* Progress counter */}
              <div className="border border-white/10 rounded p-4 bg-black/40 font-mono text-sm tracking-wide text-cyan-300 h-48 overflow-y-auto mb-6 scrollbar-thin">
                {loadingLogs.map((log, i) => (
                  <div key={i} className="mb-2 flex items-center gap-2">
                    <span className="text-amber-400 text-xs">▶</span> {log}
                  </div>
                ))}
                {loadingPercent < 100 && (
                  <div className="animate-pulse text-neutral-400">LOADING PACKET RECOVERY SECTIONS...</div>
                )}
                {accessGranted && (
                  <div className="text-amber-400 font-bold tracking-widest text-center mt-3 text-lg py-1 border-y border-amber-400/30 animate-bounce">
                    ◆ ENTRANCE INTEGRITY FULLY CONFIRMED ◆
                  </div>
                )}
              </div>

              {/* Loading Bar with 40% Opacity table row tracks */}
              <div className="w-full bg-[#0d1c30] h-6 rounded-sm border border-neutral-800 relative overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-full transition-all duration-150 relative"
                  style={{ width: `${loadingPercent}%` }}
                >
                  {/* Cyber matrix line sweeping */}
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-shimmer" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white font-semibold">
                  DECRYPTION PROGRESS: {loadingPercent}%
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 text-[10px] font-mono text-neutral-500">
                <span>PORT: 3000 // DEPLOYMENT ACTIVE</span>
                <button 
                  onClick={() => {
                    setIntroFinished(true);
                    sessionStorage.setItem('nesinezz_db_entered', 'true');
                  }}
                  className="text-[#06e3ff] hover:text-white border border-[#06e3ff]/30 px-3 py-1 rounded bg-cyan-950/30 hover:bg-cyan-500/20 transition-all font-semibold"
                >
                  BYPASS PROTOCOLS
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Fullscreen Dashboard Grid UI */}
      <div className="max-w-7xl mx-auto p-3 md:p-6 min-h-screen flex flex-col justify-between gap-4">
        
        {/* TOP GLOWING HEADER */}
        <header className="relative w-full border border-cyan-500/30 rounded-lg p-3 md:p-4 bg-neutral-950/40 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.1)] flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Gold corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-400" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-400" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400" />

          {/* Site Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-cyan-950/50 border border-cyan-400/50 flex items-center justify-center animate-pulse">
              <Terminal className="text-[#06e3ff] w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm md:text-base font-mono font-bold text-white tracking-widest uppercase">
                NesiNezz's Website <span className="text-[#06e3ff]">connection</span>
              </h1>
              <p className="text-[10px] text-cyan-400/80 font-mono tracking-tight flex items-center gap-1.5 uppercase">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping-slow" />
                Retro Terminal Matrix // Safe Mode Ingress
              </p>
            </div>
          </div>

          {/* CUSTOM HIGH FIDELITY MUSIC PLAYER - Theme aligned */}
          <div className="flex flex-col md:flex-row items-center gap-4 bg-neutral-900/60 p-2 md:p-3 rounded-md border border-white/10 max-w-full md:max-w-md w-full md:w-auto">
            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <div className="h-9 w-9 bg-cyan-950/40 flex items-center justify-center rounded border border-[#06e3ff]/30 text-cyan-300 relative">
                {isPlaying ? (
                  <Music className="w-5 h-5 text-[#06e3ff] animate-bounce-slow" />
                ) : (
                  <Music className="w-5 h-5 text-neutral-500" />
                )}
                {/* Micro animation for visualizer */}
                {isPlaying && (
                  <div className="absolute right-1 bottom-1 flex gap-0.5 items-end h-3">
                    <span className="w-0.5 bg-[#06e3ff] h-2.5 animate-[pulse_0.6s_infinite_alternate]" />
                    <span className="w-0.5 bg-[#06e3ff] h-1.5 animate-[pulse_0.4s_infinite_alternate]" />
                    <span className="w-0.5 bg-[#06e3ff] h-2 animate-[pulse_0.5s_infinite_alternate]" />
                  </div>
                )}
              </div>
              
              <div className="overflow-hidden min-w-[120px] max-w-[150px]">
                <div className="text-[10px] text-neutral-400 font-mono">RETRO PLAYING:</div>
                <div className="text-xs font-semibold text-white truncate font-mono tracking-tight animate-pulse-slow">
                  {PLAYLIST[currentTrackIndex].title}
                </div>
              </div>
            </div>

            {/* Media controllers */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => skipTrack('prev')} 
                  className="p-1 hover:text-[#06e3ff] hover:bg-cyan-500/10 rounded transition text-neutral-400"
                  title="Previous track"
                >
                  ⏮
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-full bg-cyan-500/20 text-[#06e3ff] hover:bg-cyan-500/40 border border-[#06e3ff]/40 transition" 
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>
                <button 
                  onClick={() => skipTrack('next')} 
                  className="p-1 hover:text-[#06e3ff] hover:bg-cyan-500/10 rounded transition text-neutral-400"
                  title="Next track"
                >
                  ⏭
                </button>
              </div>

              {/* Volume Slider Cyan Theme Styled */}
              <div className="flex items-center gap-1.5 px-1">
                <button onClick={toggleMute} className="text-neutral-400 hover:text-white transition">
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#06e3ff]" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 md:w-20 h-1 bg-neutral-950 rounded-lg appearance-none cursor-pointer accent-[#06e3ff] border border-white/10"
                />
              </div>
            </div>
          </div>

          {/* WIB Clock Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/40 border border-white/10 font-mono text-xs text-white">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="tracking-widest">{realTimeClock || "LOADING TIME..."}</span>
          </div>
        </header>

        {/* CORE LAYOUT WITH TABS */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
          
          {/* NAVIGATION TAB CONTROLLER BAR */}
          <nav className="col-span-1 lg:col-span-3 flex lg:flex-col flex-wrap lg:flex-nowrap gap-2 justify-between lg:justify-start">
            <button
              onClick={() => { setCurrentTab('home'); setSelectedFriend(null); }}
              className={`flex-1 lg:flex-initial flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg font-mono text-xs uppercase tracking-widest border transition-all duration-300 ${
                currentTab === 'home'
                  ? 'bg-cyan-950/40 border-[#06e3ff] text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'bg-neutral-950/30 border-white/10 text-neutral-400 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/10'
              }`}
            >
              <Compass className={`w-4 h-4 ${currentTab === 'home' ? 'text-[#06e3ff]' : ''}`} />
              <span>[01] Home</span>
            </button>

            <button
              onClick={() => { setCurrentTab('friendlist'); setSelectedFriend(null); }}
              className={`flex-1 lg:flex-initial flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg font-mono text-xs uppercase tracking-widest border transition-all duration-300 ${
                currentTab === 'friendlist'
                  ? 'bg-cyan-950/40 border-[#06e3ff] text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'bg-neutral-950/30 border-white/10 text-neutral-400 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/10'
              }`}
            >
              <Users className={`w-4 h-4 ${currentTab === 'friendlist' ? 'text-amber-400' : ''}`} />
              <span>[02] Friendlist</span>
            </button>

            <button
              onClick={() => { setCurrentTab('connection'); setSelectedFriend(null); }}
              className={`flex-1 lg:flex-initial flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg font-mono text-xs uppercase tracking-widest border transition-all duration-300 ${
                currentTab === 'connection'
                  ? 'bg-cyan-950/40 border-[#06e3ff] text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'bg-neutral-950/30 border-white/10 text-neutral-400 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/10'
              }`}
            >
              <Radio className={`w-4 h-4 ${currentTab === 'connection' ? 'text-[#06e3ff]' : ''}`} />
              <span>[03] Connection</span>
            </button>

            <button
              onClick={() => { setCurrentTab('profile'); setSelectedFriend(null); }}
              className={`flex-1 lg:flex-initial flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg font-mono text-xs uppercase tracking-widest border transition-all duration-300 ${
                currentTab === 'profile'
                  ? 'bg-cyan-950/40 border-[#06e3ff] text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'bg-neutral-950/30 border-white/10 text-neutral-400 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/10'
              }`}
            >
              <User className={`w-4 h-4 ${currentTab === 'profile' ? 'text-pink-400' : ''}`} />
              <span>[04] Profile</span>
            </button>

            {/* Quick Specs HUD panel */}
            <div className="hidden lg:block border border-white/10 rounded-lg p-3 bg-neutral-950/20 font-mono text-[10px] text-neutral-400 space-y-1.5 mt-auto">
              <span className="text-[#06e3ff] font-bold block border-b border-white/10 pb-1">DATABASE METRIC:</span>
              <div>PROTOC-CORE: ACTIVE</div>
              <div>INGRESS AGENT: GREY_WOLF</div>
              <div>SESSION STATE: SECURE</div>
              <div>HOST PORT: 3000</div>
              <div className="pt-2">
                <button
                  onClick={downloadStandaloneHTML}
                  className="w-full flex items-center justify-center gap-1 border border-amber-400/50 hover:border-amber-400 text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 px-2 py-1.5 rounded transition text-[9px] font-semibold tracking-wider font-mono"
                >
                  <Download className="w-3 h-3" /> EXPORT FULL HTML
                </button>
              </div>
            </div>
          </nav>

          {/* CENTRAL CONTENTS DISPLAY CAPSULE */}
          <section className="col-span-1 lg:col-span-9 relative border border-white/15 rounded-lg p-4 md:p-6 bg-neutral-950/30 backdrop-blur-md overflow-y-auto max-h-[80vh] scrollbar-thin">
            {/* Shiny Golden Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-400" />

            <AnimatePresence mode="wait">
              
              {/* TAB 1: HOME (No intro re-run after initial session) */}
              {currentTab === 'home' && (
                <motion.div
                  key="tab-home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="border-b border-cyan-500/20 pb-3 flex items-center gap-2">
                    <Compass className="text-[#06e3ff] w-5 h-5 animate-spin-slow" />
                    <h2 className="text-lg md:text-xl font-mono uppercase font-semibold text-white tracking-widest">
                      MAIN RETRO DATA MATRIX
                    </h2>
                  </div>

                  {/* Tentang Website Card (with 40% Opacity table row tracks) */}
                  <div className="p-4 rounded bg-[#091524]/40 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)] relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-400" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-400" />
                    <span className="text-[10px] font-mono text-amber-400 block mb-1">DATA//ABOUT_PORTFOLIO</span>
                    <h3 className="text-base font-semibold text-white font-mono mb-2">Tentang Website Ini</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Selamat datang di sistem database terpadu <strong className="text-white">NesiNezz</strong>. Web ini dirancang khusus untuk memetakan portfolio pribadi, relasi, persahabatan, media sosial terpantau, serta mengintegrasikan modul program gray hat dan digital assets. Dirancang responsif penuh mulai dari layar handphone hingga desktop laptop Anda.
                    </p>
                  </div>

                  {/* Two Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Contributor Section */}
                    <div className="p-4 rounded bg-neutral-900/40 border border-white/10 relative">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-400" />
                      <span className="text-[10px] font-mono text-cyan-400 block mb-1">DATA//CONTRIBUTORS</span>
                      <h3 className="text-sm font-semibold text-white font-mono mb-3">Kontributor List</h3>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center bg-white/[0.04] p-2 rounded">
                          <span className="text-[#06e3ff] font-mono font-medium">NesiNezz</span>
                          <span className="text-neutral-400 font-mono">Owner & UI Specialist</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/[0.04] p-2 rounded">
                          <span className="text-amber-300 font-mono font-medium">DeepFox</span>
                          <span className="text-neutral-400 font-mono">Compiler Assistant</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/[0.04] p-2 rounded">
                          <span className="text-pink-400 font-mono font-medium">LumiLeopard</span>
                          <span className="text-neutral-400 font-mono">Avatar Concept Artist</span>
                        </div>
                      </div>
                    </div>

                    {/* Software Section */}
                    <div className="p-4 rounded bg-[#091524]/40 border border-[#06e3ff]/20 relative">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-400" />
                      <span className="text-[10px] font-mono text-cyan-400 block mb-1">DATA//SOFTWARE_ACTIVE</span>
                      <h3 className="text-sm font-semibold text-white font-mono mb-3">Software & Custom Utility</h3>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center bg-white/[0.03] p-2 rounded border border-white/5">
                          <span className="text-white font-mono font-medium">WolfShell HUD v2</span>
                          <span className="text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded text-[9px] uppercase">Stable</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/[0.03] p-2 rounded border border-white/5">
                          <span className="text-white font-mono font-medium">GreyPort decrypted Engine</span>
                          <span className="text-amber-400 font-mono bg-amber-500/10 px-1.5 py-0.5 rounded text-[9px] uppercase">Active</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/[0.03] p-2 rounded border border-white/5">
                          <span className="text-white font-mono font-medium">Secure Tunnel Ingress (Express)</span>
                          <span className="text-[#06e3ff] font-mono bg-cyan-500/10 px-1.5 py-0.5 rounded text-[9px] uppercase">Proxy</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Horizontal Grid */}
                  <div className="p-4 rounded bg-neutral-900/40 border border-white/10 relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-400" />
                    <span className="text-[10px] font-mono text-amber-400 block mb-1">DATA//TECH_STACK</span>
                    <h3 className="text-sm font-semibold text-white font-mono mb-3">Core Technology Stack</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2 rounded bg-black/40 border border-white/10 flex flex-col items-center">
                        <span className="text-amber-300 font-mono font-semibold">TYPESCRIPT</span>
                        <span className="text-[9px] text-neutral-400 mt-1">Robust Types</span>
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-cyan-500/20 flex flex-col items-center">
                        <span className="text-cyan-400 font-mono font-semibold">REACT/VITE</span>
                        <span className="text-[9px] text-neutral-400 mt-1">Reactive DOM</span>
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-pink-500/20 flex flex-col items-center">
                        <span className="text-pink-400 font-mono font-semibold">TAILWIND CSS</span>
                        <span className="text-[9px] text-neutral-400 mt-1">Utility Native</span>
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-white/10 flex flex-col items-center">
                        <span className="text-white font-mono font-semibold">ESBUILD</span>
                        <span className="text-[9px] text-neutral-400 mt-1">Fast Bun</span>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Accordion Section */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-white font-mono tracking-wider flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-amber-400" />
                      FREQUENTLY ASKED QUESTIONS [X_FAQ]
                    </h3>
                    <div className="space-y-2">
                      {FAQS.map((faq, idx) => (
                        <div key={idx} className="border border-white/10 rounded bg-[#0a1424]/20 overflow-hidden">
                          <button
                            onClick={() => setFaqExpanded(faqExpanded === idx ? null : idx)}
                            className="w-full text-left p-3 flex justify-between items-center text-xs font-mono font-semibold text-slate-200 hover:bg-[#06e3ff]/10 hover:text-white transition-all"
                          >
                            <span>[Q] {faq.q}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${faqExpanded === idx ? 'rotate-180 text-amber-400' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {faqExpanded === idx && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-3 bg-black/35 border-t border-white/5 text-xs text-slate-300 leading-relaxed">
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: FRIENDLIST (Clicking triggers beautiful expand animation to display traits & links) */}
              {currentTab === 'friendlist' && (
                <motion.div
                  key="tab-friendlist"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="border-b border-cyan-500/20 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="text-amber-400 w-5 h-5" />
                      <h2 className="text-lg md:text-xl font-mono uppercase font-semibold text-white tracking-widest">
                        SECURE RELATION NODES
                      </h2>
                    </div>
                    {selectedFriend && (
                      <button 
                        onClick={() => setSelectedFriend(null)}
                        className="text-xs font-mono text-cyan-400 border border-cyan-500/30 px-2 py-1 rounded bg-cyan-950/20 hover:bg-cyan-400 hover:text-black transition"
                      >
                        BACK TO HUB
                      </button>
                    )}
                  </div>

                  {/* Main Grid structure of Friends */}
                  <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {FRIENDS_LIST.map((friend) => {
                        // Dynamically resolve borders & neon tags
                        const isSahabat = friend.type === 'sahabat';
                        const isPacar = friend.type === 'pacar';
                        const isSelected = selectedFriend?.id === friend.id;
                        
                        let cardColor = isSelected 
                          ? "border-cyan-400 bg-neutral-900 border-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] col-span-1 md:col-span-2"
                          : "border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)] bg-neutral-900/40 col-span-1";
                        let bannerText = "CLASSIFIED_CONTACT";
                        let bannerColor = "text-cyan-400 bg-cyan-950/50";
                        
                        if (isSahabat) {
                          cardColor = isSelected
                            ? "border-amber-400 bg-neutral-900 border-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] col-span-1 md:col-span-2"
                            : "border-amber-400/50 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] bg-[#1e170a]/10 col-span-1";
                          bannerText = "BEST_FRIEND (SAHABAT)";
                          bannerColor = "text-amber-400 bg-amber-950/40";
                        } else if (isPacar) {
                          cardColor = isSelected
                            ? "border-pink-400 bg-neutral-900 border-2 shadow-[0_0_30px_rgba(236,72,153,0.45)] col-span-1 md:col-span-2"
                            : "border-pink-500/50 hover:border-pink-400 shadow-[0_0_20px_0_rgba(236,72,153,0.25)] bg-[linear-gradient(to_bottom_right,rgba(244,63,94,0.05),rgba(236,72,153,0.05))] col-span-1";
                          bannerText = "PARTNER RELATIONSHIP";
                          bannerColor = "text-pink-400 bg-pink-950/30";
                        }

                        return (
                          <motion.div
                            key={friend.id}
                            layout="position"
                            onClick={() => setSelectedFriend(isSelected ? null : friend)}
                            className={`p-4 rounded-lg border relative cursor-pointer group select-none transition-all duration-300 ${cardColor}`}
                          >
                            {/* Shiny Gold corner indicator elements */}
                            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-400" />
                            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-400" />
                            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-400" />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-400" />

                            <div className="flex justify-between items-start mb-2.5">
                              <span className={`text-[9px] font-mono tracking-tight px-1.5 py-0.5 rounded ${bannerColor}`}>
                                {bannerText}
                              </span>
                              {isPacar && <Heart className="w-3.5 h-3.5 text-pink-500 animate-pulse fill-current" />}
                            </div>

                            <div className="flex gap-3 items-center">
                              {/* Avatar representation sphere */}
                              <div className={`h-11 w-11 rounded-full border border-white/10 flex items-center justify-center font-mono font-bold text-xs capitalize text-white ${friend.avatarColor}`}>
                                {friend.name.slice(0, 2)}
                              </div>

                              <div className="flex-1">
                                <h3 className="text-white font-bold font-mono tracking-wide flex items-center gap-1.5">
                                  {friend.name}
                                  {isSahabat && <Sparkles className="w-3 text-amber-400" />}
                                </h3>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  Spesies: <span className="text-slate-200">{friend.species}</span>
                                </div>
                              </div>
                            </div>

                            {/* Short Preview (on collapsed mode) */}
                            {!isSelected && (
                              <>
                                <p className="text-[11px] text-slate-300 mt-3 line-clamp-2 leading-relaxed bg-black/20 p-2 rounded border border-white/5 font-mono">
                                  {friend.traits}
                                </p>
                                <div className="mt-3.5 flex justify-end text-[10px] font-mono text-[#06e3ff] opacity-80 group-hover:opacity-100 transition-all">
                                  <span>EXPAND SYSTEM CARD ▼</span>
                                </div>
                              </>
                            )}

                            {/* Expanded Details Section (In-place dropdown style) */}
                            <AnimatePresence>
                              {isSelected && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden mt-4 pt-4 border-t border-white/10 space-y-4"
                                >
                                  <div>
                                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">CIRI-CIRI LENGKAP:</span>
                                    <p className="text-xs text-amber-300/90 font-mono bg-amber-950/25 p-2.5 rounded border border-amber-500/20 leading-relaxed">
                                      "{friend.traits}"
                                    </p>
                                  </div>

                                  <div>
                                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">PROG_BIO // ARSIP DATABASE:</span>
                                    <p className="text-xs text-slate-300 leading-relaxed bg-[#0c182c]/30 p-3 rounded border border-white/5 font-mono">
                                      {friend.detailedBio}
                                    </p>
                                  </div>

                                  {/* Direct external link integrations inside card */}
                                  <div>
                                    <span className="text-[9px] font-mono text-[#06e3ff] uppercase tracking-wider block mb-2">INTEGRASI DIRECTORY LINK:</span>
                                    <div className="flex flex-wrap gap-2">
                                      {friend.socials.map((soc, idx) => (
                                        <button
                                          key={idx}
                                          onClick={(e) => {
                                            e.stopPropagation(); // Avoid parent accordion closing
                                            handleSecureLinkClick(soc.url, `${friend.name} - ${soc.label}`);
                                          }}
                                          className={`px-3 py-1.5 rounded text-xs font-mono font-medium text-white ${soc.color} hover:contrast-125 transition flex items-center gap-1.5`}
                                        >
                                          <ExternalLink className="w-3 h-3" />
                                          <span>{soc.label}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[9px] font-mono text-neutral-500">
                                    <span>SESSION DATA: {friend.id.toUpperCase()}</span>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation(); // Avoid double toggling
                                        setSelectedFriend(null);
                                      }}
                                      className="text-white hover:text-rose-400 font-semibold transition"
                                    >
                                      ◀ COLLAPSE DETAILS
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: CONNECTION (Loads secure social database inside app for 5-7 seconds before popping up cards) */}
              {currentTab === 'connection' && (
                <motion.div
                  key="tab-connection"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="border-b border-cyan-500/20 pb-3 flex items-center gap-2">
                    <Radio className="text-[#06e3ff] w-5 h-5" />
                    <h2 className="text-lg md:text-xl font-mono uppercase font-semibold text-white tracking-widest">
                      COMMUNICATIONS CORRIDOR
                    </h2>
                  </div>

                  {/* Connecting Network Screen (5-7 seconds simulated progress block) */}
                  {isConnectingSocials ? (
                    <div className="p-8 rounded-lg border border-cyan-400/40 bg-[#040c16]/90 relative flex flex-col items-center justify-center min-h-[300px]">
                      {/* Golden decorative bracket */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400" />

                      <RefreshCw className="w-10 h-10 text-[#06e3ff] animate-spin mb-4" />
                      
                      <div className="font-mono text-xs text-center uppercase tracking-widest text-[#06e3ff] mb-2 font-bold animate-pulse">
                        CONNECTING TO SOCIAL MEDIA CHANNELS...
                      </div>

                      {/* Micro simulator logs */}
                      <div className="w-full max-w-md bg-black/60 border border-white/10 rounded p-3 h-24 overflow-y-hidden font-mono text-[10px] text-slate-400 mb-4 select-none">
                        {socialLogs.map((log, idx) => (
                          <div key={idx} className="mb-1 text-[#06e3ff]/80">
                            {">>> "}{log}
                          </div>
                        ))}
                        <div className="animate-pulse text-emerald-400/90">WIB GRID SYNCHRONIZING SECURE TUNNELS...</div>
                      </div>

                      {/* Loading completion bar */}
                      <div className="w-64 h-1.5 bg-neutral-900 border border-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#06e3ff] transition-all duration-150"
                          style={{ width: `${socialProgress}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-cyan-400 mt-2">{socialProgress}% RESOLVING</span>

                      <button
                        onClick={() => setIsConnectingSocials(false)}
                        className="mt-4 text-[10px] font-mono border border-cyan-500/20 px-2 py-1 rounded bg-[#011425] text-[#06e3ff]/70 hover:text-white"
                      >
                        Bypass Connection Block
                      </button>
                    </div>
                  ) : (
                    /* DYNAMIC CARDS POPPING FROM THE SIDE after transition completes */
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.15
                          }
                        }
                      }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {OWNER_SOCIALS.map((soc, idx) => {
                        const Icon = soc.icon;
                        return (
                          <motion.div
                            key={idx}
                            variants={{
                              hidden: { opacity: 0, x: -30 },
                              visible: { opacity: 1, x: 0 }
                            }}
                            transition={{ type: 'spring', stiffness: 100 }}
                            onClick={() => handleSecureLinkClick(soc.url, soc.name)}
                            className={`p-4 rounded-lg bg-gradient-to-br ${soc.color} border border-white/10 shadow hover:border-cyan-500/50 cursor-pointer select-none relative group overflow-hidden`}
                          >
                            {/* Inner ambient shine glow */}
                            <div className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_100%)] pointer-events-none" />

                            <div className="flex justify-between items-center mb-3">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-full bg-white/10 flex items-center justify-center">
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-white font-mono tracking-wide text-xs">
                                  {soc.name}
                                </h3>
                              </div>
                              <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white transition" />
                            </div>

                            <div className="text-[11px] font-mono text-cyan-200 uppercase bg-black/35 px-2 py-1 rounded select-all mb-2.5 inline-block border border-white/10">
                              @{soc.username}
                            </div>

                            <p className="text-xs text-slate-200/90 leading-relaxed font-mono">
                              {soc.description}
                            </p>

                            <div className="mt-3 text-[10px] font-mono text-[#06e3ff] text-right pointer-events-none">
                              STABLE SECURE TUNNEL ▶
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* TAB 4: PROFILE STATUS (Shows GitHub bio grid summary & table representing all required roles in custom sizes) */}
              {currentTab === 'profile' && (
                <motion.div
                  key="tab-profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="border-b border-cyan-500/20 pb-3 flex items-center gap-2">
                    <User className="text-[#06e3ff] w-5 h-5" />
                    <h2 className="text-lg md:text-xl font-mono uppercase font-semibold text-white tracking-widest">
                      BIOMETRIC PORTFOLIO OWNER
                    </h2>
                  </div>

                  {/* Primary Profile Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                    
                    {/* LEFT AVATAR CAPTURE (Uses beautiful generated Cyber Wolf) */}
                    <div className="md:col-span-4 p-5 rounded-lg border border-cyan-500/30 bg-[#091524]/50 relative flex flex-col justify-between items-center text-center">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-400" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-400" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-amber-400" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-400" />

                      {/* Beautiful grey furry wolf profile picture inside custom outer framing */}
                      <div className="relative">
                        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-cyan-400/50 p-1 bg-black overflow-hidden relative shadow-[0_0_20px_rgba(6,182,212,0.3)] select-none">
                          <img 
                            src={avatarImg} 
                            alt="NesiNezz Cyber Furry Avatar" 
                            className="w-full h-full rounded-full object-cover"
                            referrerPolicy="no-referrer"
                            // Fallback handle if local image bundle has issues
                            onError={(e) => {
                              e.currentTarget.src = "https://picsum.photos/seed/nesinezz/300/300";
                            }}
                          />
                        </div>
                        {/* Cutest furry indicator label */}
                        <div className="absolute -bottom-1 bg-amber-400 text-black font-bold font-mono text-[9px] px-2 py-0.5 rounded-full uppercase shadow">
                          ▲ WOLF_EARS READY ▲
                        </div>
                      </div>

                      <div className="mt-4 space-y-1 w-full">
                        <h3 className="font-mono font-bold text-white tracking-widest text-base">NESINEZZ</h3>
                        <div className="text-[10px] text-[#06e3ff] font-mono uppercase font-semibold">Grey Wolf Furry Tech Hero</div>
                        <div className="text-[10px] text-neutral-400 font-mono select-all pt-1 bg-black/40 p-1.5 rounded border border-white/5">
                          IP: 192.168.10.254 (SANDBOX)
                        </div>
                      </div>
                    </div>

                    {/* RIGHT GITHUB-LIKE COMMUNICATOR INDEX */}
                    <div className="md:col-span-8 p-5 rounded-lg border border-white/10 bg-neutral-900/40 relative flex flex-col justify-between space-y-4">
                      {/* Golden L Corners */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-400" />
                      
                      <div className="space-y-3">
                        <span className="text-[9px] font-mono text-amber-400 block p-1 border-b border-white/10 mb-1">DATA//REGISTRATION_CARD</span>
                        <h4 className="text-sm font-semibold font-mono text-white">Identitas & Kontak Koordinat</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                          <div className="p-2 rounded bg-black/40 border border-white/5">
                            <span className="text-neutral-400 block text-[9.5px]">TELEPHONE COORDINATE:</span>
                            <span className="text-cyan-300 font-bold tracking-wider">+62xxxxxxxxx</span>
                          </div>
                          <div className="p-2 rounded bg-black/40 border border-white/5">
                            <span className="text-neutral-400 block text-[9.5px]">SECURE TELE-EMAIL:</span>
                            <span className="text-indigo-300 font-bold tracking-wide">Nesxxxxx@gmail.com</span>
                          </div>
                        </div>

                        <div className="p-3 rounded bg-black/50 border border-cyan-500/10 text-xs text-slate-300 leading-relaxed font-mono">
                          <span className="text-[#06e3ff] font-bold block mb-1">{">>> "}STABLE INGRESS STATS:</span>
                          Saya berfokus pada audit fungsionalitas sistem web, penulisan script custom, pengorganisasian komunitas furry regional, serta perlindungan privasi data jaringan di bawah payung Grey Hat.
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">WIB_REG_STABLE</span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">FURSUITERS_GUILD</span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-400/20">ADMIN_MASTER</span>
                      </div>
                    </div>
                  </div>

                  {/* ADAPTIVE SIZE ROLES TABLE (Specifically tracking Owner, Programmer, Editor, Fursuiters, Administrator, Web Development, Gray Hat) */}
                  <div className="p-4 rounded-lg border border-white/15 bg-[#040e1b]/40 relative">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400" />
                    <span className="text-[10px] font-mono text-amber-400 block mb-1">DATA//ROLES_INDEX</span>
                    <h3 className="text-sm font-semibold text-white font-mono mb-3">Tabel Matriks Hak Akses Dan Peran (Roles Matrix)</h3>

                    {/* Highly responsive adaptive overflow table containing translucent 40% bar rows */}
                    <div className="overflow-x-auto w-full scrollbar-thin">
                      <table className="w-full text-xs font-mono border-collapse min-w-[500px]">
                        <thead>
                          <tr className="bg-white/10 text-[#06e3ff] text-left border-b border-white/20">
                            <th className="p-2.5 font-semibold text-[10px]">ROLE NAME</th>
                            <th className="p-2.5 font-semibold text-[10px]">CLEARANCE LEVEL</th>
                            <th className="p-2.5 font-semibold text-[10px]">CORE SPECIALTY AREA</th>
                            <th className="p-2.5 font-semibold text-[10px]">SYSTEM COVERAGE</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {ROLES_LIST.map((row, idx) => (
                            <tr 
                              key={idx} 
                              className={`hover:bg-cyan-500/10 transition-all ${
                                idx % 2 === 0 ? "bg-white/[0.04]" : "bg-transparent"
                              }`}
                            >
                              <td className="p-2.5 font-bold text-white text-[11px] border-r border-white/5">
                                ◆ {row.role}
                              </td>
                              <td className="p-2.5 text-cyan-300 font-semibold border-r border-white/5">
                                {row.level}
                              </td>
                              <td className="p-2.5 text-slate-300 border-r border-white/5">
                                {row.specialty}
                              </td>
                              <td className="p-2.5 text-amber-400 font-bold">
                                {row.systemCoverage}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[9px] font-mono text-neutral-400 mt-2.5">
                      * Setiap peran otomatis disinkronkan ke layer server port 3000 luring & daring secara asinkron.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </main>

        {/* BOTTOM GLOWING FOOTER */}
        <footer className="relative w-full border border-white/10 rounded-lg p-3 bg-neutral-950/40 text-center font-mono text-[10px] text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-400" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-400" />
          
          <div className="text-left">
            <span>© 2026 NESINEZZ DATABASE HUB • SECURED INGRESS</span>
            <span className="block text-[8px] text-neutral-500 font-semibold">ALL CODES EXPORT-READY</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={downloadStandaloneHTML}
              className="px-3 py-1.5 rounded border border-[#06e3ff]/30 text-[#06e3ff] hover:bg-cyan-500/10 cursor-pointer transition font-bold text-[9px] flex items-center gap-1 uppercase tracking-widest bg-cyan-950/20"
            >
              <Download className="w-3 h-3" /> Download Standalone HTML
            </button>
            <div className="text-[9px] bg-white/[0.07] px-2.5 py-1.5 rounded border border-white/10 text-slate-300">
              STATUS: <strong className="text-emerald-400 animate-pulse">● SECURED_200</strong>
            </div>
          </div>
        </footer>
      </div>

      {/* DETAILED SIMULATED BROWSER IN-APP MODAL (Avoids leaving the application/blank windows!) */}
      <AnimatePresence>
        {simulatedBrowserUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/90 z-50 flex items-center justify-center p-3 md:p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="max-w-3xl w-full border border-cyan-400 bg-[#050e18] p-4 md:p-6 rounded-lg relative flex flex-col shadow-[0_0_50px_rgba(6,182,212,0.4)]"
            >
              {/* Gold borders */}
              <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-amber-400 rounded-tl" />
              <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-amber-400 rounded-tr" />
              <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-amber-400 rounded-bl" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-amber-400 rounded-br" />

              <div className="flex justify-between items-center pb-3 border-b border-cyan-500/30 mb-4 bg-black/40 p-2 rounded">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-500 block" />
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-400 block" />
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 block" />
                  </div>
                  <span className="font-mono text-xs text-white uppercase tracking-wider ml-1">
                    SECURE RETRO CONNECTION WINDOW
                  </span>
                </div>
                <button
                  onClick={() => setSimulatedBrowserUrl(null)}
                  className="p-1 hover:bg-neutral-800 rounded font-bold text-neutral-400 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Secure sandbox terminal inspector screen */}
              <div className="space-y-4">
                <div className="text-center p-4 bg-[#0a1523] border border-[#06e3ff]/30 rounded flex flex-col items-center">
                  <Terminal className="text-amber-400 w-10 h-10 animate-pulse mb-2" />
                  <h4 className="font-mono font-bold text-white uppercase text-sm tracking-wide">
                    LINK SAFE COUPLING DETECTED
                  </h4>
                  <p className="text-xs text-slate-300 font-mono mt-1.5 max-w-md">
                    Anda sedang membuka tautan eksternal untuk: <strong className="text-[#06e3ff]">{simulatedBrowserTitle}</strong>
                  </p>
                </div>

                {/* Copiable details card */}
                <div className="p-3 rounded bg-black/60 border border-white/10 font-mono text-xs space-y-2 select-all">
                  <div className="text-neutral-400">TARGET_DESTINATION_ADDRESS:</div>
                  <div className="text-[#06e3ff] underline font-semibold select-all break-all">{simulatedBrowserUrl}</div>
                  <div className="text-neutral-500 text-[10px] pt-1 border-t border-white/5">
                    * Gunakan link di bawah ini seketika jika Anda ingin menjelajah di luar sandbox ini secara manual.
                  </div>
                </div>

                {/* Secure warning badge */}
                <div className="p-3 bg-amber-400/10 border border-amber-400/20 rounded flex items-start gap-2.5 text-xs text-amber-300 leading-relaxed">
                  <Info className="w-5 h-5 shrink-0 text-amber-400" />
                  <span>
                    <strong>Pemberitahuan Retrospektif:</strong> Sesuai instruksi keamanan (Aturan 8), web ini mencegah berpindah web secara paksa atau memaksa halaman kosong (blank page). Anda dapat menyalin tautan di atas atau mengklik tombol "Buka Di Tab Baru" di bawah jika Anda memutuskan untuk beralih secara langsung.
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex justify-end gap-3 font-mono text-xs">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(simulatedBrowserUrl);
                    alert("Tautan tujuan berhasil disalin ke clipboard Anda!");
                  }}
                  className="px-4 py-2 border border-white/25 text-slate-300 hover:text-white rounded hover:bg-white/10 transition"
                >
                  [Salin Tautan]
                </button>
                <a
                  href={simulatedBrowserUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-300 text-black hover:contrast-125 rounded hover:bg-[#06e3ff] transition font-bold"
                >
                  [Buka Di Tab Baru]
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// =========================================================================
// HELPER COMPILER: GENERATES THE SINGLE INDEPENDENT OFFLINE STANDALONE HTML
// Contains complete CSS styles, beautiful theme configuration, audio player tracks,
// and React interfaces in a single double-clickable VS Code-ready index.html.
// =========================================================================
function generateSingleFileHTMLString(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NesiNezz's Website connection - Standalone</title>
  <!-- Tailwind CSS v4 CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Font - Inter & Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  
  <style>
    body {
      font-family: 'Inter', 'JetBrains Mono', sans-serif;
      background-color: #03070d;
      color: #cbd5e1;
      margin: 0;
      padding: 0;
    }
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }
    input[type="range"] {
      accent-color: #06e3ff;
    }
    /* Simple retro animations placeholder */
    @keyframes pulse-slow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .animate-pulse-slow {
      animation: pulse-slow 2.5s infinite;
    }
    .scrollbar-thin::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background: rgba(6, 182, 212, 0.4);
      border-radius: 4px;
    }

    /* Fallback styles if Tailwind Play CDN is blocked/offline in browser */
    nav, header, footer, section, main, table, tbody, tr, th, td, div, button {
      box-sizing: border-box;
    }
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .items-center { align-items: center; }
    .justify-between { justify-content: space-between; }
    .gap-2 { gap: 0.5rem; }
    .gap-3 { gap: 0.75rem; }
    .gap-4 { gap: 1rem; }
    .grid { display: grid; }
    .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    .col-span-1 { grid-column: span 1 / span 1; }
    .w-full { width: 100%; }
    .shrink-0 { flex-shrink: 0; }
    
    @media (min-width: 768px) {
      .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .md\:grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
      .md\:flex-row { flex-direction: row; }
      .md\:col-span-2 { grid-column: span 2 / span 2; }
      .md\:col-span-4 { grid-column: span 4 / span 4; }
      .md\:col-span-8 { grid-column: span 8 / span 8; }
    }
    @media (min-width: 1024px) {
      .lg\:grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
      .lg\:col-span-3 { grid-column: span 3 / span 3; }
      .lg\:col-span-9 { grid-column: span 9 / span 9; }
    }
    
    .p-2 { padding: 0.5rem; }
    .p-2\.5 { padding: 0.625rem; }
    .p-3 { padding: 0.75rem; }
    .p-4 { padding: 1rem; }
    .p-5 { padding: 1.25rem; }
    .p-6 { padding: 1.5rem; }
    .pt-1 { padding-top: 0.25rem; }
    .pt-2 { padding-top: 0.5rem; }
    .pt-3 { padding-top: 0.75rem; }
    .pt-4 { padding-top: 1rem; }
    .mt-2 { margin-top: 0.5rem; }
    .mt-4 { margin-top: 1rem; }
    .mb-1 { margin-bottom: 0.25rem; }
    
    .rounded { border-radius: 0.25rem; }
    .rounded-lg { border-radius: 0.5rem; }
    .rounded-full { border-radius: 9999px; }
    .border { border: 1px solid rgba(255, 255, 255, 0.1); }
    
    .bg-neutral-950 { background-color: #0a0a0a; }
    .bg-neutral-950\/80 { background-color: rgba(10, 10, 10, 0.8); }
    .bg-neutral-900 { background-color: #171717; }
    .bg-neutral-900\/40 { background-color: rgba(23, 23, 23, 0.4); }
    .bg-black\/20 { background-color: rgba(0, 0, 0, 0.2); }
    .bg-black\/40 { background-color: rgba(0, 0, 0, 0.4); }
    .bg-cyan-950\/50 { background-color: rgba(8, 47, 55, 0.5); }
    
    .text-white { color: #ffffff; }
    .text-cyan-400 { color: #22d3ee; }
    .text-[#06e3ff] { color: #06e3ff; }
    .text-amber-400 { color: #fbbf24; }
    .text-pink-500 { color: #ec4899; }
    .text-slate-300 { color: #cbd5e1; }
    .text-slate-400 { color: #94a3b8; }
    .text-neutral-400 { color: #a3a3a3; }
    .text-neutral-500 { color: #737373; }
    
    .text-xs { font-size: 0.75rem; }
    .text-sm { font-size: 0.875rem; }
    .text-base { font-size: 1rem; }
    .text-lg { font-size: 1.125rem; }
    .font-bold { font-weight: 700; }
    .uppercase { text-transform: uppercase; }
    .text-center { text-align: center; }
  </style>
</head>
<body class="selection:bg-cyan-500/30 selection:text-white">

  <!-- STANDALONE JS DATABASE CONFIGURATION -->
  <div id="standalone-root" class="min-h-screen relative flex flex-col justify-between max-w-7xl mx-auto p-3 md:p-6 gap-4"></div>

  <!-- React 18 Production Bundle CDN -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

  <script type="text/babel">
    const { useState, useEffect, useRef } = React;

    const PLAYLIST = ${JSON.stringify(PLAYLIST)};
    const FRIENDS_LIST = ${JSON.stringify(FRIENDS_LIST)};
    const OWNER_SOCIALS = [
      { name: "GitHub Repository", username: "NesiNezz", url: "https://github.com/NesiNezz", color: "bg-neutral-800 border-neutral-700", desc: "Explore our open-source cyber projects, terminal widgets, and retro game prototypes." },
      { name: "Instagram Channel", username: "@NesiNezz.fur", url: "https://instagram.com/NesiNezz", color: "bg-pink-900 border-pink-700", desc: "Follow our fluffy developments, convention memories, suits, and daily code logs." },
      { name: "YouTube Workspace", username: "NesiNezz Terminal", url: "https://youtube.com/@NesiNezz", color: "bg-red-950 border-red-800", desc: "Video game development progress, audio synth designs, and gray hat tutorials." },
      { name: "Telegram Terminal", username: "t.me/NesiNezz_Core", url: "https://t.me/NesiNezz", color: "bg-sky-950 border-sky-800", desc: "Secure instant broadcasts, emergency patches, and server telemetry logs." }
    ];
    const ROLES_LIST = ${JSON.stringify(ROLES_LIST)};
    const FAQS = ${JSON.stringify(FAQS)};

    function StandaloneApp() {
      const [introFinished, setIntroFinished] = useState(false);
      const [loadingPercent, setLoadingPercent] = useState(0);
      const [loadingLogs, setLoadingLogs] = useState([]);
      const [accessGranted, setAccessGranted] = useState(false);

      const [isPlaying, setIsPlaying] = useState(false);
      const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
      const [volume, setVolume] = useState(0.5);
      const [isMuted, setIsMuted] = useState(false);

      const [currentTab, setCurrentTab] = useState('home');
      const [realTimeClock, setRealTimeClock] = useState('');
      const [faqExpanded, setFaqExpanded] = useState(null);
      const [selectedFriend, setSelectedFriend] = useState(null);

      const [isConnectingSocials, setIsConnectingSocials] = useState(true);
      const [socialProgress, setSocialProgress] = useState(0);
      const [socialLogs, setSocialLogs] = useState([]);

      const [simulatedBrowserUrl, setSimulatedBrowserUrl] = useState(null);
      const [simulatedBrowserTitle, setSimulatedBrowserTitle] = useState('');

      const audioRef = useRef(null);

      // System Ticking clock
      useEffect(() => {
        const updateClock = () => {
          const now = new Date();
          setRealTimeClock(now.toLocaleDateString('id-ID', {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
          }) + " - " + now.toTimeString().split(' ')[0] + " WIB");
        };
        updateClock();
        const t = setInterval(updateClock, 1000);
        return () => clearInterval(t);
      }, []);

      // Decryption simulation
      useEffect(() => {
        if (introFinished) return;
        const messages = [
          "SYSTEM STANDALONE INGRESS ENGAGED...",
          "BYPASS RECOVERY PROTOCOLS...",
          "VERIFYING CHECKSUM CORES [OK]",
          "DEPLOYING CYBER WOLF SCHEMATICS..."
        ];
        const intv = setInterval(() => {
          setLoadingPercent(prev => {
            if (prev >= 100) {
              clearInterval(intv);
              setAccessGranted(true);
              setTimeout(() => setIntroFinished(true), 1000);
              return 100;
            }
            const logsCount = Math.floor((prev / 100) * messages.length);
            if (messages[logsCount] && !loadingLogs.includes(messages[logsCount])) {
              setLoadingLogs(l => [...l, messages[logsCount]]);
            }
            return prev + 5;
          });
        }, 100);
        return () => clearInterval(intv);
      }, [introFinished, loadingLogs]);

      // Connect channels
      useEffect(() => {
        if (currentTab !== 'connection') {
          setIsConnectingSocials(true);
          setSocialProgress(0);
          setSocialLogs([]);
          return;
        }
        const sLogs = ["CONNECTING BEACONS...", "INTEGRATING API HANDLES [OK]", "PREPARING BRANDING STACKS..."];
        const intv = setInterval(() => {
          setSocialProgress(prev => {
            if (prev >= 100) {
              clearInterval(intv);
              setTimeout(() => setIsConnectingSocials(false), 300);
              return 100;
            }
            const pos = Math.floor((prev / 100) * sLogs.length);
            if (sLogs[pos] && !socialLogs.includes(sLogs[pos])) {
              setSocialLogs(l => [...l, sLogs[pos]]);
            }
            return prev + 10;
          });
        }, 120);
        return () => clearInterval(intv);
      }, [currentTab]);

      // Sync player
      useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = isMuted ? 0 : volume;
          if (isPlaying) {
            audioRef.current.play().catch(() => setIsPlaying(false));
          } else {
            audioRef.current.pause();
          }
        }
      }, [isPlaying, volume, isMuted, currentTrackIndex]);

      return (
        <div className="w-full">
          <audio ref={audioRef} src={PLAYLIST[currentTrackIndex].url} onEnded={() => setCurrentTrackIndex((currentTrackIndex + 1) % PLAYLIST.length)} />

          {!introFinished && (
            <div className="fixed inset-0 bg-[#020509] z-50 flex flex-col justify-center items-center px-4">
              <div className="relative max-w-xl w-full p-6 rounded bg-neutral-950 border border-cyan-500/40 text-center space-y-4">
                <h1 className="text-white font-mono text-lg tracking-widest font-bold">DECRYPTING OFFLINE DATABASE...</h1>
                <div className="h-32 bg-black/50 border border-white/10 rounded p-3 font-mono text-xs text-left text-cyan-400 overflow-y-auto">
                  {loadingLogs.map((log, i) => <div key={i} className="mb-1">▶ {log}</div>)}
                </div>
                <div className="w-full bg-neutral-900 h-4 border border-white/10 rounded">
                  <div class="bg-cyan-400 h-full transition-all duration-100" style={{ width: loadingPercent + "%" }} />
                </div>
                <button onClick={() => setIntroFinished(true)} className="px-3 py-1 border border-cyan-400/50 text-cyan-400 text-xs font-mono rounded hover:bg-cyan-500/20">
                  BYPASS LOADING
                </button>
              </div>
            </div>
          )}

          {/* Site Header */}
          <header className="relative w-full border border-cyan-500/30 rounded-lg p-4 bg-neutral-950/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-cyan-400 text-cyan-400 font-mono text-sm">[NESI_DB]</div>
              <div>
                <h1 className="text-white font-mono font-bold tracking-widest text-sm md:text-base uppercase">NesiNezz's Website <span className="text-cyan-400">connection</span></h1>
                <p className="text-[10px] text-cyan-400/80 font-mono uppercase">Offline Copy // Standalone Client</p>
              </div>
            </div>

            {/* Offline Music controls */}
            <div className="flex items-center gap-3 bg-neutral-900 border border-white/10 p-2 rounded-md">
              <span className="text-[10px] text-neutral-400 font-mono">TRACK:</span>
              <span className="text-xs text-white font-bold font-mono">{PLAYLIST[currentTrackIndex].title}</span>
              <button onClick={() => setIsPlaying(!isPlaying)} className="p-1 px-3.5 rounded bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/40 text-xs font-mono">
                {isPlaying ? "PAUSE" : "PLAY"}
              </button>
              <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} class="w-16 accent-cyan-400" />
            </div>

            <div className="font-mono text-xs text-white bg-black/40 px-3 py-1.5 rounded border border-white/10">
              {realTimeClock || "CLOCK RETRIEVING"}
            </div>
          </header>

          {/* Navigation Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
            <nav className="col-span-1 lg:col-span-3 flex lg:flex-col gap-2">
              <button onClick={() => { setCurrentTab('home'); setSelectedFriend(null); }} className={"w-full py-3 px-4 rounded text-xs font-mono text-left uppercase border " + (currentTab === 'home' ? "bg-cyan-950 border-cyan-400 text-white" : "border-white/10 text-neutral-400")}>
                [01] Home Tab
              </button>
              <button onClick={() => { setCurrentTab('friendlist'); setSelectedFriend(null); }} className={"w-full py-3 px-4 rounded text-xs font-mono text-left uppercase border " + (currentTab === 'friendlist' ? "bg-cyan-950 border-cyan-400 text-white" : "border-white/10 text-neutral-400")}>
                [02] Friendlist Tab
              </button>
              <button onClick={() => { setCurrentTab('connection'); setSelectedFriend(null); }} className={"w-full py-3 px-4 rounded text-xs font-mono text-left uppercase border " + (currentTab === 'connection' ? "bg-cyan-950 border-cyan-400 text-white" : "border-white/10 text-neutral-400")}>
                [03] Connection Tab
              </button>
              <button onClick={() => { setCurrentTab('profile'); setSelectedFriend(null); }} className={"w-full py-3 px-4 rounded text-xs font-mono text-left uppercase border " + (currentTab === 'profile' ? "bg-cyan-950 border-cyan-400 text-white" : "border-white/10 text-neutral-400")}>
                [04] Profile Tab
              </button>
            </nav>

            {/* Core Box context */}
            <div className="col-span-1 lg:col-span-9 bg-neutral-950/40 border border-white/10 p-5 rounded-lg min-h-[400px]">
              
              {currentTab === 'home' && (
                <div className="space-y-4">
                  <h2 className="font-mono text-white text-base">MAIN RETRO MATRIX ABOUT</h2>
                  <div className="p-4 bg-cyan-950/20 border border-cyan-400/30 rounded">
                    <h3 className="text-white font-mono text-xs mb-2">Tentang Website Standalone</h3>
                    <p className="text-xs text-slate-300">
                      Tabel luring portofolio mandiri untuk offline VS Code. Dilengkapi fungsionalitas murni, clock sirkulasi WIB lokal, and status role table lengkap.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3 bg-neutral-900 border border-white/5 rounded">
                      <span className="text-amber-400 block mb-1">STABLES</span>
                      <div>React 18 Production Engine</div>
                      <div>Tailwind CSS Styling Module</div>
                    </div>
                    <div className="p-3 bg-neutral-900 border border-white/5 rounded">
                      <span className="text-cyan-400 block mb-1">CONTRIBUTORS</span>
                      <div>NesiNezz (Owner)</div>
                      <div>Offline Core Sandboxing</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3">
                    <h3 className="text-xs font-mono text-white">X_FAQ ARSIP</h3>
                    {FAQS.map((faq, i) => (
                      <div key={i} className="p-2 border border-white/5 bg-neutral-900/30 rounded text-xs">
                        <strong className="text-cyan-400 block mb-1">[Q] {faq.q}</strong>
                        <p className="text-slate-300">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentTab === 'friendlist' && (
                <div className="space-y-4">
                  <h2 className="font-mono text-white text-base">FRIENDLIST RELATION SHIELDS</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {FRIENDS_LIST.map(friend => {
                      const isSahabat = friend.type === 'sahabat';
                      const isPacar = friend.type === 'pacar';
                      const isSelected = selectedFriend?.id === friend.id;

                      let borderTheme = isSelected
                        ? "border-cyan-400 bg-neutral-900 shadow-[0_0_15px_rgba(6,182,212,0.3)] col-span-1 md:col-span-2 border-2 text-left"
                        : "border-cyan-500/30 hover:border-cyan-400 bg-neutral-900/40 col-span-1 text-left";
                      
                      if (isSahabat) {
                        borderTheme = isSelected
                          ? "border-amber-400 bg-neutral-900 shadow-[0_0_20px_rgba(245,158,11,0.35)] col-span-1 md:col-span-2 border-2 text-left"
                          : "border-amber-400 hover:border-amber-300 bg-[#1e170a]/10 col-span-1 text-left";
                      }
                      if (isPacar) {
                        borderTheme = isSelected
                          ? "border-pink-500 bg-neutral-900 shadow-[0_0_25px_rgba(236,72,153,0.4)] col-span-1 md:col-span-2 border-2 text-left"
                          : "border-pink-500 hover:border-pink-400 bg-[#1e170a]/5 col-span-1 text-left";
                      }

                      return (
                        <div 
                          key={friend.id} 
                          onClick={() => setSelectedFriend(isSelected ? null : friend)} 
                          className={"p-4 rounded border cursor-pointer select-none transition duration-300 " + borderTheme}
                        >
                          <div className="flex gap-3 items-center">
                            <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center font-mono font-bold text-xs capitalize text-white bg-neutral-800 shrink-0">
                              {friend.name.slice(0, 2)}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-mono font-bold text-sm">
                                {friend.name}
                              </h4>
                              <div className="text-[10px] text-slate-400 font-mono">Spesies: {friend.species}</div>
                            </div>
                          </div>

                          {!isSelected && (
                            <>
                              <p className="text-[11px] text-slate-300 mt-2.5 line-clamp-2 font-mono bg-black/20 p-2 rounded border border-white/5">{friend.traits}</p>
                              <span className="text-[9px] text-[#06e3ff] block text-right mt-2 font-mono">EXPAND SYSTEM CARD ▼</span>
                            </>
                          )}

                          {isSelected && (
                            <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">CIRI-CIRI LENGKAP:</span>
                                <p className="text-xs text-amber-300/90 font-mono bg-amber-950/20 p-2.5 rounded border border-amber-500/20 leading-relaxed">"{friend.traits}"</p>
                              </div>
                              <div>
                                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">ARSIP DATABASE:</span>
                                <p className="text-xs text-slate-300 leading-relaxed bg-black/40 p-2.5 rounded border border-white/5 font-mono">{friend.detailedBio}</p>
                              </div>
                              <div>
                                <span className="text-[9px] font-mono text-[#06e3ff] uppercase tracking-wider block mb-1 font-bold">INTEGRASI LINK:</span>
                                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                                  {friend.socials.map((s, idx) => (
                                    <button 
                                      key={idx} 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        alert("Simulasi membuka link: " + s.url);
                                      }} 
                                      className="p-1 px-3 bg-[#5865F2] text-white rounded text-[11px] font-semibold flex items-center gap-1 hover:brightness-115 transition cursor-pointer"
                                    >
                                      <span>{s.label}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[9px] font-mono text-neutral-500">
                                <span>SESSION DATA: {friend.id.toUpperCase()}</span>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedFriend(null);
                                  }} 
                                  className="text-white hover:text-rose-400 font-semibold transition bg-transparent border-0 cursor-pointer"
                                >
                                  ◀ COLLAPSE DETAILS
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentTab === 'connection' && (
                <div className="space-y-4">
                  <h2 className="font-mono text-white text-base">COMMUNICATION PLATFORMS</h2>
                  {isConnectingSocials ? (
                    <div className="p-8 text-center border border-cyan-400/30 rounded bg-black/40">
                      <div className="text-cyan-400 font-mono animate-pulse text-xs">SECURE COUPLING SIMULATION IN ACTION (STANDALONE)...</div>
                      <button onClick={() => setIsConnectingSocials(false)} className="mt-4 px-3 py-1 bg-cyan-900/40 border border-cyan-400 text-white rounded font-mono text-xs">Bypass Loading</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {OWNER_SOCIALS.map((soc, i) => (
                        <div key={i} onClick={() => alert("Hub: " + soc.url)} className={"p-3 rounded border cursor-pointer " + soc.color}>
                          <h4 className="text-white font-mono font-bold text-xs">{soc.name}</h4>
                          <span className="text-[10px] text-cyan-300 font-mono block">@{soc.username}</span>
                          <p className="text-[11px] text-slate-200 mt-2">{soc.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentTab === 'profile' && (
                <div className="space-y-4 font-mono">
                  <h2 className="text-white text-base">PROFILE INTEGRATIONS</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 bg-neutral-900/60 rounded border border-cyan-500/30 text-center">
                      <div className="w-16 h-16 rounded-full bg-slate-500 mx-auto mb-2 flex items-center justify-center font-bold text-white text-lg">NN</div>
                      <h4 className="text-white">NESINEZZ</h4>
                      <p className="text-[9px] text-cyan-400">Wolf Ear Enabled</p>
                    </div>
                    <div className="p-4 bg-neutral-900/60 rounded border border-white/10 md:col-span-2 space-y-2 text-xs">
                      <div>TEL: <strong className="text-cyan-300 tracking-widest">+62xxxxxxxxx</strong></div>
                      <div>EMAIL: <strong className="text-indigo-300">Nesxxxxx@gmail.com</strong></div>
                      <p className="text-slate-400 text-[11px]">Programmer hobiis, furry, gray-hat hacker, pembuat portfolio dengan visual cyberglow emas-cyan mantap.</p>
                    </div>
                  </div>

                  {/* Adaptive Roles Matrix */}
                  <div className="pt-2">
                    <h3 className="text-xs text-amber-300 mb-2">TABEL ROLES (MATRIKS)</h3>
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-white/10 text-[#06e3ff] border-b border-white/10">
                            <th className="p-2">Role</th>
                            <th className="p-2">Clearance Level</th>
                            <th className="p-2">Area Specialty</th>
                            <th className="p-2">System Coverage</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {ROLES_LIST.map((row, i) => (
                            <tr key={i} className="hover:bg-cyan-500/10">
                              <td className="p-2 font-bold text-white">{row.role}</td>
                              <td className="p-2 text-cyan-300">{row.level}</td>
                              <td className="p-2 text-slate-300">{row.specialty}</td>
                              <td className="p-2 text-amber-400 font-bold">{row.systemCoverage}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          <footer className="relative w-full border border-white/5 rounded-lg p-3 bg-neutral-950/60 text-center font-mono text-[9px] text-neutral-400 mt-4">
            <div>© 2026 NESINEZZ OFFLINE CONSOLE - DOUBLE CLICK COMPATIBLE</div>
          </footer>
        </div>
      );
    }

    const container = document.getElementById('standalone-root');
    const root = ReactDOM.createRoot(container);
    root.render(<StandaloneApp />);
  </script>
</body>
</html>`;
}
