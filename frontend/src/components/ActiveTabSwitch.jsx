import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  const tabs = [
    { id: "chats", label: "Chats" },
    { id: "contacts", label: "Contacts" },
  ];

  return (
    <div className="px-4 pb-2">
      <div className="flex p-1 rounded-xl bg-blue-950/50 border border-blue-500/15">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-600/30"
                : "text-blue-300/60 hover:text-blue-200 hover:bg-blue-500/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ActiveTabSwitch;
