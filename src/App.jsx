const menuData = [
  {
    label: "Menu 1",
  },
  {
    label: "Menu 2",
    submenu: [
      {
        label: "submenu 1",
      },
      {
        label: "submenu 2",
      },
    ],
  },
  {
    label: "Menu 3",
    submenu: [
      {
        label: "submenu 1",
      },
      {
        label: "submenu 2",
      },
      {
        label: "submenu 3",
      },
      {
        label: "submenu 4",
        submenu: [{ label: "sub submenu1" }, { label: "sub submenu2" }],
      },
    ],
  },
  {
    label: "Menu 4",
    submenu: [
      {
        label: "submenu 1",
      },
      {
        label: "submenu 2",
      },
    ],
  },
];
const App = () => {
  const toggleSubmenu = (e) => {
    let submenu = e.target.querySelector("ul");
    e.stopPropagation();
    // console.log(submenu);
    if (!submenu) return;
    if (submenu.style.display === "none" || !submenu.style.display) {
      submenu.style.display = "block";
    } else {
      submenu.style.display = "none";
    }
  };
  const renderSubmenu = (subMenu) => {
    return (
      <ul className="p-2  m-2 list-disc list-outside hidden">
        {subMenu.map((subItem, index) => (
          <li key={index} onClick={toggleSubmenu}>
            {" "}
            {subItem.label}
            {subItem.submenu && renderSubmenu(subItem.submenu)}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div>
      <ul className="p-3 m-10 list-disc list-outside">
        {menuData.map((item, index) => (
          <li key={index} onClick={toggleSubmenu}>
            {" "}
            {item.label}
            {item.submenu && renderSubmenu(item.submenu)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
