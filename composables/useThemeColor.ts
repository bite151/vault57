export function useThemeColor() {
  const changeThemeColor = (color: string) => {
    let themeMeta = document.querySelector("meta[name='theme-color']");
    
    if (!themeMeta) {
      themeMeta = document.createElement("meta");
      themeMeta.setAttribute("name", "theme-color");
      document.head.appendChild(themeMeta);
    }
    
    themeMeta.setAttribute("content", color);
    document.body.style.backgroundColor = color
  }
  
  return { changeThemeColor }
}
