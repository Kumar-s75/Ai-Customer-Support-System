"use client";

export default function ConversationList({
  conversations,
  onSelect,
}: any) {
  return (
    <div style={{ width: 240, borderRight: "1px solid #ddd" }}>
      <h4>Conversations</h4>
      {conversations.map((c: any) => (
        <div
          key={c.id}
          onClick={() => onSelect(c.id)}
          style={{ padding: 8, cursor: "pointer" }}
        >
          {c.id.slice(0, 8)}
        </div>
      ))}
    </div>
  );
}
