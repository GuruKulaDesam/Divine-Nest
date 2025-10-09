function generateUserAvatar(user, style = "avataaars") {
  user.name || user.email || "User";
  const randomSeed = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${encodeURIComponent(randomSeed)}&backgroundColor=b6e3f4&size=128`;
}
export {
  generateUserAvatar as g
};
