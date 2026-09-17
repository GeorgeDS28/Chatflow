Open Chat App
↓
No User Selected
↓
Show Placeholder

Complete frontend flow so far
LoginPage
↓
login()
↓
JWT Cookie
↓
ChatPage
↓
ProfileHeader
↓
ActiveTabSwitch
↓
ChatsList / ContactList
↓
Click User
↓
selectedUser
↓
ChatContainer
↓
Fetch Messages
↓
Subscribe Socket
↓
Send/Receive Messages
↓
Auto Scroll












allContacts → All users in Contacts tab
chats → Existing chat partners
messages → Current conversation messages
activeTab → Chats / Contacts
selectedUser → Currently opened chat

getAllContacts() → GET /messages/contacts
getMyChatPartners() → GET /messages/chats
getMessagesByUserId() → GET /messages/:id

sendMessage() → Sends message + Optimistic UI
subscribeToMessages() → Socket listener
unsubscribeFromMessages() → Remove listener

toggleSound() → Enable/Disable sounds
