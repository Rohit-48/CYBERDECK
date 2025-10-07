// Pre-defined avatar options (cyberpunk themed)
export const AVATARS = [
  { id: 'cyber-ninja', emoji: '🥷', name: 'Cyber Ninja', color: '#fcee0a' },
  { id: 'hacker', emoji: '👨‍💻', name: 'Hacker', color: '#f0a500' },
  { id: 'robot', emoji: '🤖', name: 'Robot', color: '#737373' },
  { id: 'alien', emoji: '👽', name: 'Alien', color: '#10b981' },
  { id: 'ghost', emoji: '👻', name: 'Ghost', color: '#e5e5e5' },
  { id: 'skull', emoji: '💀', name: 'Skull', color: '#d4d4d4' },
  { id: 'fire', emoji: '🔥', name: 'Fire', color: '#ef4444' },
  { id: 'lightning', emoji: '⚡', name: 'Lightning', color: '#fcee0a' },
  { id: 'rocket', emoji: '🚀', name: 'Rocket', color: '#3b82f6' },
  { id: 'brain', emoji: '🧠', name: 'Brain', color: '#ec4899' },
  { id: 'eye', emoji: '👁️', name: 'Eye', color: '#8b5cf6' },
  { id: 'terminal', emoji: '💻', name: 'Terminal', color: '#22c55e' },
  { id: 'satellite', emoji: '🛰️', name: 'Satellite', color: '#0ea5e9' },
  { id: 'crystal', emoji: '🔮', name: 'Crystal', color: '#a855f7' },
  { id: 'diamond', emoji: '💎', name: 'Diamond', color: '#06b6d4' },
  { id: 'gear', emoji: '⚙️', name: 'Gear', color: '#737373' },
];

// Get random avatar
export const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * AVATARS.length);
  return AVATARS[randomIndex];
};

// Get avatar by ID
export const getAvatarById = (id) => {
  return AVATARS.find(avatar => avatar.id === id) || AVATARS[0];
};

// Get avatar from user metadata
export const getUserAvatar = (user) => {
  if (!user?.user_metadata?.avatar) {
    return getRandomAvatar();
  }
  return getAvatarById(user.user_metadata.avatar);
};

