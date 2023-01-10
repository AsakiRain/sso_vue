const useDark = () => {
  const preferDark = () =>
    window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;
  const isDark = () =>
    localStorage.theme ? localStorage.theme === "dark" : preferDark();

  const setDark = (val: boolean) => {
    if (val) {
      let linkEle = document.querySelector("#dark-style-link");
      if (linkEle) return;

      localStorage.theme = "dark";
      const docHTML = document.querySelector("html");
      docHTML?.classList.add("dark");
      linkEle = document.createElement("link");
      linkEle.setAttribute("rel", "stylesheet");
      linkEle.setAttribute("href", "/theme/antd.dark.css");
      linkEle.setAttribute("id", "dark-style-link");

      const docHead = document.querySelector("head");
      docHead?.append(linkEle);
    } else {
      const linkEle = document.querySelector("#dark-style-link");
      if (!linkEle) return;
      const docHTML = document.querySelector("html");
      docHTML?.classList.remove("dark");
      localStorage.theme = "light";
      const parentNode = linkEle?.parentNode;
      parentNode?.removeChild(linkEle);
    }
  };

  const toggleDark = () => {
    if (isDark()) {
      setDark(false);
    } else {
      setDark(true);
    }
  };
  console.log("preferDark: ", preferDark());
  console.log("isDark: ", isDark());

  setDark(isDark());
  return { isDark, toggleDark, setDark };
};

export default useDark;
