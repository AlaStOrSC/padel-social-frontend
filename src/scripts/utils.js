const generateAvatarUrl = (username) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=05374d&color=ffff&rounded=true`;
  };



  export { generateAvatarUrl };