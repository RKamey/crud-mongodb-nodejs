const getIcon = cuisine => {
    const icons = {
      Italian: "🍕",
      Mexican: "🌮",
      Chinese: "🥡",
      Indian: "🍛",
      Japanese: "🍣",
      American : "🍔",
      Hamburgers: "🍔",
      French: "🥐",
      German: "🥨",
      Bakery: "🥖",
      Irish: "🍀",
      Jewish: "🥯",
      Delicatessen: "🥪",
      Yogurt: "🍦",
      Ices: "🍦",
      Chicken: "🍗",
    };
  
    return icons[cuisine] || "❓";
};

module.exports = { getIcon };
  