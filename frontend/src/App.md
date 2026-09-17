App Component Loads
│
▼
useEffect() runs
│
▼
checkAuth()
│
▼
isCheckingAuth = true
│
▼
Show <PageLoader />
│
▼
Authentication Check Complete
│
▼
isCheckingAuth = false
│
▼
Routes Render
│
├── authUser exists
│ ├── "/" → ChatPage
│ ├── "/login" → Redirect "/"
│ └── "/signup" → Redirect "/"
│
└── authUser does not exist
├── "/" → Redirect "/login"
├── "/login" → LoginPage
└── "/signup" → SignUpPage
