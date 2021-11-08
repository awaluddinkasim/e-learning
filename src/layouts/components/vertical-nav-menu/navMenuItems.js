
const menuUser =  [
  {
    url: '/user/dashboard',
    name: "Dashboard",
    slug: "dashboard",
    icon: "HomeIcon",
    i18n: "Dashboard",
  },
  {
    header: "Menu",
    icon: "PackageIcon",
    i18n: "Menu",
    items: [
      {
        url: "/user/kelas",
        name: "Kelas",
        slug: "kelas",
        icon: "BookIcon",
        i18n: "Kelas",
      },
      {
        url: null,
        name: "Media",
        icon: "AirplayIcon",
        i18n: "Media",
        submenu: [
          {
            url: '/user/conference',
            name: "Video Conference",
            slug: "app-user-view",
            i18n: "Video Conference",
          },
        ]
      },
    ]
  },
]




const menuDosen =  [
  {
    url: '/dosen/dashboard',
    name: "Dashboard",
    slug: "dashboard",
    icon: "HomeIcon",
    i18n: "Dashboard",
  },
  {
    header: "Menu",
    icon: "PackageIcon",
    i18n: "Menu",
    items: [
      {
        url: "/dosen/kelas",
        name: "Kelas",
        slug: "email",
        icon: "BookIcon",
        i18n: "Kelas",
      },
      {
        url: null,
        name: "Tugas Masuk",
        icon: "CheckSquareIcon",
        i18n: "Tugas Masuk",
        submenu: [
          {
            url: '/dosen/kuis',
            name: "Kuis",
            slug: "app-user-view",
            i18n: "Kuis",
          },
          {
            url: '/dosen/tugas-masuk',
            name: "Tugas Masuk",
            slug: "app-user-view",
            i18n: "Tugas Masuk",
          },
        ]
      },
    ]
  },
]



const menuAdmin =  [
  {
    url: '/admin/dashboard',
    name: "Dashboard",
    slug: "dashboard",
    icon: "HomeIcon",
    i18n: "Dashboard",
  },
  {
    header: "Menu",
    icon: "PackageIcon",
    i18n: "Menu",
    items: [
      {
        url: "/admin/dosen",
        name: "Dosen",
        slug: "dosen",
        icon: "UserIcon",
        i18n: "Dosen",
      },
      {
        url: "/admin/mahasiswa",
        name: "Mahasiswa",
        slug: "mahasiswa",
        icon: "UsersIcon",
        i18n: "Mahasiswa",
      },
    ]
  },
]


export {
  menuUser,
  menuDosen,
  menuAdmin
}
